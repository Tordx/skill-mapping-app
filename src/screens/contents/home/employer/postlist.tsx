import { View, Text,FlatList, Pressable, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getActiveJobData, getAllData, getInactiveJobData, getSpecificData, getSpecificjobData } from '../../../../firebase';
import { data, jobdata } from '../../../../library/constants';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { Image } from 'react-native';
import { black, theme, white } from '../../../../assets/colors';
import { styles } from '../../../../styles';
import { Chip } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { setjobdata } from '../../../../library/redux/jobslice';
import { JobInfoModal } from '../../../../global/partials/modals';
import { firebase } from '@react-native-firebase/auth';

type Props = {

    focus: number,
    setfocus: (e: number) => void

}


const PostList: React.FC<Props> = ({focus, setfocus}) => {

    const [activejob, setactivejob] = useState<jobdata[]>([]);
    const [inactivejob, setinactivejob] = useState<jobdata[]>([]);
    const [data, setdata] = useState<jobdata[]>([]);
    const {userdata} = useSelector((action: data) => action._userdata)
    const [openmodal, setopenmodal] = useState(false);
    const [refresh, setrefresh] = useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation()
    
    
    
    useEffect(() => {
        toggledata()
    },[focus])


    const toggledata = () => {

      if(focus == 0) {
        
        setdata(activejob)
      }
      if (focus == 1) {
        
        setdata(inactivejob)
      }

    }

    useEffect(() => {
        
        fetchData()
        setfocus(focus = 0)

    },[])
    
    const handleRefresh = () => {
        setrefresh(true)
        fetchData()
        setfocus(focus = focus)
        setdata(activejob)
        setdata(inactivejob)
        console.log(data);
        
        setrefresh(false)
    }

    
    const fetchData = async () => {
        try {
            const retrieveActiveJob: jobdata[] = await getActiveJobData('job-post','userid',userdata[0].userid);
            const active = retrieveActiveJob.filter((job) => job.status === true);
            setactivejob(active);
            const inactive = retrieveActiveJob.filter((job) => job.status === false);
            setinactivejob(inactive)
            
          }  catch (error) {
          console.log('Error fetching data:', error);
          throw error;
        }
      }

      const viewjob = (item: any) => {
        const { timestamp, ...restOfTheItem } = item;
        const firstDataItem = item;
        const timeInSeconds = firstDataItem?.timestamp?._seconds || 0;
        const date = new Date(timeInSeconds * 1000);
        const formattedTime = date.toString()
        
        const dataToDispatch = {
          formattedTime,
          ...restOfTheItem,
        };
      
        dispatch(setjobdata(dataToDispatch));
        setopenmodal(true);
      };

      const renderitem = ({item}:{item: jobdata}) => {

        const firstDataItem = item
        const timeInSeconds = firstDataItem.timestamp?._seconds || 0; 
        const date = new Date(timeInSeconds * 1000);
        const formattedTime = date
    
        return(
            <Pressable onPress = {() => viewjob(item)}  style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <View style = {{borderBottomWidth: .5,width: '90%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20}}>
                  <Image source={{uri: item.photoURL}} resizeMode='cover' style = {{width: 50, height: 50, borderRadius: 5, marginRight: 10}}/>
                  <View style = {{ flexDirection: 'column', width: '85%'}}>
                    <Text style = {[styles.h1, {fontSize: 20, color: theme.primary}]}>
                        {item.jobtitle}
                    </Text>
                    <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>PHP {item.budget.toLocaleString()} / {item.pertimeframe}</Text>
                  </View>
                </View>
                <View style = {{flexDirection: 'row', marginVertical: 20}}>
                  {item.requirements?.map((requirement: any, index: any) => (
                    <Chip style = {{marginRight: 10, backgroundColor: white.W004}} textStyle = {{color: theme.secondary}}>{requirement}</Chip>
                  ))}
                </View>
                <View style = {{flexDirection: 'row', marginTop: 10, marginBottom: 25, justifyContent: 'center', alignContent: 'center'}}>
                  <Icon name ='clock-outline' size={20}/>
                  <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                    {' posted '}
                  </Text>
                  <TimeAgo time={formattedTime} textStyle={{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}/>
                </View>
              </View>
            </Pressable>
        )
      }
      
  return (
    <View style = {{width: '100%', height: '80%',  justifyContent: 'center', alignItems: 'center'}}>
      {data ?
      
      <FlatList
            data={data}
             style = {{width: '100%', height: '100%'}}
            renderItem={renderitem}
            refreshControl={<RefreshControl refreshing = {refresh} onRefresh={handleRefresh} />}
        /> 
        : <Text style = {{color: black.main}}>There's nothing to show</Text> }
        <JobInfoModal onRequestClose = {() => setopenmodal(false)}  visible = {openmodal}/>
    </View>
  )
}

export default PostList