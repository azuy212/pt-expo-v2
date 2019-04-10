import { ISubsection } from '../models/subsection';
import { IDropDownOptions } from '../models/dropdown';

export function getClassSubjectKey(mClass: string, mSubject: string) {
  const subjectKeys: {[key: string]: string} = {
    physics: 'PH',
    chemistry: 'CH',
    cert: 'Cert1',
  };

  if (mClass !== 'certification') {
    return `${mClass}${subjectKeys[mSubject] || mSubject}`.toUpperCase();
  }
  return subjectKeys[mSubject] || mSubject.toUpperCase();

}

export function getDistinctValues(data: ISubsection[], key: string) {
  return data.reduce((acc: string[], curr) => {
    if (!acc.includes(curr[key])) {
      acc.push(curr[key]);
    }
    return acc;
  },                 []);
}

export function generateDropDownOptions(list: string[]): IDropDownOptions {
  return list.map(i => ({ label: i, value: i.toLowerCase() }));
}
