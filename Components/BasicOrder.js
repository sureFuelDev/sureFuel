import React from 'react';
import {StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';

import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class BasicOrder extends React.Component {
    constructor() {
        super();
        this.state = {
            // firebase things?
        };
    }

    render() {
        return (
            <View style={styles.container}>


                <View style={styles.logoContainer}>

                    <Text style={styles.welcome}>
                        SUREFUEL </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    logo: {
        marginBottom: 16,
        marginTop: 32,
        height: 125,
        width: 125,
    },
    logoContainer: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
        color: 'white',
        fontWeight: 'bold',

    },
    loginContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modulesHeader: {
        fontSize: 16,
        marginBottom: 8,
    },
    module: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center',
    }
});
