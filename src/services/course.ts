import { ISubsection } from '../models/subsection';
import { generateDropDownOptions, getDistinctValues } from './common';
import { IDropDownOptions } from '../models/dropdown';

const subSectionData: ISubsection[] = require('../../assets/trans_subsection.json');

export default class CourseService {
  getClasses() {
    const classes: IDropDownOptions = generateDropDownOptions(getDistinctValues(subSectionData, 'class'));
    classes.unshift({ label: 'Select Class', value: '' });
    return classes;
  }
  getSubjects(selectedClass: any) {
    const subjects: IDropDownOptions = generateDropDownOptions(
      getDistinctValues(subSectionData.filter(data => data.class.toLowerCase() === selectedClass), 'subject'),
    );
    subjects.unshift({ label: 'Select Subject', value: '' });
    return subjects;
  }
  getTypes() {
    const types: IDropDownOptions = generateDropDownOptions(['Lectures', 'Questions']);
    types.unshift({ label: 'Lectures/Questions', value: '' });
    return types;
  }
}
