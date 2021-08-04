import React, {useState, useEffect, useContext} from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/AntDesign'
import COLORS from '../assets/colors'
import {SecondaryButton} from './Button'
import {SuccessButton} from './Button'
import {AuthContext} from '../auth/authProvider'
import auth from '@react-native-firebase/auth';




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


export default function StoryHome({navigation, route}) {
    const dest = route.params
    const [visible, setVisible] = useState(false)
    const [ showLogin, setShowLogin] = useState(false)
    const [fullName, setFullName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    // for Auth
    const {user, setUser, register} = useContext(AuthContext)
    const [initializing, setInitializing] = useState(true)

    const onAuthStateChanged = (user) => {
        setUser(user)
        if(initializing) setInitializing(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    },[])

    if(initializing) return null;


    return (
        <SafeAreaView>  
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
                    { user ?
                    <View>
                        <View style={styles.modalHeader}>
                        <Text style={{fontSize:22, color:'#333'}}>Add New Story</Text>
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
                            placeholder="Choose Image"
                            keyboardType="email-address"
                            onChangeText={username => setUsername(username)}
                            value={username}
                            />
                            <TextInput
                            style={{...styles.input, borderWidth:0.5,marginBottom:20, height:120}}
                            placeholder="What is your story today?"
                            multiline={true}
                            numberOfLines={5}
                            onChangeText={password => setPassword(password)}
                            value={password}
                            />
                        </View>
                        <View style={{marginTop:10}}>
                        <SuccessButton title="Post" />
                        </View>
                    </View>
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
                        <View style={{marginTop:10}}>
                        <SuccessButton title="Submit" />
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
                        <SecondaryButton title="Confirm" onPress={() => register(username, password)} />
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
        </SafeAreaView>
    )
}


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
    }
})