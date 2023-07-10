import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { useFocusEffect } from '@react-navigation/native'

type Props = {}

const Joinas = (props: Props) => {

    useFocusEffect(() => {
        StatusBar.setBackgroundColor('#e7e3e0')
    })
  return (
    <View>
      <Text>Joinas</Text>
    </View>
  )
}

export default Joinas