import { View, Text, Image,Button, ScrollView, ToastAndroid} from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../styles'
import { Steps } from '../../global/functions'
import { GoBack, LogButton, TextButton } from '../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import { PersonalInfo } from '../contents/signup'

type Props = {}
const logo = require('../../assets/images/K6gggkO.png')

const UserCreate = (props: Props) => {

  
  const [position, setposition] = useState(0);

  return (
    <View style = {styles.container}>
      <ScrollView style = {styles.scrollview}>
       <View style = {[styles.container, {paddingVertical: 75}]}>
       {position <= 0 ? <Image source={logo} resizeMode='contain' style = {{width: '50%', height: 200}}  /> : <GoBack onPress={() => setposition(position - 1)}/>}
          <Steps
            currentPosition={position}
            stepCount={4}
          />
          <PersonalInfo position={position} setposition={setposition} />
        </View>
      </ScrollView>
    </View>
  )
}

export default UserCreate