import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import COLORS from '../assets/colors'

export default function Maps({ route }) {

    const [lat, setLat] = useState(0)
    const [long, setLong] = useState(0)
    const dest = route.params

    useEffect(() => {
        handleCoordinates()
    }, [long, lat])


    const handleCoordinates = () => {
        switch (true) {
            case dest.name == 'Eastern Province':
                setLat(-1.8797097975908827)
                setLong(30.70383448842529)
                break;

            case dest.name == 'Western Province':
                setLat(-1.8164718)
                setLong(29.3488091)
                break;

            case dest.name == 'Northern Province':
                setLat(-1.440600)
                setLong(29.770605)
                break;

            case dest.name == 'Southern Province':
                setLat(-2.5888106)
                setLong(29.7431462)
                break;

            case dest.name == 'Kigali City':
                setLat(-1.9428926)
                setLong(30.0313941)
                break;

        }
    }



    return (
        <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
                latitude: lat,
                longitude: long,
                latitudeDelta: 0.15,
                longitudeDelta: 0.121,
            }}
        >
            <Marker
                style={styles.icon}
                coordinate={{
                    latitude: lat,
                    longitude: long,

                }}
                image={require('../assets/images/marker.png')}
            >
                <Callout tooltip>
                    <View>
                        <View style={styles.bubble}>
                            <Text style={styles.name}>{dest.name}</Text>
                            <Text>{`Area of interest in Rwanda's ${dest.name}`}</Text>
                        </View>
                        <View style={styles.arrowBorder} />
                        <View style={styles.arrow} />
                    </View>

                </Callout>
            </Marker>
        </MapView>

    )
}

const styles = StyleSheet.create({

    map: {
        height: '100%'
    },
    icon: {
        width: 30,
        height: 30
    },
    bubble: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 6,
        borderWidth: 0.5,
        padding: 10,
        width: 200,

    },
    name: {
        fontSize: 16,
        color: COLORS.primary,
    },
    arrow: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#fff',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -32
    },
    arrowBorder: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderTopColor: '#007a87',
        borderWidth: 16,
        alignSelf: 'center',
        marginTop: -0.5
    },
});
