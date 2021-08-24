import React, { useEffect, useRef, useState } from 'react'
import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet, Animated, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../assets/colors'
import { connect } from 'react-redux'
import { PrimaryButton } from './Button'

const { width } = Dimensions.get('screen')


const HomeDetails = ({ navigation, route }) => {
    const details = route.params

    const translation = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(translation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true

        }).start()
    }, [])

    const handleDestinations = () => {
        navigation.navigate('Destinations')
    }


    return (
        <SafeAreaView>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Image source={details.image} style={styles.imgs} />
                    <View style={styles.iconBg}>
                        <Icon name="arrow-back" size={25} color={COLORS.white}
                            onPress={navigation.goBack}
                        />
                    </View>
                </View>

                <Animated.View style={{ ...styles.desc, transform: [{ translateX: translation }], opacity: translation }}>
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: "#333" }}>{details.name}</Text>
                        <Text style={{ fontSize: 15, color: COLORS.primary }}>Location : {details.dest}</Text>
                    </View>
                    <Text style={styles.descFullText}>{details.desc}</Text>
                </Animated.View>

                <PrimaryButton title="Explore Destinations" onPress={() => handleDestinations()} />

            </ScrollView>

        </SafeAreaView>

    )
}


export default HomeDetails;


const styles = StyleSheet.create({
    desc: {
        margin: 20,
    },
    descFullText: {
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'justify',
        paddingTop: 14
    },
    iconBg: {
        backgroundColor: COLORS.primary,
        width: 40,
        height: 40,
        borderRadius: 20,
        position: 'absolute',
        top: 10,
        left: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgs: {
        width: width,
        height: 380,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
    },
    card: {
        height: 320,
        marginHorizontal: 10,
        borderRadius: 20,
        width: 200,
        marginTop: 20,
        marginBottom: 50,
        elevation: 10,
        backgroundColor: COLORS.white
    },
    textCard: {
        fontSize: 18,
        textAlign: 'center',
        color: COLORS.primary
    },
    textCard2: {
        fontSize: 15,
        textAlign: 'center',
        color: COLORS.grey
    },

})