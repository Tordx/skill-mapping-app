import React, { useState } from 'react'
import { useFocusEffect, useNavigation,  } from '@react-navigation/native'
import { styles } from '../../styles'
import {  JoinasButton, LogButton, TextButton } from '../../global/partials/buttons'
import { black, theme } from '../../assets/colors'
import {ImageBackground, Text, StatusBar, View, ToastAndroid, BackHandler} from 'react-native'
const background = require('../../assets/images/background.png')

type Props = {


}

const Joinas: React.FC<Props> = (props) => {

  const [usertype, setusertype] = useState('');
  const navigation = useNavigation();

  useFocusEffect(() => {
    
    const Back = () => {
        BackHandler.exitApp();
        return true
      };
      const handler = BackHandler.addEventListener('hardwareBackPress', Back);
      return () => handler.remove();
})



  const routechecking = () => {
    if(usertype === 'employer') {
      navigation.navigate('Employercreate' as never)
    } else if (usertype === 'freelance'){
      navigation.navigate('Usercreate' as never)
    } else {
      ToastAndroid.show('Please choose one', ToastAndroid.SHORT)
    }
  }

  return (
    <ImageBackground source={background} resizeMode ='cover' style = {styles.container}>
      <View style = {styles.h1container}>
        <Text style = {styles.h1}>Join as an employer or Freelance</Text>
      </View>
      <JoinasButton
        name = 'account-search-outline'
        onPress={() =>{ setusertype('employer')}}
        title = 'I want to hire'
        style = {{borderColor: usertype === 'employer'? theme.accentd : black.B005, backgroundColor: usertype === 'employer' ? theme.accentc : theme.light}}
        
        status= {usertype === 'employer' ? 'checked' : 'unchecked'}
        size = {25}
        uncheckcolor= {black.B005}
        radiocolor= {theme.accentd}
      />
      <JoinasButton
        title = 'I am a freelancer'
        name = 'account-search-outline'
        onPress={() =>{setusertype('freelance')}}
        size = {25}
        status= {usertype === 'freelance' ? 'checked' : 'unchecked'}
        style = {{borderColor: usertype === 'freelance' ? theme.accentd : black.B005, backgroundColor: usertype === 'freelance' ? theme.accentc : theme.light}}
        radiocolor= {theme.accentd}
      />
      <View style = {{marginTop: 150, width: '100%', justifyContent: 'center', alignItems: 'center',}}>
      <LogButton name = 'chevron-right' onPress={routechecking} title = 'Create Account'/>
      <TextButton onPress={() => navigation.navigate('Login' as never)} text1='Already have an account?' text2=' Sign In here.'/>
      </View>
    </ImageBackground>
  )
}

export default Joinas