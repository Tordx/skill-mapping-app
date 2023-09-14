import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../styles'
import { SearchField } from '../../../global/partials/fields'
import { useNavigation } from '@react-navigation/native'
import { HoverButton, SearchButton } from '../../../global/partials/buttons'
import { black, theme, white } from '../../../assets/colors'
import JobsLists from '../../contents/home/freelance/joblist'
import { HiredModal } from '../../../global/partials/modals'

type Props = {}

const Home = (props: Props) => {

  const [focus, setfocus] = useState(0)



  const navigation = useNavigation()
  return (
    <View style = {styles.container}>
      
      <View style = {{flexDirection: 'column', marginTop: 15, top: 20, position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
      <SearchButton onPress={() => navigation.navigate('Search' as never)}/>
      <View style = {{flexDirection: 'row', marginTop: 15,}}>
        <HoverButton
          onPress={() => setfocus(0)} 
          title = 'Matched Jobs'
          textStyle={{backgroundColor: focus  == 0 ? theme.primary : theme.light, color: focus == 0 ? white.main : black.main }}
        />
        <HoverButton 
          onPress={() => setfocus(1)} 
          title = 'All'
          textStyle={{backgroundColor: focus  == 1 ? theme.primary : theme.light, color: focus == 1 ? white.main : black.main }}
        
        />
        
      </View>
      </View>
      <View style = {{marginTop: 200, width: '100%'}}/>
      <JobsLists focus={focus} setfocus={setfocus}/>
      
    </View>
  )
}

export default Home