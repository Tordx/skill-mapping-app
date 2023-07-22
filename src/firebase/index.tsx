import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Platform, ToastAndroid } from 'react-native';
import storage from '@react-native-firebase/storage';
import { data, jobdata } from '../library/constants';

export const loginauth = async(email: string, password: string, navigation: any, usertype: string, credentials: string)  => {
    try {
        const userCredential = await auth().signInWithEmailAndPassword(email, password);
        console.log('User account signed in!', userCredential.user);
        const user = firebase.auth().currentUser
        if(user?.emailVerified) {
            ToastAndroid.show('Login Success', ToastAndroid.BOTTOM);
            await AsyncStorage.setItem('login', JSON.stringify({email, password, credentials}))
            navigation.navigate(usertype as never)
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

    export const getSpecificjobData = async (datapull: string, dataparameter: string, parameter: string,): Promise<jobdata[]> => {
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
    export const getActiveJobData = async (datapull: string, dataparameter: string, parameter: string,): Promise<jobdata[]> => {
      try {
        const collectionRef = firestore().collection(datapull);
        const querySnapshot = await collectionRef.where(dataparameter, '==', parameter).get();
    
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
    export const getInactiveJobData = async (datapull: string, dataparameter: string, parameter: string,): Promise<jobdata[]> => {
      try {
        const collectionRef = firestore().collection(datapull);
        const querySnapshot = await collectionRef.where(dataparameter, '==', parameter).get();
    
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


    export const getSpecificData = async (datapull: string, dataparameter: string, parameter: string,): Promise<data[]> => {
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

    export const edit = async(image: any, description: string) => {

      const user = firebase.auth().currentUser
      const time = firebase.firestore.FieldValue.serverTimestamp();
      const id = firebase.firestore().collection('users').id
      try {
        firestore()
        .collection('community-posts')
        .doc()
        .set({
          postid: id,
          photoURL: user?.photoURL,
          displayName: user?.displayName,
          image: image,
          description: description,
          comment: '0',
          likes: '0',
          shares: '0',
          time: time,
  
        })
        .then(() => {
          ToastAndroid.show('Created post successfully', ToastAndroid.BOTTOM)
        });
  
      } catch(error: any){
        throw error;
      }
  
    }
  
export const deletearchive = async(docid: string) => {
  try {
    await firestore()
      .collection('job-post')
      .doc(docid)
      .delete()

  } catch(error){
    throw error;
  }
  
}

export const uploadImage = async (imageUri: any, setTransferred: any) => {

  try {
    const uri = imageUri;
    console.log(imageUri);

    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri);
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    return await task.then(async () => {
      const firebasedata = await storage().ref(filename).getDownloadURL();
      return firebasedata;
    });
  } catch (error) {
    console.log('Error uploading image:', error);
    throw error;
  }
};