import React from 'react'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'




const login = async (email, password) => {
    try {
        await auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        console.log(error)
    }
}

const register = async (email, password, fullName) => {

    try {
        let uid;
        await auth().createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                if (userCredential.user) {
                    userCredential.user.updateProfile({
                        displayName: fullName
                    })
                        .catch(err => {
                            console.log(err)
                        })

                    uid = userCredential.user.uid
                }
            })

        if (uid) {
            firestore()
                .collection('Travelers')
                .doc(uid)
                .set({
                    id: uid,
                    Names: fullName,
                })
        }

    } catch (error) {
        console.log(error)
    }
}

const logout = async () => {
    try {
        await auth().signOut()
    } catch (error) {
        console.log(error)
    }
}



export { login, register, logout }
