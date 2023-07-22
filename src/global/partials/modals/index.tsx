import { View, Text, Modal, Image, ScrollView } from 'react-native'
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
    visible?: boolean,
    onRequestClose: (e: any) => void;
    title?: string,

    

}


export const JobInfoModal: React.FC<Props> = ({onPress, visible, onRequestClose, title}) => {

  const {JobData} = useSelector((action: jobdata) => action._jobdata);
  console.log(JobData);
  

  return (
    <Modal visible = {visible} transparent onRequestClose={onRequestClose} animationType='slide' statusBarTranslucent>
      <View style = {[styles.container,{backgroundColor: transparent.level04}]}>
       
        <View style = {{position: 'absolute', bottom: 10, width: '95%', height: '75%', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.light, borderRadius: 15}}>
        <ScrollView style = {[styles.scrollview, {width: '90%'}]} showsVerticalScrollIndicator = {false}>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20, marginTop: 30}}>
              <Image source={{uri: JobData.photoURL}} resizeMode='cover' style = {{width: 50, height: 50, borderRadius: 5, marginRight: 10}}/>
              <View style = {{ flexDirection: 'column', width: '85%'}}>
                <Text style = {[styles.h1, {fontSize: 20, color: theme.primary}]}>
                    {JobData.jobtitle}
                </Text>
                <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>PHP {JobData.budget}</Text>
              </View>
            </View>
            <View style = {{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '95%'}}>
              <View style = {{flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignContent: 'center'}}>
                <Icon name ='clock-outline' size={20}/>
                  <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                    {' posted '}
                </Text>
                <TimeAgo time={JobData.formattedTime} textStyle={{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}/>
              </View>
              <View style = {{flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignContent: 'center'}}>
                <Icon name ='map-marker-outline' size={20}/>
                <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                  {JobData.joblocation}
                </Text>
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
                <View style = {{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '95%', marginVertical: 10}}>
            <Text style = {[styles.h1, {fontSize: 14, color: black.main, fontFamily: 'Montserrat-Bold',marginVertical: 5}]}>Qualifications</Text>
            <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                  {JobData.qualification}
                </Text>
                </View>
                
            <Text style = {[styles.h1, {fontSize: 14, color: black.main, fontFamily: 'Montserrat-Bold',marginTop: 10}]}>Skills and Expertise needed</Text>
            <View style = {{flexDirection: 'row', marginVertical: 20}}>
                  {JobData.requirements?.map((requirement: any, index: any) => (
                    <Chip style = {{marginRight: 10, backgroundColor: white.W004}} textStyle = {{color: theme.secondary}}>{requirement}</Chip>
                  ))}
                </View>
                <View style = {{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '105%', marginVertical: 20}}>
                <LogButton title= {title || ''} onPress={onPress} />
                </View>
                </ScrollView>
              </View>
           
      </View>
    </Modal>
  )
}

export const Loadingmodal: React.FC<Props> = ({onRequestClose, visible}) => {

  return (
    <Modal statusBarTranslucent transparent visible = {visible} onRequestClose={onRequestClose}>
      <View style = {[styles.container, {backgroundColor: transparent.level05,}]}>
        <ActivityIndicator color= {theme.primary} size={50}/>
        <Text style = {{fontFamily: 'Montserrat-Regular', color: white.main, fontSize: 30, textAlign: 'center'}}>
          Please wait, while we update your profile...
        </Text>
      </View>
    </Modal>
  )
}