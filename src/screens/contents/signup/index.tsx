import { View, Text, ToastAndroid } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DefaultField } from '../../../global/partials/fields'
import { styles } from '../../../styles'
import { black } from '../../../assets/colors'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import { LogButton, TextButton } from '../../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'

type Props = {
  position: number;
  setposition: (position: number) => void;
};

  export interface signupinfo {
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
    Province: string,
    City: string,
    Barangay: string,
    Street: string,
    ContactNumber: string,
    email: string,
    emergencycontactname: string,
    readonlyelationship: string,
    emergencycontactnum: string,
    address: string,
    username: string,
    password: string,
    cpassword: string,
  }

  export interface EmployerInfo {
    fullname: string,
    contactNumber: string,
    email: string,
    website: string,
    Province: string,
    City: string,
    Barangay: string,
    Street: string,
    username: string,
    password: string,
    cpassword: string,

  }
  
  
  
  export const PersonalInfo: React.FC<Props> = ({ position, setposition }) => {

    const [firstname, setfirstname] = useState('');
    const [middlename, setmiddlename] = useState('')
    const [lastname, setlastname] = useState('')
    const [suffix, setsuffix] = useState('')
    const [dob, setdob] = useState('')
    const [gender, setgender] = useState('')
    const [nationality, setnationality] = useState('')
    const [jobTitle, setjobTitle] = useState('')
    const [highesteduc, sethighesteduc] = useState('')
    const [ProfLi, setProfLi] = useState('')
    const [Cert, setCert] = useState('')
    const [CSE, setCSE] = useState('')
    const [SpeSkills, setSpeSkills] = useState('')
    const [Province, setProvince] = useState('')
    const [City, setCity] = useState('')
    const [Barangay, setBarangay] = useState('')
    const [Street, setStreet] = useState('')
    const [ContactNumber, setContactNumber] = useState('')
    const [email, setemail] = useState('')
    const [emergencycontactname,setemergencycontactname] = useState('')
    const [readonlyelationship,setreadonlyelationship] = useState('')
    const [emergencycontactnum,setemergencycontactnum] = useState('')
    const [address,setaddress] = useState('')
    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')
    const [cpassword,setcpassword] = useState('')

    const navigation = useNavigation();

    const handleSave = async () => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(async () => {
          await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            const user = firebase.auth().currentUser;
            const getid = firestore().collection('user').doc();
            console.log(user);
            firestore().collection('user').doc().set({
              uid: getid,
              fullname: [
                  {
                    firstname: firstname,
                    middlename: middlename,
                    lastname: lastname,
                    suffix: suffix,
                  }
              ],
              usertype: 'freelance',
              photoURL: 'https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png',
              email: email,
              dob: dob,
              gender: gender,
              nationality: nationality,
              jobTitle: jobTitle,
              highesteduc: highesteduc,
              ProfLi: ProfLi,
              Cert: Cert,
              CSE: CSE,
              SpeSkills: SpeSkills,
              emergencycontactname: emergencycontactname,
              emergencycontactnum: emergencycontactnum,
              address: address,
              readonlyelationship: readonlyelationship,
              Address: [
                {
                  Province: Province,
                  City: City,
                  Barangay: Barangay,
                  Street: Street,
                  ContactNumber: ContactNumber,
                },
              ],
            });
          }).then(async(response) => {
            const user = firebase.auth().currentUser
            user?.sendEmailVerification().then(() => {
              navigation.navigate('Verification' as never)
            })
          });
        });
      } catch (error) {
        console.log(`error: ${error}`);
      }
    };
  
    
  const submit = () => {
    if(position === 3) {
      if(!emergencycontactname && !emergencycontactnum && !address && readonlyelationship) {
        ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
      } else {
        handleSave()
      }
    } if (position === 2){
      if(!Province && !City && !Barangay && !Street && !ContactNumber && !email ) {
        ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
      } else {
      setposition(position + 1)
      }
    } if (position === 1) {
      if(!highesteduc  && !ProfLi  && !Cert  && !CSE  && !SpeSkills){
        ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
      } else {
        setposition(position + 1)
      }
    } if(position === 0) {
      if(!firstname  && !middlename  && !lastname  && !dob  && !gender && !nationality){
        ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
      } else {
        setposition(position + 1)
      }
    }
  }

      return (
        <>
       {position == 0 && <>
          <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
            Personal Information
          </Text>
          <DefaultField
            placeholder="Firstname*"
            placeholderTextColor={black.B005}
            name="account-circle-outline"
            size={25}
            color={black.B004}
            value = {firstname}
            onChangeText={(value) => setfirstname(value)}
          />
          <DefaultField
            placeholder="Middlename*"
            placeholderTextColor={black.B005}
            name="account-circle-outline"
            size={25}
            color={black.B004}
            value = {middlename}
            onChangeText={(value) => setmiddlename(value)}
          />
          <DefaultField
            placeholder="Lastname*"
            placeholderTextColor={black.B005}
            name="account-circle-outline"
            size={25}
            color={black.B004}
            
            value = {lastname}
            onChangeText={(value) => setlastname(value)}
          />
          <DefaultField
            placeholder="Suffix"
            placeholderTextColor={black.B005}
            name="account-circle-outline"
            size={25}
            value = {suffix}
            onChangeText={(value) => setsuffix(value)}
          />
          <DefaultField
            placeholder="Date of Birth*"
            placeholderTextColor={black.B005}
            name="calendar-month-outline"
            size={25}
            color={black.B004}
            value = {dob}
            onChangeText={(value) => setdob(value)}
          />
          <DefaultField
            placeholder="Gender*"
            placeholderTextColor={black.B005}
            name="account-circle-outline"
            size={25}
            color={black.B004}
            value = {gender}
            onChangeText={(value) => setgender(value)}
          />
          <DefaultField
            placeholder="Nationality*"
            placeholderTextColor={black.B005}
            name="flag-outline"
            size={25}
            color={black.B004}
            value = {nationality}
            onChangeText={(value) => setnationality(value)}
          />
          <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
            Employment Details
          </Text>
          <DefaultField
            placeholder="Job Title, Position, or Skills...*"
            placeholderTextColor={black.B005}
            name="briefcase-outline"
            size={25}
            color={black.B004}
            value = {jobTitle}
            onChangeText={(value) => setjobTitle(value)}
          />
          <View style={{ marginBottom: 50 }} />
        </>
        }
      {position == 1 &&  <>
        <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
          Educational Background
        </Text>
        <DefaultField
          placeholder="Highest Educational Attainment*"
          placeholderTextColor={black.B005}
          name="school-outline"
          size={25}
          color={black.B004}
          value = {highesteduc}
          onChangeText={(value) => sethighesteduc(value)}
        />
        <DefaultField
          placeholder="Professional Licenses*"
          placeholderTextColor={black.B005}
          name="medal-outline"
          size={25}
          color={black.B004}
          value = {ProfLi}
          onChangeText={(value) => setProfLi(value)}
        />
        <DefaultField
          placeholder="Certification/Training attended"
          placeholderTextColor={black.B005}
          name="certificate-outline"
          size={25}
          color={black.B004}
          value = {Cert}
          onChangeText={(value) => setCert(value)}
        />
        <DefaultField
          placeholder="Civil service eligibility"
          placeholderTextColor={black.B005}
          name="certificate-outline"
          size={25}
          color={black.B004}
          value = {CSE}
          onChangeText={(value) => setCSE(value)}
        />
        <DefaultField
          placeholder="Special Skills"
          placeholderTextColor={black.B005}
          name="star-outline"
          size={25}
          color={black.B004}
          value = {SpeSkills}
          onChangeText={(value) => setSpeSkills(value)}
        />
        <View style={{ marginBottom: 50 }} />
        </>}
        {position == 2 &&  <>
          <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
             Contact Information
          </Text>
          <DefaultField
              placeholder="Province*"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {Province}
              onChangeText={(value) => setProvince(value)} 
          />
          <DefaultField
              placeholder="City/Town*"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {City}
              onChangeText={(value) => setCity(value)}
          />
          <DefaultField
              placeholder="Barangay"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {Barangay}
              onChangeText={(value) => setBarangay(value)}
          />
          <DefaultField
              placeholder="Street"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {Street}
              onChangeText={(value) => setStreet(value)}
          />
          <DefaultField
              placeholder="Contact Number"
              placeholderTextColor={black.B005}
              name="phone-outline"
              size={25}
              color={black.B004}
              value = {ContactNumber}
              onChangeText={(value) => setContactNumber(value)}
          />
          <DefaultField
              placeholder="Email Address"
              placeholderTextColor={black.B005}
              name="email-outline"
              size={25}
              color={black.B004}
              value = {email}
              onChangeText={(value) => setemail(value)}
          />
          <View style={{ marginBottom: 50 }} />
          </>}
        {position == 3 && <>
          <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
              Emergency Contact
          </Text>
          <DefaultField
              placeholder="Emergency Contact*"
              placeholderTextColor={black.B005}
              name="account-circle-outline"
              size={25}
              color={black.B004}
              value = {emergencycontactname}
              onChangeText={(value) => setemergencycontactname(value)}
          />
          <DefaultField
              placeholder="Relationship*"
              placeholderTextColor={black.B005}
              name="account-circle-outline"
              size={25}
              color={black.B004}
              value = {readonlyelationship}
              onChangeText={(value) => setreadonlyelationship(value)}
          />
          <DefaultField
              placeholder="Contact Number"
              placeholderTextColor={black.B005}
              name="phone-outline"
              size={25}
              color={black.B004}
              value = {emergencycontactnum}
              onChangeText={(value) => setemergencycontactnum(value)}
          />
          <DefaultField
              placeholder="Address"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {address}
              onChangeText={(value) => setaddress(value)}
          />
           <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
              User Credentials
          </Text>
          <DefaultField
              placeholder="Username"
              placeholderTextColor={black.B005}
              name="account-outline"
              size={25}
              color={black.B004}
              value = {username}
              onChangeText={(value) => setusername(value)}
          />
          <DefaultField
              placeholder="Password"
              placeholderTextColor={black.B005}
              name="lock-outline"
              size={25}
              color={black.B004}
              value = {password}
              onChangeText={(value) => setpassword(value)}
          />
           <DefaultField
              placeholder="Confirm Password"
              placeholderTextColor={black.B005}
              name="lock-check-outline"
              size={25}
              color={black.B004}
              value = {cpassword}
              onChangeText={(value) => setcpassword(value)}
          />
          <View style={{ marginBottom: 50 }} />
          </>}
          <LogButton
            title='Next'
            name = 'chevron-right'
            onPress={submit}
          />
          <TextButton
            text1='Already a member?'
            text2=' Log In here'
            onPress={() => navigation.navigate('Login' as never)}
            
          />
          </>
          
      );
    }

  export const EmployerInfo: React.FC<Props> = ({position, setposition}) => {

    const navigation = useNavigation();
    const [fullname, setfullname] = useState('');
    const [contactnumber, setcontactnumber] =  useState('');
    const [email, setemail] = useState('');
    const [website, setwebsite] = useState('');
    const [Province, setProvince] = useState('')
    const [City, setCity] = useState('');
    const [Barangay, setBarangay] = useState('');
    const [Street, setStreet] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');

    const handleSave = async () => {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(async () => {
          await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            firestore().collection('user').doc().set({
              fullname: fullname,
              username: username,
              photoURL: 'https://www.pngkey.com/png/full/202-2024792_user-profile-icon-png-download-fa-user-circle.png',
              contactnumber: contactnumber,
              website: website,
              usertype: 'employer',
              email: email,
              Address: [
                {
                  Province: Province,
                  City: City,
                  Barangay: Barangay,
                  Street: Street,
                },
              ],
            });
          }).then(async(response) => {
            const user = firebase.auth().currentUser
            user?.sendEmailVerification().then(() => {
              navigation.navigate('Verification' as never)
            })
          });
        });
      } catch (error) {
        console.log(`error: ${error}`);
      }
    };

    
  const submit = () => {
    if(position === 2) {
      handleSave()
    } else {
      setposition(position + 1)
      
    }
  }
    return (
      <>
     {position == 0 && <>
        <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
          Personal Information
        </Text>
        <DefaultField
          placeholder="fullname*"
          placeholderTextColor={black.B005}
          name="account-circle-outline"
          size={25}
          color={black.B004}
          value = {fullname}
          onChangeText={(value) => setfullname(value)}
        />
        <DefaultField
          placeholder="Contact Number*"
          placeholderTextColor={black.B005}
          name="phone-outline"
          size={25}
          color={black.B004}
          value = {contactnumber}
          onChangeText={(value) => setcontactnumber(value)}
        />
        <DefaultField
          placeholder="Email Address*"
          placeholderTextColor={black.B005}
          name="email-outline"
          size={25}
          color={black.B004}
          
          value = {email}
          onChangeText={(value) => setemail(value)}
        />
        <DefaultField
          placeholder="Website URL (optional)"
          placeholderTextColor={black.B005}
          name="web"
          size={25}
          value = {website}
          onChangeText={(value) => setwebsite(value)}
        />

        <View style={{ marginBottom: 50 }} />
      </>
      }
   
      {position == 1 &&  <>
        <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
             Contact Information
          </Text>
          <DefaultField
              placeholder="Province*"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {Province}
              onChangeText={(value) => setProvince(value)} 
          />
          <DefaultField
              placeholder="City/Town*"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {City}
              onChangeText={(value) => setCity(value)}
          />
          <DefaultField
              placeholder="Barangay"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {Barangay}
              onChangeText={(value) => setBarangay(value)}
          />
          <DefaultField
              placeholder="Street"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {Street}
              onChangeText={(value) => setStreet(value)}
          />
          <View style={{ marginBottom: 50 }} />
          </>
      }
      {position == 2 && <>
         <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
            User Credentials
        </Text>
        <DefaultField
            placeholder="Username"
            placeholderTextColor={black.B005}
            name="account-outline"
            size={25}
            color={black.B004}
            value = {username}
            onChangeText={(value) => setusername(value)}
        />
        <DefaultField
            placeholder="Password"
            placeholderTextColor={black.B005}
            name="lock-outline"
            size={25}
            color={black.B004}
            value = {password}
            onChangeText={(value) => setpassword(value)}
        />
         <DefaultField
            placeholder="Confirm Password"
            placeholderTextColor={black.B005}
            name="lock-check-outline"
            size={25}
            color={black.B004}
            value = {cpassword}
            onChangeText={(value) => setcpassword(value)}
        />
        <View style={{ marginBottom: 50 }} />
        </>}
        <LogButton
          title='Next'
          name = 'chevron-right'
          onPress={submit}
        />
        <TextButton
          text1='Already a member?'
          text2=' Log In here'
          onPress={() => navigation.navigate('Login' as never)}
          
        />
        </>
        
    );
  }

  