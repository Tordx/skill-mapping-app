import React from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { styles } from '../../styles'

const {ImageBackground, Text, StatusBar, View} = require('react-native')
const background = require('../../assets/images/background.png')
type Props = {}

const Joinas: React.FC = (props: Props) => {



  return (
    <ImageBackground source={background} resizeMode ='cover' style = {styles.container}>
      <Text>Joinas</Text>
      </ImageBackground>
  )
}

export default Joinas