import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../../styles'
import PostList from '../../contents/home/employer/postlist'
import { SearchField } from '../../../global/partials/fields'
import { useNavigation } from '@react-navigation/native'
import { HoverButton } from '../../../global/partials/buttons'
import { black, theme, white } from '../../../assets/colors'


type Props = {}

const Employerhome = (props: Props) => {

  const [focus, setfocus] =  useState(0);
  const navigation = useNavigation()

  return (
    <View style = {styles.container}> 
      <SearchField onPress={() => navigation.navigate('Search' as never)}/>
      <View style = {{flexDirection: 'row', marginTop: 15,}}>
        <HoverButton
          onPress={() => setfocus(0)} 
          title = 'My Posted Jobs'
          textStyle={{backgroundColor: focus  == 0 ? theme.primary : theme.light, color: focus == 0 ? white.main : black.main }}
        />
        <HoverButton 
          onPress={() => setfocus(1)} 
          title = 'Archived'
          textStyle={{backgroundColor: focus  == 1 ? theme.primary : theme.light, color: focus == 1 ? white.main : black.main }}
        
        />
        
      </View>
      <PostList setfocus={setfocus} focus={focus}/>
    </View>
  )
}

export default Employerhome