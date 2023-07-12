import { View, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../styles'
import { Steps } from '../../global/functions'
import { EmployerInfo } from '../contents/signup'
import { GoBack } from '../../global/partials/buttons'

type Props = {}
const logo = require('../../assets/images/K6gggkO.png')
const Employercreate = (props: Props) => {
    const [position, setposition] = useState(0);

    return (
      <View style = {styles.container}>
        <ScrollView style = {styles.scrollview}>
         <View style = {[styles.container, {paddingVertical: 75}]}>
         {position <= 0 ? <Image source={logo} resizeMode='contain' style = {{width: '50%', height: 200}}  /> : <GoBack onPress={() => setposition(position - 1)}/>}
            <Steps
              currentPosition={position}
              stepCount={3}
            />
            <EmployerInfo position={position} setposition={setposition} />
          </View>
        </ScrollView>
      </View>
    )
  }

export default Employercreate