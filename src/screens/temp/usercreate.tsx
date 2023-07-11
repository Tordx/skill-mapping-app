import { View, Text, Image } from 'react-native'
import React from 'react'
import { styles } from '../../styles'

type Props = {}
const logo = require('../../assets/images/PgOLyqd.png')

const UserCreate = (props: Props) => {
  return (
    <View style = {styles.container}>
      <Image source={logo} resizeMode='contain' style = {{width: '50%', height: 200}}  />
    </View>
  )
}

export default UserCreate