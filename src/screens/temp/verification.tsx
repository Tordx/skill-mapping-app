import { View, Text, Image } from 'react-native'
import React from 'react'
import { LogButton } from '../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '@react-native-firebase/auth'
import { styles } from '../../styles'

type Props = {}

const logo = require('../../assets/images/PzPA8zd.png')

const Verification = (props: Props) => {

    const navigation = useNavigation()
    const user = firebase.auth().currentUser
    const exit = async() => {

        await firebase.auth().signOut().then(() =>{
            navigation.navigate('Login' as never)
        })

    }

  return (
    <View style = {styles.container}>
      <Image source={logo} resizeMode='contain' style = {{width: '80%', height: 300,}}  />
      <Text style = {[styles.h4, {marginBottom: 200, width: '90%'}]}>Your account has been successfully created. Get started by verifying {user?.email} just click the email verification link we have sent!</Text>
      <LogButton onPress={exit} title='Back to Login'/>
    </View>
  )
}

export default Verification