import { View, Text, Pressable, ToastAndroid, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../../../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { black, theme, white } from '../../../../../assets/colors'
import { launchImageLibrary } from 'react-native-image-picker'
import { uploadImage } from '../../../../../firebase'
import { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { GoBack, LogButton } from '../../../../../global/partials/buttons'
import { useSelector } from 'react-redux'
import { data } from '../../../../../library/constants'
import { Loadingmodal } from '../../../../../global/partials/modals'
import { useNavigation } from '@react-navigation/native'
const PhotoURLchange: React.FC = () => {

  const [image, setimage] = useState('');
  const [transfer, setTransferred] = useState(0)
  const {userdata} = useSelector((action: data) => action._userdata)
  const [loading, setloading] = useState(false);
  const navigation = useNavigation()

  const getImage = async() => {
    launchImageLibrary({mediaType: 'photo', maxWidth: 400, maxHeight: 750, },(response: any) => {
    }).then(async (image: any) => {
      setimage(image.assets[0].uri);
    
    });
  }

  const uploadimage = async() => {
    setloading(true)
    const user = firebase.auth().currentUser
    if (image === ''){
      ToastAndroid.show('No uploaded images yet', ToastAndroid.LONG)
    } else {
      try {
        await uploadImage(image, setTransferred).then(async(image: any) => {
         
          await user?.updateProfile({
            photoURL: image
          }).then(async() => {
            console.log(userdata);
            
            await firestore().collection('user').doc(userdata[0].uid).update({
              photoURL: image
            })
          })
          ToastAndroid.show('Successfully upload image', ToastAndroid.LONG)
          setloading(false)
        })
      } catch(error) {
        console.log(error);
        setloading(false)
      }
    }
  }

  return (
    <View style = {styles.container}>
      {image ?
      <Pressable onPress = {() => getImage()} style = {{width: 250, height: 250, borderColor: theme.primary, borderWidth: 5, borderRadius: 500, justifyContent: 'center', alignItems: 'center', marginTop: 75, marginBottom: 25}}>
      <Image source={{uri: image }} resizeMode='cover' style = {{width: '90%', height: '90%', borderRadius: 500}}/>
      <Icon style = {{position: 'absolute'}} name ='image-edit' size = {100}  />
      </Pressable> :
       <Pressable onPress = {() => getImage()} style = {{marginBottom: 10, backgroundColor: white.W004,flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '95%', height: 150, borderStyle: 'dashed', borderWidth: 2, borderRadius: 20}}>
       <Icon name = 'cloud-upload-outline' size={40} color = {black.B005}/>
       <Text style = {{fontSize: 20, marginLeft: 20, fontFamily: 'Montserrat-Regular', color: black.B005}}>Upload a new profile photo</Text>
     </Pressable>
    }
     
      <LogButton title = 'update' onPress={() => uploadimage()}/>
      <Loadingmodal visible = {loading} onRequestClose={() => {}}/>
      <GoBack onPress={() => navigation.goBack()}/>
    </View>
  )
}

export default PhotoURLchange