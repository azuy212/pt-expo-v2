interface ISubsection {
  id_subsection: number;
  id_file: string;
  class: string;
  course: string;
  subject: string;
  chapter: number;
  ch_tittle: string;
  section: string;
  subsection: string;
  file_name: string;
  lecture_video: string;
  keyword: string;
  flag: number;
  username: string;
  input_time: string;
  [key: string]: any;
}

const subSectionData: ISubsection[] = require('../../assets/trans_subsection.json');

export default class LectureService {

  getTitles(courseKey: string) {
    const titles = this.getDistinctValues(
        subSectionData.filter(data => data.course === courseKey),
        'ch_tittle',
    );
    return this.generateDropDownOptions(titles);
  }
  getSections(selectedTitle: any) {
    const sections = this.getDistinctValues(
        subSectionData.filter(data => data.ch_tittle.toLowerCase() === selectedTitle),
        'section',
      );
    return this.generateDropDownOptions(sections);
  }
  getSubsections(selectedSection: string) {
    const subsections = this.getDistinctValues(
        subSectionData.filter(data => data.section.toLowerCase() === selectedSection),
        'subsection',
      );
    return this.generateDropDownOptions(subsections);
  }

  getDistinctValues(data: ISubsection[], key: string) {
    return data.reduce((acc: string[], curr) => {
      if (!acc.includes(curr[key])) {
        acc.push(curr[key]);
      }
      return acc;
    },                 []);
  }

  generateDropDownOptions(list: string[]) {
    return list.map(i => ({ label: i, value: i.toLowerCase() }));
  }
}
