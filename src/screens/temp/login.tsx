import { View, Text, Pressable } from 'react-native'
import React from 'react'
import {firebase} from '@react-native-firebase/auth';

type Props = {}

const Login: React.FC = (props: Props) => {


  const loginauth = async() => {
  const user =  await firebase.auth().signInWithEmailAndPassword('email@email.com', 'password')
    console.log(user);
    
  }
  return (
    <View>
      <Pressable onPress={loginauth}>
        <Text>HELLO</Text>
      </Pressable>
    </View>
  )
}

export default Login