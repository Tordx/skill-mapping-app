import { View, Text, Pressable, Image, ToastAndroid } from 'react-native'
import React, {useEffect, useState} from 'react'
import {firebase} from '@react-native-firebase/auth';
import { styles } from '../../styles';
import { DefaultField } from '../../global/partials/fields';
import { black, theme } from '../../assets/colors';
import { ForgotButton, LogButton, TextButton } from '../../global/partials/buttons';
import { useNavigation } from '@react-navigation/native';
import { getexistingdata, loginauth } from '../../firebase';
import { data } from '../../library/constants';
import { useDispatch, useSelector } from 'react-redux';
import { setuserdata } from '../../library/redux/userslice';
import { Loadingmodal } from '../../global/partials/modals';

type Props = {}

interface getdata {

  _userdata: data

}

const Login: React.FC = (props: Props) => {

  const logo = require('../../assets/images/PgOLyqd.png')
  const [focus, setfocus] = useState('');

    const dispatch = useDispatch();
    const [email, setemail] = useState('');
    const [show, setshow] = useState(true);
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [title, settitle] = useState('');
    const [alert, setalert] = useState(false)
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState<data[]>([]);
    const navigation = useNavigation();
    const [type, settype] = useState('')

  useEffect(() => {
    const checkemail = async () => {
    const retrievedData: data[] = await getexistingdata('user', 'username', username);
    settype(retrievedData[0]?.usertype)
    setdata(retrievedData)
    if (retrievedData.length > 0) {
      const firstDataItem = retrievedData[0];
      setemail(firstDataItem.email);
      
      console.log(email, password);

      await new Promise((resolve: any) => {
        if (email.length > 0) {
          resolve();
        } else {
          const emailChangeListener = setInterval(() => {
            if (email.length > 0) {
              clearInterval(emailChangeListener);
              console.log(email, password);
              resolve();
            }
          }, 100);
        }
      });
    }
  }
  console.log(email);
  checkemail()
},[password])

const signIn = async () => {
    try { 
      setloading(true);
  
      if (!username) {
        ToastAndroid.show('There is an empty field!', ToastAndroid.BOTTOM);
        setloading(false);
      } else if (!email) {
          ToastAndroid.show('User does not exist', ToastAndroid.BOTTOM);
          setloading(false);
      } else {
          try {
            if(type === 'freelance') {
               
              await loginauth(email, password, navigation, 'Tabs', type);
              setloading(false);
              setemail('')
              setpassword('')
              setusername('')
              
            }
             if (type === 'employer'){
              
              await loginauth(email, password, navigation, 'EmployerTabs', type)
              setloading(false);
              setemail('')
              setpassword('')
              setusername('')
            }
            dispatch(setuserdata(data))
          } catch (error: any) {
            if (error.code === 'auth/invalid-email') {
              console.log('That username is invalid!');
              settitle('Username not found');
              setalert(true);
            } else if (error.code === 'auth/wrong-password') {
              ToastAndroid.show('Username and password did not match', ToastAndroid.BOTTOM);
            } else {
              console.error(error);
              ToastAndroid.show('Something went wrong, please try again', ToastAndroid.BOTTOM);
            }
            setloading(false);
          }
        }
    } catch(error) {
    console.log(error)
    setloading(false);
  }
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
        value = {username}
        onChangeText = {(e) => setusername(e)}
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
        onChangeText = {(e) => setpassword(e)}
        value = {password}
        
      />
      <ForgotButton text1='Forgot Password?' onPress={() => navigation.navigate('Forgot' as never)}/>
      <View style = {{marginTop: 150, width: '100%', justifyContent: 'center', alignItems: 'center',}}>
      <LogButton
        title= 'Log In'
        onPress={signIn}
      />
      <TextButton text1="Don't have an account yet?" text2=' Register now!' onPress={() => navigation.navigate('Joinas' as never)}/>
      </View>
      <Loadingmodal title='Signing in, Please wait...' visible = {loading} onRequestClose={() => {}}/>
    </View>
  )
}

export default Login