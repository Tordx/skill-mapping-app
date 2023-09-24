import AsyncStorage from '@react-native-async-storage/async-storage';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from 'react';
import { Platform, ToastAndroid } from 'react-native';
import storage from '@react-native-firebase/storage';
import { application, data, hirestatus, jobdata, jobid } from '../library/constants';
import { idgen } from '../global/functions';

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

  export const getexistingdata = async (datapull: string, dataparameter: string, parameter: string): Promise<data[]> => {
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



  export const getspecificexistingdata = async (datapull: string, dataparameter: string, parameter: string, specificdataparam: string, specificdata: any): Promise<data[]> => {
    try {
        const collectionRef = firestore().collection(datapull);
        const querySnapshot = await collectionRef.where(dataparameter, '==', parameter).where(specificdataparam, '==', specificdata).get();
    
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
        const querySnapshot = await collectionRef.where('status', '==', true).get();
    
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

    export const gethireddata = async (id: string): Promise<hirestatus[]> => {
      try {
        const collectionRef = firestore().collection('hirestatus');
        const querySnapshot = await collectionRef.where('uid', '==', id).get();
    
        const data: hirestatus[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          const docData = documentSnapshot.data() as hirestatus;
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
    export const getsaves = async (datapull: string, dataparameter: string, parameter: string,): Promise<jobid[]> => {
      try {
        const collectionRef = firestore().collection(datapull);
        const querySnapshot = await collectionRef.where(dataparameter, '==', parameter).get();
    
        const data: jobid[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          const docData = documentSnapshot.data() as jobid;
          data.push(docData);
        });
    
        return data;
      } catch (error) {
        console.log('Error retrieving data:', error);
        return [];
      }
    };


    export const getNotificationData = async (datapull: string, dataparameter: string, parameter: string,): Promise<application[]> => {
      try {
        const collectionRef = firestore().collection(datapull);
        const querySnapshot = await collectionRef.where(dataparameter, '==', parameter).get();
    
        const data: application[] = [];
        querySnapshot.forEach((documentSnapshot) => {
          const docData = documentSnapshot.data() as application;
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

export const deletesaves = async(docid: string) => {
  try {
    await firestore()
      .collection('save-post')
      .doc(docid)
      .delete()

  } catch(error){
    throw error;
  }
  
}


export const uploadImage = async (imageUri: any, setTransferred: any) => {

  try {
    const uri = imageUri
    console.log(imageUri)

    const filename = uri.substring(uri.lastIndexOf('/') + 1)
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    setTransferred(0);
    const task = storage().ref(filename).putFile(uploadUri)
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      )
    })
    return await task.then(async () => {
      const firebasedata = await storage().ref(filename).getDownloadURL()
      return firebasedata;
    })
  } catch (error) {
    console.log('Error uploading image:', error)
    throw error
  }
}
  
export const submitapplication = async(file: string, user: data, job: jobdata, fullname: string, contactnumber: string, email: string, navigation: any) => {
  const id = idgen()
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  const retrieveddata: application[] = await getApplicationData('application', 'from', user.uid, 'jobid', job.jobid);
  console.log('here')
  console.log(retrieveddata)
  if (retrieveddata.length > 0) {
    ToastAndroid.show('Sorry, You have already applied to this job.', ToastAndroid.CENTER)
    return
  } else {
    try {
      await firestore().collection('application').doc(id).set({
            jobid: job.jobid,
            applicationid: id,
            for: job.userid,
            from: user.uid,
            jobtitle: job.jobtitle,
            photoURL: user.photoURL,
            jobphotoURL: job.photoURL,
            fullname: fullname,
            email: email,
            contactnumber: contactnumber,
            timestamp: timestamp,
            status: 'New Job Application',
            notiftitle: 'New Application',
            isaccepted: false,
            file: file,
      })
      ToastAndroid.show('Application submitted!', ToastAndroid.LONG)
      navigation.goBack()
    } catch(error){
      console.error(error)
    }
  }

}

export const acceptapplication = async(when: string, time: string, where: string, application: application, navigation: any) => {
  const id = idgen()
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  const retrieveddata = await getspecificexistingdata('application', 'applicationid', application.applicationid, 'isaccepted', true)
  if (retrieveddata.length > 0) {
    ToastAndroid.show('Sorry, You have already invited to the applicant.', ToastAndroid.CENTER)
    return
  } else {
    try {
      await firestore().collection('application').doc(id).set({
            jobid: application.jobid,
            applicationid: id,
            for: application.for,
            from: application.from,
            jobtitle: application.jobtitle,
            photoURL: application.photoURL,
            jobphotoURL: application.jobphotoURL,
            fullname: application.fullname,
            email: application.email,
            contactnumber: application.contactnumber,
            timestamp: timestamp,
            status: 'Inteview Invitation Accepted',
            notiftitle: 'Interview Accepted',
            when: when,
            time: time,
            where: where,
            isaccepted: false,
            fromread: true,
            forread: true,
      })
      ToastAndroid.show('Invitation sent!', ToastAndroid.LONG)
      navigation.goBack()
    } catch(error){
      console.error(error)
    }
  }
}

export const confirmapplication = async( application: application, navigation: any) => {
  const id = idgen()
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  const retrieveddata = await getspecificexistingdata('application', 'applicationid', application.applicationid, 'isaccepted', true)
  if (retrieveddata.length > 0) {
    ToastAndroid.show('Sorry, You have already invited to the applicant.', ToastAndroid.CENTER)
    return
  } else {
    try {
      await firestore().collection('application').doc(id).set({
            jobid: application.jobid,
            applicationid: id,
            for: application.for,
            from: application.from,
            jobtitle: application.jobtitle,
            photoURL: application.photoURL,
            jobphotoURL: application.jobphotoURL,
            fullname: application.fullname,
            email: application.email,
            contactnumber: application.contactnumber,
            timestamp: timestamp,
            status: 'Interview Invitation Confirmed',
            notiftitle: 'Interview Confirmation',
            when: application.when,
            time: application.time,
            where: application.where,
            isaccepted: false,
            fromread: true,
            forread: true,
      })
      ToastAndroid.show('Invitation sent!', ToastAndroid.LONG)
      navigation.goBack()
    } catch(error){
      console.error(error)
    }
  }
}

export const rejectapplication = async( application: application, navigation: any) => {
  const id = idgen()
  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  const retrieveddata = await getspecificexistingdata('application', 'applicationid', application.applicationid, 'isaccepted', true)
  if (retrieveddata.length > 0) {
    ToastAndroid.show('Sorry, You have already rejected the applicant.', ToastAndroid.CENTER)
    return
  } else {
    try {
      await firestore().collection('application').doc(id).set({
            jobid: application.jobid,
            applicationid: id,
            for: application.for,
            from: application.from,
            jobtitle: application.jobtitle,
            photoURL: application.photoURL,
            jobphotoURL: application.jobphotoURL,
            fullname: application.fullname,
            email: application.email,
            contactnumber: application.contactnumber,
            timestamp: timestamp,
            status: 'Application Rejected',
            notiftitle: 'Interview Declined',
            fromread: true,
            forread: true,
      })
      ToastAndroid.show('Invitation sent!', ToastAndroid.LONG)
      navigation.goBack()
    } catch(error){
      console.error(error)
    }
  }
}
export const getApplicationData = async (datapull: string, dataparameter: string, parameter: string, specificdataparam: string, specificdata: any): Promise<application[]> => {
  try {
      const collectionRef = firestore().collection(datapull);
      const querySnapshot = await collectionRef.where(dataparameter, '==', parameter).where(specificdataparam, '==', specificdata).get();
  
      const data: application[] = [];
      querySnapshot.forEach((documentSnapshot) => {
      const docData = documentSnapshot.data() as application;
      data.push(docData);
      });
      return data;
  } catch (error) {
      console.log('Error retrieving data:', error);
      return [];
  }
  };

export const createsave = async(item: jobdata, user: data, id: string, timestamp: any) => {
  try {
    await firestore().collection('save-post').doc(id).set({
      jobid: item.jobid,
      saveid: id,
      uid: user.uid,
      jobtitle: item.jobtitle,
      joblocation: item.joblocation,
      requirements: item.requirements,
      type: item.type,
      scope: item.scope,
      budget: item.budget,
      pertimeframe: item.pertimeframe,
      description: item.description,
      qualification: item.qualification,
      photoURL: item.photoURL,
      fullname: item.fullname,
      timestamp: timestamp,
    });
  } 
  catch(error){
    throw error;
  }
}