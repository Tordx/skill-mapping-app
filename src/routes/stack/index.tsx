import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { Stack, Tab } from '../../../App'
import {EmployerTabs, Tabs} from '../layouts'
import Login from '../../screens/temp/login'
import Splash from '../../screens/temp/splash'
import Joinas from '../../screens/temp/joinas'
import UserCreate from '../../screens/temp/usercreate'
import Employercreate from '../../screens/temp/employercreate'
import Verification from '../../screens/temp/verification'
import Forgot from '../../screens/temp/forgot'
import Forgotsent from '../../screens/temp/forgotsent'
import AccountDetails from '../../screens/contents/home/employer/details'

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
                name='Tabs'
                component={Tabs}
                options={{
                    headerShown: false,
                }}

            />
            <Stack.Screen
                name='EmployerTabs'
                component={EmployerTabs}
                options={{
                    headerShown: false,
                }}

            />
            <Stack.Screen
                name='Usercreate'
                component={UserCreate}
                options={{
                    headerShown: false,
                }}

            />
            <Stack.Screen
                name='Employercreate'
                component={Employercreate}
                options={{
                    headerShown: false,
                }}

            />
            <Stack.Screen
                name='Verification'
                component={Verification}
                options={{
                    headerShown: false,
                }}

            />
            <Stack.Screen
            name='Forgot'
            component={Forgot}
            options={{
                headerShown: false,
            }}

             />
             <Stack.Screen
            name='Forgotsent'
            component={Forgotsent}
            options={{
                headerShown: false,
            }}

             />
            <Stack.Screen
            name='AccountDetails'
            component={AccountDetails}
            options={{
                headerShown: false,
            }}

             />
            
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Stacks