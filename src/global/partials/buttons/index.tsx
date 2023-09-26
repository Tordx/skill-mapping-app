import { View, Text, TextStyle, ViewStyle, Pressable, TextInput } from 'react-native'
import React, {useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { styles } from '../../../styles'
import { RadioButton } from 'react-native-paper'
import { black, theme, white } from '../../../assets/colors'
type Props = {

    onChangeText?: (e: any) => void,
    value?: string,
    name?: string,
    name2?: string,
    password?: string,
    onPress?:  (e: any) => void,
    press?: (e: any) => void,
    size?: number,
    size2?: number,
    color?: string,
    color2?: string,
    editable?: boolean,
    placeholder?: string,
    placeholderColor?: string,
    style?: ViewStyle,
    textStyle?: TextStyle,
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

export const AccountEditButton: React.FC<Props> = ({name2, size2, color2, onChangeText, value , onPress, name, size, color, editable, placeholder, style, title, status, uncheckcolor, radiocolor,press}) => {
  return (
    <View style = {[styles.inputcontainer, style]}>
        
      {name && <Icon
        name = {name || 'blank'}
        size = {size}
        color = {color}
        style = {{marginHorizontal: 10}}
      />
      }
      <Pressable onPress={onPress} style = {styles.joinasfield}>
        <Text style = {[styles.joinastext, {fontFamily: 'Montserrat-SemiBold'}]}>{title}</Text>
      </Pressable>
      {name2 && <Icon
        name = {name2 || 'blank'}
        size = {size2}
        color = {color2}
        
      />
      }
    </View>
  )
}


export const LogButton: React.FC<Props> = ({onPress, name, title, style, size, textStyle}) => {
  
  return (
    <Pressable onPress={onPress}  style = {[styles.createaccount, {backgroundColor: '#6fe662'}, style]}>
      <Text style = {[{fontSize: 25, fontFamily: 'Montserrat-SemiBold', color: white.main}, textStyle]}>{title}</Text>
      {name && <Icon name = {name || 'blank'} size={size || 35 } color={white.main} />}
    </Pressable>
  )

}
export const TextButton: React.FC<Props> = ({onPress, text1, text2}) => {
  
  return (
    <Pressable onPress={onPress}  style = {[styles.createaccount]}>
      <Text style = {{fontSize: 15, fontFamily: 'Montserrat-Regular', color: black.main, textShadowColor: white.W004, textShadowRadius: .5,}}>{text1}<Text style = {{color: theme.primary}}>{text2}</Text></Text>
      
    </Pressable>
  )

}

export const ForgotButton: React.FC<Props> = ({onPress, text1,}) => {
  
  return (
    <Pressable onPress={onPress}  style = {[styles.createaccount, {justifyContent: 'flex-end', height: 25}]}>
      <Text style = {{fontSize: 15, fontFamily: 'Montserrat-Regular', color: theme.primary, textShadowColor: white.W004, textShadowRadius: .5,}}>{text1}</Text>
      
    </Pressable>
  )

}

export const GoBack: React.FC<Props> = ({onPress, textStyle}) => {

  return (
    
    <Pressable onPress = {onPress} style = {{position: 'absolute', flexDirection: 'row', top: 25, left: 10, justifyContent: 'center', alignItems: 'center',}}  >
      <Icon
        name = 'chevron-left'
        size = {35}
        color = {black.main}
      />
      <Text style = {[{fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 25}, textStyle]}>Back</Text>
    </Pressable>
  )
}

export const HoverButton: React.FC<Props> = ({title, onPress, textStyle}) => {
  
  return (
    <Pressable onPress={onPress}>
      <Text style = {[styles.hoverbutton, textStyle]}>{title}</Text>
    </Pressable>
  )


}

export const NextButton: React.FC<Props> = ({onPress}) => {

  return (
    
    <Pressable onPress = {onPress} style = {{marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}  >
      <Text style = {{fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 20,}}>Next</Text>
      <Icon
        name = 'chevron-right'
        size = {25}
        color = {black.main}
      />
      
    </Pressable>
  )
}

export const PrevButton: React.FC<Props> = ({onPress}) => {

  return (
    
    <Pressable onPress = {onPress} style = {{marginTop: 20, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}  >
      <Icon
        name = 'chevron-left'
        size = {25}
        color = {black.main}
      />
      <Text style = {{fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 20,}}>Back</Text>
      
      
    </Pressable>
  )
}

export const SearchButton: React.FC<Props> = ({onPress}) => {

  const [focus, setfocus] = useState(false)

  return (
    <Pressable onPress = {onPress} style = {[styles.inputcontainer, {backgroundColor: focus ? '#f8fbea' : theme.light}]}>
      <TextInput
        onBlur={() => {setfocus(false)}}
        onFocus={onPress}
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

export const UploadFile: React.FC<Props> = ({onPress, name, size, textStyle, style, title}) => {
  return (
    <Pressable onPress={onPress}  style = {[styles.createaccount, {backgroundColor: '#0000000009', width: '40%'}, style]}>
      <Text style = {[{fontSize: 20, fontFamily: 'Montserrat-SemiBold', color: black.main}, textStyle]}>{title}</Text>
      {name && <Icon name = {name || 'blank'} size={size || 35 } color={white.main} />}
    </Pressable>
  )
}
