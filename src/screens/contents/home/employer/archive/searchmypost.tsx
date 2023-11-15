import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { styles } from '../../../../../styles'
import SearchListE from './searchListE'

type Props = {}

const SearchMyPost = (props: Props) => {

  const [focus, setfocus] = useState(0)
  const [search, setsearch] = useState('')
  return (
    <View style = {styles.container}>
      <SearchListE focus={focus} setfocus={setfocus} searchdata= {search}  />
    </View>
  )
}

export default SearchMyPost