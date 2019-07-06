import { getDistinctValues, generateDropDownOptions } from './common';
import { IQuestion } from '../models/question';
import { dynamoDBClient, questionTableName } from '../config/aws-config';
import { Alert } from 'react-native';

export const FilesBaseUrl = 'https://s3.amazonaws.com/pocket-tutor-assets/subsection';

export default class QuestionService {
  private questionData: IQuestion[] = [];

  constructor(private sClass: string, private sSubject: string) {}

  async init() {
    try {
      const { Items } = await dynamoDBClient
        .scan({
          TableName: questionTableName,
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
        this.questionData = Items as IQuestion[];
      }
    } catch (error) {
      console.log('Error', error);
      Alert.alert(
        'Error Fetching Data',
        'Error while fetching data from remote server',
      );
    }
  }

  getChapters() {
    const sections = generateDropDownOptions(
      getDistinctValues(
        this.questionData,
        'chapter',
      ).sort((a: any, b: any) => a - b),
    );
    sections.unshift({ label: 'Select Chapter', value: '' });
    return sections;
  }

  getQuestions(sChapter: string) {
    const titles = generateDropDownOptions(
      getDistinctValues(
        this.questionData.filter(
          data =>
            data.chapter.toString() === sChapter,
        ),
        'question',
      ),
    );
    titles.unshift({ label: 'Select Question', value: '' });
    return titles;
  }

  getTypes() {
    const types = generateDropDownOptions(['Questions', 'Quizzes']);
    types.unshift({ label: 'Questions/Quizzes', value: '' });
    return types;
  }

  getQuestionDetail(sChapter: string, sQuestion: string) {
    return this.questionData.find(
      data =>
        data.chapter.toString() === sChapter.toString() &&
        data.question === sQuestion,
    );
  }

  createFilePath(sCourse: string, sChapter: number, sFileName: string, sVideoName: string) {
    const path: string[] = [];
    path.push(sCourse);
    path.push(`${sCourse}C${sChapter}`);

    const subsection = sFileName.split('.')[0];
    const section = subsection.split('-');
    path.push(section[0]);
    if (section[1]) {
      path.push(subsection);
    }

    path.push(sFileName);

    const filePath = path.join('/');

    path.pop();
    path.push(sVideoName);

    const videoPath = path.join('/');

    return { filePath, videoPath };
  }
}
