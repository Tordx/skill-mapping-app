import { View, Text, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../../../styles'
import { ScrollView } from 'react-native-gesture-handler'
import { DefaultField, Multitextfield } from '../../../../../global/partials/fields'
import { black, theme } from '../../../../../assets/colors'
import { useDispatch, useSelector } from 'react-redux'
import { data } from '../../../../../library/constants'
import { GoBack, LogButton } from '../../../../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { Loadingmodal } from '../../../../../global/partials/modals'
import { firebase } from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getexistingdata } from '../../../../../firebase'
import { setuserdata } from '../../../../../library/redux/userslice'

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
    const [highesteduc, sethighesteduc] = useState(userdata[0].highesteduc);
    const [ProfLi, setProfLi] = useState(userdata[0].ProfLi);
    const [Cert, setCert] = useState(userdata[0].Cert);
    const [CSE, setCSE] = useState(userdata[0].CSE);
    const [SpeSkills, setSpeSkills] = useState(userdata[0].SpeSkills);
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [loading, setloading] = useState(false)
    
    const updatedata = async() => {
      setloading(true)
      try {
        await firestore().collection('user').doc(userdata[0].uid).update({

          highesteduc: highesteduc,
          ProfLi: ProfLi,
          Cert: Cert,
          CSE: CSE,
          SpeSkills: SpeSkills,
         
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
        <View style = {styles.container}>
        <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10, marginTop: '20%' }]}>
             Educational Information
          </Text>
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Name</Text>
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