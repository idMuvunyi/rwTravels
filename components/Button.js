import React from 'react'
import { View, Text, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import COLORS from '../assets/colors'

const PrimaryButton = ({ title, onPress = () => {}}) => {
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <View style={styles.btnPrimary}>
                <Icon name="align-center" color={COLORS.white} size={25}/>
               <Text style={styles.text}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btnPrimary:{
        height:60,
        marginHorizontal:10,
        backgroundColor:COLORS.secondary,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        marginBottom:20,
    },
    text:{
        fontSize:17,
        fontWeight:'900',
        color:COLORS.white,
        paddingLeft:20
    }
})

export {PrimaryButton}