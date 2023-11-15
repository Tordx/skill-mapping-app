import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../../styles'
import { SearchField } from '../../../global/partials/fields'
import { useNavigation } from '@react-navigation/native'
import { HoverButton } from '../../../global/partials/buttons'
import { black, theme, white } from '../../../assets/colors'
import ArchivePosts from '../../contents/home/employer/archive/archived'
import { useDispatch } from 'react-redux'
import { setArchiveData } from '../../../library/redux/archiveslice'


type Props = {}

const EmployerArchived = (props: Props) => {

  const navigation = useNavigation()
  const dispatch = useDispatch()

  return (
    <View style = {styles.container}> 
      <SearchField onPress={() => {navigation.navigate('SearchMyPost' as never); dispatch(setArchiveData(true))}} editable = {false}/>
      <View style = {{flexDirection: 'row', marginTop: 15,}}>
        <HoverButton 
          title = 'Archived Posts'
          textStyle={{backgroundColor:  theme.primary , color: white.main }}
        />
        
      </View>
      <ArchivePosts />
    </View>
  )
}

export default EmployerArchived