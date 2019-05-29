import { ISubsection } from '../models/subsection';
import { getDistinctValues, generateDropDownOptions } from './common';

const subSectionData: ISubsection[] = require('../../assets/trans_subsection.json');

export const FilesBaseUrl = 'https://s3.amazonaws.com/pocket-tutor-assets/subsection';

export default class LectureService {
  constructor(private sClass?: string, private sSubject?: string) {}

  getTitles() {
    const titles = generateDropDownOptions(
      getDistinctValues(
        subSectionData.filter(
          data =>
            data.class.toLowerCase() === this.sClass &&
            data.subject.toLowerCase() === this.sSubject,
        ),
        'ch_tittle',
      ),
    );
    titles.unshift({ label: 'Select Title', value: '' });
    return titles;
  }

  getSections(sTitle: string) {
    const sections = generateDropDownOptions(
      getDistinctValues(
        subSectionData.filter(
          data =>
            data.class.toLowerCase() === this.sClass &&
            data.subject.toLowerCase() === this.sSubject &&
            data.ch_tittle.toLowerCase() === sTitle,
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
        subSectionData.filter(
          data =>
            data.class.toLowerCase() === this.sClass &&
            data.subject.toLowerCase() === this.sSubject &&
            data.ch_tittle.toLowerCase() === sTitle &&
            data.section.toLowerCase() === sSection,
        ),
        'subsection',
      ),
    );
    subsections.unshift({ label: 'Select SubSection', value: '' });
    return subsections;
  }

  getLectureDetail(sTitle: string, sSection: string, sSubsection: string) {
    return subSectionData.find(
      data =>
        data.class.toLowerCase() === this.sClass &&
        data.subject.toLowerCase() === this.sSubject &&
        data.ch_tittle.toLowerCase() === sTitle &&
        data.section.toLowerCase() === sSection &&
        data.subsection.toLowerCase() === sSubsection,
    );
  }

  getSearchResult(search: string) {
    return subSectionData.filter(
      data =>
        data.ch_tittle.toLowerCase().includes(search.toLowerCase()) ||
        data.course.toLowerCase().includes(search.toLowerCase()) ||
        data.section.toLowerCase().includes(search.toLowerCase()) ||
        data.subsection.toLowerCase().includes(search.toLowerCase()),
    );
  }

  createFilePath(sCourse: string, sFileId: string, sChapter: number, sFileName: string, sVideoName: string) {
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
