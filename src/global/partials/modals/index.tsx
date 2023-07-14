import { View, Text, Modal, Image } from 'react-native'
import React from 'react'
import { data, jobdata } from '../../../library/constants'
import { useSelector } from 'react-redux';
import { black, theme, transparent } from '../../../assets/colors';
import { styles } from '../../../styles';

type Props = {

    onPress?: (e: any) => void;
    visible?: boolean,
    onRequestClose: (e: any) => void;

    

}

interface getjob {

    _jobdata: jobdata;

}

export const JobInfoModal: React.FC<Props> = ({onPress, visible, onRequestClose}) => {

    const jobdata = useSelector((action: getjob) => action._jobdata)

  return (
    <Modal visible = {visible} transparent onRequestClose={onRequestClose} >
      <View style = {[styles.container,{backgroundColor: transparent.level03}]}>
        <View style = {{position: 'absolute', bottom: 0, width: '98%', height: '50%', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.light}}>
            <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 10}}>
              <Image source={{uri: jobdata.photoURL}} resizeMode='cover' style = {{width: 50, height: 50, borderRadius: 5, marginRight: 10}}/>
              <View style = {{ flexDirection: 'column', width: '85%'}}>
                <Text style = {[styles.h1, {fontSize: 20, color: theme.primary}]}>
                    {jobdata.jobtitle}
                </Text>
                <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 14, color: black.main}}>PHP {jobdata?.budget} / {jobdata.pertimeframe}</Text>
              </View>
            </View>
        </View>
      </View>
    </Modal>
  )
}
