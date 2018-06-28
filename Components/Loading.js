import React from 'react';
import {StyleSheet, Platform, Image, Text, View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


export default class BasicOrder extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
        this.state = {
            // firebase things?
        };
    }

    componentDidMount() {
        // firebase things?
    }

    facebookLogin = async () => {
        try {
            const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
                throw new Error('User cancelled request'); // Handle this however fits the flow of your app
            }

            console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

            // get the access token
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
                throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
            }

            // create a new firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

            // login with credential
            const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);

            console.info(JSON.stringify(currentUser.user.toJSON()))
            this.props.navigation.navigate('BasicOrder')

        } catch (e) {
            console.error(e);
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Image source={require('./assets/LoginBackground.png')}
                       style={{
                           position: 'absolute',
                           resizeMode: 'cover',
                           width: width,
                           height: height,

                       }}/>


                <View style={styles.logoContainer}>

                    <Image source={require('./assets/sure-fuel-icon.png')} style={[styles.logo]}/>
                    <Text style={styles.welcome}>
                        SUREFUEL </Text>
                    <Text style={styles.subheader}>
                        TAP THE ASS TO FILL </Text>
                </View>

                <View style={styles.loginContainer}>
                    <TouchableOpacity style={{
                        borderRadius: 40,
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        justifyContent: 'center',
                        width: width * 0.7,
                        backgroundColor: '#4267B2',
                        marginBottom: 15,
                    }} onPress={() => this.facebookLogin()}>

                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600',
                                marginVertical: 15,
                                fontSize: 15
                            }}>
                            Continue with Facebook</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        borderRadius: 40,
                        alignItems: 'center',
                        alignSelf: 'flex-end',
                        justifyContent: 'center',
                        width: width * 0.7,
                        backgroundColor: '#58B982',
                        marginBottom: 40,
                    }} onPress={() => this.facebookLogin()}>

                        <Text
                            style={{
                                color: 'white',
                                fontWeight: '600',
                                marginVertical: 15,
                                fontSize: 15
                            }}>
                            Phone Authorization</Text>
                    </TouchableOpacity>

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
    subheader: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
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
