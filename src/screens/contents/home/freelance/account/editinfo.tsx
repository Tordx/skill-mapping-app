import { View, Text, ToastAndroid, Pressable, Linking, Platform } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../../../styles'
import { ScrollView } from 'react-native-gesture-handler'
import { DefaultField, Multitextfield } from '../../../../../global/partials/fields'
import { black, success, theme } from '../../../../../assets/colors'
import { useDispatch, useSelector } from 'react-redux'
import { data } from '../../../../../library/constants'
import { GoBack, LogButton } from '../../../../../global/partials/buttons'
import { useNavigation, useTheme } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { Loadingmodal } from '../../../../../global/partials/modals'
import { firebase } from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getexistingdata } from '../../../../../firebase'
import { setuserdata } from '../../../../../library/redux/userslice'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Chip } from 'react-native-paper'
import RNFS from 'react-native-fs'
import storage from '@react-native-firebase/storage';
import FilePickerManager, { FilePickerResult } from 'react-native-file-picker'
import DatePicker from 'react-native-date-picker'
import { launchImageLibrary } from 'react-native-image-picker'
type Props = {}

export const Editjobtitle = (props: Props) => {
  
        const {userdata} = useSelector((action: data) => action._userdata)
        const [jobtitle, setjobtitle] = useState(userdata[0].jobTitle)
        const [loading, setloading] = useState(false)
        const dispatch = useDispatch()
        const navigation = useNavigation()
      
        const updatedata = async() => {
      
          console.log(userdata[0].uid);
          setloading(true)
          try {
            await firestore().collection('user').doc(userdata[0].uid).update({
              jobTitle: jobtitle
            }).then(async() =>{
              ToastAndroid.show('Succesfully updated Employment Details, re-login to see changes', ToastAndroid.BOTTOM)
              const data: data[] = await getexistingdata('user', 'uid', userdata[0].uid)
              console.log('here');
              console.log(data);
              dispatch(setuserdata(data))
              navigation.goBack();
              setloading(false)
            })
            }catch(error){
              console.log(error);
              ToastAndroid.show('Something went wrong, please try again', ToastAndroid.BOTTOM)
              setloading(false)
              
          }
         
        }
       
        return (
          <View style = {styles.container}>
            <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10, marginTop: '20%' }]}>
                   Edit Employment Details
                </Text>
            <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Job title, Position, skills...</Text>
            <DefaultField
            placeholder="Employment Details"
            placeholderTextColor={black.B005}
            name="briefcase-outline"
            size={25}
            color={black.B004}
            value = {jobtitle}
            onChangeText={(e) => setjobtitle(e)}/>
            <View style={{ marginBottom: 50 }} />
                <LogButton title = 'Update' onPress={updatedata}/>
            <View style={{ marginBottom: 50 }} />
            <GoBack onPress={() => navigation.goBack()}/>
            <Loadingmodal title='Updating Employment details' visible = {loading} onRequestClose={() => {}}/>
          </View>
        )
      
      }


export const EditEducBackground: React.FC = () => {
 
    const {userdata} = useSelector((action: data) => action._userdata)
    const [skills, setskills] = useState<string[]>(userdata[0]?.skills || []);
    const [skillvalue, setskillvalue] = useState('');
    const [competencies, setcompetencies] = useState<string[]>(userdata[0]?.competencies|| []);
    const [compvalue, setcompvalue] = useState('');
    const [files, setfiles] = useState<string[]>(userdata[0]?.files || []);
    const [filearray, setfilearray] = useState<string[]>([]);
    const [filevalue, setfilevalue] = useState('')
    const [salary, setsalary] = useState('')
    const [transferred, setTransferred] = useState(0)
    
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [loading, setloading] = useState(false)

    const handleKeyPress = (e:any) => {

      console.log('weh pressed');
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

  const viewfile = (requirement: string) => {
    Linking.openURL(requirement)
  }
    
    const updatedata = async() => {
      setloading(true)
      try {
        await firestore().collection('user').doc(userdata[0].uid).update({

          skills: skills,
          competencies: competencies,
          files: files,
          salary: salary,
         
        }).then(async() => {
          ToastAndroid.show('Succesfully updated Educational Information, re-login to see changes', ToastAndroid.BOTTOM)
          const data: data[] = await getexistingdata('user', 'uid', userdata[0].uid)
           dispatch(setuserdata(data))
          navigation.goBack();
          setloading(false)
        })
      } catch (error) {
        ToastAndroid.show('Something went wrong, please try again', ToastAndroid.BOTTOM)
        setloading(false)
      }
     
    }

  return (
    <View style = {styles.container}>
      <ScrollView style = {styles.scrollview}>
        <View style = {[styles.container, {paddingTop: '20%'}]}>
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
        {skills?.length > 0 && <View style = {{flexDirection: 'row', marginVertical: 20, justifyContent: 'flex-start', width: '95%'}}>
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
        {competencies?.length > 0 &&  <Text style = {{textAlign: 'left', fontSize: 16, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 5, color: black.main}}>Competencies Added</Text>}
        {competencies?.length > 0 &&  <ScrollView horizontal style = {{flexDirection: 'row', marginVertical: 20, width: '100%'}}>
                    {competencies?.map((requirement: any, index: any) => (
                      <Chip 
                        style = {{marginRight: 10, backgroundColor:  success.G008}} 
                        textStyle = {{color: black.main}}
                        onPress={() => handlecompDelete(index)}
                      >{requirement}</Chip>
                    ))}
          </ScrollView>}
          <Pressable style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <Text style = {{textAlign: 'left', fontSize: 12, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 5, color: black.main}}>Proof of Competencies/Certification</Text>     
            <DefaultField
              placeholder="Selecf files"
              placeholderTextColor={black.B005}
              editable = {false}
              size={25}
              name = 'file-multiple-outline'
              color={black.B004}
              value = {filevalue}
              onPress={() => handleKeyPressfiles()}
              onChangeText={(value) => setfilevalue(value)}
            />
          </Pressable>     
          {files?.length > 0 &&<Text style = {{textAlign: 'left', fontSize: 16, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 5, color: black.main}}>Files added</Text>}
          
          {files?.length > 0 &&  
            <View style = {{flexDirection: 'row', marginVertical: 20}}>
              {files?.map((requirement: any, index: any) => (
                <Chip 
                  style = {{marginRight: 10, backgroundColor:  success.G008}} 
                  textStyle = {{color: black.main}}
                  onLongPress={() => handlefileDelete(index)}
                  onPress={() => viewfile(requirement)}
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
          <LogButton title = 'Update' onPress={updatedata}/>
          <View style={{ marginBottom: 50 }} />
          <GoBack onPress={() => navigation.goBack()}/>
        </View>
      </ScrollView>
     <Loadingmodal title = 'Updating Educational Attainment' visible = {loading} onRequestClose={() => {}}/>
    </View>
  )
}

export const EditPersonalInfoF:React.FC = () => {
 
  const {userdata} = useSelector((action: data) => action._userdata)
  const [firstname, setfirstname] = useState(userdata[0].fullname[0]?.firstname);
  const [middlename, setmiddlename] = useState(userdata[0].fullname[1]?.middlename);
  const [lastname, setlastname] = useState(userdata[0].fullname[2]?.lastname)
  const [suffix, setsuffix] = useState(userdata[0].fullname[3]?.suffix)
  const [dob, setdob] = useState(userdata[0].dob);
  const [nationality, setnationality] = useState(userdata[0].nationality)
  const [province, setprovince] = useState(userdata[0].address[0]?.Province);
  const [city, setcity] = useState(userdata[0].address[1]?.City);
  const [barangay, setbarangay] = useState(userdata[0].address[2]?.Barangay);
  const [street, setstreet] = useState(userdata[0].address[3]?.Street);
  const [gender, setgender] = useState(userdata[0].gender)
  const [opendate, setopendate] = useState(false);
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [loading, setloading] = useState(false)
  

  const updatedata = async() => {
    setloading(true)
    try {
      await firestore().collection('user').doc(userdata[0].uid).update({
        fullname: [
          {firstname: firstname},
          {middlename: middlename},
          {lastname: lastname},
          {suffix: suffix}
        ],
        dob: dob,
        gender: gender,
        nationality: nationality,
      }).then(async() => {
        ToastAndroid.show('Succesfully updated personal information, re-login to see changes', ToastAndroid.BOTTOM)
        const data: data[] = await getexistingdata('user', 'uid', userdata[0].uid)
           dispatch(setuserdata(data))
        navigation.goBack();
        setloading(false)
      })
    } catch (error) {
      ToastAndroid.show('Something went wrong, please try again', ToastAndroid.BOTTOM)
      setloading(false)
    }
   
  }

return (
  <View style = {styles.container}>
    <ScrollView style = {styles.scrollview}>
      <View style = {styles.container}>
      <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10, marginTop: '20%' }]}>
          Edit Personal Information
        </Text>
      <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Name</Text>
        <DefaultField
            placeholder="Full name"
            placeholderTextColor={black.B005}
            name="account-outline"
            size={25}
            color={black.B004}
            value = {firstname}
            onChangeText={(e) => setfirstname(e)}
            
        />
         <DefaultField
            placeholder="Middle name"
            placeholderTextColor={black.B005}
            name="account-outline"
            size={25}
            color={black.B004}
            value = {middlename}
            onChangeText={(e) => setmiddlename(e)}
            
        />
        <DefaultField
          placeholder="Last name"
          placeholderTextColor={black.B005}
          name="account-outline"
          size={25}
          color={black.B004}
          value = {lastname}
          onChangeText={(e) => setlastname(e)}
          
        />
        <DefaultField
            placeholder="Suffix"
            placeholderTextColor={black.B005}
            name="account-outline"
            size={25}
            color={black.B004}
            value = {suffix}
            onChangeText={(e) => setsuffix(e)}
            
        />
      <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Date of Birth</Text>
        <DefaultField
            placeholder="Date of Birth"
            placeholderTextColor={black.B005}
            name="calendar-outline"
            size={25}
            color={black.B004}
            value = {dob}
            onChangeText={(e) => setdob(e)}
            editable = {false}
            onPress={() => {setopendate(true)}}
        />
      <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Gender</Text>
          <DefaultField
              placeholder="Gender"
              placeholderTextColor={black.B005}
              name="account-outline"
              size={25}
              color={black.B004}
              value = {gender}
              onChangeText={(e) => setgender(e)} 
          />
      <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Nationality</Text>
          <DefaultField
              placeholder="Gender"
              placeholderTextColor={black.B005}
              name="flag-outline"
              size={25}
              color={black.B004}
              value = {nationality}
              onChangeText={(e) => setnationality(e)} 
          />
        <View style={{ marginBottom: 50 }} />
        <LogButton title = 'Update' onPress={updatedata}/>
        <View style={{ marginBottom: 50 }} />
        <GoBack onPress={() => navigation.goBack()}/>
      </View>
    </ScrollView>
   <Loadingmodal title='Updating Personal Information' visible = {loading} onRequestClose={() => {}}/>
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
  </View>
)
}

export const EditContactDetailsF: React.FC = () => {

  const {userdata} = useSelector((action: data) => action._userdata)
  const [loading, setloading] = useState(false);
  const [province, setprovince] = useState(userdata[0].address[0]?.Province);
  const [city, setcity] = useState(userdata[0].address[1]?.City);
  const [barangay, setbarangay] = useState(userdata[0].address[2]?.Barangay);
  const [street, setstreet] = useState(userdata[0].address[3]?.Street);
  const [contactnumber, setcontactnumber] = useState(userdata[0].contactnumber)
  const [email, setemail] = useState(userdata[0].email)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const updatedata = async() => {
    setloading(true)
    try {
      if (email !== userdata[0].email) {
        await firebase.auth().currentUser?.updateEmail(email)
      }
      await firestore().collection('user').doc(userdata[0].uid).update({
        address: [
          {
            Province: province,
          },
           { 
            City: city,
          },
          { 
            Barangay: barangay,
          },
          {
            Street: street,
          },
        ],
        contactnumber: contactnumber,
        email: email,
      }).then(async() => {
        ToastAndroid.show('Succesfully updated Contact Information, re-login to see changes', ToastAndroid.BOTTOM)
        const data: data[] = await getexistingdata('user', 'uid', userdata[0].uid)
        dispatch(setuserdata(data))
        navigation.goBack();
        setloading(false)
      })
    } catch (error) {
      ToastAndroid.show('Something went wrong, please try again', ToastAndroid.BOTTOM)
      setloading(false)
    }
   
  }

  return (
    <View style = {styles.container}>
    <ScrollView style = {styles.scrollview}>
      <View style = {styles.container}>
      <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10, marginTop: '20%' }]}>
          Edit Contact Information
        </Text>
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Province</Text>
            <DefaultField
                placeholder="Full name"
                placeholderTextColor={black.B005}
                name="account-outline"
                size={25}
                color={black.B004}
                value = {province}
                onChangeText={(e) => setprovince(e)}
            />
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>City/Town</Text>
            <DefaultField
                  placeholder="Full name"
                  placeholderTextColor={black.B005}
                  name="account-outline"
                  size={25}
                  color={black.B004}
                  value = {city}
                  onChangeText={(e) => setcity(e)}
              />
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Barangay</Text>
            <DefaultField
                placeholder="Full name"
                placeholderTextColor={black.B005}
                name="account-outline"
                size={25}
                color={black.B004}
                value = {barangay}
                onChangeText={(e) => setbarangay(e)}
                
            />
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Street</Text>
            <DefaultField
                placeholder="Full name"
                placeholderTextColor={black.B005}
                name="account-outline"
                size={25}
                color={black.B004}
                value = {street}
                onChangeText={(e) => setstreet(e)}
                
            />
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Contact Number</Text>
            <DefaultField
                placeholder="Full name"
                placeholderTextColor={black.B005}
                name="account-outline"
                size={25}
                color={black.B004}
                value = {contactnumber}
                onChangeText={(e) => setcontactnumber(e)}
                
            />
           <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Email</Text>
            <DefaultField
                placeholder="Full name"
                placeholderTextColor={black.B005}
                name="account-outline"
                size={25}
                color={black.B004}
                value = {email}
                onChangeText={(e) => setemail(e)}
                
            />
          <View style={{ marginBottom: 50 }} />
        <LogButton title = 'Update' onPress={updatedata}/>
        <View style={{ marginBottom: 50 }} />
        <GoBack onPress={() => navigation.goBack()}/>
        </View>
        </ScrollView>
        <Loadingmodal title='Updating Personal Information' visible = {loading} onRequestClose={() => {}}/>
        </View>
  )
}

export const EditEmergContactDetailsF: React.FC = () => {

  const {userdata} = useSelector((action: data) => action._userdata)
  const [loading, setloading] = useState(false);
  const [readonlyelationship, setreadonlyelationship] = useState(userdata[0].readonlyelationship)
  const [emergencycontactname, setemergencycontactname] = useState(userdata[0].emergencycontactname)
  const [emergencycontactnum, setemergencycontactnum] = useState(userdata[0].emergencycontactnum)
  const [Address, setAddress] = useState(userdata[0].Address)
  const dispatch = useDispatch()
  const [email, setemail] = useState(userdata[0].email)
  const navigation = useNavigation()

  const updatedata = async() => {
    setloading(true)
    try {
      if (email !== userdata[0].email) {
        await firebase.auth().currentUser?.updateEmail(email)
      }
      await firestore().collection('user').doc(userdata[0].uid).update({
        
        emergencycontactname: emergencycontactname,
        readonlyelationship: readonlyelationship,
        emergencycontactnum: emergencycontactnum,
        Address: Address,
      }).then(async() => {
        ToastAndroid.show('Succesfully updated Contact Information, re-login to see changes', ToastAndroid.BOTTOM)
        const data: data[] = await getexistingdata('user', 'uid', userdata[0].uid)
           dispatch(setuserdata(data))
        navigation.goBack();
        setloading(false)
      })
    } catch (error) {
      ToastAndroid.show('Something went wrong, please try again', ToastAndroid.BOTTOM)
      setloading(false)
    }
   
  }

  return (
    <View style = {styles.container}>
    <ScrollView style = {styles.scrollview}>
      <View style = {styles.container}>
      <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10, marginTop: '20%' }]}>
          Edit Contact Information
        </Text>
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Name of Person</Text>
            <DefaultField
                placeholder="Full name"
                placeholderTextColor={black.B005}
                name="account-outline"
                size={25}
                color={black.B004}
                value = {emergencycontactname}
                onChangeText={(e) => setemergencycontactname(e)}
            />
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Contact Number</Text>
            <DefaultField
                  placeholder="Full name"
                  placeholderTextColor={black.B005}
                  name="account-outline"
                  size={25}
                  color={black.B004}
                  value = {emergencycontactnum}
                  onChangeText={(e) => setemergencycontactnum(e)}
              />
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Relationship</Text>
            <DefaultField
                placeholder="Full name"
                placeholderTextColor={black.B005}
                name="account-outline"
                size={25}
                color={black.B004}
                value = {readonlyelationship}
                onChangeText={(e) => setreadonlyelationship(e)}
                
            />
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Address</Text>
            <DefaultField
                placeholder="Full name"
                placeholderTextColor={black.B005}
                name="account-outline"
                size={25}
                color={black.B004}
                value = {Address}
                onChangeText={(e) => setAddress(e)}
                
            />
          <View style={{ marginBottom: 50 }} />
        <LogButton title = 'Update' onPress={updatedata}/>
        <View style={{ marginBottom: 50 }} />
        <GoBack onPress={() => navigation.goBack()}/>
        </View>
        </ScrollView>
        <Loadingmodal title='Updating emergency contact' visible = {loading} onRequestClose={() => {}}/>
        </View>
  )
}