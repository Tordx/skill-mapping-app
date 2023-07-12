import { View, Text, Image,Button, ScrollView } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../styles'
import { Steps } from '../../global/functions'
import Freelance from '../contents/signup/freelance'

type Props = {}
const logo = require('../../assets/images/K6gggkO.png')

const UserCreate = (props: Props) => {

  const [position, setposition] = useState(0)

  return (
    <View style = {styles.container}>
      <ScrollView style = {styles.scrollview}>
        <View style = {[styles.container, {paddingVertical: 50}]}>
        <Image source={logo} resizeMode='contain' style = {{width: '50%', height: 200}}  />
          <Steps
            currentPosition={position}
          />
       
          <Freelance/>
          <Button title = 'press' onPress={() => setposition(position + 1)} />
        </View>
      </ScrollView>
    </View>
  )
}

export default UserCreate