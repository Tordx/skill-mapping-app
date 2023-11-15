import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../../styles'
import { SearchField } from '../../../global/partials/fields'
import { useNavigation } from '@react-navigation/native'
import { HoverButton } from '../../../global/partials/buttons'
import { black, theme, white } from '../../../assets/colors'
import PostList from '../../contents/home/employer/posts/postlist'
import { useDispatch } from 'react-redux'
import { setArchiveData } from '../../../library/redux/archiveslice'


type Props = {}

const Employerhome = (props: Props) => {

  const navigation = useNavigation();
  const dispatch = useDispatch()

  return (
    <View style = {styles.container}> 
      <SearchField onPress={() => {navigation.navigate('SearchMyPost' as never); dispatch(setArchiveData(false))}} editable = {false}/>
      <View style = {{flexDirection: 'row', marginTop: 15,}}>
        <HoverButton
          title = 'My Posted Jobs'
          textStyle={{backgroundColor: theme.primary, color:white.main}}
        />
        
      </View>
      <PostList/>
    </View>
  )
}

export default Employerhome