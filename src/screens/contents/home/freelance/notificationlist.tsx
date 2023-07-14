import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { FlatList } from 'react-native-gesture-handler'
import { notificationdata } from '../../../../library/constants'
type Props = {}

const NotificationList = (props: Props) => {

  const [data, setdata] = useState<notificationdata[]>([])

  const renderitem = ({item}:{item: notificationdata}) => {

    return (
      <View>

      </View>
    )

  }
  return (
    <View style = {{width: '100%', height: '80%',  justifyContent: 'center', alignItems: 'center'}}>
    {data ?
    
    <FlatList
          data={data}
           style = {{width: '100%', height: '100%'}}
          renderItem={renderitem}
      /> : <Text style = {{color: 'black'}}>No Jobs Matches your preferrence</Text> }
      {/* <JobInfoModal onRequestClose = {() => setopenmodal(false)}  visible = {openmodal}/> */}
  </View>
  )
}

export default NotificationList