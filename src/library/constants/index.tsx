export interface data {
    uid: string,
    firstname: string; 
    middlename: string; 
    lastname: string 
    suffix: string;
    dob: string;
    gender: string;
    nationality: string;
    jobTitle: string;
    highesteduc: string;
    ProfLi: string;
    Cert: string;
    CSE: string;
    SpeSkills: string;
    Province: string;
    City: string;
    Barangay: string;
    Street: string;
    contactnumber: string;
    email: string;
    emergencycontactname: string;
    readonlyelationship: string;
    emergencycontactnum: string;
    Address: string,
    address: [
      {Province: string,},
      {City: string,},
      {Barangay: string},
      {Street: string},
    ];
    username: string;
    fullname: string;
    website: string;
    type: string;
    usertype: string;
    _userdata: any;
    company: string,
    businesshours: string,
    description: string,
    photoURL: string,
  
  }

export interface jobdata {
    jobtitle: string;
    joblocation: string,
    requirements: any;
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