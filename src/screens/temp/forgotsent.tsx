import { View, Text, Image } from 'react-native'
import React from 'react'
import { LogButton } from '../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'
import { styles } from '../../styles'

type Props = {}

const logo = require('../../assets/images/ifvXt1X_d.png')

const Forgotsent = (props: Props) => {

    const navigation = useNavigation()
    const exit = async() => {

        await firebase.auth().signOut().then(() =>{
            
        })

    }

  return (
    <View style = {styles.container}>
      <Image source={logo} resizeMode='contain' style = {{width: '50%', height: 200}}  />
      <Text style = {[styles.h1, {alignSelf: 'center', textAlign: 'center',fontSize: 35, width: '100%'}]}>Check your email</Text>
      <Text style = {[styles.h4, {marginBottom: 200, width: '90%'}]}>Email Reset Link has been sent to your registered email address!</Text>
      <LogButton onPress={() => {navigation.navigate('Login' as never)}} title='Back to Login'/>
    </View>
  )
}

export default Forgotsent