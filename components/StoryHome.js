import React, {useState, useEffect} from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, TextInput, Image, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/AntDesign'
import COLORS from '../assets/colors'
import {SecondaryButton} from './Button'
import {SuccessButton} from './Button'
import auth from '@react-native-firebase/auth';
import StoryForm from '../Forms/StoryForm'
import {connect} from 'react-redux'
import * as types from '../store/types'
import { register, login } from '../auth/authProvider'
import firestore from '@react-native-firebase/firestore'
import {get} from 'lodash'





const PopUpModal = ({visible, children}) => {
    const [showModal, setShowModal] = useState(visible)

    useEffect(() => {
        toggleModal()
      },[visible])
  
      const toggleModal = () => {
          if(visible){
              setShowModal(true)
          }
          else{
              setShowModal(false)
          }
      }
    return(
        <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        >
          <View style={styles.modalBg}>
            <View style={[styles.modalContainer]}>
             {children}
            </View>
          </View>
        </Modal>
    )
}


const StoryHome = ({navigation, route, updateUser, users, travelStory, storyList}) => {
    const dest = route.params

    const [visible, setVisible] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameLog, setUsernameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');
    const [listing, setListing] = useState([])
    const [loading, setLoading] = useState(false)



    useEffect(() => {   
        fetchStories() 
        return () => {
            fetchStories()
        }
     }, [loading])
     

     const fetchStories = async () => {
          try {
              const list = []
             await firestore()
              .collection('Story')
              .where('dest','==', dest.name)
              .orderBy('dated', 'desc')
              .get()
              .then(querySnapshot => {
                  //console.log(querySnapshot.size)
                  querySnapshot.forEach(doc => {
                      const {authorName, dated, desc, dest, id, imageUrl, likes, liked} = doc.data()


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
              
             await travelStory(list)

            /*  if(loading){
                 setLoading(false)
             } */

          } catch (error) {
              console.log(error)
          }
     }


     useEffect(() => {
        setListing([...(storyList !== null ? storyList : [])])
     }, [storyList])

     useEffect(() => {
        handleLikes()   
     }, []) 


    const handleLikes = async (docId, liked, likes) => {
       try {
           const likeCount = liked == false ? likes + 1: likes - 1;
           const liking = await firestore()
           .collection('Story')
           .doc(docId)
           .update({
               liked:!liked,
               likes:likeCount
           })

           if(liking){
           setLoading(true)
           }

       } catch (error) {
           console.log(error)
       }
    }
 
    
    // for Auth
    const [initializing, setInitializing] = useState(true)

    const onAuthStateChanged = (user) => {
        updateUser(user)
        if(initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    },[])

    if(initializing) return null;




    
    const StoryFeed = () => {
        return(
            
            <ScrollView indicatorStyle='black'>
                {storyList && storyList.length ? (
                <View style={styles.searchBar}>
                    <TextInput 
                    placeholder="Search a story..."
                    style={{paddingLeft:10}}
                    />
                    <Icon name="search" color={COLORS.secondary} size={25} style={styles.searchIcon} />
                </View>
                ): null
                 }
                {storyList && storyList.length ? (
                   listing.map((item, index) => (
                   <View style={styles.card} key={index} >
                   <View style={{flexDirection:'row', justifyContent:'space-between', paddingTop:10, paddingBottom:10}}>
                   <Text style={{fontSize:18, color:COLORS.primary,paddingLeft:5}}>{item.authorName}</Text>
                   <Text style={{fontSize:14, color:COLORS.grey, paddingRight:5}}>{item.dated.toDate().toDateString()}</Text>
                   </View>
                   <View style={{alignItems:'center'}}>
                       <Image source={{uri: item.imageUrl}} style={{width:370, height:270}} />
                       <Text style={styles.textDesc}>{item.desc}</Text>
                   </View>
                   <View style={{flexDirection:'row', paddingHorizontal:35, justifyContent:'space-between', paddingVertical:10}}>
                   <TouchableOpacity activeOpacity={0.8} onPress={() => handleLikes(item.docId, item.liked, item.likes)}>
                       <View style={{flexDirection:'row', alignItems:'center'}}> 
                         <Icons name="like2" color={item.liked === true ? '#3CB371' : COLORS.grey} size={28} /> 
                         <Text style={{marginHorizontal:5, color:COLORS.grey}}>{item.likes}</Text>
                         <Text style={{color:COLORS.grey}}>likes</Text>
                        </View>
                    </TouchableOpacity>
                        <View style={{flexDirection:'row', alignItems:'center'}}> 
                       <Icons name="sharealt" color={COLORS.grey} size={28} />
                       <Text style={{color:COLORS.grey, marginLeft:5}}>share</Text>
                       </View>
                   </View>
               </View>
                   ))
                  ): null
                   }
               
            </ScrollView>
        )
    }
     
    

    return (
        <SafeAreaView style={{flex:1, backgroundColor:COLORS.textColor}}>  
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
                <Icons name="plus" size={28} color={COLORS.white}/>
                </View>
                </TouchableOpacity> 
                
                <PopUpModal visible={visible}>
                    { users ?
                   <StoryForm setVisible={setVisible} destination={dest.name} />
                    : 
                    <View>
                    {showLogin ?
                        <View>
                        <View style={styles.modalHeader}>
                        <Text style={{fontSize:18, color:COLORS.success}}>Login To Post</Text>
                        <TouchableOpacity
                          activeOpacity={0.8}
                        onPress={() => setVisible(false)} 
                         >
                        <Icon name="close" size={25} color={COLORS.grey} />
                        </TouchableOpacity>
                        </View>
                        <View style={{marginVertical:20}}>
                            <TextInput
                            style={styles.input}
                            placeholder="Enter Email..."
                            keyboardType="email-address"
                            onChangeText={user => setUsernameLog(user)}
                            value={usernameLog}
                            />
                            <TextInput
                            style={styles.input}
                            secureTextEntry={true}
                            placeholder="Password..."
                            onChangeText={pass=> setPasswordLog(pass)}
                            value={passwordLog}
                            />
                        </View>
                        <View style={{marginTop:10}}>
                        <SuccessButton title="Submit"  onPress={() => login(usernameLog, passwordLog)} />
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>
                        <Text style={{fontSize:17, color:COLORS.grey}}>No account yet?</Text>
                        <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={() => setShowLogin(false)}
                        >
                          <View>
                          <Text style={{fontSize:17, color:COLORS.success,}}>Sign In</Text>
                          </View>
                        </TouchableOpacity>
                        
                        </View>
                    </View>
                    : 
                    <View>
                        <View style={styles.modalHeader}>
                        <Text style={{fontSize:18, color:COLORS.primary}}>Create An Account</Text>
                        <TouchableOpacity
                          activeOpacity={0.8}
                        onPress={() => setVisible(false)} 
                         >
                        <Icon name="close" size={25} color={COLORS.grey} />
                        </TouchableOpacity>
                        </View>
                        <View style={{marginVertical:20}}>
                            <TextInput
                            style={styles.input}
                            placeholder="Full Names..."
                            onChangeText={fullName => setFullName(fullName)}
                            value={fullName}
                            />
                            <TextInput
                             style={styles.input}
                             placeholder="Enter Email..."
                             keyboardType="email-address"
                            onChangeText={username => setUsername(username)}
                            value={username}
                            />
                            <TextInput
                            style={styles.input}
                            placeholder="Password..."
                            secureTextEntry={true}
                            onChangeText={password => setPassword(password)}
                            value={password}
                            />
                        </View>
                        <View>
                        <SecondaryButton title="Confirm" onPress={() => register(username, password, fullName)} />
                        </View>
                        <View style={{flexDirection:'row', justifyContent:'space-between', marginHorizontal:20}}>
                        <Text style={{fontSize:17, color:COLORS.grey}}>Already have an account?</Text>
                        <TouchableOpacity 
                        activeOpacity={0.8}
                        onPress={() => setShowLogin(true)}
                        >
                          <View>
                          <Text style={{fontSize:17, color:COLORS.secondary,}}>Login</Text>
                          </View>
                        </TouchableOpacity>
                        
                        </View>
                    </View>
                 }
                 </View>

                    }
                    
                </PopUpModal>
            </View>

           <StoryFeed />
           
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    const { user, stories} = state
    return{
        users: user,
        storyList: stories
    }
}
const mapDispatchToProps = dispatch => ({
    updateUser: user => dispatch({
        type: types.SET_USERS, 
        payload: {user}
    }),

    travelStory: stories => dispatch({
        type: types.SET_STORIES,
        payload: {stories} 
    })
})


export default connect(mapStateToProps, mapDispatchToProps)(StoryHome)


const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:20,
        paddingHorizontal:20,
        backgroundColor:COLORS.white,
        elevation:1  
    },
    headerWrapper:{
        flexDirection:'row',
        alignItems:'center',
    },
    headerText:{
        fontSize:20,
        color:'#333'
    },
    floatingBtn:{
        backgroundColor:COLORS.secondary,
        justifyContent:'center',
        height:35,
        width:50,
        alignItems:'center',
        borderRadius:3,
        marginLeft:60,
    },
    modalBg:{
        flex:1,
        backgroundColor:'rgba(0,0,0,0.5)',
        justifyContent:'center',
        alignItems:'center'
    },
    modalContainer:{
        width:"95%",
        backgroundColor:COLORS.white,
        paddingVertical:30,
        paddingHorizontal:20,
        borderRadius:10,
        elevation:10
    },
    modalHeader:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between' 
    },
    input:{
        height:40,
        borderBottomWidth:0.5,
        fontSize:17,
        color:'#333',
        marginTop:15,
        fontWeight:'bold'
    },
    searchBar:{
          height:40,
          borderWidth:1,
          marginHorizontal:10,
          marginTop:10,
          borderRadius:5,
          borderColor: COLORS.textColor,
          backgroundColor:COLORS.white,
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center'
    },
    searchIcon:{
          paddingRight:10,
    },
    card:{
        marginHorizontal:10,
        marginVertical:20,
        backgroundColor:COLORS.white,
        borderBottomWidth:3,
        borderBottomColor:COLORS.secondary
    },

    textDesc:{
        fontSize:16, 
        fontWeight:'bold' , 
        textAlign:'justify',
        paddingTop:5
    }
})