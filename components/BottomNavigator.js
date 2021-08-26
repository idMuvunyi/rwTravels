import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home';
import Icon from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/Entypo';
import Destinations from './Destinations';
import COLORS from '../assets/colors';
import Profile from './Profile';


const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                style: {
                    height: 60,
                    paddingBottom: 10,
                    marginVertical: 15,
                    marginHorizontal: 10,
                    elevation: 5,
                    borderRadius: 10,
                    borderColor: COLORS.secondary,
                    borderWidth: 0.5,
                    backgroundColor: COLORS.white
                },

            }}>
            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={28} />
                    ),
                }}
            />

            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.userBtn}>
                            <Icon name="user" color={focused ? COLORS.primary : COLORS.white} size={20} />
                        </View>

                    )
                }}
            />

            <Tab.Screen name="Destinations" component={Destinations}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icons name="colours" color={color} size={28} />
                    )
                }}
            />


        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    userBtn: {
        top: -20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5
    }
})
