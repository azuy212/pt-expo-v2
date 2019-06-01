import { IQuiz } from '../models/quiz';
import { quizTableName, dynamoDBClient } from '../config/aws-config';
import { Alert } from 'react-native';

export const FilesBaseUrl = 'https://s3.amazonaws.com/pocket-tutor-assets/subsection';

export default class QuizService {
  private quizzesData: IQuiz[] = [];

  constructor(private sClass: string, private sSubject: string) {}

  async init() {
    try {
      const { Items } = await dynamoDBClient
        .scan({
          TableName: quizTableName,
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
        this.quizzesData = Items as IQuiz[];
      }
    } catch (error) {
      console.log('Error', error);
      Alert.alert(
        'Error Fetching Data',
        'Error while fetching data from remote server',
      );
    }
  }

  getQuizzes(sChapter: string) {
    return this.quizzesData.filter((data) => {
      if (data.class && data.subject && data.chapter) {
        return (
          data.class === this.sClass &&
          data.subject === this.sSubject &&
          data.chapter.toString() === sChapter
        );
      }
      return false;
    }).sort((a, b) => {
      return a.id_quizzes - b.id_quizzes;
    });
  }

  getQuizDetail(sQuizId: string) {
    return this.quizzesData.find(data => data.id_quizzes.toString() === sQuizId);
  }

  createFilePath(sCourse: string, sFileName: string, sQuizLink: string) {
    const path: string[] = [];
    path.push(sCourse);
    path.push(`${sCourse}QZ`);

    const chapter = sFileName.split('-')[0];
    path.push(chapter);

    path.push(sQuizLink);

    return path.join('/');
  }
}
