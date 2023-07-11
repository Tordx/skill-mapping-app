import { View, Text,TextInput, ViewStyle } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from '../../../styles'
type Props = {

    onPress?: (e: any) => void,
    onChangeText?: (e: any) => void,
    value?: string,
    name?: string,
    password?: string,
    onFocus?:  (e: any) => void,
    onBlur?: (e: any) => void,
    size?: number,
    color?: string,
    editable?: boolean,
    style?: ViewStyle,
    placeholder?: string,
    placeholderTextColor?: string,

}

export const DefautField: React.FC<Props> = ({onChangeText, value , onFocus, name, size, color, editable, style, onBlur, placeholder, placeholderTextColor}) => {

    

  return (
    <View style = {[styles.inputcontainer,  style]}>
      <TextInput
        editable = {editable}
        style = {styles.inputfield}
        onChangeText={onChangeText}
        value = {value}
        onBlur={onBlur}
        onFocus={onFocus}
        placeholder= {placeholder}
        placeholderTextColor={placeholderTextColor}
      />
      {name && <Icon
        name = {name || 'blank'}
        size = {size}
        color = {color}
      />
      }
    </View>
  )
}
