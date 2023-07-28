import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from '../../../../styles'
import { data, jobdata, jobid } from '../../../../library/constants'
import { idgen } from '../../../../global/functions'
import { firebase } from '@react-native-firebase/auth'
import { createsave, submitapplication } from '../../../../firebase'
import { useSelector } from 'react-redux'
import { DefaultField } from '../../../../global/partials/fields'
import { black } from '../../../../assets/colors'
import { GoBack, LogButton } from '../../../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'
import { Loadingmodal } from '../../../../global/partials/modals'

const Presumbit: React.FC= () => {

    const navigation = useNavigation()
    const {userdata} = useSelector((action: data) => action._userdata)
    const {JobData} = useSelector((action: jobdata) => action._jobdata)
    const [loading, setloading] = useState(false);
    const [fullname, setfullname] = useState(userdata[0]?.fullname[0]?.firstname + ' ' + userdata[0]?.fullname[1]?.middlename + ' ' + userdata[0]?.fullname[2]?.lastname + ' ' +  userdata[0]?.fullname[3]?.suffix)
    const [contactnumber, setcontactnumber] = useState(userdata[0]?.contactnumber);
    const [email, setemail] = useState(userdata[0].email)

    const submit = async() => {
          
        Alert.alert(
          'Submit Application',
          `You are about to submit an application for ${JobData.jobtitle}?`,
          [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Yes',
              onPress: async() => {

                setloading(true)
                await submitapplication(userdata[0], JobData, fullname, contactnumber, email, navigation).then(() => {  
                  setloading(false)
                })
              },
              style: 'destructive',
            },
          ],
          { cancelable: false }
        );
     
    }
  return (
    <View style = {styles.container}>
       <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10, marginTop: '20%' }]}>
        Personal Information
        </Text>
        <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Full Name</Text>
            <DefaultField
                placeholder="Full name"
                placeholderTextColor={black.B005}
                name="account-outline"
                size={25}
                color={black.B004}
                value = {fullname}
                onChangeText={(e) => setfullname(e)}
            />
        <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Email Address</Text>
         <DefaultField
            placeholder="Email Address"
            placeholderTextColor={black.B005}
            name="email-outline"
            size={25}
            color={black.B004}
            value = {email}
            onChangeText={(e) => setemail(e)}
            
        />
        <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Contact Number</Text>
        <DefaultField
            placeholder="Contact Number"
            placeholderTextColor={black.B005}
            name="phone-outline"
            size={25}
            color={black.B004}
            value = {contactnumber}
            onChangeText={(e) => setcontactnumber(e)}
            
            />
        <LogButton title='Save' onPress={() => submit()} style={{marginTop: 50}} />
        <GoBack onPress={() => navigation.goBack()} />
        <Loadingmodal visible = {loading} title='Submitting Application, Please wait...'  />
    </View>
  )
}

export default Presumbit