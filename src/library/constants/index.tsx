export interface data {
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
    ContactNumber: string;
    email: string;
    emergencycontactname: string;
    readonlyelationship: string;
    emergencycontactnum: string;
    address: string;
    username: string;
    fullname: string;
    contactNumber: string;
    website: string;
  
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