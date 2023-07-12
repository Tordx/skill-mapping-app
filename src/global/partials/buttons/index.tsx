import { View, Text, TextInput, ViewStyle, Pressable } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from '../../../styles'
import { RadioButton } from 'react-native-paper'
import { black, theme, white } from '../../../assets/colors'
type Props = {

    onChangeText?: (e: any) => void,
    value?: string,
    name?: string,
    password?: string,
    onPress?:  (e: any) => void,
    press?: (e: any) => void,
    size?: number,
    color?: string,
    editable?: boolean,
    placeholder?: string,
    placeholderColor?: string,
    style?: ViewStyle,
    title?: string,
    status?: string,
    uncheckcolor?: string,
    radiocolor?: string,
    text1?: string,
    text2?: string,

}

export const JoinasButton: React.FC<Props> = ({onChangeText, value , onPress, name, size, color, editable, placeholder, style, title, status, uncheckcolor, radiocolor,press}) => {
  return (
    <View style = {[styles.inputcontainer, style]}>
        
      {name && <Icon
        name = {name || 'blank'}
        size = {size}
        color = {color}
        style = {{marginLeft: 10}}
      />
      }
      <Pressable onPress={onPress} style = {styles.joinasfield}>
        <Text style = {styles.joinastext}>{title}</Text>
      </Pressable>
      <RadioButton
        value = {value || ''}
        onPress={press}
        color= {theme.accentd}
        status = {status}
        uncheckedColor= {black.B005}
      />
    </View>
  )
}

export const LogButton: React.FC<Props> = ({onPress, name, title}) => {
  
  return (
    <Pressable onPress={onPress}  style = {[styles.createaccount, {backgroundColor: '#6fe662'}]}>
      <Text style = {{fontSize: 25, fontFamily: 'Montserrat-SemiBold', color: white.main}}>{title}</Text>
      {name && <Icon name = {name || 'blank'} size={35} color={white.main} />}
    </Pressable>
  )

}
export const TextButton: React.FC<Props> = ({onPress, text1, text2,}) => {
  
  return (
    <Pressable onPress={onPress}  style = {[styles.createaccount]}>
      <Text style = {{fontSize: 15, fontFamily: 'Montserrat-Regular', color: black.main, textShadowColor: white.W004, textShadowRadius: .5,}}>{text1}<Text style = {{color: theme.primary}}>{text2}</Text></Text>
      
    </Pressable>
  )

}

export const GoBack: React.FC<Props> = ({onPress}) => {

  return (
    
    <Pressable onPress = {onPress} style = {{position: 'absolute', flexDirection: 'row', top: 25, left: 10, justifyContent: 'center', alignItems: 'center',}}  >
      <Icon
        name = 'chevron-left'
        size = {35}
        color = {black.main}
      />
      <Text style = {{fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 25}}>Back</Text>
    </Pressable>
  )
}