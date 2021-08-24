import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import COLORS from '../assets/colors';
import { SuccessButton } from '../components/Button';
import { launchImageLibrary } from 'react-native-image-picker'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage'
import { connect } from 'react-redux';

const StoryForm = (props) => {

    const [imageUrl, setImageUrl] = useState(null);
    const [story, setStory] = useState('');

    const browseImage = () => {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo'
            }
        }
        launchImageLibrary(options, response => {
            if (response.didCancel) {
                Alert.alert('No Image Selected!')
            }
            else if (response.assets[0].uri) {
                setImageUrl(response.assets[0].uri)
            }
        })
    }

    const handleAddStory = async (imageUrl, storyText) => {
        const dest = props.destination
        const date = new Date();
        const author = props.users
        const filename = imageUrl.substring(imageUrl.lastIndexOf('/') + 1)
        const storageRef = storage().ref(filename)
        const upload = storageRef.putFile(imageUrl)

        try {
            await upload;
            const url = await storageRef.getDownloadURL()
            const name = await auth().currentUser.displayName
            if (upload) {
                firestore()
                    .collection('Story')
                    .add({
                        id: author.uid,
                        authorName: name,
                        imageUrl: url,
                        desc: storyText,
                        dest: dest,
                        dated: date,
                        likes: 0,
                        liked: false
                    })
            }
            setImageUrl(null)
            return url

        } catch (error) {
            console.log(error)
            return null
        }

    }


    return (
        <View>
            <View style={styles.modalHeader}>
                <Text style={{ fontSize: 22, color: '#333' }}>Add New Story</Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => props.setVisible(false)}
                >
                    <Icon name="close" size={25} color={COLORS.grey} />
                </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 20 }}>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, alignItems: 'center' }}>

                    {imageUrl &&
                        <Image source={{ uri: imageUrl }} style={{ height: 100, width: 100 }} />
                    }
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => browseImage()}
                    >
                        <View style={styles.chooser}>
                            <Text style={{ color: COLORS.grey }}>Choose Image</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <TextInput
                    style={{ ...styles.input, borderWidth: 0.5, marginBottom: 20, height: 120, fontSize: 18 }}
                    placeholder="What is your story...."
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={text => setStory(text)}
                    value={story}
                />
            </View>
            <View style={{ marginTop: 10 }}>
                <SuccessButton title="Post" onPress={() => handleAddStory(imageUrl, story)} />
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    const { user } = state;
    return {
        users: user
    }
}


export default connect(mapStateToProps, null)(StoryForm)

const styles = StyleSheet.create({
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    chooser: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#f0f0f0",
        width: 150,
        height: 50,
    }
})