import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Icons from 'react-native-vector-icons/AntDesign'
import COLORS from '../assets/colors'

const PrimaryButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.btnPrimary}>
                <Icon name="align-center" color={COLORS.white} size={25} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const SecondaryButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={{ ...styles.btnPrimary, backgroundColor: COLORS.primary, height: 50, marginHorizontal: 5, }}>
                <Icon name="chevrons-right" color={COLORS.white} size={25} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const SuccessButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={{ ...styles.btnPrimary, backgroundColor: COLORS.success, height: 50, marginHorizontal: 5, }}>
                <Icon name="chevrons-right" color={COLORS.white} size={25} />
                <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const StoryButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={{ ...styles.btnMap, backgroundColor: COLORS.success }}>
                <Icons name="picture" color={COLORS.white} size={18} />
                <Text style={{ fontSize: 15, color: COLORS.white, paddingLeft: 5 }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}


const MapButton = ({ title, onPress = () => { } }) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.btnMap}>
                <Icons name="swap" color={COLORS.white} size={18} />
                <Text style={{ fontSize: 15, color: COLORS.white, paddingLeft: 5 }}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnPrimary: {
        height: 60,
        marginHorizontal: 10,
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20,
    },
    btnMap: {
        height: 30,
        backgroundColor: COLORS.secondary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        paddingHorizontal: 5
    },
    text: {
        fontSize: 17,
        fontWeight: '900',
        color: COLORS.white,
        paddingLeft: 20
    }
})

export { PrimaryButton, SecondaryButton, SuccessButton, MapButton, StoryButton }