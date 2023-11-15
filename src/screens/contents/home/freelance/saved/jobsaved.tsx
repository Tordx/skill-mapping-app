import { View, Text, FlatList, RefreshControl, Pressable, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { firebase } from '@react-native-firebase/auth'
import { data, jobdata, jobid } from '../../../../../library/constants'
import { deletearchive, deletesaves, getSpecificjobData, getsaves } from '../../../../../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { styles } from '../../../../../styles'
import { JobInfoModal } from '../../../../../global/partials/modals'
import { black, errors, theme, white } from '../../../../../assets/colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TimeAgo from 'react-native-timeago'
import { setjobdata } from '../../../../../library/redux/jobslice'
import { Chip } from 'react-native-paper'

export const JobSave: React.FC = () => {

    const {userdata} = useSelector((action: data) => action._userdata);
    const [save, setsave] = useState<jobid[]>([]);
    const [refreshing, setrefreshing] = useState(false);
    const [openmodal, setopenmodal] = useState(false);
    const dispatch = useDispatch()

    const getsave = async() => {
        
        try {
                const savedata: jobid[] = await getsaves('save-post', 'uid', userdata[0].uid)
                setsave(savedata)
                console.log(savedata);
                
        } catch (error) {

        }
    }

    useEffect(() => {
        getsave()
    },[])

    
    const refresh = () => {
        setrefreshing(true)
        getsave()
        setrefreshing(false)
      }
  
      const viewjob = (item: any) => {
      
        dispatch(setjobdata(item));
        setopenmodal(true);
      };

      const deletesavejob = async (item: jobid) => {
        console.log(item);
        
        Alert.alert(
          'Confirmation',
          'Are you sure you want to delete this saved job permanently?',
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async() => {

                deletesaves(item.saveid)
                getsave()
                console.log('Post archived/deleted');
              },
              style: 'destructive',
            },
          ],
          { cancelable: false }
        );
      };

      const renderitem = ({item}:{item: jobid}) => {

        const MAX_REQUIREMENTS_PER_LINE = 4;
        const firstDataItem = item
        const timeInSeconds = firstDataItem.timestamp?._seconds || 0; 
        const date = new Date(timeInSeconds * 1000);
        const formattedTime = date
        
        return(
            <Pressable onPress = {() => viewjob(item)}  style = {{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <View style = {{borderBottomWidth: .5,width: '95%', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
                  <Image source={{uri: item.photoURL}} resizeMode='cover' style = {{width: 50, height: 50, borderRadius: 5, marginRight: 10}}/>
                  <View style = {{ flexDirection: 'column', width: '85%'}}>
                    <Text style = {[styles.h1, {fontSize: 20, color: theme.primary}]}>
                        {item.jobtitle}
                    </Text>
                    <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>PHP {item.budget} / {item.pertimeframe}</Text>
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
              <Pressable onPress={() => deletesavejob(item)} style = {{position: 'absolute', top: 20, right: 20, }}>
                    <Icon name  ={'delete'} size={25} color={errors.A001} />
              </Pressable>
            </Pressable>
        )
      }
  return (
    <View style = {{width: '100%', marginTop: 25,  marginBottom: '10%',  justifyContent: 'center', alignItems: 'center', paddingBottom: '20%' }}>
      {save ?
      
      <FlatList
            data={save}
             style = {{width: '100%', height: '100%',}}
            renderItem={renderitem}
            keyExtractor={(item) => item.jobid}
            refreshControl={<RefreshControl refreshing = {refreshing} onRefresh={refresh} />}
        /> : <Text style = {{color: 'black'}}>No Jobs Matches your preferrence</Text> }
        <JobInfoModal onPress={() => {}} title='Apply Now' onRequestClose = {() => setopenmodal(false)}  visible = {openmodal}/>
    </View>
  )
}
