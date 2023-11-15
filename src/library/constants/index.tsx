export interface data {
  _userdata: any,
  username: string;
  fullname: [
    {firstname: string,},
    {middlename: string;},
    {lastname: string;},
    {suffix: string;},
  ]
  firstname: string;
  middlename: string;
  lastname: string;
  suffix: string;
  usertype: 'freelance' | 'employer';
  photoURL: string;
  email: string;
  dob: string; 
  gender: string;
  skills: string[];
  competencies: string[];
  files: string[];
  salary: string; 
  contactnumber: string;
  Province: string
  City: string;
  Barangay: string
  Street: string;
  uid: string; // Assuming 'getid' is a string
 
  }

export interface archiveData {
  archivedata: boolean,
  _archivedata: any,
}

export interface jobdata {
    jobtitle: string;
    joblocation: string,
    requirements: string[];
    competencies: string[];
    type: string;
    scope: string;
    budget: number;
    pertimeframe: string,
    description: string;
    jobid: string;
    qualification: string;
    photoURL: string,
    userid: string;
    fullname: string;
    timestamp: any,
    formattedTime: any,
    status: boolean,
    _jobdata: any,
    uid: string

}

export interface jobid {

  jobid: string,
  uid: string,
  saveid: string,
  jobtitle: string,
  joblocation: string,
  requirements: any;
  type: string;
  scope: string;
  budget: number;
  pertimeframe: string,
  description: string;
  qualification: string;
  photoURL: string,
  userid: string;
  fullname: string;
  timestamp: any,
  formattedTime: any,
  status: boolean,
  _jobdata: any,


}

export interface notificationdata {
  fullname: string,
  title: string,
  userid: string,
  timestamp: any,
  status: boolean,
  photoURL: string,
  postid: string,
  message: string,
  
}

export interface application{
  jobid: string,
  uid: string,
  applicationid: string,
  jobtitle: string,
  photoURL: string,
  jobphotoURL: string,
  fullname: string,
  email: string,
  contactnumber: string,
  timestamp: any,
  status: string,
  read: boolean,
  from: string,
  for: string,
  notiftitle: string,
  _applicationdata: any,
  when: string,
  time: string,
  where: string,
  forread: boolean,
  fromread: boolean,
  file: string,
  
}

export interface hirestatus {
  employment: boolean,
  timestamp: any,
  uid: string
}


export const municipality = [
 'Lebak',
 'Kalamansig',
 'Palimbang'
]

export const Lebak = [
  'Barurao',
  'Barurao II',
  'Basak',
  'Bolebak',
  'Bululawan',
  'Capilan',
  'Christiannuevo',
  'Datu Karon',
  'Kalamongog',
  'Keytodac',
  'Kinodalan',
  'New Calinog',
  'Nuling',
  'Pansud',
  'Pasandalan',
  'Poblacion I',
  'Poblacion III',
  'Poloy-poloy',
  'Purikay',
  'Ragandang',
  'Salaman',
  'Salangsang',
  'Taguisa',
  'Tibpuan',
  'Tran',
  'Villamonte',
]

export const Kalamansig = [
  'Bantogon',
  'Cadiz',
  'Datu Ito Andong',
  'Datu Wasay',
  'Dumangas Nuevo',
  'Hinalaan',
  'Limulan',
  'Nalilidan',
  'Obial',
  'Pag-asa (Sultan Gunting Mopak)',
  'Paril',
  'Poblacion',
  'Sabanal',
  'Sangay',
  'Santa Clara',
  'Santa Maria',
]

export const Palimbang = [
'Akol',
'Badiangon',
'Baliango',
'Baluan (Bulan)',
'Bambanen',
'Baranayan',
'Barongis',
'Batang-baglas',
'Butril',
'Colube (Tagadtal)',
'Datu Maguiales (Likuban)',
'Dumolol',
'Kabuling',
'Kalibuhan',
'Kanipaan (converged with Sinangkangan)',
'Kidayan',
'Kiponget',
'Kisek',
'Kraan',
'Kolong-kolong',
'Langali',
'Libua',
'Ligao',
'Lopoken (Lepolon)',
'Lumitan',
'Maganao',
'Maguid',
'Malatunol',
'Malisbong',
'Medol',
'Milbuk',
'Mina',
'Molon',
'Namat (Namat Masla & Namat Padido converged)',
'Napnapon',
'Poblacion',
'San Roque (Former Tibulos)',
'Tibuhol (East Badiangon)',
'Wal',
'Wasag',
]