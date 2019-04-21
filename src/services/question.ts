import { getDistinctValues, generateDropDownOptions } from './common';
import { IQuestion } from '../models/question';
import { IDropDownOptions } from '../models/dropdown';

const questionData: IQuestion[] = require('../../assets/trans_question.json');

export const FilesBaseUrl = 'https://s3.amazonaws.com/pocket-tutor-assets/subsection';

export default class QuestionService {
  constructor(private sClass: string, private sSubject: string) {}

  getChapters() {
    const sections = generateDropDownOptions(
      getDistinctValues(
        questionData.filter(
          data =>
            data.class.toLowerCase() === this.sClass &&
            data.subject.toLowerCase() === this.sSubject,
        ),
        'chapter',
      ),
    );
    sections.unshift({ label: 'Select Chapter', value: '' });
    return sections;
  }

  getQuestions(sChapter: string) {
    const titles = generateDropDownOptions(
      getDistinctValues(
        questionData.filter(
          data =>
            data.class.toLowerCase() === this.sClass &&
            data.subject.toLowerCase() === this.sSubject &&
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
    return questionData.find(
      data =>
        data.class.toLowerCase() === this.sClass &&
        data.subject.toLowerCase() === this.sSubject &&
        data.chapter.toString() === sChapter.toString() &&
        data.question.toLowerCase() === sQuestion.toLowerCase(),
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
