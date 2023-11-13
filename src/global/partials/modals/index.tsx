import { View, Text, Modal, Image, ScrollView,Pressable } from 'react-native'
import React from 'react'
import { data, jobdata } from '../../../library/constants'
import { useSelector } from 'react-redux';
import { black, theme, transparent, white } from '../../../assets/colors';
import { styles } from '../../../styles';
import { ActivityIndicator, Chip } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import TimeAgo from 'react-native-timeago';
import { LogButton } from '../buttons';

type Props = {

    onPress?: (e: any) => void;
    yes?: (e: any) => void,
    no?: (e: any) => void,
    visible?: boolean,
    onRequestClose?: (e: any) => void;
    title: string,

    

}


export const JobInfoModal: React.FC<Props> = ({onPress, visible, onRequestClose, title}) => {

  const {JobData} = useSelector((action: jobdata) => action._jobdata);
  const {userdata} = useSelector((action: data) => action._userdata)

  let userResult: string[] = userdata[0]?.skills?.concat(userdata[0]?.competencies || []) || [];
  let jobResult: string[] = JobData?.requirements?.concat(JobData?.competencies || []) || [];
  const additionalString = JobData?.jobtitle?.toLowerCase() || "";
  jobResult = jobResult.concat(additionalString);

  jobResult = [...jobResult, additionalString];
  let matchedCount = 0;
  console.log(additionalString)
  if (userResult.length > 0) {
    jobResult && jobResult.forEach((jobItem: string) => {
      userResult && userResult.forEach((userItem: string) => {
        if (jobItem.toLowerCase().includes(userItem.toLowerCase())) {
          matchedCount += 1;
        }
      });
    });
  }
  
  const percentage = jobResult.length > 0 ? (matchedCount / jobResult.length) * 100 : 0;


  return (
    <Modal visible = {visible} transparent onRequestClose={onRequestClose} animationType='slide' statusBarTranslucent>
      <View style = {[styles.container,{backgroundColor: transparent.level05}]}>
       
        <View style = {{position: 'absolute', bottom: 10, width: '95%', height: '75%', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.light, borderRadius: 15}}>
        <ScrollView style = {[styles.scrollview, {width: '90%'}]} showsVerticalScrollIndicator = {false}>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20, marginTop: 30}}>
              <View style = {{ flexDirection: 'column', width: '85%'}}>
                <Text style = {[styles.h1, {fontSize: 20, color: theme.primary}]}>
                    {JobData.jobtitle}
                </Text>
                <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>PHP {JobData.budget}</Text>
              </View>
            </View>
            <View style = {{justifyContent: 'center', alignItems: 'center', width: '95%'}}>
              <View style = {{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%'}}>
                <View style = {{flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignContent: 'center'}}>
                  <Icon name ='clock-outline' size={20}/>
                    <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                      {' posted '}
                  </Text>
                  <TimeAgo time={JobData.timestamp} textStyle={{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}/>
                </View>
                <View style = {{flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignContent: 'center'}}>
                  <Icon name ='map-marker-outline' size={20}/>
                  <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                    {JobData.joblocation}
                  </Text>
                </View>
              </View>
              <View style = {{position: 'absolute', right: 20, width: 65, height: 65, borderRadius: 100, borderColor: theme.primary, borderWidth: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>{percentage.toFixed(0)}%</Text>
              </View>
            </View>
            <View style = {{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '95%', marginTop: 15}}>
            <Text style = {[styles.h1, {fontSize: 14, color: black.main, fontFamily: 'Montserrat-Bold'}]}>Employment Type:  <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                  {JobData.type}
                </Text> </Text>
           
                </View>
            <View style = {{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '95%', marginTop: 10}}>
            <Text style = {[styles.h1, {fontSize: 14, color: black.main, fontFamily: 'Montserrat-Bold',marginVertical: 5}]}>Project Description</Text>
            <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                  {JobData.description}
                </Text>
                </View>
            <Text style = {[styles.h1, {fontSize: 14, color: black.main, fontFamily: 'Montserrat-Bold',marginTop: 10}]}>Skills and Expertise needed</Text>
            <ScrollView horizontal style = {{flexDirection: 'row', marginVertical: 20}}>
                  {JobData.requirements?.map((requirement: any, index: any) => (
                    <Chip style = {{marginRight: 10, backgroundColor: '#F8FBEA'}} textStyle = {{color: theme.secondary}}>{requirement}</Chip>
                  ))}
                </ScrollView>
                <Text style = {[styles.h1, {fontSize: 14, color: black.main, fontFamily: 'Montserrat-Bold',marginTop: 10}]}>Competencies</Text>
            <ScrollView horizontal  style = {{flexDirection: 'row', marginVertical: 20}}>
                  {JobData.competencies?.map((requirement: any, index: any) => (
                    <Chip style = {{marginRight: 10, backgroundColor: '#F8FBEA'}} textStyle = {{color: theme.secondary}}>{requirement}</Chip>
                  ))}
                </ScrollView>
                <View style = {{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '105%', marginVertical: 20}}>
                <LogButton title= {title || ''} onPress={onPress} />
                </View>
                </ScrollView>
              </View>
           
      </View>
    </Modal>
  )
}

export const Loadingmodal: React.FC<Props> = ({onRequestClose, visible, title}) => {

  return (
    <Modal statusBarTranslucent transparent visible = {visible} onRequestClose={onRequestClose}>
      <View style = {[styles.container, {backgroundColor: transparent.level05,}]}>
        <ActivityIndicator color= {theme.primary} size={50}/>
        <Text style = {{fontFamily: 'Montserrat-Regular', color: white.main, fontSize: 30, textAlign: 'center'}}>
          {title}
        </Text>
      </View>
    </Modal>
  )
}

export const HiredModal: React.FC<Props> = ({onRequestClose, visible, title, yes, no}) => {
  return (
    <Modal transparent visible = {visible} onRequestClose={onRequestClose}>
      <View style = {{backgroundColor: '#00000050', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <View style = {{backgroundColor: '#fff', width: '80%', height: '25%', justifyContent: 'center', alignItems: 'center', borderRadius: 15, flexDirection: 'column'}}>
          <Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 20, color: black.main, marginBottom: 20}}>{title}</Text>
          <View style = {{justifyContent: 'space-between', width: '60%', alignItems: 'center', flexDirection: 'row'}}>
            <Pressable onPress={yes}>
              <Text style = {{textAlign: 'center',fontSize: 30, paddingHorizontal: 20, paddingVertical: 10,   backgroundColor: theme.primary, color: white.main, fontFamily: 'Montserrat-Regular', borderRadius: 5}}>
                Yes
              </Text>
            </Pressable>
            <Pressable onPress={no}>
              <Text style = {{textAlign: 'center', fontSize: 30, paddingHorizontal: 20, paddingVertical: 10, backgroundColor: black.B004, color: white.main, fontFamily: 'Montserrat-Regular', borderRadius: 5}}>
                Not
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}