import { View, Text, ScrollView, Pressable, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { application } from '../../../../../library/constants'
import { styles } from '../../../../../styles'
import { GoBack, LogButton } from '../../../../../global/partials/buttons'
import { black, theme, transparent, white } from '../../../../../assets/colors'
import { DefaultField } from '../../../../../global/partials/fields'
import { acceptapplication, confirmapplication, rejectapplication } from '../../../../../firebase'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import { Loadingmodal } from '../../../../../global/partials/modals'

interface OpeningItem {
  [key: string]: string;
}
export const CurrentApplication: React.FC = () => {

const {applicationdata} = useSelector((action: application) => action._applicationdata)
const [formatteddate, setformatteddate] = useState('');
const [when, setwhen] = useState('');
const [where, setwhere] = useState('');
const [time, settime] = useState('');
const [openmodal, setopenmodal] = useState(false)
const [loading, setloading] = useState(false)
const navigation = useNavigation()

	useEffect(() => {
		 const timeagocheck = () => {
      if (applicationdata.formattedTime) {
        const timestamp = new Date(applicationdata.formattedTime);
        const formattedTime = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const formattedDate = `${timestamp.getMonth() + 1}/${timestamp.getDate()}/${timestamp.getFullYear()}`;
        setformatteddate(`${formattedTime} - ${formattedDate}`);
      }
    };
		timeagocheck()
	})

	const accepted = async() => {
		try {
			setloading(true)
			
				await confirmapplication(applicationdata, navigation)
			.then(async() =>{
				await firestore().collection('application').doc(applicationdata.applicationid).update({
				isaccepted: true,
			})
				setopenmodal(false)
				setloading(false)

			})
		} catch (error) {
			console.error(error)
			setloading(false)
		}
	}

	const reject = async() => {
		await firestore().collection('application').doc(applicationdata.applicationid).update({
			isaccepted: true,
		}).then(async() =>{
			await rejectapplication(applicationdata, navigation)
			setopenmodal(false)
		})
	}



	const opening: OpeningItem[] = [
		{
		"New Application": `You have received a new job application for the ${applicationdata.jobtitle}`
		},
		{
		"Interview Accepted": `Good news! The employer has accepted your job application for ${applicationdata.jobtitle} role`
		},
		{
		"Interview Declined": `Regretfully, the applicant has declined your interview invitation for the ${applicationdata.jobtitle}`
		},
		{
		"Interview Confirmation": `You have confirmed your scheduled interview for ${applicationdata.jobtitle}`
		}
	]
	const matchingOpening = opening.find((item: OpeningItem) => item[applicationdata.notiftitle]);
  return (
    <View style = {styles.container}>
			<ScrollView style = {styles.scrollview}>
			  <View style = {{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center',}}>
    	<View style = {{width: ' 95%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fbea', borderRadius: 10, marginTop: '20%'}}>
				<View style = {{width: '98%', padding: 20, justifyContent: 'center', alignItems: 'flex-start'}}>	
					<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginBottom: 20}}>Title: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.notiftitle}</Text></Text>
					{matchingOpening && (
					<View>
						<Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17, color: black.main}}>{matchingOpening[applicationdata.notiftitle]}</Text>
					</View>
					)}
					{applicationdata.notiftitle === 'New Application' &&
						<>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 20}}>Applicant Details:</Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Name: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.fullname}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Email: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.email}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Phone: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.contactnumber}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Applied on: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{formatteddate}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17, color: black.main, marginVertical: 20}}>Please review the attached application documents</Text>
							<Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17, color: black.main, marginVertical: 20}}>Take time to evaluate the applicant's qualification, experience, and suitability for the position. Consider scheduling an interview or discussin gnext steps with the candidate.</Text>
							<Text style = {{fontFamily: 'Montserrat-Italic', fontSize: 17, color: black.main, marginVertical: 20}}>Thank you for your attention to this matter.</Text>
							
						</>
					}
					{applicationdata.notiftitle === 'Interview Accepted' &&
						<>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 20}}>Interview Schedule Details:</Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Name: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.fullname}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Interview Date: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.when}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Interview Time: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.time}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Location: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.where}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17, color: black.main, marginVertical: 20}}>Please confirm the interview request accordingly, or you may reject if the time and date is not applicable for you.</Text>
							<View style = {{flexDirection: 'row', marginTop: 5, justifyContent: 'center', alignSelf: 'center'}}>
								<Pressable onPress={accepted} style = {{marginRight: 5, backgroundColor: theme.primary, borderRadius: 5}}>
									<Text style = {{color: white.main, padding: 7}}>Accept</Text>
								</Pressable>
								<Pressable onPress={reject} style = {{marginRight: 5, backgroundColor: black.B004, borderRadius: 5}}>
									<Text style = {{color: white.main, padding: 7}}>Reject</Text>
								</Pressable>
										</View>
						</>
					}
						{applicationdata.notiftitle === 'Interview Declined' &&
						<>
							<Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17, color: black.main, marginVertical: 20}}>Regretfully, the applicant has declined your interview invitation for the {applicationdata.jobtitle}</Text>
							<Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17, color: black.main, marginVertical: 20}}>We appreciate your understanding. We will continue evaluating other candidates and keep you updated.</Text>
						</>
					}
					{applicationdata.notiftitle === 'Interview Confirmation' &&
						<>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 20}}>Interview Details:</Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Name: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.fullname}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Interview Date: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.when}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Interview Time: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.time}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Bold', fontSize: 17, color: black.main, marginVertical: 5}}>Location: <Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17}}>{applicationdata.where}</Text></Text>
							<Text style = {{fontFamily: 'Montserrat-Regular', fontSize: 17, color: black.main, marginVertical: 20}}>Please prepare for the interview accordingly.</Text>
							
						</>
					}
				</View>
			</View>
			<View style = {{position: 'absolute', top: 30}}>
				<Text style = {[styles.h1, {textAlign: 'center', width: '100%'}]}>Notification</Text>
			</View>
			<GoBack onPress={() => navigation.goBack()}/>
			</View>
			</ScrollView>
			<Modal transparent statusBarTranslucent visible = {openmodal} onRequestClose={() => setopenmodal(false)}>
				<View style = {[styles.container, {backgroundColor: transparent.level05}]}>
					<View style = {{width: '95%', justifyContent: 'center', alignItems: 'center', backgroundColor: theme.light, borderRadius: 10}}>
							<View style = {{marginVertical: 15}}/>
								<Text style = {[styles.h1, {textAlign: 'center'}]}>Additional Information</Text>
							<View style = {{marginVertical: 15}}/>
							<DefaultField
								name='calendar-outline'
								size={25}
								placeholder='Interview Date'
								value= {when}
								onChangeText={(e) => setwhen(e)}
							/>
							<DefaultField
								name='clock-outline'
								size={25}
								placeholder='Interview Time'
								value= {time}
								onChangeText={(e) => settime(e)}
							/>
							<DefaultField
								name='map-marker-outline'
								size={25}
								placeholder='Interview Place'
								value = {where}
								onChangeText={(e) => setwhere(e)}
							/>
							<View style = {{marginVertical: 15}}/>
							<LogButton title='Send' onPress={() => accepted()}/>
							<View style = {{marginVertical: 15}}/>
					</View>
				</View>
			</Modal>
			<Loadingmodal title='Accepting Interview...'  visible = {loading}/>
    </View>
  )
}
