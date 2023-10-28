import { View, Text,FlatList, Pressable, RefreshControl, Alert,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getActiveJobData } from '../../../../../firebase';
import { data, jobdata, jobid } from '../../../../../library/constants';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { Image } from 'react-native';
import { black, theme, white } from '../../../../../assets/colors';
import { styles } from '../../../../../styles';
import { Chip } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { setjobdata } from '../../../../../library/redux/jobslice';
import { JobInfoModal } from '../../../../../global/partials/modals';
import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

type Props = {

}


const PostList: React.FC<Props> = () => {

    const [data, setdata] = useState<jobdata[]>([]);
    const {userdata} = useSelector((action: data) => action._userdata)
    const [openmodal, setopenmodal] = useState(false);
    const [refresh, setrefresh] = useState(false)
    const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const user = firebase.auth().currentUser
    
    
    
    useEffect(() => {
        fetchData()
    },[])


    const archivepost = async(item: jobdata) => {
      
      try {
        
        const jobId = item.jobid.trim();
        await firestore().collection('job-post').doc(jobId).update({
          status: false,
        });
        fetchData()

      } catch(error) {
        console.log(error)
      }

    }
    
    const handleRefresh = () => {
        setrefresh(true)
        fetchData()
        setrefresh(false)
    }

    
    const fetchData = async () => {
        try {
            const retrieveActiveJob: jobdata[] = await getActiveJobData('job-post','userid',userdata[0].uid);
            const active = retrieveActiveJob.filter((job) => job.status === true);
            setdata(active);
            
          }  catch (error) {
          console.log('Error fetching data:', error);
          throw error;
        }
      }

    const deletejob = async (item: any) => {
        
        Alert.alert(
          'Confirmation',
          'Are you sure you want to archive this post?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async() => {

                const jobId = item.jobid.trim();
          
                await firestore().collection('job-post').doc(jobId).update({
                  status: false,
                });
                fetchData()

                console.log('Post archived/deleted');
              },
              style: 'destructive',
            },
          ],
          { cancelable: false }
        );
      };

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

        const MAX_REQUIREMENTS_PER_LINE = 4; 
        const firstDataItem = item
        const timeInSeconds = firstDataItem.timestamp?._seconds || 0; 
        const date = new Date(timeInSeconds * 1000);
        const formattedTime = date
        const isSaved = savedJobIds.includes(item.jobid);
        return(
            <Pressable onLongPress={() =>deletejob(item)} onPress = {() => viewjob(item)}  style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <View style = {{backgroundColor: '#ececec', width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start', marginVertical: 10, borderRadius: 5}}>
                <View style = {{justifyContent:'center', padding: 15, alignItems:'center'}}>
                  <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
                    <View style = {{ flexDirection: 'column', width: '85%'}}>
                      <Text style = {[styles.h1, {fontSize: 20, color: theme.primary}]}>
                          {item.jobtitle}
                      </Text>
                      <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>PHP {item.budget.toLocaleString()} / {item.pertimeframe}</Text>
                    </View>
                  </View>
                <View style={{ width: '80%' }}>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 10 }}>
                    {item.requirements?.map((requirement: any, index: any) => (
                      index >= MAX_REQUIREMENTS_PER_LINE ? (
                        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5 }}>
                          <Chip style={{ backgroundColor: '#F8FBEA' }} textStyle={{ color: theme.secondary }}>
                            {requirement}
                          </Chip>
                        </View>
                      ) : (
                        <Chip style={{ margin: 5, backgroundColor: '#F8FBEA' }} textStyle={{ color: theme.secondary }}>
                          {requirement}
                        </Chip>
                      )
                    ))}
                  </View>
                </View>
                <View style = {{flexDirection: 'row', marginVertical: 20, justifyContent: 'flex-start', alignSelf: 'flex-start'}}>                  
                <Icon name ='clock-outline' size={20}/>
                  <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                    {' posted '}
                  </Text>
                  <TimeAgo time={formattedTime} textStyle={{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}/>
                </View>
              </View>
              </View>
              <Pressable onPress={() => archivepost(item)} style = {{position: 'absolute', top: 25, right: 25, }}>
                    <Icon name  ='archive-arrow-down-outline' size={25} color={isSaved ? theme.primary : black.B005} />
              </Pressable>
            </Pressable>
        )
      }
      
  return (
    <View style = {{width: '100%', height: '80%',  justifyContent: 'center', alignItems: 'center'}}>
      {data ?
      
      <FlatList
            data={data}
            keyExtractor={(item) => item.jobid}
             style = {{width: '100%', height: '100%', marginBottom: 50}}
            renderItem={renderitem}
            refreshControl={<RefreshControl refreshing = {refresh} onRefresh={handleRefresh} />}
        /> 
        : <Text style = {{color: black.main}}>There's nothing to show</Text> }
        <JobInfoModal  
          title = 'Update Details' 
          onRequestClose = {() => setopenmodal(false)}  
          visible = {openmodal}
          onPress={() => {setopenmodal(false); navigation.navigate('EditPost' as never)}}
        />
    </View>
  )
}

export default PostList