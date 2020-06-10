import { Alert, ToastAndroid } from 'react-native';
import { ISubsection } from '../models/subsection';
import { generateDropDownOptions, getDistinctValues, getClassSubjectKey } from './common';
import { IDropDownOptions } from '../models/dropdown';
import { dynamoDBClient, subsectionTableName } from '../config/aws-config';
import Payments, { IAP_ITEMS } from './payments';
import {
  InAppPurchase,
  IAPItemDetails,
  IAPResponseCode,
} from 'expo-in-app-purchases/build/InAppPurchases.types';
import { finishTransactionAsync } from 'expo-in-app-purchases';

export default class CourseService {
  private subSectionData: ISubsection[] = [];
  private availableCourses?: (InAppPurchase | IAPItemDetails)[];
  private purchasedCourses?: (InAppPurchase | IAPItemDetails)[];
  private payments = new Payments();
  private loading = false;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new this();
    }
    return this.instance;
  }

  private static instance: CourseService | null;

  async init() {
    try {
      if (!this.loading && this.subSectionData.length === 0) {
        this.loading = true;
        if (!this.purchasedCourses) {
          this.purchasedCourses = await this.payments.init(this.purchaseListener());
        }
        if (!this.availableCourses) {
          this.availableCourses = await this.payments.getProductsAsync();
        }
        const { Items } = await dynamoDBClient.scan({ TableName: subsectionTableName }).promise();
        this.loading = false;
        if (Items) {
          this.subSectionData = (Items as ISubsection[]).sort(
            (a, b) => a.id_subsection - b.id_subsection,
          );
        }
      }
    } catch (error) {
      console.log('Error', error);
      Alert.alert('Error Fetching Data', 'Error while fetching data from remote server');
    }
  }

  private purchaseListener(): (result: any) => void {
    return ({ responseCode, results, errorCode }) => {
      // Purchase was successful
      if (responseCode === IAPResponseCode.OK) {
        results.forEach((purchase: InAppPurchase) => {
          if (!purchase.acknowledged) {
            console.log(`Successfully purchased ${purchase.productId}`);
            // Process transaction here and unlock content...
            let isNewlyPurchased = false;
            if (this.purchasedCourses) {
              if (!this.purchasedCourses.some(c => c.productId === purchase.productId)) {
                isNewlyPurchased = true;
                this.purchasedCourses.push(purchase);
              }
            } else {
              isNewlyPurchased = true;
              this.purchasedCourses = [purchase];
            }

            if (isNewlyPurchased) {
              if (!purchase.productId.includes('cert')) {
                ToastAndroid.show(
                  `${IAP_ITEMS[purchase.productId]} has been purchased successfully.`,
                  ToastAndroid.LONG,
                );
              } else {
                ToastAndroid.show(
                  `${IAP_ITEMS[purchase.productId]} have been purchased successfully.`,
                  ToastAndroid.LONG,
                );
              }
            }

            // Then when you're done
            finishTransactionAsync(purchase, true);
          }
        });
      } else if (responseCode === IAPResponseCode.USER_CANCELED) {
        console.log('User canceled the transaction');
      } else if (responseCode === IAPResponseCode.DEFERRED) {
        console.log(
          'User does not have permissions to buy but requested parental approval (iOS only)',
        );
      } else {
        console.warn(`Something went wrong with the purchase. Received errorCode ${errorCode}`);
      }
    };
  }

  getClasses() {
    const classes: IDropDownOptions = generateDropDownOptions(
      getDistinctValues(this.subSectionData, 'class'),
    );
    classes.unshift({ label: 'Select Class', value: '' });
    return classes;
  }

  getSubjects(sClass: any) {
    const subjects: IDropDownOptions = generateDropDownOptions(
      getDistinctValues(
        this.subSectionData.filter(data => data.class === sClass),
        'subject',
      ),
    );
    subjects.unshift({ label: 'Select Subject', value: '' });
    return subjects;
  }

  getTypes() {
    const types: IDropDownOptions = generateDropDownOptions(['Lectures', 'Questions']);
    types.unshift({ label: 'Lectures/Questions', value: '' });
    return types;
  }

  getSearchResult(search: string) {
    return this.subSectionData.filter(
      data =>
        data.ch_tittle.includes(search) ||
        data.course.includes(search) ||
        data.section.includes(search) ||
        data.subsection.includes(search),
    );
  }

  canGoNext(sClass: string, sSubject: string) {
    if (sClass !== 'Certification') {
      const sCourse = getClassSubjectKey(sClass, sSubject.toLowerCase());
      if (this.purchasedCourses) {
        const pCourses = this.purchasedCourses.map(course =>
          course.productId.split('.')[1].toUpperCase(),
        );
        if (pCourses.includes(sCourse)) {
          return true;
        }
      }
      this.payments.purchaseItemAsync(`course.${sCourse.toLowerCase()}`);
    } else {
      if (this.purchasedCourses) {
        const pCourses = this.purchasedCourses.map(course =>
          course.productId.split('.')[1].toUpperCase(),
        );
        if (pCourses.includes(sSubject)) {
          return true;
        }
      }
      this.payments.purchaseItemAsync(`cert.${sSubject.toLowerCase()}`);
    }
  }
}
