import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../../styles'
import Applicationstatus from '../../contents/home/freelance/notification'

type Props = {}

const Notification = (props: Props) => {
  return (
    <View style = {styles.container}>
      <View style = {styles.h1container}>
      <Text style = {[styles.h1, {marginTop: 75}]}>Notifications</Text>
      </View>
      <Applicationstatus/>
    </View>
  )
}

export default Notification