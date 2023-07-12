import { View, BackHandler } from 'react-native'
import React from 'react'
import { Tab } from '../../../App'
import Home from '../../screens/home/freelance/home'
import Notification from '../../screens/home/freelance/notification'
import Saved from '../../screens/home/freelance/saved'
import Account from '../../screens/home/freelance/account'
import { useFocusEffect } from '@react-navigation/native'


const Tabs: React.FC = () => {

  useFocusEffect(() => {
    const exit = () =>{
      BackHandler.exitApp()
      return true
    }
    const handler = BackHandler.addEventListener('hardwareBackPress', exit)
      return() => handler.remove()
  })

  return (

   <Tab.Navigator>
      <Tab.Screen
        name='Home'
        component={Home}
        options = {{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Notification'
        component={Notification}
        options = {{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Saved'
        component={Saved}
        options = {{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name='Account'
        component={Account}
        options = {{
          headerShown: false,
        }}
      />
   </Tab.Navigator>



  )
}

export default Tabs