import { View, Text,FlatList, Pressable, RefreshControl, ToastAndroid, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createsave, getAllData, getEmployerJobData, getSpecificjobData, gethireddata, getsaves } from '../../../../../firebase';
import { archiveData, data, hirestatus, jobdata, jobid } from '../../../../../library/constants';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { Image } from 'react-native';
import { black, theme, white } from '../../../../../assets/colors';
import { styles } from '../../../../../styles';
import { Chip } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { setjobdata } from '../.././../../../library/redux/jobslice';
import { HiredModal, JobInfoModal, Loadingmodal } from '../../../../../global/partials/modals';
import firestore from '@react-native-firebase/firestore'
import { idgen } from '../../../../../global/functions';
import { firebase } from '@react-native-firebase/auth';
import { SearchField } from '../../../../../global/partials/fields';

type Props = {

    focus: number,
    setfocus: (e: number) => void,
    searchdata: string,

}

interface getdata {

    _userdata: data

}

const SearchListE: React.FC<Props> = ({focus, setfocus}) => {

    const [alldata, setalldata] = useState<jobdata[]>([]);
    const [matchdata, setmatchdata] = useState<jobdata[]>([]);
    const [search, setsearch] = useState('')
    const [title, settitle] = useState('')
    const [ishired, setishired] = useState(false)
    const {userdata} = useSelector((action: data) => action._userdata)
    const {JobData} = useSelector((action: jobdata) => action._jobdata)
		const {archivedata} = useSelector((action: archiveData) => action._archivedata)
    const [save, setsave] = useState<jobid[]>([]);
    const [data, setdata] = useState<jobdata[]>([]);
    const [openmodal, setopenmodal] = useState(false);
    const [loading, setloading] = useState(false)
    const [refreshing, setrefreshing] = useState(false)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    useEffect(() => {
        fetchData()
        toggledata()
        getsave()
    },[focus])


    useEffect(() => {
      if(search == '') {
        fetchData()
      }
    },[search])

    const toggledata = () => {

      if(focus == 0) {
        
        setdata(matchdata)
      }
      if (focus == 1) {
        
        setdata(alldata)
      }

    }
    
    const archivejob = async (item: jobdata) => {
       
        try {
        
            const jobId = item.jobid.trim();
            await firestore().collection('job-post').doc(jobId).update({
              status: false,
            });
            fetchData()
    
          } catch(error) {
            console.log(error)
          }
    
    };
    const fetchData = async () => {
				console.log(archivedata)
        try {
            const retrievedalljobdata: jobdata[] = await getEmployerJobData('job-post');
						const myjobpost = retrievedalljobdata.filter((item: jobdata) => item.userid === userdata[0].uid)
						if(archivedata){
							const archivedresult = myjobpost.filter((item: jobdata) => item.status === false)
							setalldata(archivedresult)
						} else {
							const archivedresult = myjobpost.filter((item: jobdata) => item.status === true)
							setalldata(archivedresult)
						}
            
          }  catch (error) {
          console.log('Error fetching data:', error);
          throw error;
        }
      }
    
    const getsave = async() => {
      const savedata: jobid[] = await getsaves('save-post', 'uid', userdata[0].uid)
      setsave(savedata)
            
    }

    const filterddata = () => {

      const modifiedArr = alldata.filter((item) => {
        return item  &&  (new RegExp(search, 'i').test(item.jobtitle))
      });
      setalldata(modifiedArr)

    }

  const viewjob = (item: any) => {
    dispatch(setjobdata(item));
    setopenmodal(true);
  };
  
  const refresh = () => {
    setrefreshing(true)
    fetchData()
    setrefreshing(false)
  }

      
  const renderitem = ({item}:{item: jobdata}) => {

    const MAX_REQUIREMENTS_PER_LINE = 4;
    const firstDataItem = item
    const timeInSeconds = firstDataItem.timestamp?._seconds || 0; 
    const date = new Date(timeInSeconds * 1000);
    const formattedTime = date
    const isSaved = save.some((savedItem) => savedItem.jobid === item.jobid);
    return(
        <Pressable onPress = {() => viewjob(item)}  style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
          <View style = {{borderBottomWidth: .5,width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <Image source={{uri: item.photoURL}} resizeMode='cover' style = {{width: 50, height: 50, borderRadius: 5, marginRight: 10}}/>
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
                      <Chip style={{ backgroundColor: white.W004 }} textStyle={{ color: theme.secondary }}>
                        {requirement}
                      </Chip>
                    </View>
                  ) : (
                    <Chip style={{ margin: 5, backgroundColor: white.W004 }} textStyle={{ color: theme.secondary }}>
                      {requirement}
                    </Chip>
                  )
                ))}
              </View>
            </View>
            <View style = {{flexDirection: 'row', marginVertical: 20, justifyContent: 'center', alignContent: 'center'}}>
              <Icon name ='clock-outline' size={20}/>
              <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                {' posted '}
              </Text>
              <TimeAgo time={formattedTime} textStyle={{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}/>
            </View>
          </View>
          <Pressable disabled = {isSaved} onPress={() => archivejob(item)} style = {{position: 'absolute', top: 20, right: 20, }}>
            <Icon name  ='archive-arrow-down-outline' size={25} color={isSaved ? theme.primary : black.B005} />
          </Pressable>
        </Pressable>
    )
  }
      
  return (
    <View style = {{width: '100%',  height: '100%',marginVertical: '20%',  justifyContent: 'center', alignItems: 'center', paddingBottom: '20%' }}>
      {alldata ?
      
      <FlatList
            ListHeaderComponent={<View style = {{justifyContent: 'center', alignItems: 'center',}}><SearchField  onChangeText={(e) => setsearch(e)} value = {search} onPress={filterddata} /></View>}
            data={alldata}
             style = {{width: '100%', height: '100%',}}
            renderItem={renderitem}
            refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={refresh} />}
						keyExtractor={(item) => item.jobid}
        /> : <Text style = {{color: 'black'}}>No Jobs Matches your preferrence</Text> }
          <JobInfoModal  
            title = 'Update Details' 
            onRequestClose = {() => setopenmodal(false)}  
            visible = {openmodal}
            onPress={() => {setopenmodal(false); navigation.navigate('EditPost' as never)}}
            />
        <Loadingmodal title = 'Submitting Application, Please wait...' visible = {loading} onRequestClose={()=> {}}/>
    </View>
  )
}

export default SearchListE