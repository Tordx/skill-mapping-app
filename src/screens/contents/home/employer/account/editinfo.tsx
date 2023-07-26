import { View, Text, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../../../styles'
import { ScrollView } from 'react-native-gesture-handler'
import { DefaultField, Multitextfield } from '../../../../../global/partials/fields'
import { black, theme } from '../../../../../assets/colors'
import { useSelector } from 'react-redux'
import { data } from '../../../../../library/constants'
import { GoBack, LogButton } from '../../../../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { Loadingmodal } from '../../../../../global/partials/modals'
import { firebase } from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Props = {}

export const PersonalInfo = (props: Props) => {

    const {userdata} = useSelector((action: data) => action._userdata)
    const [fullname, setfullname] = useState(userdata[0].fullname);
    const [contactnumber, setcontactnumber] = useState(userdata[0].contactnumber);
    const [email, setemail] = useState(userdata[0].email);
    const [description, setdescription] = useState(userdata[0].description);
    const [province, setprovince] = useState(userdata[0].address[0]?.Province);
    const [city, setcity] = useState(userdata[0].address[0]?.City);
    const [barangay, setbarangay] = useState(userdata[0].address[0]?.Barangay);
    const [street, setstreet] = useState(userdata[0].address[0]?.Street);
    const [company, setcompany] = useState(userdata[0].company)
    const navigation = useNavigation()
    const [loading, setloading] = useState(false)
    
    const updatedata = async() => {
      setloading(true)
      try {
        await firestore().collection('user').doc(userdata[0].uid).update({
          fullname: fullname,
          contactnumber: contactnumber,
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
          description: description,
          company: company,
        }).then(() => {
          ToastAndroid.show('Succesfully updated business hours, re-login to see changes', ToastAndroid.BOTTOM)
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
             Personal Information
          </Text>
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Name</Text>
          <DefaultField
              placeholder="Full name"
              placeholderTextColor={black.B005}
              name="account-outline"
              size={25}
              color={black.B004}
              value = {fullname}
              onChangeText={(e) => setfullname(e)}
              
          />
        <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Contact Number</Text>
          <DefaultField
              placeholder="contact number*"
              placeholderTextColor={black.B005}
              name="phone-outline"
              size={25}
              color={black.B004}
              value = {contactnumber}
              onChangeText={(e) => setcontactnumber(e)}
              
          />
        <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Email</Text>
          <DefaultField
              placeholder="email"
              placeholderTextColor={black.B005}
              name="email-outline"
              size={25}
              color={black.B004}
              value = {email}
              onChangeText={(e) => setemail(e)}
              
          />
        <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Address</Text>
         <DefaultField
              placeholder="Province"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {province}
              onChangeText={(e) => setprovince(e)}
              
          />
          <DefaultField
              placeholder="City/Town"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {city}
              onChangeText={(e) => setcity(e)}

              
          />
            <DefaultField
              placeholder="Barangay"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {barangay}
              onChangeText={(e) => setbarangay(e)}
              
          />
          <DefaultField
              placeholder="Street"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {street}
              onChangeText={(e) => setstreet(e)}
              
          />
            <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Description</Text>
            <Multitextfield
            style={{height: 250}}
              placeholder="Enter your text here"
              placeholderTextColor={black.B005}
              name="calendar-outline"
              size={25}
              color={black.B004}
              value = {description}
              onChangeText={(e) => setdescription(e)}
              
          />
          <DefaultField
              placeholder="Company"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {company}
              onChangeText={(e) => setcompany(e)}
              
          />
          <View style={{ marginBottom: 50 }} />
          <LogButton title = 'Update' onPress={updatedata}/>
          <View style={{ marginBottom: 50 }} />
          <GoBack onPress={() => navigation.goBack()}/>
        </View>
      </ScrollView>
     <Loadingmodal title= 'Updating Details...' visible = {loading} onRequestClose={() => {}}/>
    </View>
  )
}

export const AdditionalInfo: React.FC <Props> = () => {
  
  const {userdata} = useSelector((action: data) => action._userdata)
  const [businesshours, setbusinesshours] = useState(userdata[0].businesshours)
  const [loading, setloading] = useState(false)
  const navigation = useNavigation()

  const updatedata = async() => {

    console.log(userdata[0].uid);
    setloading(true)
    try {
      await firestore().collection('user').doc(userdata[0].uid).update({
        businesshours: businesshours
      }).then(() =>{
        ToastAndroid.show('Succesfully updated business hours, re-login to see changes', ToastAndroid.BOTTOM)
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
             Additonal Information
          </Text>
      <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Business Hours</Text>
      <DefaultField
      placeholder="Business Hours"
      placeholderTextColor={black.B005}
      name="briefcase-outline"
      size={25}
      color={black.B004}
      value = {businesshours}
      onChangeText={(e) => setbusinesshours(e)}/>
      <View style={{ marginBottom: 50 }} />
          <LogButton title = 'Update' onPress={updatedata}/>
      <View style={{ marginBottom: 50 }} />
      <GoBack onPress={() => navigation.goBack()}/>
      <Loadingmodal title='Updating Business Hours' visible = {loading} onRequestClose={() => {}}/>
    </View>
  )

}

export const PasswordChange: React.FC <Props> = () => {
  
  const navigation = useNavigation()
  const user = firebase.auth().currentUser
  const [newpassword, setnewpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('')
  const [show, setshow] = useState(true);
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);

  const updatepassword = () => {
    if (newpassword !== confirmpassword) {
      ToastAndroid.show('Error New password and confirm password do not match.', ToastAndroid.BOTTOM);
      return;
    }
    const credential = firebase.auth.EmailAuthProvider.credential(user?.email || '', password);

    user?.reauthenticateWithCredential(credential)
      .then(() => {
        user.updatePassword(newpassword)
          .then(async() => {
            ToastAndroid.show('Success Password changed successfully.', ToastAndroid.BOTTOM);
            setpassword('');
            setnewpassword('');
            setconfirmpassword('');
            await firebase.auth().signOut().then(() =>{
                navigation.navigate('Login' as never)
                ToastAndroid.show('Please re-login your account', ToastAndroid.BOTTOM)
              })
              
              await AsyncStorage.clear()
          })
          .catch((error) => {
            console.error('Password change failed:', error);
            ToastAndroid.show('Error Failed to change the password.', ToastAndroid.BOTTOM);
          });
      })
      .catch((error) => {
        console.error('Password reauthentication failed:', error);
        ToastAndroid.show('Error Current password verification failed.', ToastAndroid.BOTTOM);
      });
  };
  
  return (
    <View style = {styles.container}>
      <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10, marginTop: 0}]}>
             Account Credentials
          </Text>
      <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Change password</Text>
      <DefaultField
      placeholder="Current Password"
      placeholderTextColor={black.B005}
      name="briefcase-outline"
      size={25}
      secureTextEntry = {true}
      color={black.B004}
      value = {password}
      onChangeText={(e) => setpassword(e)}/>
      
       <DefaultField
      placeholder="New Password"
      placeholderTextColor={black.B005}
      name="briefcase-outline"
      size={25}
      secureTextEntry = {true}
      color={black.B004}
      value = {newpassword}
      onChangeText={(e) => setnewpassword(e)}/>
       <DefaultField
      placeholder="Confirm New Password"
      placeholderTextColor={black.B005}
      name="briefcase-outline"
      size={25}
      secureTextEntry = {true}
      color={black.B004}
      value = {confirmpassword}
      onChangeText={(e) => setconfirmpassword(e)}/>
      <View style={{ marginBottom: 50 }} />
          <LogButton title = 'Update' onPress={updatepassword}/>
      <View style={{ marginBottom: 50 }} />
      <GoBack onPress={() => navigation.goBack()}/>
      <Loadingmodal title='Updating Password, Please wait...' visible = {loading} onRequestClose={() => {}}/>
    </View>
  )

}