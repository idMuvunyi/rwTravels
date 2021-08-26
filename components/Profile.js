import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import COLORS from '../assets/colors'

const Profile = ({ navigation, story, users }) => {

    const [myStory, setMyStory] = useState([])
    const [myProfile, setMyProfile] = useState({})

    useEffect(() => {
        fetchMyStory()
    }, [story])

    useEffect(() => {
        fetchUserDetails()
    }, [users])



    const fetchUserDetails = async () => {
        try {
            let myProfileList = {}
            const data = await firestore()
                .collection('Travelers')
                .where('id', '==', users.uid)
                .get()

            myProfileList.name = data.docs[0]._data.Names;
            myProfileList.email = users.email
            setMyProfile(myProfileList)

        } catch (error) {
            console.log(error)
        }
    }


    const fetchMyStory = async () => {

        try {
            const myList = []
            await firestore()
                .collection('Story')
                .where('id', '==', users.uid)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        const { authorName, dated, desc, dest, id, imageUrl } = doc.data()
                        myList.push({
                            docId: doc.id,
                            authorName,
                            dated,
                            desc,
                            dest,
                            id,
                            imageUrl,

                        })
                    })
                })
            setMyStory([...myList])

        } catch (error) {
            console.log(error)
        }
    }


    const CardStory = () => {
        return (
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {myStory.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        activeOpacity={0.8}
                    >
                        <View style={styles.card}>
                            <View>
                                <Image source={{ uri: item.imageUrl }} style={{ height: 120, width: '100%' }} />
                                <Text style={{ paddingLeft: 10, paddingTop: 5, color: COLORS.primary }}>{item.dated.toDate().toDateString()}</Text>
                            </View>
                            <Text style={styles.textCard}>{`${(item.desc).substring(0, 85)}...`}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

            </ScrollView>
        )
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                showsVerticalScrollIndicator={false}
            >
                <Image source={require('../assets/images/user.jpg')} style={styles.imgUser} />
                <Text style={styles.userNam}>{myProfile.name}</Text>
                <Text style={{ fontSize: 15 }}>{myProfile.email}</Text>
                <View style={styles.btnWrapper}>
                    <TouchableOpacity style={styles.btn}>
                        <Text style={styles.txt}>Edit Profile</Text>
                    </TouchableOpacity>

                    <View style={styles.postInfo}>
                        <Text style={{ fontSize: 18, color: COLORS.primary, fontWeight: 'bold', textAlign: 'center' }}>{myStory.length}</Text>
                        <Text style={{ fontSize: 18, color: COLORS.grey, }}>Stories</Text>
                    </View>
                </View>

                <View style={styles.stories}>
                    <Text style={{ fontSize: 18, color: '#333', }}>Recent Stories</Text>
                </View>

                <CardStory />

            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    const { stories, user } = state;
    return {
        users: user,
        story: stories
    }
}

export default connect(mapStateToProps, null)(Profile)




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20
    },
    imgUser: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    userNam: {
        fontSize: 20,
        fontWeight: 'normal',
        color: COLORS.primary
    },
    btnWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btn: {
        borderWidth: 1,
        margin: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderLeftColor: COLORS.primary,
        borderLeftWidth: 5,
        borderColor: COLORS.secondary,
        borderRadius: 5
    },
    txt: {
        color: COLORS.grey,
        fontSize: 17
    },
    postInfo: {
        margin: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    stories: {
        borderTopWidth: 1,
        borderTopColor: COLORS.secondary,
        paddingHorizontal: 100,
        paddingVertical: 5,
        marginVertical: 10

    },
    card: {
        height: 250,
        marginHorizontal: 10,
        width: 200,
        marginVertical: 20,
        elevation: 5,
        backgroundColor: COLORS.white
    },
    textCard: {
        fontSize: 14,
        textAlign: 'justify',
        color: '#333',
        padding: 10
    },
    textCard2: {
        fontSize: 15,
        textAlign: 'center',
        color: COLORS.grey
    },
})
