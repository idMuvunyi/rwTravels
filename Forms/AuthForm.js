import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { SecondaryButton, SuccessButton } from '../components/Button'
import COLORS from '../assets/colors'

import { register, login } from '../auth/authProvider'




export default function AuthForm(props) {


    const [showLogin, setShowLogin] = useState(false)
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameLog, setUsernameLog] = useState('');
    const [passwordLog, setPasswordLog] = useState('');

    return (
        <View>
            {showLogin ?
                <View>
                    <View style={styles.modalHeader}>
                        <Text style={{ fontSize: 18, color: COLORS.success }}>Login To Post</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => props.setVisible(false)}
                        >
                            <Icon name="close" size={25} color={COLORS.grey} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 20 }}>
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
                            onChangeText={pass => setPasswordLog(pass)}
                            value={passwordLog}
                        />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <SuccessButton title="Submit" onPress={() => login(usernameLog, passwordLog)} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 17, color: COLORS.grey }}>No account yet?</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setShowLogin(false)}
                        >
                            <View>
                                <Text style={{ fontSize: 17, color: COLORS.success, }}>Sign In</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
                :
                <View>
                    <View style={styles.modalHeader}>
                        <Text style={{ fontSize: 18, color: COLORS.primary }}>Create An Account</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => props.setVisible(false)}
                        >
                            <Icon name="close" size={25} color={COLORS.grey} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 20 }}>
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
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 17, color: COLORS.grey }}>Already have an account?</Text>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => setShowLogin(true)}
                        >
                            <View>
                                <Text style={{ fontSize: 17, color: COLORS.secondary, }}>Login</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            }
        </View>
    )
}


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
    modalBg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: "95%",
        backgroundColor: COLORS.white,
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderRadius: 10,
        elevation: 10
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




})
