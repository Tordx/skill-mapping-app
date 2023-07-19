import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '../../../../styles'
import { ScrollView } from 'react-native-gesture-handler'
import { DefaultField } from '../../../../global/partials/fields'
import { black } from '../../../../assets/colors'
import { useSelector } from 'react-redux'
import { data } from '../../../../library/constants'

type Props = {}

const AccountDetails = (props: Props) => {

    const {userdata} = useSelector((action: data) => action._userdata)
    const address = userdata[0]?.address?.map((datas: string) =>datas)
    console.log(address);
    

  return (
    <View style = {styles.container}>
      <ScrollView style = {styles.scrollview}>
        <View style = {styles.container}>
        <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
             Contact Information
          </Text>
          <DefaultField
              placeholder="Fullname"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].fullname}
              editable = {false}
          />
          <DefaultField
              placeholder="City/Town*"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].contactnumber}
              editable = {false}
          />
          <DefaultField
              placeholder="Barangay"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {userdata[0].email}
              editable = {false}
          />
          <DefaultField
              placeholder="Street"
              placeholderTextColor={black.B005}
              name="map-marker-outline"
              size={25}
              color={black.B004}
              value = {userdata.address}
              editable = {false}
          />
          <View style={{ marginBottom: 50 }} />
        </View>
      </ScrollView>
    </View>
  )
}

export default AccountDetails