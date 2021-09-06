import React from 'react'
import { View, Text, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'


export default function Onboard({ navigation }) {

    return (
        <Onboarding
            imageContainerStyles={{}}
            bottomBarColor="#e4f0e7"
            onSkip={() => navigation.navigate("Home")}
            onDone={() => navigation.navigate("Home")}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/onboard1.png')} style={{ width: 200, height: 200 }} />,
                    title: 'RwTravels',
                    subtitle: 'If you are looking to visit Rwanda, We help you find interesting travel destinations!',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/onboard2.png')} style={{ width: 200, height: 200 }} />,
                    title: 'Camping sites',
                    subtitle: 'Campsite or camping pitch is a place used for overnight stay in an outdoor area',
                },
                {
                    backgroundColor: '#fff',
                    image: <Image source={require('../assets/images/onboard3.png')} style={{ width: 200, height: 200 }} />,
                    title: 'Hills Hiking',
                    subtitle: 'Usually on trails or footpaths in the countryside. Walking for pleasure developed in Rwanda',
                }
            ]}
        />
    )
}
