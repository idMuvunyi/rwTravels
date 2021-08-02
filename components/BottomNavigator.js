import React from 'react'
import { View, Text } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Home from './Home';
import Icon from 'react-native-vector-icons/AntDesign';
import Destinations from './Destinations';


const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <Tab.Navigator
        tabBarOptions={{
            style:{
                height:60,
                borderTopWidth:1,
                elevation:2
            },
            showLabel:false
            
        }}>
            <Tab.Screen name='Home' component={Home}
            options={{
          tabBarIcon: ({ color }) => (
            <Icon name="home" color={color} size={32} />
          ),
        }}
            />

            <Tab.Screen name="Destinations" component={Destinations}
            options={{
                tabBarIcon:({color}) => (
                    <Icon name="rocket1" color={color} size={32} />
                )
            }}
            />
        </Tab.Navigator>
    )
}
