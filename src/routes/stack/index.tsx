import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Stack, Tab } from '../../../App'
import Tabs from '../layouts'
import Login from '../../screens/temp/login'
import Splash from '../../screens/temp/splash'
import Joinas from '../../screens/temp/joinas'

type Props = {}

const  Stacks: React.FC = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name = 'splash'
                component={Splash}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name='Login'
                component={Login}
                options={{
                    headerShown: false,
                }}

            />
            <Stack.Screen
                name='Joinas'
                component={Joinas}
                options={{
                    headerShown: false,
                }}

            />
            <Stack.Screen
                name='Tab'
                component={Tabs}
                options={{
                    headerShown: false,
                }}

            />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Stacks