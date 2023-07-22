import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../../../../styles'
import { black } from '../../../../../assets/colors'
import { GoBack } from '../../../../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'

type Props = {}

const About = (props: Props) => {

    const navigation = useNavigation()

  return (
    <View style = {styles.container}>
        <Text style = {{textAlign: 'left',
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        color: black.main,
       }}>About the app</Text>
      <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 13, textAlign: 'center'}}>     Ut enim ad minima veniam, quis nostrum exercitationem ullavm corporis suscipit laboriosam, nisi ut alUt enim ad minima veniam, quis nostrum exercitationem ullavm corporis suscipit laboriosam, nisi ut al.

Ut enim ad minima veniam, quis nostrum exercitationem ullavm corporis suscipit laboriosam, nisi ut al.

Ut enim ad minima veniam, quis nostrum exercitationem ullavm corporis suscipit laboriosam, nisi ut alUt enim ad minima veniam, quis nostrum exercitationem ullavm corporis suscipit laboriosam, nisi ut al.
</Text>
    <GoBack onPress={() => navigation.goBack()} />
    </View>
  )
}

export default About