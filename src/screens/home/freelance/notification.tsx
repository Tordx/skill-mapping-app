import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../../styles'

type Props = {}

const Notification = (props: Props) => {
  return (
    <View style = {styles.container}>
      <Text>Notification</Text>
    </View>
  )
}

export default Notification