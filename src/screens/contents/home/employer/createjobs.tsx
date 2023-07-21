import { View, Text, ToastAndroid, Alert } from 'react-native'
import React, {useState} from 'react'
import { BudgetField, DefaultField, Multitextfield } from '../../../../global/partials/fields';
import { styles } from '../../../../styles';
import { black, success, theme, white } from '../../../../assets/colors';
import { GoBack, JoinasButton, LogButton, NextButton, PrevButton } from '../../../../global/partials/buttons';
import { Chip, RadioButton } from 'react-native-paper';
import { firebase } from '@react-native-firebase/auth';
import { getSpecificData } from '../../../../firebase';
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

  interface Props {
  position: number;
  setposition: React.Dispatch<React.SetStateAction<number>>;
}

const Createjobs: React.FC<Props> = ({position, setposition}) => {

    const [jobtitle, setjobtitle] = useState('');
    const [joblocation, setjoblocation] = useState('');
    const [requirements, setrequirements] = useState <string[]>([]);
    const [requirementvalue, setrequirementvalue] = useState('');
    const [type, settype] = useState('');
    const [scope, setscope] = useState('');
    const [budget, setbudget] = useState(0);
    const [pertimeframe, setpertimeframe] = useState('');
    const [description, setdescription] = useState('');
    const [qualification, setqualification] = useState('');
    const [userid, setuserid] = useState('');
    const [fullname, setfullname] = useState('');
    const [timestamp, settimestamp] = useState(null);
    const navigation = useNavigation()
    const handleDelete = (index: number) => {
      const updatedRequirements = [...requirements];
      updatedRequirements.splice(index, 1);
      setrequirements(updatedRequirements);
    };

    const handleKeyPress = (e:any) => {

      const nativeEvent = e.nativeEvent.key

      console.log(nativeEvent);
      
      if(nativeEvent == " ") {
        console.log('weh pressed');
        setrequirements([...requirements, requirementvalue]);
        setrequirementvalue(''); 
      }
    };

    const prevpos = () => {
      console.log('i am pressed');
      
      setposition((prevPosition) => prevPosition - 1);
    }
    
    const submit = () => {
      if(position === 8) {
        confirm()
      } if (position === 7){
        if(!qualification) {
          ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
        } else {
        setposition(position + 1)
        }
      } if (position === 6){
        if(!description) {
          ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
        } else {
        setposition(position + 1)
        }
      } if (position === 5){
        if(!pertimeframe) {
          ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
        } else {
          setposition(position + 1)
        }
      }  if (position === 4){
        if(!scope) {
          ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
        } else {
        setposition(position + 1)
        }
      } if (position === 3){
        if(!type) {
          ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
        } else {
        setposition(position + 1)
        }
      } if (position === 2) {
        if(!requirements){
          ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
        } else {
          setposition(position + 1)
        }
      } if(position === 1) {
        if(!jobtitle){
          ToastAndroid.show('Some fields might be blank', ToastAndroid.LONG)
        } else {
          setposition(position + 1)
        }
      }
    }

    const confirm = async () => {
    
      Alert.alert(
        'Confirmation',
        'Are you sure you want to post this job?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async() => {
  
              handleSave()
  
              console.log('Post archived/deleted');
            },
            style: 'destructive',
          },
        ],
        { cancelable: false }
      );
    };

    const handleSave = async() => {
      try {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp()
            const user = firebase.auth().currentUser;
            const getid = firestore().collection('job-post').doc().id;
            console.log(user);
            await firestore().collection('job-post').doc().set({
              jobtitle: jobtitle,
              joblocation: joblocation,
              requirements: requirements,
              type: type,
              scope: scope,
              budget: budget,
              pertimeframe: pertimeframe,
              description: description,
              jobid: getid,
              qualification: qualification,
              photoURL: user?.photoURL,
              userid: user?.uid,
              fullname: user?.displayName,
              timestamp: timestamp,
              status: true,
          }).then(async(response) => {
              ToastAndroid.show('HELLO', ToastAndroid.LONG)
              setposition(position = 1)
          });
      } catch (error) {
        console.log(`error: ${error}`);
      }
    }
  


  return (
    
    <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
    {position == 1 && 
       <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <Text style={[styles.h1, {width: '95%'}]}>
          Write a title for your job post
        </Text>
        <Text style = {{textAlign: 'left', fontSize: 16, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 50, color: black.main}}>This helps your job stand out to the right candidates. It’s the first thing they’ll see, so make it count!</Text>
        <DefaultField
          placeholder="Write a title for your job post"
          placeholderTextColor={black.B005}
          size={25}
          color={black.B004}
          value = {jobtitle}
          onChangeText={(value) => setjobtitle(value)}
        />
        <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', marginTop: 50, marginBottom: 25, color: black.main}}>Example Titles</Text>
        <Text style = {{textAlign: 'left', fontSize: 12, width: '90%', fontFamily: 'Montserrat-Regular', marginBottom: 15, color: black.main}}>• Build responsive WordPress website with booking</Text>
        <Text style = {{textAlign: 'left', fontSize: 12, width: '90%', fontFamily: 'Montserrat-Regular', marginBottom: 15, color: black.main}}>• Graphic Designer needed to design ads for multiple projects</Text>
        <Text style = {{textAlign: 'left', fontSize: 12, width: '90%', fontFamily: 'Montserrat-Regular', marginBottom: 15, color: black.main}}>• Facebook manager specialist needed for business</Text>
        <NextButton onPress={submit}/>
        </View>
    }
    {position == 2 && 
      <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <Text style={[styles.h1, {width: '95%', marginBottom: 30}]}>
         What are the main skills required for your work?
        </Text>
        <DefaultField
          placeholder="Write a title for your job post"
          placeholderTextColor={black.B005}
          size={25}
          color={black.B004}
          value = {requirementvalue}
          onChangeText={(e) => setrequirementvalue(e)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <Text style = {{textAlign: 'left', fontSize: 16, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 5, color: black.main}}>For best results, add 3-5 skills</Text>
        <View style = {{flexDirection: 'row', marginVertical: 20}}>
                  {requirements?.map((requirement: any, index: any) => (
                    <Chip 
                      style = {{marginRight: 10, backgroundColor:  success.G008}} 
                      textStyle = {{color: black.main}}
                      onPress={() => handleDelete(index)}
                    >{requirement}</Chip>
                  ))}
        </View>
        <View style = {{width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 25}}>
       <PrevButton onPress={prevpos}/>
       <NextButton onPress={submit}/>
       </View>  
        </View>
    }
    {position == 3 && 
        <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <Text style={[styles.h1, {width: '90%', marginTop: 30}]}>
         Next, Estimate the scope of your work
        </Text>
        <Text style = {{textAlign: 'left', fontSize: 16, width: '90%', fontFamily: 'Montserrat-Regular', marginTop: 50, color: black.main}}>This helps your job stand out to the right candidates.</Text>
        <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%',marginTop: 25}}>
          <RadioButton 
            value={type} 
            onPress={() => settype('Full-time')} 
            status={ type === 'Full-time' ? 'checked' : 'unchecked' }
            color= {theme.accentd}
          />
          <View style = {{width: '100%',flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
            <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', color: black.main}}>Full-time</Text>
            <Text style = {{textAlign: 'left', fontSize: 12, width: '95%', fontFamily: 'Montserrat-Regular', color: black.main}}>Longer term or complex initiative (ex. design and build a full website)</Text>
          </View>
        </View>
        <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%',marginTop: 25}}>
          <RadioButton 
            value={type} 
            onPress={() => settype('Part-time')} 
            status={ type === 'Part-time' ? 'checked' : 'unchecked' }
            color= {theme.accentd}
          />
          <View style = {{width: '100%',flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
            <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', color: black.main}}>Part-time</Text>
            <Text style = {{textAlign: 'left', fontSize: 12, width: '95%', fontFamily: 'Montserrat-Regular', color: black.main}}>Well-defined projects (ex. a landing page)</Text>
          </View>
        </View>
        <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%',marginTop: 25}}>
          <RadioButton 
            value={type} 
            onPress={() => settype('Seasonal')} 
            status={ type === 'Seasonal' ? 'checked' : 'unchecked' }
            color= {theme.accentd}
          />
          <View style = {{width: '100%',flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
            <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', color: black.main}}>Seasonal</Text>
            <Text style = {{textAlign: 'left', fontSize: 12, width: '95%', fontFamily: 'Montserrat-Regular', color: black.main}}>Temporary employment in which the person works during certain times of the year</Text>
          </View>
        </View>
        <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', color: black.main, marginTop: 35}}>Job Location</Text>
        <DefaultField
          placeholder="Work Address / Remote "
          placeholderTextColor={black.B005}
          size={25}
          color={black.B004}
          value = {joblocation}
          onChangeText={(e) => setjoblocation(e)}
          onKeyPress={(e) => handleKeyPress(e)}
        />
        <View style = {{width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 25}}>
       <PrevButton onPress={prevpos}/>
       <NextButton onPress={submit}/>
       </View>  
        </View>
    }
    {position == 4 && 
       <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <Text style={[styles.h1, {width: '90%', marginTop: 30}]}>
         Next, Estimate the scope of your work
        </Text>
        <Text style = {{textAlign: 'left', fontSize: 16, width: '90%', fontFamily: 'Montserrat-Regular', marginTop: 50, color: black.main}}>This helps your job stand out to the right candidates.</Text>
        <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%',marginTop: 25}}>
          <RadioButton 
            value={scope} 
            onPress={() => setscope('Full-time')} 
            status={ scope === 'Full-time' ? 'checked' : 'unchecked' }
            color= {theme.accentd}
          />
          <View style = {{width: '100%',flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
            <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', color: black.main}}>Large</Text>
            <Text style = {{textAlign: 'left', fontSize: 12, width: '95%', fontFamily: 'Montserrat-Regular', color: black.main}}>Longer term or complex initiative (ex. design and build a full website)</Text>
          </View>
        </View>
        <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%',marginTop: 25}}>
          <RadioButton 
            value={scope} 
            onPress={() => setscope('Part-time')} 
            status={ scope === 'Part-time' ? 'checked' : 'unchecked' }
            color= {theme.accentd}
          />
          <View style = {{width: '100%',flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
            <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', color: black.main}}>Medium</Text>
            <Text style = {{textAlign: 'left', fontSize: 12, width: '95%', fontFamily: 'Montserrat-Regular', color: black.main}}>Well-defined projects (ex. a landing page)</Text>
          </View>
        </View>
        <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '85%',marginTop: 25}}>
          <RadioButton 
            value={scope} 
            onPress={() => setscope('Seasonal')} 
            status={ scope === 'Seasonal' ? 'checked' : 'unchecked' }
            color= {theme.accentd}
          />
          <View style = {{width: '100%',flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', }}>
            <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', color: black.main}}>Small</Text>
            <Text style = {{textAlign: 'left', fontSize: 12, width: '95%', fontFamily: 'Montserrat-Regular', color: black.main}}>Longer term or complex initiative (ex. design and build a full website)</Text>
          </View>
        </View>
        <View style = {{width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 25}}>
       <PrevButton onPress={prevpos}/>
       <NextButton onPress={submit}/>
       </View>  
        </View>
    }
    {position == 5 && 
        <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <Text style={[styles.h1, {width: '90%', marginTop: 30}]}>
          This will help us match you to talent within your range.
        </Text>
        <Text style = {{textAlign: 'left', fontSize: 16, width: '90%', fontFamily: 'Montserrat-Regular', marginTop: 50, color: black.main}}>This helps your job stand out to the right candidates.</Text>
        <View style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%',marginTop: 25}}>
        <JoinasButton
        title = 'Hourly rate'
        name = 'currency-php'
        onPress={() =>{setpertimeframe('Hour')}}
        size = {20}
        status= {pertimeframe === 'Hour' ? 'checked' : 'unchecked'}
        style = {{borderColor: pertimeframe === 'Hour' ? theme.accentd : black.B005, backgroundColor: pertimeframe === 'Hour' ? theme.accentc : theme.light}}
        radiocolor= {theme.accentd}
        />
        <JoinasButton
        title = 'Project base rate'
        name = 'currency-php'
        onPress={() =>{setpertimeframe('Project Budget')}}
        size = {20}
        status= {pertimeframe === 'Project Budget' ? 'checked' : 'unchecked'}
        style = {{ borderColor: pertimeframe === 'Project Budget' ? theme.accentd : black.B005, backgroundColor: pertimeframe === 'Project Budget' ? theme.accentc : theme.light}}
        radiocolor= {theme.accentd}
        />
          <JoinasButton
        title = 'Negotiable rate'
        name = 'currency-php'
        onPress={() =>{setpertimeframe('$$$')}}
        size = {25}
        status= {pertimeframe === '$$$' ? 'checked' : 'unchecked'}
        style = {{borderColor: pertimeframe === '$$$' ? theme.accentd : black.B005, backgroundColor: pertimeframe === '$$$' ? theme.accentc : theme.light}}
        radiocolor= {theme.accentd}
        />
        </View>
        {pertimeframe !== '$$$'  && 
        <View style = {{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
           <BudgetField style={{width: '35%',height: 45}} 
            placeholder='PHP 000000'
            onChangeText={(e) => setbudget(e)}
          />
         <Text style = {{textAlign: 'center', fontSize: 17, fontFamily: 'Montserrat-Bold', color: black.main}}>  / {pertimeframe}</Text>
        </View>
         
        }
         <View style = {{width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 25}}>
       <PrevButton onPress={prevpos}/>
       <NextButton onPress={submit}/>
       </View>  
        </View>
    }
    {position == 6 && 
        <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <Text style={[styles.h1, {width: '90%', marginTop: 30}]}>
          Tell us about the project.
        </Text>
        <Text style = {{textAlign: 'left', fontSize: 16, width: '90%', fontFamily: 'Montserrat-Regular', marginTop: 25, color: black.main}}>Clear expectations about your project or deliverables.</Text>
        <View style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%',marginTop: 25}}>
       <Multitextfield style={{height: 250, alignContent: 'flex-start'}} value={description} onChangeText={(e) => setdescription(e)}/>
       </View>
       <View style = {{width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 25}}>
       <PrevButton onPress={prevpos}/>
       <NextButton onPress={submit}/>
       </View>  
        </View>
    }
    {position == 7 && 
       <View style = {{width: '100%', justifyContent: 'center', alignItems: 'center',}}>
        <Text style={[styles.h1, {width: '90%', marginTop: 30}]}>
        Last step, start the conversation.
        </Text>
        <Text style = {{textAlign: 'left', fontSize: 16, width: '90%', fontFamily: 'Montserrat-Regular', marginTop: 25, color: black.main}}>It's important to include the specific skills, experience, and education.</Text>
        <View style = {{flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%',marginTop: 25}}>
       <Multitextfield style={{height: 250, alignContent: 'flex-start'}} value={qualification} onChangeText={(e) => setqualification(e)}/>
       </View>
       <View style = {{width: '90%', flexDirection: 'row', justifyContent: 'space-between', marginTop: 25}}>
       <PrevButton onPress={prevpos}/>
       <NextButton onPress={submit}/>
       </View>  
        </View>
    }
    {position === 8 &&
      <View style = {{width: '100%',  justifyContent: 'center', alignItems: 'center',}}>
      <Text style={[styles.h1, {width: '90%', marginTop: 30}]}>Job Details</Text>
      <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', marginTop: 20, marginBottom: 10, color: black.main}}>Title</Text>
      <Text style = {{textAlign: 'left', fontSize: 15, width: '90%', fontFamily: 'Montserrat-Regular', marginBottom: 5, color: black.main}}>{jobtitle}</Text>
      <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', marginTop: 10, marginBottom: 10, color: black.main}}>Budget</Text>
      <Text style = {{textAlign: 'left', fontSize: 15, width: '90%', fontFamily: 'Montserrat-Regular', marginBottom: 5, color: black.main}}>{budget}</Text>
      <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', marginTop: 10, marginBottom: 10, color: black.main}}>Employment Type</Text>
      <Text style = {{textAlign: 'left', fontSize: 15, width: '90%', fontFamily: 'Montserrat-Regular', marginBottom: 5, color: black.main}}>{type}</Text>
      <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', marginTop: 10, marginBottom: 10, color: black.main}}>Project Scope</Text>
      <Text style = {{textAlign: 'left', fontSize: 15, width: '90%', fontFamily: 'Montserrat-Regular', marginBottom: 5, color: black.main}}>{scope}</Text>
      <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', marginTop: 10, marginBottom: 10, color: black.main}}>Description</Text>
      <Text style = {{textAlign: 'left', fontSize: 15, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 10, marginBottom: 10, color: black.main, padding: 20, borderWidth: .5, borderRadius: 5, paddingLeft: 20}}>{description}</Text>
      <Text style = {{textAlign: 'left', fontSize: 17, width: '95%', fontFamily: 'Montserrat-Bold', marginTop: 10, marginBottom: 10, color: black.main,}}>Qualifications</Text>
      <Text style = {{textAlign: 'left', fontSize: 15, width: '95%', fontFamily: 'Montserrat-Regular', marginTop: 10, marginBottom: 10, color: black.main, padding: 20, borderWidth: .5, borderRadius: 5, paddingLeft: 20}}>{qualification}</Text>
       
      <LogButton
            title='Post this Job'
            onPress={submit} 
          />
          </View>}
          </View>
  )
}

export default Createjobs