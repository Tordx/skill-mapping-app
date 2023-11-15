import { View, Text, Image, Pressable, Modal } from 'react-native'
import React, {useEffect, useState} from 'react'
import { styles } from '../../../../../styles'
import { ScrollView } from 'react-native-gesture-handler'
import { DefaultField, Multitextfield } from '../../../../../global/partials/fields'
import { black, theme, white } from '../../../../../assets/colors'
import { useSelector } from 'react-redux'
import { data } from '../../../../../library/constants'
import { GoBack } from '../../../../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'


type Props = {}

const FPersonalInformation = (props: Props) => {

    const {userdata} = useSelector((action: data) => action._userdata);
    const [openmodal, setopenmodal] = useState(false)
    const navigation = useNavigation()
    
    

  return (
    <View style = {styles.container}>
      <ScrollView style = {styles.scrollview}>
        <View style = {styles.container}>
        <Pressable onPress={() => setopenmodal(true)} style = {{width: 100, height: 100, borderColor: theme.primary, borderWidth: 5, borderRadius: 500, justifyContent: 'center', alignItems: 'center', marginTop: 75, marginBottom: 25}}>
            <Image source={{uri: userdata[0].photoURL || 'https://i.imgur.com/AivI1mB.png'}} resizeMode='cover' style = {{width: '90%', height: '90%', borderRadius: 500}}/>
          </Pressable>
        <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
             Personal Information
          </Text>
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>First Name</Text>
          <DefaultField
              placeholder="First name"
              placeholderTextColor={black.B005}
              name="account-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].fullname[0].firstname}
              editable = {false}
          />
           <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Middle Name</Text>
          <DefaultField
              placeholder="Middle name"
              placeholderTextColor={black.B005}
              name="account-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].fullname[1].middlename}
              editable = {false}
          />
           <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Last Name</Text>
          <DefaultField
              placeholder="Last name"
              placeholderTextColor={black.B005}
              name="account-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].fullname[2].lastname}
              editable = {false}
          />
           <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Suffix</Text>
          <DefaultField
              placeholder="Suffix"
              placeholderTextColor={black.B005}
              name="account-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].fullname[3].suffix}
              editable = {false}
          />
        <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Date of Birth</Text>
          <DefaultField
              placeholder="Birthdate"
              placeholderTextColor={black.B005}
              name="cake-variant-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].dob}
              editable = {false}
              
          />
        <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Nationality</Text>
          <DefaultField
              placeholder="email"
              placeholderTextColor={black.B005}
              name="flag-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].nationality}
              editable = {false}
          />
       
          <View style={{ marginBottom: 50 }} />
          <GoBack onPress={() => navigation.goBack()}/>
        </View>
      </ScrollView>
      <Modal animationType='fade' visible = {openmodal} transparent statusBarTranslucent onRequestClose={() => setopenmodal(false)}>
        <Pressable onPress={() => setopenmodal(false)} style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: black.main}}>
        <Image source={{uri: userdata[0].photoURL}} resizeMode='contain' style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}/>
        </Pressable>
      </Modal>
    </View>
  )
}


export default FPersonalInformation