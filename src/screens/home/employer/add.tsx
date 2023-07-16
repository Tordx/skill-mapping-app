import { View, Text, KeyboardAvoidingViewComponent } from 'react-native'
import React,{useState, useEffect} from 'react'
import { styles } from '../../../styles'
import Createjobs from '../../contents/home/employer/createjobs'
import { black } from '../../../assets/colors'

type Props = {}

const Addjobs = (props: Props) => {

    const [position, setposition] = useState(1)
    const [title, settitle] = useState('');

    useEffect(() => {
    if (position == 1) {
      settitle('Headline')
    }
    if (position  == 2){
      settitle('Skills')
    }
    if (position  == 3){
      settitle('Type')
    }
    if (position  == 4){
      settitle('Scope')
    }
    if (position  == 5){
      settitle('Budget')
    }
    if (position  == 6){
      settitle('Description')
    }
    if (position  == 7){
      settitle('Qualification')
    }

    }, [position])

  return (
    <View style = {styles.container}>
      <View style = {[styles.h1container, {alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection:'row', width:'95%', marginBottom: 50}]}>
      <Text style = {{alignSelf: 'flex-start', fontFamily: 'Montserrat-Regular', fontSize: 16, color: black.main, marginRight: 5}}>{position}/7</Text>
      <Text style = {{alignSelf: 'flex-start', fontFamily: 'Montserrat-Bold', fontSize: 16, color: black.main}}>{title}</Text>
      
      </View>
        <Createjobs position={position} setposition={setposition} />
    </View>
  )
}

export default Addjobs