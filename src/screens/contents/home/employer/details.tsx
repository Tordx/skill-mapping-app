import { View, Text, Image } from 'react-native'
import React from 'react'
import { styles } from '../../../../styles'
import { ScrollView } from 'react-native-gesture-handler'
import { DefaultField } from '../../../../global/partials/fields'
import { black, theme } from '../../../../assets/colors'
import { useSelector } from 'react-redux'
import { data } from '../../../../library/constants'
import { GoBack } from '../../../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'

type Props = {}

const AccountDetails = (props: Props) => {

    const {userdata} = useSelector((action: data) => action._userdata)
    const address = userdata[0]?.address?.map((datas: string) => datas)
    const navigation = useNavigation()
    

  return (
    <View style = {styles.container}>
      <ScrollView style = {styles.scrollview}>
        <View style = {styles.container}>
        <View style = {{width: 100, height: 100, borderColor: theme.primary, borderWidth: 5, borderRadius: 500, justifyContent: 'center', alignItems: 'center', marginTop: 75, marginBottom: 25}}>
            <Image source={{uri: userdata[0].photoURL || 'https://i.imgur.com/AivI1mB.png'}} resizeMode='cover' style = {{width: '90%', height: '90%', borderRadius: 500}}/>
          </View>
        <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
             Personal Information
          </Text>
          <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Name</Text>
          <DefaultField
              placeholder="Full name"
              placeholderTextColor={black.B005}
              name="account-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].fullname}
              editable = {false}
          />
        <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Contact Number</Text>
          <DefaultField
              placeholder="contact number*"
              placeholderTextColor={black.B005}
              name="phone-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].contactnumber}
              editable = {false}
          />
        <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Email</Text>
          <DefaultField
              placeholder="email"
              placeholderTextColor={black.B005}
              name="email-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].email}
              editable = {false}
          />
        <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Address</Text>
         <DefaultField
              placeholder="Street"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {address.join(" ").toString()}
              editable = {false}
          />
            <Text style = {{alignSelf: 'flex-start', marginLeft: 15, fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>Address</Text>
            <DefaultField
            style={{height: 250}}
              placeholder="Enter your text here"
              placeholderTextColor={black.B005}
              name="calendar-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].description}
              editable = {false}
          />
             <DefaultField
              placeholder="Business Hours"
              placeholderTextColor={black.B005}
              name="briefcase-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].businesshours}
              editable = {false}
          />
          <View style={{ marginBottom: 50 }} />
          <GoBack onPress={() => navigation.goBack()}/>
        </View>
      </ScrollView>
     
    </View>
  )
}

export default AccountDetails