import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../../styles'
import { Button } from 'react-native'
import { firebase } from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

type Props = {}

const Account = (props: Props) => {

  const navigation = useNavigation();

  const logout = async() => {
    await firebase.auth().signOut().then(() =>{
      AsyncStorage.removeItem('login')
      navigation.navigate('Joinas' as never)
    })
  }

  return (
    <View style = {styles.container}>
      <Text>Account</Text>
      <Button title='signout' onPress={logout}/>
    </View>
  )
}

export default Account