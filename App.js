import React from 'react'
import { View, Text } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import BottomNavigator from './components/BottomNavigator'
import HomeDetails from './components/HomeDetails'

const Stack = createStackNavigator()

export default function App() {
  return (
   <NavigationContainer>
   <Stack.Navigator screenOptions={{headerShown:false}}>
     <Stack.Screen name="Home" component={BottomNavigator} />
     <Stack.Screen name='HomeDetails' component={HomeDetails} />
   </Stack.Navigator>
   </NavigationContainer>
  )
}
