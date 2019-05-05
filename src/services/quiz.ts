import { IQuiz } from '../models/quiz';

const quizzesData: IQuiz[] = require('../../assets/trans_quizzes.json');

export const FilesBaseUrl = 'https://s3.amazonaws.com/pocket-tutor-assets/subsection';

export default class QuizService {
  constructor(private sClass: string, private sSubject: string) {}

  getQuizzes(sChapter: string) {
    return quizzesData.filter((data) => {
      if (data.class && data.subject && data.chapter) {
        return (
          data.class.toLowerCase() === this.sClass.toLowerCase() &&
          data.subject.toLowerCase() === this.sSubject.toLowerCase() &&
          data.chapter.toString() === sChapter
        );
      }
      return false;
    });
  }

  getQuizDetail(sQuizId: string) {
    return quizzesData.find(data => data.id_quizzes.toString() === sQuizId);
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
