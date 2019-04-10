import { ISubsection } from '../models/subsection';
import { getDistinctValues, generateDropDownOptions } from './common';

const subSectionData: ISubsection[] = require('../../assets/trans_subsection.json');

export default class LectureService {
  constructor(private selectedClass: string, private selectedSubject: string) {}

  getTitles() {
    const titles = generateDropDownOptions(
      getDistinctValues(
        subSectionData.filter(
          data =>
            data.class.toLowerCase() === this.selectedClass &&
            data.subject.toLowerCase() === this.selectedSubject,
        ),
        'ch_tittle',
      ),
    );
    titles.unshift({ label: 'Select Title', value: '' });
    return titles;
  }

  getSections(selectedTitle: string) {
    const sections = generateDropDownOptions(
      getDistinctValues(
        subSectionData.filter(
          data =>
            data.class.toLowerCase() === this.selectedClass &&
            data.subject.toLowerCase() === this.selectedSubject &&
            data.ch_tittle.toLowerCase() === selectedTitle,
        ),
        'section',
      ),
    );
    sections.unshift({ label: 'Select Section', value: '' });
    return sections;
  }

  getSubsections(selectedTitle: string, selectedSection: string) {
    const subsections = generateDropDownOptions(
      getDistinctValues(
        subSectionData.filter(
          data =>
            data.class.toLowerCase() === this.selectedClass &&
            data.subject.toLowerCase() === this.selectedSubject &&
            data.ch_tittle.toLowerCase() === selectedTitle &&
            data.section.toLowerCase() === selectedSection,
        ),
        'subsection',
      ),
    );
    subsections.unshift({ label: 'Select SubSection', value: '' });
    return subsections;
  }
}
