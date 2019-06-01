import { ISubsection } from '../models/subsection';
import { getDistinctValues, generateDropDownOptions } from './common';
import { dynamoDBClient, subsectionTableName } from '../config/aws-config';
import { Alert } from 'react-native';

export const FilesBaseUrl =
  'https://s3.amazonaws.com/pocket-tutor-assets/subsection';

export default class LectureService {
  private lectureData: ISubsection[] = [];

  constructor(private sClass?: string, private sSubject?: string) {}

  async init() {
    try {
      const { Items } = await dynamoDBClient
        .scan({
          TableName: subsectionTableName,
          ExpressionAttributeNames: {
            '#class': 'class',
            '#subject': 'subject',
          },
          ExpressionAttributeValues: {
              ':sClass': this.sClass,
              ':sSubject': this.sSubject,
          },
          FilterExpression: '#class = :sClass AND #subject = :sSubject',
         })
        .promise();
      if (Items) {
        this.lectureData = Items as ISubsection[];
      }
    } catch (error) {
      console.log('Error', error);
      Alert.alert(
        'Error Fetching Data',
        'Error while fetching data from remote server',
      );
    }
  }

  getTitles() {
    const titles = generateDropDownOptions(
      getDistinctValues(
        this.lectureData,
        'ch_tittle',
      ),
    );
    titles.unshift({ label: 'Select Title', value: '' });
    return titles;
  }

  getSections(sTitle: string) {
    const sections = generateDropDownOptions(
      getDistinctValues(
        this.lectureData.filter(
          data =>
            data.ch_tittle === sTitle,
        ),
        'section',
      ),
    );
    sections.unshift({ label: 'Select Section', value: '' });
    return sections;
  }

  getSubsections(sTitle: string, sSection: string) {
    const subsections = generateDropDownOptions(
      getDistinctValues(
        this.lectureData.filter(
          data =>
            data.ch_tittle === sTitle &&
            data.section === sSection,
        ),
        'subsection',
      ),
    );
    subsections.unshift({ label: 'Select SubSection', value: '' });
    return subsections;
  }

  getLectureDetail(sTitle: string, sSection: string, sSubsection: string) {
    return this.lectureData.find(
      data =>
        data.ch_tittle === sTitle &&
        data.section === sSection &&
        data.subsection === sSubsection,
    );
  }

  createFilePath(
    sCourse: string,
    sFileId: string,
    sChapter: number,
    sFileName: string,
    sVideoName: string,
  ) {
    const path: string[] = [];
    path.push(sCourse);
    path.push(`${sCourse}C${sChapter}`);

    const section = sFileId.split('-');
    path.push(sCourse + section[0]);
    if (section[1]) {
      path.push(sCourse + sFileId);
    }

    path.push(sFileName);

    const filePath = path.join('/');

    path.pop();
    path.push(sVideoName);

    const videoPath = path.join('/');

    return { filePath, videoPath };
  }
}
