import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../../styles'
import { JobSave } from '../../contents/home/freelance/saved/jobsaved'

type Props = {}

const Saved = (props: Props) => {
  return (
    <View style = {styles.container}>
      <JobSave/>
    </View>
  )
}

export default Saved