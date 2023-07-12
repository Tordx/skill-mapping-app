import { View, Text, Pressable, Image } from 'react-native'
import React, {useState} from 'react'
import {firebase} from '@react-native-firebase/auth';
import { styles } from '../../styles';
import { DefaultField } from '../../global/partials/fields';
import { black, theme } from '../../assets/colors';
import { LogButton, TextButton } from '../../global/partials/buttons';

type Props = {}

const Login: React.FC = (props: Props) => {

  const logo = require('../../assets/images/PgOLyqd.png')
  const [focus, setfocus] = useState('');
  const loginauth = async() => {
  const user =  await firebase.auth().signInWithEmailAndPassword('email@email.com', 'password')
    console.log(user);
    
  }



  return (
    <View style = {styles.container}>
      <Image source={logo} resizeMode='contain' style = {{width: '50%', height: 200}}  />
      <Text style = {[styles.h1, {fontSize: 35, textAlign: 'center'}]}>Welcome Back</Text>
      <Text style = {[styles.h4, {marginBottom: 75}]}>Sign in to access your account</Text>
      <DefaultField
        onFocus={() => setfocus('email')}
        onBlur = {() => setfocus('')}
        placeholder = 'Username'
        placeholderTextColor={black.B006}
          style = {{borderColor: focus === 'email' ? theme.accentd : black.B005, backgroundColor: focus === 'email' ? theme.accentc : theme.light}}
          name = 'account-outline'
          size={30}
      />
      <DefaultField
        onFocus={() => setfocus('password')}
        onBlur = {() => setfocus('')}
        placeholder = 'Password'
        placeholderTextColor={black.B006}
        style = {{borderColor: focus === 'password' ? theme.accentd : black.B005, backgroundColor: focus === 'password' ? theme.accentc : theme.light}}
        name = 'lock-outline'
        size={30}
        secureTextEntry
        
      />
      <View style = {{marginTop: 150, width: '100%', justifyContent: 'center', alignItems: 'center',}}>
      <LogButton
        title= 'Log In'
      />
      <TextButton text1="Don't have an account yet?" text2=' Register now!'/>
      </View>
    </View>
  )
}

export default Login