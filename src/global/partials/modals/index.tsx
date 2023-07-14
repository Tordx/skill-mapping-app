import { View, Text, Modal, Image, ScrollView } from 'react-native'
import React from 'react'
import { data, jobdata } from '../../../library/constants'
import { useSelector } from 'react-redux';
import { black, theme, transparent, white } from '../../../assets/colors';
import { styles } from '../../../styles';
import { Chip } from 'react-native-paper';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import TimeAgo from 'react-native-timeago';
import { LogButton } from '../buttons';

type Props = {

    onPress?: (e: any) => void;
    visible?: boolean,
    onRequestClose: (e: any) => void;

    

}

interface getjob {

    _jobdata: jobdata

}

export const JobInfoModal: React.FC<Props> = ({onPress, visible, onRequestClose}) => {

  const {jobdata} = useSelector((action: getjob) => action._jobdata);
    console.log('tangina');
    console.log(jobdata);
    

  return (
    <Modal visible = {visible} transparent onRequestClose={onRequestClose} animationType='slide' statusBarTranslucent>
      <View style = {[styles.container,{backgroundColor: transparent.level04}]}>
       
        <View style = {{position: 'absolute', bottom: 10, width: '95%', height: '80%', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.light, borderRadius: 15}}>
        <ScrollView style = {[styles.scrollview, {width: '90%'}]} showsVerticalScrollIndicator = {false}>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 20, marginTop: 30}}>
              <Image source={{uri: jobdata?.photoURL}} resizeMode='cover' style = {{width: 50, height: 50, borderRadius: 5, marginRight: 10}}/>
              <View style = {{ flexDirection: 'column', width: '85%'}}>
                <Text style = {[styles.h1, {fontSize: 20, color: theme.primary}]}>
                    {jobdata?.jobtitle}
                </Text>
                <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>PHP {jobdata?.budget} / {jobdata?.pertimeframe}</Text>
              </View>
            </View>
            <View style = {{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '95%'}}>
              <View style = {{flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignContent: 'center'}}>
                <Icon name ='clock-outline' size={20}/>
                  <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                    {' posted '}
                </Text>
                <TimeAgo time={jobdata?.formattedTime} textStyle={{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}/>
              </View>
              <View style = {{flexDirection: 'row', marginVertical: 5, justifyContent: 'center', alignContent: 'center'}}>
                <Icon name ='map-marker-outline' size={20}/>
                <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                  {jobdata?.joblocation}
                </Text>
              </View>
            </View>
            <View style = {{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '95%', marginTop: 15}}>
            <Text style = {[styles.h1, {fontSize: 14, color: black.main, fontFamily: 'Montserrat-Bold'}]}>Employment Type:  <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                  {jobdata?.type}
                </Text> </Text>
           
                </View>
            <View style = {{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '95%', marginTop: 10}}>
            <Text style = {[styles.h1, {fontSize: 14, color: black.main, fontFamily: 'Montserrat-Bold',marginVertical: 5}]}>Project Description</Text>
            <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                  {jobdata?.description}
                </Text>
                </View>
                <View style = {{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', width: '95%', marginVertical: 10}}>
            <Text style = {[styles.h1, {fontSize: 14, color: black.main, fontFamily: 'Montserrat-Bold',marginVertical: 5}]}>Qualifications</Text>
            <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>
                  {jobdata?.qualification}
                </Text>
                </View>
                
            <Text style = {[styles.h1, {fontSize: 14, color: black.main, fontFamily: 'Montserrat-Bold',marginTop: 10}]}>Skills and Expertise needed</Text>
            <View style = {{flexDirection: 'row', marginVertical: 20}}>
                  {jobdata?.requirements?.map((requirement: any, index: any) => (
                    <Chip style = {{marginRight: 10, backgroundColor: white.W004}} textStyle = {{color: theme.secondary}}>{requirement}</Chip>
                  ))}
                </View>
                <View style = {{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '105%', marginBottom: 20}}>
                <LogButton title='Apply now' />
                </View>
                </ScrollView>
              </View>
           
      </View>
    </Modal>
  )
}
