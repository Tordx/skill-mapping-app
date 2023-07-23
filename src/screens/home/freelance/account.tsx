import { View, Text, ToastAndroid, ScrollView, Image, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import { styles } from '../../../styles'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { black, theme } from '../../../assets/colors'
import { useSelector } from 'react-redux'
import { data } from '../../../library/constants'
import { AccountEditButton, LogButton } from '../../../global/partials/buttons'

const Account: React.FC = () => {

 
  const navigation = useNavigation();
  const user = firebase.auth().currentUser
  const {userdata} =  useSelector((action: data) => action._userdata)
  const [detailfullname, setdetailedfullname] = useState('');
  const fullname = userdata[0]?.fullname;
  const logout = async() => {
    await firebase.auth().signOut().then(() =>{
      AsyncStorage.removeItem('login')
      ToastAndroid.show("Sign out successfully", ToastAndroid.LONG)
      navigation.navigate('Joinas' as never)
    })
  }

  useEffect(() => {
    // Combine the data into a single string
    const combinedString = fullname
      .map((item: any) => {
        const key = Object.keys(item)[0];
        const value = item[key];
        return ` ${value}`;
      })
      .join(" ");

    // Save the combined string in the state
    setdetailedfullname(combinedString);
  }, []);

 
  return (
    <View style = {styles.container}>
    <ScrollView style = {styles.scrollview}>
      <View style = {styles.container}>
        <Pressable onPress={() => navigation.navigate('FPersonalInformation' as never)} style = {{marginBottom: 20,flexDirection: 'row',backgroundColor: theme.light, elevation: 7, width: '95%', height: 100, marginTop: 25, borderRadius: 10, shadowColor: '#505050', justifyContent: 'flex-start', alignItems: 'center'}}>
          <Pressable onPress={() => navigation.navigate('PhotoURLchange' as never)} style = {{width: 60, height: 60, borderColor: theme.primary, borderWidth: 3, borderRadius: 500, justifyContent: 'center', alignItems: 'center', marginLeft: 25}}>
            <Image source={{uri: user?.photoURL || 'https://i.imgur.com/AivI1mB.png'}} resizeMode='cover' style = {{width: '90%', height: '90%', borderRadius: 500}}/>
          </Pressable>
          <View style = {{marginLeft: 10, flexDirection: 'column'}}>
            <Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 15, color: black.main}}>
              {detailfullname}
            </Text>
            <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 12, marginTop: 1, color: black.main}}>
              {userdata[0].jobTitle}
            </Text>
          </View>
        </Pressable>
        <Text style = {{width: '100%', alignSelf: 'flex-start', fontFamily: 'Montserrat-Regular', marginLeft: 10, color: black.B001,  fontSize: 16, marginBottom: 10}}>Manage</Text>
        <AccountEditButton
          name = 'account-circle-outline' 
          name2 = 'chevron-right'
          size2={30}
          title = 'Personal Information' 
          color = {theme.primary} 
          size = {30} 
          onPress={() => navigation.navigate('EditPersonalInfoF' as never)}
          
        />
        <AccountEditButton 
          name = 'briefcase-outline' 
          name2 = 'chevron-right'
          size2={30}
          title = 'Employment Details' 
          color = {theme.primary} 
          size = {30} 
          onPress={() => navigation.navigate('Editjobtitle' as never)}
        />
        <AccountEditButton
          name = 'school-outline' 
          name2 = 'chevron-right'
          size2={30}
          title = 'Educational Background' 
          color = {theme.primary} 
          size = {30} 
          onPress={() => navigation.navigate('EditEducBackground' as never)}
          
        />
        <AccountEditButton 
          name = 'phone-outline' 
          name2 = 'chevron-right'
          size2={30}
          title = 'Personal Contact Info.' 
          color = {theme.primary} 
          onPress={() => navigation.navigate('EditContactDetailsF' as never)}
          size = {30} 
        />
        <AccountEditButton
          name = 'card-account-details-outline' 
          name2 = 'chevron-right'
          size2={30}
          title = 'Emergency Contact Info.' 
          color = {theme.primary} 
          size = {30} 
          onPress={() => navigation.navigate('EditEmergContactDetailsF' as never)}
          
        />
        <AccountEditButton
          name = 'account-circle-outline' 
          name2 = 'chevron-right'
          size2={30}
          title = 'User Credentials' 
          color = {theme.primary} 
          size = {30} 
          onPress={() => navigation.navigate('PasswordChange' as never)}
          
        />
        <AccountEditButton 
          name = 'information-outline' 
          name2 = 'chevron-right'
          size2={30}
          title = 'About App' 
          color = {theme.primary} 
          size = {30} 
          onPress={() => navigation.navigate('About' as never)}
        />

        <LogButton title='Log out' onPress={logout} style = {{backgroundColor: black.B004, marginTop: 25}} name='logout' size={25} textStyle={{marginRight: 10}}/>
    <View style = {{paddingBottom: 50}}/>
    </View>
    </ScrollView>
  </View>
  )
}
export default Account