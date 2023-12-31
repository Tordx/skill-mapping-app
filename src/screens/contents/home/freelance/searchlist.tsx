import { View, Text,FlatList, Pressable, RefreshControl, ToastAndroid, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { createsave, getAllData, getSpecificjobData, gethireddata, getsaves } from '../../../../firebase';
import { data, hirestatus, jobdata, jobid } from '../../../../library/constants';
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import { Image } from 'react-native';
import { black, theme, white } from '../../../../assets/colors';
import { styles } from '../../../../styles';
import { Chip } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { setjobdata } from '../../../../library/redux/jobslice';
import { HiredModal, JobInfoModal, Loadingmodal } from '../../../../global/partials/modals';
import firestore from '@react-native-firebase/firestore'
import { idgen } from '../../../../global/functions';
import { firebase } from '@react-native-firebase/auth';
import { SearchField } from '../../../../global/partials/fields';

type Props = {

    focus: number,
    setfocus: (e: number) => void,
    searchdata: string,

}

interface getdata {

    _userdata: data

}

const SearchList: React.FC<Props> = ({focus, setfocus}) => {

    const [alldata, setalldata] = useState<jobdata[]>([]);
    const [matchdata, setmatchdata] = useState<jobdata[]>([]);
    const [search, setsearch] = useState('')
    const [title, settitle] = useState('')
    const [ishired, setishired] = useState(false)
    const {userdata} = useSelector((action: data) => action._userdata)
    const {JobData} = useSelector((action: jobdata) => action._jobdata)
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
    
    const savejob = async (item: jobdata) => {
      const id = idgen();
      try {
        const timestamp = firebase.firestore.FieldValue.serverTimestamp()
        await createsave(item, userdata[0], id, timestamp)
        setsave((prevSave) => [...prevSave, { jobid: item.jobid, saveid: id } as jobid]);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchData = async () => {
        try {
            const retrievedalljobdata: jobdata[] = await getAllData('job-post');
            setalldata(retrievedalljobdata)
            
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
    const { timestamp, ...restOfTheItem } = item;
    const firstDataItem = item;
    const timeInSeconds = firstDataItem?.timestamp?._seconds || 0;
    const date = new Date(timeInSeconds * 1000);
    const formattedTime = date.toLocaleDateString()
    
    const dataToDispatch = {
      formattedTime,
      timestamp: timeInSeconds,
      ...restOfTheItem,
    };
    dispatch(setjobdata(dataToDispatch));
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
          <Pressable disabled = {isSaved} onPress={() => savejob(item)} style = {{position: 'absolute', top: 20, right: 20, }}>
                <Icon name  ={isSaved ? 'content-save': 'content-save-outline'} size={25} color={isSaved ? theme.primary : black.B005} />
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
            keyExtractor={(item) => item.jobid}
            refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={refresh} />}
        /> : <Text style = {{color: 'black'}}>No Jobs Matches your preferrence</Text> }
        <JobInfoModal onPress={() => {setopenmodal(false); navigation.navigate('Presumbit' as never)}} title='Apply Now' onRequestClose = {() => setopenmodal(false)}  visible = {openmodal}/>
        <Loadingmodal title = 'Submitting Application, Please wait...' visible = {loading} onRequestClose={()=> {}}/>
    </View>
  )
}

export default SearchList