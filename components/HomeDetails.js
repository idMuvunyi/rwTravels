import React from 'react'
import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet, TouchableHighlight, Button, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import {PrimaryButton} from "./Button"
import COLORS from '../assets/colors'

const {width} = Dimensions.get('screen')


export default function HomeDetails({navigation, route}) {
    const details = route.params

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
           
            <View style={styles.desc}>
                <View>
                <Text style={{fontSize:25, fontWeight:'bold', color:COLORS.grey}}>{details.name}</Text>
                <Text style={{fontSize:15, color:COLORS.primary}}>Location : {details.dest}</Text>
                </View>
                <Text style={styles.descFullText}>{details.desc}</Text>
            </View>
           <PrimaryButton title="Related Stories" />
            </ScrollView>
           
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    desc:{
        margin:20
    },
    descFullText:{
        fontSize:15,
         lineHeight:20,
         textAlign:'justify',
         paddingTop:14
    },
    iconBg:{
        backgroundColor:COLORS.primary,
        width:40,
        height:40,
        borderRadius:20,
        position:'absolute',
        top:10,
        left:15,
        justifyContent:'center',
        alignItems:'center'
    },
    imgs:{
        width:width,
         height:380, 
         borderBottomRightRadius:25,
         borderBottomLeftRadius:25,
    }
    
})