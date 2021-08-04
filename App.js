import React from 'react'
import { View, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import BottomNavigator from './components/BottomNavigator'
import HomeDetails from './components/HomeDetails'
import StoryHome from './components/StoryHome'
import { AuthProvider } from './auth/authProvider'


const Stack = createStackNavigator()

export default function App() {
  return (
    <AuthProvider>
   <NavigationContainer>
   <Stack.Navigator screenOptions={{headerShown:false}}>
     <Stack.Screen name="Home" component={BottomNavigator} />
     <Stack.Screen name='HomeDetails' component={HomeDetails} />
     <Stack.Screen name='StoryHome' component={StoryHome} />
   </Stack.Navigator>
   </NavigationContainer>
   </AuthProvider>
  )
}
