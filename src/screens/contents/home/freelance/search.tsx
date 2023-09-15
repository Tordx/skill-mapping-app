import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { SearchField } from '../../../../global/partials/fields'
import { styles } from '../../../../styles'
import SearchList from './searchlist'

type Props = {}

const Search = (props: Props) => {

  const [focus, setfocus] = useState(0)
  const [search, setsearch] = useState('')
  return (
    <View style = {styles.container}>
      <SearchList focus={focus} setfocus={setfocus} searchdata= {search}  />
    </View>
  )
}

export default Search