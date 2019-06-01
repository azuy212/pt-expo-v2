import { Alert } from 'react-native';
import { ISubsection } from '../models/subsection';
import { generateDropDownOptions, getDistinctValues } from './common';
import { IDropDownOptions } from '../models/dropdown';

import { dynamoDBClient, subsectionTableName } from '../config/aws-config';

export default class CourseService {
  private subSectionData: ISubsection[] = [];

  async init() {
    try {
      const { Items } = await dynamoDBClient
        .scan({ TableName: subsectionTableName })
        .promise();
      if (Items) {
        this.subSectionData = Items as ISubsection[];
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
}
