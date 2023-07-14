import { View, Text,TextInput, ViewStyle, Pressable } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from '../../../styles'
import { black, theme, white } from '../../../assets/colors'
type Props = {

    onPress?: (e: any) => void,
    routePress?: (e: any) => void,
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
    secureTextEntry?: boolean,

}

export const DefaultField: React.FC<Props> = ({onChangeText, value , onFocus, name, size, color, editable, style, onBlur, placeholder, placeholderTextColor, secureTextEntry}) => {

    

  return (
    <View style = {[styles.inputcontainer,  style]}>
      <TextInput
        secureTextEntry = {secureTextEntry}
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

export const SearchField: React.FC<Props> = ({onPress}) => {

  const [focus, setfocus] = useState(false)

  return (
    <Pressable style = {[styles.inputcontainer, {backgroundColor: focus ? '#f8fbea' : theme.light}]}>
      <TextInput
        onBlur={() => {setfocus(false)}}
        onFocus={() => {setfocus(true)}}
        placeholder='Search...'
        placeholderTextColor={black.B005}
        style = {[styles.inputfield, {width: '85%', paddingLeft: 20}]}
      />
      <Pressable onPress = {onPress} style = {{borderTopRightRadius: 10, borderBottomRightRadius: 10,  backgroundColor: black.B004, height: '105%', justifyContent: 'center', alignItems: 'center', width: '16%'}}>
        <Icon size={25} name = 'text-box-search-outline' color={white.main}/>
      </Pressable>
    </Pressable>
  )

}

