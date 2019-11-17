import { Alert } from 'react-native';
import { ISubsection } from '../models/subsection';
import { generateDropDownOptions, getDistinctValues, getClassSubjectKey } from './common';
import { IDropDownOptions } from '../models/dropdown';
import { dynamoDBClient, subsectionTableName } from '../config/aws-config';
import Payments from './payments';
import { InAppPurchase, IAPItemDetails } from 'expo-in-app-purchases/build/InAppPurchases.types';

export default class CourseService {
  private subSectionData: ISubsection[] = [];
  private availableCourses?: (InAppPurchase | IAPItemDetails)[];
  private purchasedCourses?: (InAppPurchase | IAPItemDetails)[];
  private payments = new Payments();

  async init() {
    try {
      if (!this.purchasedCourses) {
        this.purchasedCourses = await this.payments.init();
      }
      if (!this.availableCourses) {
        this.availableCourses = await this.payments.getProductsAsync();
      }
      const { Items } = await dynamoDBClient.scan({ TableName: subsectionTableName }).promise();
      if (Items) {
        this.subSectionData = (Items as ISubsection[]).sort(
          (a, b) => a.id_subsection - b.id_subsection,
        );
      }
    } catch (error) {
      console.log('Error', error);
      Alert.alert('Error Fetching Data', 'Error while fetching data from remote server');
    }
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
      getDistinctValues(this.subSectionData.filter(data => data.class === sClass), 'subject'),
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
    let sCourse = '';
    if (sClass !== 'Certification') {
      sCourse = getClassSubjectKey(sClass, sSubject.toLowerCase());
    } else {
      sCourse = 'cert.all';
    }
    const pCourses = this.purchasedCourses!.map(course => course.productId.split('.')[1].toUpperCase());
    if (pCourses.includes(sCourse)) {
      return true;
    }
    this.payments.purchaseItemAsync(`course.${sCourse.toLowerCase()}`);
  }
}
