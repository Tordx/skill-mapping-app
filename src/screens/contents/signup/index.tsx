import { View, Text, ToastAndroid, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DefaultField } from '../../../global/partials/fields'
import { styles } from '../../../styles'
import { black, success, theme } from '../../../assets/colors'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import { LogButton, TextButton } from '../../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'
import { Loadingmodal } from '../../../global/partials/modals'
import { idgen } from '../../../global/functions'
import { getexistingdata } from '../../../firebase'
import { Chip } from 'react-native-paper'
import FilePickerManager, { FilePickerResult } from 'react-native-file-picker'
import RNFS from 'react-native-fs'
import storage from '@react-native-firebase/storage';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import { Kalamansig, Lebak, Palimbang, municipality } from '../../../library/constants'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DatePicker from 'react-native-date-picker'
import { launchImageLibrary } from 'react-native-image-picker'
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
    const [skills, setskills] = useState<string[]>([])
    const [skillvalue, setskillvalue] = useState('')
    const [competencies, setcompetencies] = useState<string[]>([])
    const [compvalue, setcompvalue] = useState('')
    const [files, setfiles] = useState<string[]>([])
    const [filevalue, setfilevalue] = useState('');
    const [filearray, setfilearray] = useState<string[]>([])
    const [salary, setsalary] = useState('')
    const [Province, setProvince] = useState('Sultan Kudarat')
    const [City, setCity] = useState('')
    const [Barangay, setBarangay] = useState('')
    const [Street, setStreet] = useState('')
    const [ContactNumber, setContactNumber] = useState('')
    const [email, setemail] = useState('')
    const [username,setusername] = useState('')
    const [password,setpassword] = useState('')
    const [cpassword,setcpassword] = useState('')
    const [loading, setloading] = useState(false)
    const [municipalities, setmunicipalities] = useState(false)
    const [barangays, setbarangays] = useState(false)
    const [barangayList, setBarangayList] = useState<string[]>([])
    const [opendate, setopendate] = useState(false)
    const [transferred, setTransferred] = useState(0)
    const navigation = useNavigation();

    const handleSave = async () => {
      setloading(true)
      const checkusername = await getexistingdata('user', 'username', username)
      if(checkusername.length == 0){
        if (password == cpassword) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password).then(async () => {
          await firebase.auth().signInWithEmailAndPassword(email, password).then(async() => {
            const getid = firebase.auth().currentUser?.uid
            await firebase.auth().currentUser?.updateProfile({
              photoURL: 'https://i.imgur.com/AivI1mB.png',
              displayName: username,
            })
            console.log(getid);
            firestore().collection('user').doc(getid).set({
              uid: getid,
              username: username,
              fullname: [
                  {
                    firstname: firstname,
                  },
                  {
                     middlename: middlename,
                  },
                  {
                     lastname: lastname,
                  },
                  {
                    suffix: suffix,
                  },
              ],
              usertype: 'freelance',
              photoURL: 'https://i.imgur.com/AivI1mB.png',
              email: email,
              dob: dob,
              gender: gender,
              skills: skills,
              competencies: competencies,
              files: files,
              salary: salary,
              contactnumber: ContactNumber,
              address: [
                {
                  Province: Province,
                },
                 { 
                  City: City,
                },
                { 
                  Barangay: Barangay,
                },
                {
                  Street: Street,
                },
              
              ],
            });
          }).then(async() => {
            const user = firebase.auth().currentUser
            user?.sendEmailVerification().then(() => {
              setloading(false)
              navigation.navigate('Verification' as never)
            })
          });
        });
      } catch (error) {
        console.log(error);
        if(error == 'auth/email-already-in-use'){
          ToastAndroid.show('email address already exists', ToastAndroid.LONG)
           setloading(false)
        } else {
          ToastAndroid.show('Something went wrong or email already exists', ToastAndroid.LONG)
          setloading(false)
        }
        await firebase.auth().currentUser?.delete()
        setloading(false)
      }
      } else {
        ToastAndroid.show('please confirm your password', ToastAndroid.LONG)
        setloading(false)
      }
      } else {
        ToastAndroid.show('username already exists', ToastAndroid.LONG)
        setloading(false)
      }
    };

    const handleKeyPress = (e:any) => {

        setskills([...skills, skillvalue]);
        setskillvalue(''); 
    };
    const handleKeyPressComp = (e:any) => {

        console.log('weh pressed');
        setcompetencies([...competencies, compvalue]);
        setcompvalue(''); 
    };
    const handleKeyPressfiles = () => {
      try {
        launchImageLibrary({mediaType: 'photo'},(response: any) => {
        }).then(async (image: any) => {
          console.log(image)
          const uri = image.assets[0].uri
          const filename = image.assets[0].fileName
          setTransferred(0);
          const task = storage().ref(filename).putFile(uri)
          task.on('state_changed', snapshot => {
          setTransferred(
          Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
        )
      })
      return await task.then(async () => {
        const firebasedata = await storage().ref(filename).getDownloadURL()
        setfiles([...files, firebasedata])
      })
        });
      } catch (err) {
  
          console.error(err)
          throw err;
      }
    };

    const handleskillDelete = (index: number) => {
      const updatecomp = [...skills];
      updatecomp.splice(index, 1);
      setskills(updatecomp);
    };
    const handlecompDelete = (index: number) => {
      const updatecomp = [...competencies];
      updatecomp.splice(index, 1);
      setcompetencies(updatecomp);
    };
    const handlefileDelete = (index: number) => {
      const updatecomp = [...files];
      updatecomp.splice(index, 1);
      setfiles(updatecomp);
      setfilearray(updatecomp)
    };
    
  const submit = () => {

    if(position === 3) {
      if(!email && !username && !password && !cpassword) {
        ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
      } else {
        handleSave()
      }
    } if (position === 2){
      if(!Province && !City && !Barangay && !Street && !ContactNumber ) {
        ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
      } else {
      setposition(position + 1)
      }
    } if (position === 1) {
      if(!skills  && !competencies  && !salary){
        ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
      } else {
        setposition(position + 1)
      }
    } if(position === 0) {
      if(!firstname  && !middlename  && !lastname  && !dob  && !gender){
        ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
      } else {
        setposition(position + 1)
      }
    }
  }

  useEffect(() => {
    if(City == 'Kalamansig') {
      setBarangayList(Kalamansig)
    }
    if(City == 'Palimbang') {
      setBarangayList(Palimbang)
    }
    if(City == 'Lebak') {
      setBarangayList(Lebak)
    } else {
      return
    }

  },[City])

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
            editable = {false}
            onPress={() => setopendate(!opendate)}
          />
          <DefaultField
            placeholder="Sex*"
            placeholderTextColor={black.B005}
            name="account-circle-outline"
            size={25}
            color={black.B004}
            value = {gender}
            onChangeText={(value) => setgender(value)}
          />
          <View style={{ marginBottom: 50 }} />
          <DatePicker
            modal
            open = {opendate}
            date = {new Date()}
            mode = {'date'}
            onConfirm={(e) => {
              const formattedDate = e.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
              setdob(formattedDate);
              setopendate(false);
            }}
          
            onCancel={() => {
              setopendate(false)
            }}
          />
        </>
        }
      {position == 1 &&  <>
        <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
          Skills and Competencies
        </Text>
        <View style = {{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <DefaultField
          placeholder="Add skills"
          placeholderTextColor={black.B005}
          size={25}
          name = {skillvalue.length > 0 ? 'blank': 'hammer-wrench'}
          color={black.B004}
          value = {skillvalue}
          onChangeText={(e) => setskillvalue(e)}
          onSubmitEditing={handleKeyPress}
        />
        {skillvalue && <Pressable onPress={handleKeyPress} style = {{position: 'absolute', right: 25}}>
          <Icon name = 'plus-circle-outline' size={30} color={theme.accenta} />
        </Pressable>}
        </View>
        <Text style = {{textAlign: 'left', fontSize: 16, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 5, color: black.main}}>Skills Added</Text>
        {skills.length > 0 && <View style = {{flexDirection: 'row', marginVertical: 20, justifyContent: 'flex-start', width: '95%'}}>
          {skills?.map((requirement: any, index: any) => (
            <Chip 
              style = {{marginRight: 10, backgroundColor:  success.G008}} 
              textStyle = {{color: black.main}}
              onPress={() => handleskillDelete(index)}
            >{requirement}</Chip>
          ))}
          </View>}
          <View style = {{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center',}}>
          <DefaultField
            placeholder="Add Competencies"
            placeholderTextColor={black.B005}
            size={25}
            name = {compvalue.length > 0 ? 'blank': 'star-plus-outline'}
            color={black.B004}
            value = {compvalue}
            onChangeText={(value) => setcompvalue(value)}
          />
           {compvalue && <Pressable onPress={handleKeyPressComp} style = {{position: 'absolute', right: 25}}>
          <Icon name = 'plus-circle-outline' size={30} color={theme.accenta} />
        </Pressable>}
        </View>
        {competencies.length > 0 &&  <Text style = {{textAlign: 'left', fontSize: 16, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 5, color: black.main}}>Competencies Added</Text>}
        {competencies.length > 0 &&  <View style = {{flexDirection: 'row', marginVertical: 20}}>
                    {competencies?.map((requirement: any, index: any) => (
                      <Chip 
                        style = {{marginRight: 10, backgroundColor:  success.G008}} 
                        textStyle = {{color: black.main}}
                        onPress={() => handlecompDelete(index)}
                      >{requirement}</Chip>
                    ))}
          </View>}
          <Pressable style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}} onPress={() => handleKeyPressfiles()}>
          <Text style = {{textAlign: 'left', fontSize: 12, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 5, color: black.main}}>Proof of Competencies/Certification</Text>     
            <DefaultField
              placeholder="Selecf files"
              placeholderTextColor={black.B005}
              editable = {false}
              size={25}
              name = 'file-multiple-outline'
              color={black.B004}
              value = {filevalue}
              onChangeText={(value) => setfilevalue(value)}
            />
          </Pressable>     
          {<Text style = {{textAlign: 'left', fontSize: 16, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 5, color: black.main}}>Files added</Text>}
          
          {files.length > 0 &&  
            <View style = {{flexDirection: 'row', marginVertical: 20}}>
              {files?.map((requirement: any, index: any) => (
                <Chip 
                  style = {{marginRight: 10, backgroundColor:  success.G008}} 
                  textStyle = {{color: black.main}}
                  onPress={() => handlefileDelete(index)}
                >File {index + 1}</Chip>
              ))}
            </View>}
            <Text style = {{textAlign: 'left', fontSize: 12, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 5, color: black.main}}>Preferred Salary</Text>
        <DefaultField
          placeholder="Preferred Salary"
          placeholderTextColor={black.B005}
          name="cash"
          size={25}
          color={black.B004}
          value = {salary}
          onChangeText={(value) => setsalary(value)}
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
              name="chevron-right"
              size={25}
              color={black.B004}
              value = {Province}
              editable = {false}
              onChangeText={(value) => setProvince(value)} 
          />
         
          <DefaultField
              placeholder="City/Town*"
              placeholderTextColor={black.B005}
              name={municipalities ? "chevron-down" : 'chevron-right'}
              size={25}
              color={black.B004}
              value = {City}
              editable = {false}
              onPress={() => setmunicipalities(!municipalities)}
              onChangeText={(e) => setCity(e)}
          />
           {municipalities && 
            <View  style = {{width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 20}}>
              {municipality && municipality.map((name: string, index: number) => {
                
                const handleSelect = () => {
                  setCity(name)
                  setmunicipalities(false)
                  setBarangay('')
                }

                return (
                  <TouchableOpacity onPress={() => handleSelect()}>
                    <Text style = {{fontSize: 18, margin: 5, color: black.main}}>
                      {name}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          }
          <DefaultField
              placeholder="Barangay"
              placeholderTextColor={black.B005}
              name={barangays ? "chevron-down" : 'chevron-right'}
              size={25}
              color={black.B004}
              value = {Barangay}
              editable = {false}
              onPress={() => setbarangays(!barangays)}
              onChangeText={(value) => setBarangay(value)}
          />
          {barangays && 
            <View  style = {{width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start', margin: 20}}>
              {barangayList && barangayList.map((name: string, index: number) => {
                
                const handleSelect = () => {
                  setBarangay(name)
                  setbarangays(false)
                }

                return (
                  <TouchableOpacity onPress={() => handleSelect()}>
                    <Text style = {{fontSize: 18, margin: 5, color: black.main}}>
                      {name}
                    </Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          }
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
              keyboardType='phone-pad'
          />
       
          <View style={{ marginBottom: 50 }} />
          </>}
        {position == 3 && <>
          
           <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
              User Credentials
          </Text>
          <DefaultField
              placeholder="Email Address"
              placeholderTextColor={black.B005}
              name="email-outline"
              size={25}
              color={black.B004}
              value = {email}
              onChangeText={(value) => setemail(value)}
              keyboardType='email-address'
          />
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
              secureTextEntry = {true}
          />
           <DefaultField
              placeholder="Confirm Password"
              placeholderTextColor={black.B005}
              name="lock-check-outline"
              size={25}
              color={black.B004}
              value = {cpassword}
              onChangeText={(value) => setcpassword(value)}
              secureTextEntry = {true}
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
          <Loadingmodal title='Creating your account...' visible = {loading} onRequestClose={() => {}} />
          </>
          
      );
    }

  export const EmployerInfo: React.FC<Props> = ({position, setposition}) => {

    const navigation = useNavigation();
    const [fullname, setfullname] = useState('');
    const [contactnumber, setcontactnumber] =  useState('');
    const [email, setemail] = useState('');
    const [Province, setProvince] = useState('')
    const [City, setCity] = useState('');
    const [Barangay, setBarangay] = useState('');
    const [Street, setStreet] = useState('');
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [loading, setloading] = useState(false)

    const handleSave = async () => {
      const checkusername = await getexistingdata('user', 'username', username)
      if (checkusername.length == 0){ 
        if(password == cpassword){
          try {
            setloading(true)
            await firebase.auth().createUserWithEmailAndPassword(email, password).then(async () => {
              await firebase.auth().signInWithEmailAndPassword(email, password).then(async() => {
                await firebase.auth().currentUser?.updateProfile({
                  photoURL: 'https://i.imgur.com/AivI1mB.png',
                  displayName: username,
                })
                const getid = firebase.auth().currentUser?.uid
                await firestore().collection('user').doc(getid).set({
                  uid: getid,
                  fullname: fullname,
                  username: username,
                  photoURL: 'https://i.imgur.com/AivI1mB.png',
                  contactnumber: contactnumber,
                  businesshours: 'enter business hours',
                  usertype: 'employer',
                  email: email,
                  address: [
                    {
                      Province: Province,
                    },{ 
                      City: City,
                    },{ 
                      Barangay: Barangay,
                    },{
                      Street: Street,
                    },
                  ],
                });
              })
              const user = firebase.auth().currentUser
              await  user?.sendEmailVerification().then(() => {
                navigation.navigate('Verification' as never)
              })
            });
          } catch (error) {
            console.log(`error: ${error}`);
            ToastAndroid.show('Something went wrong or email already exists', ToastAndroid.LONG)
            setloading(false)
          }
        } else {
          ToastAndroid.show('Please confirm your password', ToastAndroid.LONG)
          setloading(false)
        }
      } else {
        ToastAndroid.show('username already exists', ToastAndroid.LONG)
        setloading(false)
      }
    };

    
  const submit = () => {
    if(position === 2) {
      handleSave()
    } else if(position == 1) {
      setposition(position + 1)
    } else if(position == 0) {
      if(!fullname && !contactnumber){
        ToastAndroid.show('Some fields are blank', ToastAndroid.LONG)
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
          placeholder="Name*"
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
          placeholder="Email Address*"
          placeholderTextColor={black.B005}
          name="email-outline"
          size={25}
          color={black.B004}
          
          value = {email}
          onChangeText={(value) => setemail(value)}
        />
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
        <Loadingmodal title='Creating your account...' visible = {loading} onRequestClose={() => {}} />
        </>
        
    );
  }

  