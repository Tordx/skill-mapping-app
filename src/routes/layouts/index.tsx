import { View, Text } from 'react-native'
import React from 'react'
import { Tab } from '../../../App'
import Home from '../../screens/home/freelance/home'
import Notification from '../../screens/home/freelance/notification'
import Saved from '../../screens/home/freelance/saved'
import Account from '../../screens/home/freelance/account'


const Tabs: React.FC = () => {

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