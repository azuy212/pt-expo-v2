export interface ISubsection {
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
