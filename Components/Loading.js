import React from 'react';
import {
    StyleSheet,
    Platform,
    Image,
    Text,
    View,
    Animated,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import firebase from 'react-native-firebase';
import LoginButtons from './Login/LoginButtons'
import EmailPassword from "./Login/EmailPassword";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    loginState: state.common.loginState
});

const mapDispatchToProps = dispatch => ({
    setLoginState: (value) => {
        dispatch({type: 'SET_LOGIN_STATE', value: value});
    },
});


class Loading extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor() {
        super();
    }



    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            // this.props.navigation.navigate('Home');
            console.log('This is the user ' + user);

            AsyncStorage.getAllKeys((keys) => {
                console.log('tryna get some keys');
                console.log(keys);

                if (user !== null) {
                    if (user.metadata.lastSignInTime === user.metadata.creationTime && keys === null) {
                        AsyncStorage.setItem('firstLoad', 'load')
                        this.props.navigation.navigate('WalkThrough');

                    } else {
                        this.props.navigation.navigate('Home')
                    }

                    AsyncStorage.setItem('userToken', user.uid);

                } else {
                    //Animate the Login in
                    this.props.setLoginState(1);

                }
            });
        })
    }

    renderView = () => {
        switch (this.props.loginState) {
            case 0:
                return <View style={styles.loginContainer}/>
            case 1:
                return <LoginButtons/>
            case 2:
                return <EmailPassword/>
        }
    };

    renderBack = () => {
        if (this.props.loginState !== 0 && this.props.loginState !== 1) {
            return <TouchableOpacity style={{position: 'absolute', left: 15, top: 15,}}
                                     onPress={() => this.props.setLoginState(1)}>
                <Icon
                    name={"ios-arrow-back"}
                    size={40}
                    color={'white'}
                />
            </TouchableOpacity>
        } else {
            return <View></View>
        }

    };


    render() {
        return (
            <View style={styles.container}>
                <Animated.View style={{
                    flex: 1,
                    top: 0,
                    left: 0,
                    height: height,
                    zIndex: 100,
                    width: width,
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F5FCFF',
                    elevation: 10,
                    opacity: this.mapOverlayOpacity
                }}>
                    <Image source={require('../assets/LoginBackground.png')}
                           style={{
                               position: 'absolute',
                               resizeMode: 'cover',
                               width: width,
                               height: height,

                           }}/>

                    {this.renderBack()}


                    <View style={styles.logoContainer}>

                        <Image source={require('../assets/sure-fuel-icon.png')} style={[styles.logo]}/>
                        <Text style={styles.welcome}>
                            SUREFUEL </Text>
                        <Text style={styles.subheader}>
                            TAP THE APP TO FILL </Text>
                    </View>

                    {this.renderView()}
                </Animated.View>
            </View>

        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Loading);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        height: height, width: width
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
        backgroundColor: 'black'
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
