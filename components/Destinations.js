import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableHighlight, TouchableOpacity, Button } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import COLORS from '../assets/colors'
import destination from '../assets/dest'
import { StoryButton, MapButton } from './Button'


export default function Destinations({ navigation }) {

  const ListItems = ({ dest }) => {

    return (
      <>
        <View style={styles.container}>
          <Text style={{ fontSize: 15, color: COLORS.primary }}>{dest.name}</Text>
          <Text style={{ fontSize: 14, color: COLORS.grey, textAlign: 'justify' }}>{dest.detail}</Text>
          <View style={styles.buttons}>
            <StoryButton title='stories' onPress={() => navigation.navigate('StoryHome', dest)} />
            <View style={{ marginLeft: 5 }}>
              <MapButton title='map' onPress={() => navigation.navigate('Maps', dest)} />
            </View>
          </View>

        </View>
      </>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={{ marginVertical: 35, marginHorizontal: 30, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="dingding" color={COLORS.secondary} size={42} />
          <Text style={styles.destHeader}>Browse Destinations</Text>
        </View>
        <Text style={styles.destSubHeader}>Rwanda has four provinces and Kigali as the capital city, choose where your interest lies accordingly.</Text>
      </View>

      <FlatList
        data={destination}
        renderItem={({ item }) => <ListItems dest={item} />}
      />

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
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    margin: 10
  }
})