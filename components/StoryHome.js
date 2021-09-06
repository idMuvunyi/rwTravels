import React, { useState, useEffect, useRef } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, TextInput, Image, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icona from 'react-native-vector-icons/AntDesign'
import Icons from 'react-native-vector-icons/EvilIcons'
import COLORS from '../assets/colors'
import auth from '@react-native-firebase/auth';
import PopUpModal from './PopUpModal'
import StoryForm from '../Forms/StoryForm'
import { connect } from 'react-redux'
import * as types from '../store/types'
import firestore from '@react-native-firebase/firestore'
import AuthForm from '../Forms/AuthForm'




const ITEM_SIZE = 200 + 180 * 3;

const StoryHome = ({ navigation, route, updateUser, users, travelStory, storyList }) => {
    const dest = route.params

    const [visible, setVisible] = useState(false)
    const [listing, setListing] = useState([])
    const [liked, setLiked] = useState(null)
    const [initializing, setInitializing] = useState(true)
    const [loading, setLoading] = useState(true)
    const scrollY = useRef(new Animated.Value(0)).current


    useEffect(() => {
        setLoading(true)
        fetchStories()
        travelStory(listing)
        return () => {
            fetchStories()
            travelStory()
            setLoading()
        }
    }, [storyList, liked, listing])


    /* useEffect(() => {
        setListing([...(storyList !== null || storyList.length === 0 ? storyList : [])])
    }, [storyList]) */

    useEffect(() => {
        handleLikes()
    }, [])


    const fetchStories = async () => {
        try {
            let list = []
            await firestore()
                .collection('Story')
                .where('dest', '==', dest.name)
                .orderBy('dated', 'desc')
                .get()
                .then(querySnapshot => {
                    //console.log(querySnapshot.size)
                    querySnapshot.forEach(doc => {
                        const { authorName, dated, desc, dest, id, imageUrl, likes, liked } = doc.data()

                        list.push({
                            docId: doc.id,
                            authorName,
                            dated,
                            desc,
                            dest,
                            id,
                            imageUrl,
                            likes,
                            liked
                        })
                    })
                })

            setListing([...list])

            if (loading) {
                setLoading(false)
            }



        } catch (error) {
            console.log(error)
        }
    }




    const handleLikes = async (docId, liked, likes) => {
        try {
            const likeCount = liked == false ? likes + 1 : likes - 1;
            await firestore()
                .collection('Story')
                .doc(docId)
                .update({
                    liked: !liked,
                    likes: likeCount
                })

            setLiked(!liked)

        } catch (error) {
            console.log(error)
        }
    }


    // for Auth

    const onAuthStateChanged = (user) => {
        updateUser(user)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, [])

    if (initializing) return null;




    const StoryFeed = ({ item }) => {
        return (
            <>
                {listing && listing.length ? (

                    <View>
                        <View style={styles.card} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingBottom: 10, paddingHorizontal: 10 }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Image source={require('../assets/images/user.jpg')} style={{ width: 25, height: 25, borderRadius: 15 }} />
                                    <Text style={{ fontSize: 16, color: COLORS.primary, paddingLeft: 5 }}>{item.authorName}</Text>
                                </View>
                                <Text style={{ fontSize: 13, color: COLORS.grey, paddingRight: 5 }}>{item.dated.toDate().toDateString()}</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                {item.imageUrl !== null ?
                                    <Image source={{ uri: item.imageUrl }} style={{ width: 370, height: 270 }} />
                                    : <Text>Image Loading...</Text>
                                }
                                <View style={styles.textWrapper}>
                                    <Text style={styles.textDesc}>{item.desc}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', paddingHorizontal: 35, justifyContent: 'space-between', paddingVertical: 10 }}>
                                <TouchableOpacity activeOpacity={0.8} onPress={() => handleLikes(item.docId, item.liked, item.likes)}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Icons name="heart" color={item.liked === true ? '#3CB371' : COLORS.grey} size={30} />
                                        <Text style={{ marginHorizontal: 5, color: item.liked === true ? '#3CB371' : COLORS.grey }}>{item.likes}</Text>
                                        <Text style={{ color: item.liked === true ? '#3CB371' : COLORS.grey }}>likes</Text>
                                    </View>
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Icons name="share-google" color={COLORS.grey} size={30} />
                                    <Text style={{ color: COLORS.grey, marginLeft: 5 }}>share</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    {loading ? <Text>Loading...</Text> :
                        <Text>No story yet!</Text>
                    }
                </View>
                }

                {/* {loading ? <View><Text>Loading...</Text></View> : null} 
                
                - bottom navigator style
                - animations
                
                */}

            </>
        )
    }



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.textColor }}>
            <View style={styles.header}>
                <View style={styles.headerWrapper}>
                    <Icon name="arrow-back-ios" size={28} color={COLORS.secondary}
                        onPress={navigation.goBack}
                    />
                    <Text style={styles.headerText}>{dest.name} Stories</Text>
                </View>

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setVisible(true)}>
                    <View style={styles.floatingBtn}>
                        <Icona name="plus" size={20} color={COLORS.white} />
                    </View>
                </TouchableOpacity>

                <PopUpModal visible={visible}>
                    {users ?
                        <StoryForm setVisible={setVisible} destination={dest.name} />
                        :
                        <AuthForm setVisible={setVisible} />

                    }

                </PopUpModal>
            </View>
            {listing && listing.length ? (
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="Search a story..."
                        style={{ paddingLeft: 10 }}
                    />
                    <Icon name="search" color={COLORS.secondary} size={25} style={styles.searchIcon} />
                </View>
            ) : null
            }

            <Animated.FlatList
                data={listing}
                keyExtractor={(item, index) => index}
                renderItem={({ item, index }) => {

                    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)]
                    const opacityInputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)]
                    const scale = scrollY.interpolate({ inputRange, outputRange: [1, 1, 1, 0] })
                    const opacity = scrollY.interpolate({ inputRange: opacityInputRange, outputRange: [1, 1, 1, 0] })

                    return (
                        <Animated.View style={{
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 10
                            },
                            shadowOpacity: 3,
                            shadowRadius: 20,
                            opacity,
                            transform: [{ scale }]
                        }}>
                            <StoryFeed item={item} />
                        </Animated.View>

                    )
                }
                }
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            />

        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    const { user, stories } = state
    return {
        users: user,
        storyList: stories
    }
}
const mapDispatchToProps = dispatch => ({
    updateUser: user => dispatch({
        type: types.SET_USERS,
        payload: { user }
    }),

    travelStory: stories => dispatch({
        type: types.SET_STORIES,
        payload: { stories }
    })
})


export default connect(mapStateToProps, mapDispatchToProps)(StoryHome)


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: COLORS.white,
        elevation: 1
    },
    headerWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 17,
        color: '#333'
    },
    floatingBtn: {
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        height: 35,
        width: 50,
        alignItems: 'center',
        borderRadius: 3,
        marginLeft: 60,
    },

    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    input: {
        height: 40,
        borderBottomWidth: 0.5,
        fontSize: 17,
        color: '#333',
        marginTop: 15,
        fontWeight: 'bold'
    },
    searchBar: {
        height: 40,
        borderWidth: 1,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5,
        borderColor: COLORS.textColor,
        backgroundColor: COLORS.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchIcon: {
        paddingRight: 10,
    },
    card: {
        marginHorizontal: 10,
        marginVertical: 20,
        backgroundColor: COLORS.white,
        borderBottomWidth: 3,
        borderBottomColor: COLORS.secondary,

    },

    textWrapper: {
        backgroundColor: '#f3f3f3',
        width: '98%',
        padding: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    textDesc: {
        fontSize: 14,
        fontWeight: 'normal',
        textAlign: 'justify',
        paddingTop: 5
    }
})