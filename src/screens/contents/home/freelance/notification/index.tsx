import { View, Text, Pressable, Image, RefreshControl, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { application, data } from '../../../../../library/constants'
import { styles } from '../../../../../styles'
import { black, theme } from '../../../../../assets/colors'
import TimeAgo from 'react-native-timeago'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import { getNotificationData } from '../../../../../firebase'
import { JobInfoModal } from '../../../../../global/partials/modals'
import moment from 'moment';
import { useNavigation } from '@react-navigation/native'
import { setapplicationdata } from '../../../../../library/redux/applicationslice'
import firestore from '@react-native-firebase/firestore'
type Props = {}

const Applicationstatus = (props: Props) => {

    const {userdata} = useSelector((action: data) => action._userdata)
    const [data, setdata] = useState<application[]>([])
    const [loading, setloading] = useState(false)
    const [refreshing, setrefreshing] = useState(false)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    useEffect(() => {
        fetchData()
    },[navigation])

    const fetchData = async() => {
        try {
            const retreivedData: application[] =  await getNotificationData('application','from', userdata[0].uid)
                setdata(retreivedData)  
        } catch(error) {
            console.error(error);
            
        }
    }

    const viewnotification = async(item: application) => {
        const { timestamp, ...restOfTheItem } = item;
        const firstDataItem = item;
        const timeInSeconds = firstDataItem?.timestamp?._seconds || 0;
        const date = new Date(timeInSeconds * 1000);
        const formattedTime = date.toString()
        
        const dataToDispatch = {
          formattedTime,
          ...restOfTheItem,
        };
        await firestore().collection('application').doc(item.applicationid).update({
            fromread: true,
        }).then(() => {
            dispatch(setapplicationdata(dataToDispatch));
            navigation.navigate('CurrentApplication' as never)
        })
       
       
      };
    

    const refresh = async()=> {
        setrefreshing(true)
        await fetchData()
        setrefreshing(false)
    }

    const renderitem = ({item}: {item: application}) => {
        const firstDataItem = item;
        const timeInSeconds = firstDataItem.timestamp?._seconds || 0; 
        const date = new Date(timeInSeconds * 1000);
        const formattedTime = date;
        const Time = moment(date).format('HH:mm')
        
        return(
            <Pressable onPress={() => viewnotification(item)} style = {{width: '100%', justifyContent: 'center', alignItems: 'center', }}>
            <View style = {{borderTopWidth: .7, width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: item.fromread ? '#FFFF': '#f8fbea',}}>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20}}>
                <View style = {{width: 55, height: 55, borderColor: theme.primary, borderWidth: 3, borderRadius: 500, justifyContent: 'center', alignItems: 'center', marginRight: 10}}>
                    <Image source={{uri: item.jobphotoURL}} resizeMode='cover' style = {{width: 45, height: 45, borderRadius: 100}}/>
                </View>
                <View style = {{ flexDirection: 'column', width: '85%'}}>
                <Text style = {[styles.h1, {fontSize: 20, color: black.main}]}>
                    {item.status}
                </Text>
                <View style = {{flexDirection: 'row', justifyContent: 'flex-start', alignContent: 'center', marginTop: 1}}>
                <TimeAgo time={formattedTime} textStyle={{fontFamily: 'Montserrat-Regular', fontSize: 13, color: black.main}}/>
                <Text style = {{fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 13}}>  {Time}</Text>
                </View>
                </View>
            </View>
           
            </View>
            {item.status === '' && 
                <Pressable onPress={() => {}} style = {{position: 'absolute', top: 20, right: 20, }}></Pressable>
            }
        </Pressable>
      )
    }

  return (
    <View style = {{width: '100%',  justifyContent: 'center', alignItems: 'center'}}>
    {data ?
    
    <FlatList
          data={data}
           style = {{width: '100%', height: '100%',}}
          renderItem={renderitem}
          refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={refresh} />}
      /> : <Text style = {{color: 'black'}}>No Jobs Matches your preferrence</Text> }
  </View>
  )
}

export default Applicationstatus