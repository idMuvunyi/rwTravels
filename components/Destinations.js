import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import COLORS from '../assets/colors'
import destination from '../assets/dest'


export default function Destinations({ navigation }) {

  const ListItems = ({ dest }) => {

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('StoryHome', dest)}
      >
        <View style={styles.container}>
          <Text style={{ fontSize: 15, color: COLORS.primary }}>{dest.name}</Text>
          <Text style={{ fontSize: 14, color: COLORS.grey, textAlign: 'justify' }}>{dest.detail}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ marginTop: 35, marginHorizontal: 30, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="dingding" color={COLORS.secondary} size={42} />
          <Text style={styles.destHeader}>Browse Destinations</Text>
        </View>
        <Text style={styles.destSubHeader}>Rwanda has four provinces and Kigali as the capital city, choose where your interest lies accordingly.</Text>
      </View>
      <View style={{ marginTop: 40 }}>
        <FlatList
          data={destination}
          renderItem={({ item }) => <ListItems dest={item} />}
        />
      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  destHeader: {
    fontSize: 25,
    color: '#333',
    marginVertical: 10,
    marginLeft: 10
  },
  destSubHeader: {
    fontSize: 15,
    color: COLORS.grey,
    textAlign: 'justify',
    marginHorizontal: 10
  },
  container: {
    padding: 10,
    marginHorizontal: 15,
    elevation: 2,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondary,
    borderTopLeftRadius: 15
  }
})