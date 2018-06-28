import React from 'react';
import {StyleSheet, Platform, Image, Text, View, Button, TouchableOpacity, Dimensions} from 'react-native';
import MapView from 'react-native-maps';

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

    static navigationOptions = {
        header: null,
        drawerLabel: 'Home',
        drawerIcon: ({tintColor}) => (
            <Image
                source={require('../assets/LoginBackground.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),

    };


    render() {
        return (
            <View style={{flex: 1}}>
                <MapView
                    initialRegion={{
                        latitude: 51.050297,
                        longitude: -114.070921,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{flex: 1}}
                >

                </MapView>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to notifications"
                />
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
    icon: {
        width: 24,
        height: 24,
    },
});

