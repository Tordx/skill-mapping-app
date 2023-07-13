import { View, BackHandler } from 'react-native'
import React from 'react'
import { Tab } from '../../../App'
import Home from '../../screens/home/freelance/home'
import Notification from '../../screens/home/freelance/notification'
import Saved from '../../screens/home/freelance/saved'
import Account from '../../screens/home/freelance/account'
import { useFocusEffect } from '@react-navigation/native'
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons'
import { black, theme, transparent } from '../../assets/colors'


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

   <Tab.Navigator
   
   screenOptions={({ }) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: { borderColor: transparent.level01, height: 75, borderTopLeftRadius: 30, borderTopRightRadius: 30, position: 'absolute', bottom: 0},
    tabBarIconStyle: { height: 20, justifyContent: 'center', alignItems: 'center' },
  })}

   >
      <Tab.Screen
        name='Home'
        component={Home}
        options = {{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <>
            <Icon
            name = {focused ? 'home-variant' : 'home-variant-outline'}
            color = {focused ? theme.accenta : black.B005}
            size = {35}
          />
          <View style = {{marginTop: focused ? 10 : 0,borderTopWidth: focused ? 3 : 0, borderColor: theme.accenta, width: 20}}/>
          </>
          )
        }}
      />
      <Tab.Screen
        name='Notification'
        component={Notification}
        options = {{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <>
            <Icon
            name = {focused ? 'bell' : 'bell-outline'}
            color = {focused ? theme.accenta : black.B005}
            size = {35}
          />
          <View style = {{marginTop: focused ? 10 : 0,borderTopWidth: focused ? 3 : 0, borderColor: theme.accenta, width: 20}}/>
          </>
          )
        }}
      />
      <Tab.Screen
        name='Saved'
        component={Saved}
        options = {{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <>
            <Icon
            name = {focused ? 'book' : 'book-outline'}
            color = {focused ? theme.accenta : black.B005}
            size = {35}
          />
          <View style = {{marginTop: focused ? 10 : 0,borderTopWidth: focused ? 3 : 0, borderColor: theme.accenta, width: 20}}/>
          </>
          )
        }}
      />
      <Tab.Screen
        name='Account'
        component={Account}
        options = {{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <>
            <Icon
            name = {focused ? 'account-circle' : 'account-circle-outline'}
            color = {focused ? theme.accenta : black.B005}
            size = {35}
            />
          <View style = {{marginTop: focused ? 10 : 0,borderTopWidth: focused ? 3 : 0, borderColor: theme.accenta, width: 20}}/>
          </>
          )
        }}
      />
   </Tab.Navigator>



  )
}

export default Tabs