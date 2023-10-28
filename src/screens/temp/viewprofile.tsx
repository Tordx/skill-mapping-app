import { View, Text, ScrollView, Image, Linking, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from '../../styles'
import { useSelector } from 'react-redux'
import { data } from '../../library/constants'
import firestore from '@react-native-firebase/firestore'
import { black, success, theme } from '../../assets/colors'
import { GoBack } from '../../global/partials/buttons'
import { useNavigation } from '@react-navigation/native'
import { Chip } from 'react-native-paper'

interface id {
	uid: string,
	_profileuiddata: any,
}

const ViewProfile = () => {

	const {profileuid} = useSelector((action: id) => action._profileuiddata)
	const [profile, setprofile] = useState<data[]>([])
	const navigation = useNavigation()
	console.log(profile)

	const fetchProfile = async () => {
		try {
			const snapshot = await firestore().collection('user').where('uid', '==', profileuid).get();
			if (!snapshot.empty) {
				const profiles: data[] = [];
				snapshot.forEach((doc) => {
					profiles.push(doc.data() as data);
				});
				setprofile(profiles);
			}
		} catch (error) {
			console.error('Error fetching profile:', error);
		}
	}

	useEffect(() => {
		fetchProfile();
	}, []);

	const dlfile = async(url: string) => {
		await Linking.canOpenURL(url).then((res) =>{
			if(res){
				Linking.openURL(url)
			} else {
				ToastAndroid.show("Device won't open the Link", ToastAndroid.LONG)
			}
		})
	}

  return (
    <View style = {styles.container}>
			<ScrollView style = {styles.scrollview}>
				<View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
				<View style = {{width: 100, height: 100, borderColor: theme.primary, borderWidth: 5, borderRadius: 500, justifyContent: 'center', alignItems: 'center', marginTop: 75, marginBottom: 25}}>
            <Image source={{uri: profile[0]?.photoURL || 'https://i.imgur.com/AivI1mB.png'}} resizeMode='cover' style = {{width: '90%', height: '90%', borderRadius: 500}}/>
        </View>
        <Text style={[styles.h4, { fontFamily: 'Montserrat-SemiBold', marginBottom: 10 }]}>
             {profile[0]?.fullname[0].firstname} {profile[0]?.fullname[1].middlename}  {profile[0]?.fullname[2].lastname} {profile[0]?.fullname[3]?.suffix} 
        </Text>
				{profile[0]?.gender && <Text style = {{ fontFamily: 'Montserrat-Regular', color: black.main, fontSize: 15}}>{profile[0]?.gender}</Text>}
				<Text style = {{ fontFamily: 'Montserrat-Bold', color: black.main, fontSize: 18}}>Skills</Text>
				<View style = {{flexDirection: 'row', marginVertical: 20}}>
				{profile[0]?.skills && profile[0].skills?.length > 0 && 
          <View style = {{flexDirection: 'column', marginVertical: 20, justifyContent: 'flex-start',}}>
          {profile[0].skills?.map((requirement: any, index: any) => (
            <Chip 
              style = {{marginRight: 10, backgroundColor:  success.G008, padding: 5, marginTop: 5}} 
              textStyle = {{color: black.main}}
              onPress={(e) => console.log(e)}
            >{requirement}</Chip>
          ))}
          </View>}
					</View>
					<Text style = {{ fontFamily: 'Montserrat-Bold', color: black.main, fontSize: 18}}>Competencies</Text>
					<View style = {{flexDirection: 'row', marginVertical: 20}}>
					{profile[0]?.competencies && profile[0].competencies?.length > 0 && 
          <View style = {{flexDirection: 'column', marginVertical: 20, justifyContent: 'flex-start',}}>
          {profile[0].competencies?.map((requirement: any, index: any) => (
            <Chip 
              style = {{marginRight: 10, backgroundColor:  success.G008, padding: 5, marginTop: 5}} 
              textStyle = {{color: black.main}}
              onPress={(e) => console.log(e)}
            >{requirement}</Chip>
          ))}
          </View>}
					</View>
					<Text style = {{ fontFamily: 'Montserrat-Bold', color: black.main, fontSize: 18}}>Proof of Competencies</Text>
					<View style = {{flexDirection: 'row', marginVertical: 20}}>
					{profile[0]?.files && profile[0].files?.length > 0 && 
          <View style = {{flexDirection: 'column', marginVertical: 20, justifyContent: 'flex-start',}}>
          {profile[0].files?.map((requirement: any, index: any) => (
            <Chip 
              style = {{marginRight: 10, backgroundColor:  success.G008, padding: 5, marginTop: 5}} 
              textStyle = {{color: black.main}}
              onPress={() => dlfile(requirement)}
            >file {index}</Chip>
          ))}
          </View>}
					</View>
				</View>
				<GoBack onPress={() => navigation.goBack()} />
			</ScrollView>
    </View>
  )
}

export default ViewProfile