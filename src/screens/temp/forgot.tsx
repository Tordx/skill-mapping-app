import { View, Text, Image, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { GoBack, LogButton } from '../../global/partials/buttons'
import { styles } from '../../styles'
import { DefaultField } from '../../global/partials/fields'
import { black } from '../../assets/colors'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'

type Props = {}

const logo = require('../../assets/images/ifvXt1X_d.png')

const Forgot = (props: Props) => {

    const [email, setemail] = useState('');
    const navigation = useNavigation();


    const resetpassword = async() => {
        try {
        if (email) {
        await firebase.auth().sendPasswordResetEmail(email).then((response: any) => {
            ToastAndroid.show('Password reset link sent', ToastAndroid.LONG)
            navigation.navigate('Forgotsent' as never)
        })
        } else {
            ToastAndroid.show('Field is empty', ToastAndroid.LONG)
        }
        } catch (error: any){
          if (error.code === 'auth/user-not-found') {
            ToastAndroid.show('Email does not exist', ToastAndroid.LONG)
          }
        }
      }
  return (
    <View style = {styles.container}>
   <Image source={logo} resizeMode='contain' style = {{width: '50%', height: 200}}  />
    <Text style = {[styles.h1, {alignSelf: 'center', textAlign: 'center',fontSize: 35, width: '100%'}]}>Forgot Password</Text>
    <Text style = {[styles.h4, {marginBottom: 75}]}>Enter your email to reset password</Text>
    <DefaultField 
        name = 'email-outline' 
        size={30}
        color={black.B005}
        placeholder='Email Address'
        placeholderTextColor={black.B005}
        value = {email}
        onChangeText={(value) => setemail(value)}
    />
    <View style= {{marginVertical: 50}}/>
    <LogButton onPress={resetpassword} title='Reset Password'/>
    <GoBack onPress={() => navigation.goBack()} />
  </View>
  )
}

export default Forgot