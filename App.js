import React, { useState, useEffect } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from './components/BottomNavigator'

import HomeDetails from './components/HomeDetails'
import StoryHome from './components/StoryHome'
import { Provider } from 'react-redux'
import { store } from './store/store'
import Maps from './components/Maps'
import Onboard from './components/Onboarding'


const Stack = createStackNavigator()

export default function App() {

  const [firstLaunch, setFirstLaunch] = useState(null)
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setFirstLaunch(true)
      }
      else {
        setFirstLaunch(false)
      }
    })
  }, [])

  if (firstLaunch === null) {
    return null
  } else if (firstLaunch === true) {
    return (
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboard" component={Onboard} />
            <Stack.Screen name="Home" component={BottomNavigator} />
            <Stack.Screen name='HomeDetails' component={HomeDetails} />
            <Stack.Screen name='StoryHome' component={StoryHome} />
            <Stack.Screen name='Maps' component={Maps} />
          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
    )
  }
  else {
    return <BottomNavigator />
  }



}
