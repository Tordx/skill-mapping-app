import { View, Text, StatusBar } from 'react-native'
import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Stacks from './src/routes/stack';
import { theme } from './src/assets/colors';

export const Tab = createBottomTabNavigator();
export const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <>
      <Stacks/>
      <StatusBar backgroundColor={theme.light} barStyle={'dark-content'} />
    </>
  )
}

export default App