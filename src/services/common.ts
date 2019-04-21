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

export function getDistinctValues<T>(data: T[], key: string) {
  return data.reduce((acc: string[], curr: any) => {
    if (!acc.includes(curr[key])) {
      acc.push(curr[key]);
    }
    return acc;
  },                 []);
}

export function generateDropDownOptions(list: any[]): IDropDownOptions {
  return list.map(i => {
    if (typeof i === 'string') {
      return { label: i, value: i.toLowerCase() };
    }
    return { label: i.toString(), value: i.toString() };
  });
}

export function convertToTitleCase(text: string) {
  return text.replace(/(\w)(\w*)/g, (_, i, r) => {
    return i.toUpperCase() + (r != null ? r : '');
  });
}
