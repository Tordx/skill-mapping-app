import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../../styles'
import Applications from '../../contents/home/employer/notification'

type Props = {}

const EmployerNotification = (props: Props) => {
  return (
    <View style = {styles.container}>
      <View style = {styles.h1container}>
      <Text style = {[styles.h1, {marginTop: 75}]}>Notifications</Text>
      </View>
      <Applications/>
    </View>
  )
}

export default EmployerNotification