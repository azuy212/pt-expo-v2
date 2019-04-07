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
