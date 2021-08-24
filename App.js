import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import BottomNavigator from './components/BottomNavigator'
import HomeDetails from './components/HomeDetails'
import StoryHome from './components/StoryHome'
import { Provider } from 'react-redux'
import { store } from './store/store'


const Stack = createStackNavigator()

export default function App() {
  return (

    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={BottomNavigator} />
          <Stack.Screen name='HomeDetails' component={HomeDetails} />
          <Stack.Screen name='StoryHome' component={StoryHome} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>


  )
}
