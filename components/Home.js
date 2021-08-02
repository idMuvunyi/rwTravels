import React, {useState} from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, TouchableHighlight } from 'react-native'
import COLORS from '../assets/colors'
import Icon from 'react-native-vector-icons/AntDesign'
import infos from '../assets/mock'

const {width} = Dimensions.get('window')
const widthCard = width / 2 

export default function Home({navigation}) {


const StoriesList = () => {
 return(
  <ScrollView 
  horizontal 
  showsHorizontalScrollIndicator={false}
  >
   {infos.map((stories, index) => (
     <TouchableHighlight
     key={index}
     underlayColor={COLORS.white}
     activeOpacity={0.9}
     onPress={() => navigation.navigate('HomeDetails', stories)}
     >
      <View style={styles.card}>
          <View>
            <Image source={stories.image} style={{height:220, width:widthCard}}/>
          </View>
          <View style={{marginVertical:15}}>
            <Text style={styles.textCard}>{stories.name}</Text>
            <Text style={styles.textCard2}>
             <Icon name="enviroment" color={COLORS.grey} size={18} /> {stories.dest}</Text>
          </View>
      </View>
     </TouchableHighlight>
   ))}
   
  </ScrollView>
)
}

    return (
   <SafeAreaView style={{flex:1, backgroundColor:COLORS.white}}>
     <View style={styles.header}>
       <View>
       <View style={{flexDirection:'row'}}>
        <Icon name="API" color={COLORS.secondary} size={42} />
        <Text style={styles.title}>RwTravels</Text>
       </View>
        <Text style={{marginTop:5, fontSize:17, color:COLORS.grey}}>All about travel destinations in Rwanda!</Text>
     </View>
     </View>

     <View style={styles.subHeader}>
       <Text style={{ color:COLORS.primary ,fontSize:20}}>Featured Destinations</Text>
     </View>
     
       <StoriesList />
     
   </SafeAreaView>
    )
}


const styles = StyleSheet.create({
  header: {
    marginTop:40,
    flexDirection:'row',
    paddingHorizontal:30
  },
  title:{
    fontSize:25,
    color:COLORS.grey,
    marginLeft:10
  },
  subHeader:{
    margin:40,
    borderTopWidth:1,
    borderRightWidth:1,
    borderColor:COLORS.secondary
  },

  card:{
    height:320,
    marginHorizontal:10,
    borderRadius:20,
    width:widthCard,
    marginTop:20,
    marginBottom:50,
    elevation:10,
    backgroundColor:COLORS.white
  },
  textCard:{
    fontSize:18, 
    textAlign:'center',
    color:COLORS.primary
  },
  textCard2:{
    fontSize:15,
    textAlign:'center',
    color:COLORS.grey
  }

})