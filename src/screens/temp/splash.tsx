import { View, Image, PermissionsAndroid, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '../../styles'
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebase } from '@react-native-firebase/auth';
import { ToastAndroid } from 'react-native';
import {useNavigation} from '@react-navigation/native'
import { getexistingdata } from '../../firebase';
import { useDispatch } from 'react-redux';
import { setuserdata } from '../../library/redux/userslice';
import { data } from '../../library/constants';
import DeviceInfo from 'react-native-device-info';

type Props = {}

const Splash = (props: Props) => {

    const logo = require('../../assets/images/PgOLyqd.png')
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {

        const unsubscribe = NetInfo.addEventListener(async (state) =>{
            try {
                      const granted = await requestPermission()
                      const androidVersion = await DeviceInfo.getApiLevel()
                      console.log(androidVersion)
                      if (granted || androidVersion > 31) {
                        // Permission granted, you can now access the storage.
                    
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
                    } else {
                        ToastAndroid.show('Please allow permission', ToastAndroid.BOTTOM)
                    }      
            } catch(error){
                ToastAndroid.show("Please check your internet connection", ToastAndroid.BOTTOM)
            }
        })

        return unsubscribe;

    },[])

    const requestPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Storage Permission',
              message:
                'Skills Mapping needs access to your storage ' +
                'so you can upload your resume.',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true
          } else {
            console.log(' permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      };
      

  return (
    <View style = {styles.container}>
      <Image source={logo} resizeMode='contain' style = {{width: '50%', height: 200}}  />
    </View>
  )
}

export default Splash