import { View, Text } from 'react-native'
import React from 'react'
import { Tab } from '../../../App'
import Login from '../../screens/temp/login'


const Tabs: React.FC = () => {

  return (

   <Tab.Navigator>
      <Tab.Screen
        name='Login'
        component={Login}
        options = {{
          headerShown: false,
        }}
      />
   </Tab.Navigator>



  )
}

export default Tabs