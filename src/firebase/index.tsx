import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Platform, ToastAndroid } from 'react-native';
import storage from '@react-native-firebase/storage';
import { data, jobdata } from '../library/constants';

export const loginauth = async(email: string, password: string, navigation: any)  => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        console.log('User account signed in!', userCredential.user);
        
        const user = firebase.auth().currentUser
        if(user?.emailVerified) {
            
            ToastAndroid.show('Login Success', ToastAndroid.BOTTOM);
            await AsyncStorage.setItem('login', JSON.stringify({email, password}))
            navigation.navigate('Tabs' as never)
            return userCredential.user

        } else {
            
            ToastAndroid.show('Email Verification is needed', ToastAndroid.BOTTOM);
          navigation.navigate('Verification' as never)
        }

      } catch (error) {
        console.error(error);
        throw error;
      }
    }

export const getloginauth = async (datapull: string, dataparameter: string, parameter: string): Promise<data[]> => {
    try {
        const collectionRef = firestore().collection(datapull);
        const querySnapshot = await collectionRef.where(dataparameter, '==', parameter).get();
    
        const data: data[] = [];
        querySnapshot.forEach((documentSnapshot) => {
        const docData = documentSnapshot.data() as data;
        data.push(docData);
        });
        return data;
    } catch (error) {
        console.log('Error retrieving data:', error);
        return [];
    }
    };
    
    export const getAllData = async (toretrieve: string): Promise<jobdata[]> => {
      try {
        const collectionRef = firestore().collection(toretrieve);
        const querySnapshot = await collectionRef.get();
    
        const data: jobdata[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          const docData = documentSnapshot.data() as jobdata;
          data.push(docData);
        });
        return data;
      } catch (error) {
        console.log('Error retrieving data:', error);
        throw error;
      }
    };

    export const getSpecificData = async (datapull: string, dataparameter: string, parameter: string,): Promise<jobdata[]> => {
      try {
        const collectionRef = firestore().collection(datapull);
        const querySnapshot = await collectionRef.where(dataparameter, '==', parameter).where('status', '==', true).get();
    
        const data: jobdata[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          const docData = documentSnapshot.data() as jobdata;
          data.push(docData);
        });
    
        return data;
      } catch (error) {
        console.log('Error retrieving data:', error);
        return [];
      }
    };