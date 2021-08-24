import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, TouchableHighlight } from 'react-native'
import COLORS from '../assets/colors'
import Icon from 'react-native-vector-icons/AntDesign'
import infos from '../assets/mock'
import userImage from '../assets/images/avatar.png'
import { logout } from '../auth/authProvider'
import { connect } from 'react-redux'

const { width } = Dimensions.get('window')
const widthCard = width * (80 / 100)

const Home = ({ navigation, users }) => {


  const StoriesList = () => {
    return (
      <ScrollView
        horizontal
        /* showsHorizontalScrollIndicator={false} */
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {infos.map((stories, index) => (
          <TouchableOpacity
            key={index}
            underlayColor={COLORS.white}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('HomeDetails', stories)}
          >
            <View style={styles.card}>
              <View>
                <Image source={stories.image} style={{ height: 220, width: widthCard }} />
              </View>
              <View style={{ marginVertical: 15 }}>
                <Text style={styles.textCard}>{stories.name}</Text>
                <Text style={styles.textCard2}>
                  <Icon name="enviromento" color={COLORS.grey} size={18} /> {stories.dest}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

      </ScrollView>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={styles.header}>
        <View>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="dingding" color={COLORS.secondary} size={42} />
            <Text style={styles.title}>RwTravels</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={() => logout()}>
              <View style={styles.userImg}>
                {users ?
                  <Image source={userImage} style={{ height: 40, width: 40 }} />
                  : null
                }
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{ marginTop: 5, fontSize: 15, color: COLORS.grey, textAlign: 'justify', marginHorizontal: 10 }}>Rwanda is a beautiful mountainous country in east Africa. We help you find travel destinations!</Text>
        </View>
      </View>

      <View style={styles.subHeader}>
        <Text style={{ color: COLORS.primary, fontWeight: 'normal', fontSize: 20, paddingLeft: 10 }}>Featured Destinations</Text>
      </View>

      <StoriesList />

    </SafeAreaView>
  )
}

const mapStateToProps = (state) => {
  const { user } = state
  return {
    users: user
  }
}

export default connect(mapStateToProps, null)(Home)


const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    flexDirection: 'row',
    paddingHorizontal: 30
  },
  title: {
    fontSize: 25,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 10,

  },
  subHeader: {
    margin: 40,
    borderTopWidth: 0.5,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: COLORS.grey,
    fontSize: 15
  },

  card: {
    height: 320,
    marginHorizontal: 10,
    borderRadius: 20,
    width: widthCard,
    marginTop: 20,
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
  userImg: {
    marginLeft: 120
  }

})