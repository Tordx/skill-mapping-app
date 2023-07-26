import { View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '../../styles'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { getSpecificData, getexistingdata } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setuserdata } from '../../library/redux/userslice';
import { data } from '../../library/constants';

type Props = {}

const Splash = (props: Props) => {

    const logo = require('../../assets/images/PgOLyqd.png')
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {

        const unsubscribe = NetInfo.addEventListener(async (state) =>{
            try {
                
                setTimeout(async() => {
                    if(state.isConnected) {
                        const authCredentials = await AsyncStorage.getItem('login')
                        if(authCredentials !== null){
                            const loginAuth = JSON.parse(authCredentials)
                            const email = loginAuth.email
                            const password = loginAuth.password
                            const type = loginAuth.type
                            await firebase.auth().signInWithEmailAndPassword(email, password)
                           
                            .then(async() => {
                                    const data: data[] = await getexistingdata('user', 'email', email)
                                    console.log(type);
                                    
                                    dispatch(setuserdata(data))
                                ToastAndroid.show("Auto-login success", ToastAndroid.BOTTOM)
                                if (data[0].usertype === 'freelance') {
                                    navigation.navigate('Tabs' as never)
                                } if(data[0].usertype === 'employer')  {
                                    navigation.navigate('EmployerTabs' as never)
                                }
                            })
                        } else {
                            navigation.navigate('Joinas' as never)
                        }
                    } else {
                        ToastAndroid.show("You are not connected to the internet", ToastAndroid.BOTTOM)
                        return
                    }
                }, 2000);       
            } catch(error){
                ToastAndroid.show("Please check your internet connection", ToastAndroid.BOTTOM)
            }
        })

        return unsubscribe;

    },[])

  return (
    <View style = {styles.container}>
      <Image source={logo} resizeMode='contain' style = {{width: '50%', height: 200}}  />
    </View>
  )
}

export default Splash