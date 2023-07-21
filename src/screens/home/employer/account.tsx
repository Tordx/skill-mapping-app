import { View, Text, Button, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import { styles } from '../../../styles'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { black, theme } from '../../../assets/colors'
import { useSelector } from 'react-redux'
import { data } from '../../../library/constants'
import { AccountEditButton, LogButton } from '../../../global/partials/buttons'
type Props = {}

const Employeraccount = (props: Props) => {
 
  const navigation = useNavigation();
  const user = firebase.auth().currentUser
  const {userdata} =  useSelector((action: data) => action._userdata)
  const logout = async() => {
    await firebase.auth().signOut().then(() =>{
      AsyncStorage.removeItem('login')
      navigation.navigate('Joinas' as never)
    })
  }

 
  return (
    <View style = {styles.container}>
    <ScrollView style = {styles.scrollview}>
      <View style = {styles.container}>
        <Pressable onPress={() => navigation.navigate('AccountDetails' as never)} style = {{marginBottom: 20,flexDirection: 'row',backgroundColor: theme.light, elevation: 7, width: '95%', height: 100, marginTop: 50, borderRadius: 10, shadowColor: '#505050', justifyContent: 'flex-start', alignItems: 'center'}}>
          <View style = {{width: 60, height: 60, borderColor: theme.primary, borderWidth: 3, borderRadius: 500, justifyContent: 'center', alignItems: 'center', marginLeft: 25}}>
            <Image source={{uri: user?.photoURL || 'https://i.imgur.com/AivI1mB.png'}} resizeMode='cover' style = {{width: '90%', height: '90%', borderRadius: 500}}/>
          </View>
          <View style = {{marginLeft: 10, flexDirection: 'column'}}>
            <Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 15, color: black.main}}>
              {userdata[0].fullname}
            </Text>
            <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 12, marginTop: 1, color: black.main}}>
              {userdata[0].company}
            </Text>
          </View>
        </Pressable>
        <Text style = {{width: '100%', alignSelf: 'flex-start', fontFamily: 'Montserrat-Regular', marginLeft: 10, color: black.B001,  fontSize: 16, marginBottom: 10}}>Manage</Text>
        <AccountEditButton 
          name = 'account-circle-outline' 
          name2 = 'chevron-right'
          size2={30}
          title = 'Account Information' 
          color = {theme.primary} 
          size = {30} 
          onPress={() => navigation.navigate('PersonalInfo' as never)}
          
        />
        <AccountEditButton 
          name = 'account-outline' 
          name2 = 'chevron-right'
          size2={30}
          title = 'Additional Information' 
          color = {theme.primary} 
          size = {30} 
          onPress={() => navigation.navigate('AdditionalInfo' as never)}
        />
        <AccountEditButton 
          name = 'account-outline' 
          name2 = 'chevron-right'
          size2={30}
          title = 'Account Credentials' 
          color = {theme.primary} 
          onPress={() => navigation.navigate('PasswordChange' as never)}
          size = {30} 
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
    </View>
    </ScrollView>
  </View>
  )
}

export default Employeraccount