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

export default class CourseService {

  getClasses() {
    const classes = this.generateDropDownOptions(this.getDistinctValues(subSectionData, 'class'));
    classes.unshift({ label: 'Select Class', value: '' });
    return classes;
  }
  getSubjects(selectedClass: any) {
    const subjects = this.generateDropDownOptions(this.getDistinctValues(
        subSectionData.filter(data => data.class.toLowerCase() === selectedClass),
        'subject',
      ));
    subjects.unshift({ label: 'Select Subject', value: '' });
    return subjects;

  }
  getTypes() {
    const types = this.generateDropDownOptions(['Lectures', 'Questions']);
    types.unshift({ label: 'Lectures/Questions', value: '' });
    return types;
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
