import React from 'react';
import {StyleSheet, Platform, Image, Text, View, Button, TouchableOpacity, Dimensions} from 'react-native';
import {DrawerActions} from 'react-navigation';
import {withNavigation} from 'react-navigation';

import {connect} from 'react-redux';


import MapView from 'react-native-maps';
import Interactable from 'react-native-interactable';
import Icon from 'react-native-vector-icons/Ionicons';


import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';
import firebase from 'react-native-firebase';


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const mapStateToProps = state => ({
    octane: state.common.octane
});

const mapDispatchToProps = dispatch => ({
    octaneSelected: (value) => {
        dispatch({type: 'OCTANE_SELECTED', octane: value});
    },
});

class BasicOrder extends React.Component {
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
            <Icon name="ios-home" size={25} color={tintColor}/>
        ),
    };

    gasSelection = (value) => {
        this.interactable.snapTo({index: 1});
        this.props.octaneSelected(value);
    };


    render() {
        return (
            <View style={{flex: 1}}>

                <MapView
                    mapType={"satellite"}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    showsScale={true}
                    provider={'google'}
                    showsBuildings={true}
                    initialRegion={{
                        latitude: 51.050297,
                        longitude: -114.070921,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{flex: 1}}
                    setMapToolbarEnabled={true}
                >

                </MapView>

                <View style={{
                    position: 'absolute',
                    top: 20,
                    alignSelf: 'center',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>
                    <TouchableOpacity style={styles.prompt}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Where is your vehicle located?</Text>
                    </TouchableOpacity>
                </View>
                <View style={{position: 'absolute', left: 20, top: 15}}>
                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                        <Icon name="ios-menu" size={35} color={'rgba(255,255,255,0.7)'}/>
                    </TouchableOpacity>
                </View>
                <View
                    style={{position: 'absolute', bottom: 0}}>
                    <Interactable.View
                        ref={ref => {
                            this.interactable = ref;
                        }}
                        verticalOnly={true}
                        snapPoints={[
                            {y: height * 2 * 0.9, damping: 0.6, tension: 400, id: 'open'},
                            {
                                y: height * 2 * 0.7,
                                damping: 0.6,
                                tension: 400,
                                id: 'close'
                            }]}
                        boundaries={{top: -200}}
                        initialPosition={{y: height * 2 * 0.9}}
                    >
                        <View style={styles.card}>
                            <View style={styles.cardContainer}>
                                <View style={{position: 'absolute'}}>
                                    <Text style={{color: 'rgba(0,0,0,0.2)', fontWeight: '900'}}>____</Text>
                                </View>
                                <View style={styles.send}>
                                    <TouchableOpacity style={styles.sendButton}>
                                        <Icon name="md-send" size={25} color={'white'}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <View style={styles.buttons}>
                                        <View style={styles.button}>
                                            <Text style={styles.selectionText}>REGULAR</Text>
                                            <TouchableOpacity onPress={() => this.gasSelection(87)}
                                                              style={[styles.buttonOpacity, {backgroundColor: this.props.octane === 87 ? '#7e4e9b' : '#d185ff',
                                                                  elevation: this.props.octane === 87 ? 10 : 1}]}>
                                                <Text style={{color: 'white'}}>93.3</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.button}>
                                            <Text style={styles.selectionText}>PREMIUM</Text>
                                            <TouchableOpacity onPress={() => this.gasSelection(94)}
                                                              style={[styles.buttonOpacity, {backgroundColor: this.props.octane === 94 ? '#7e4e9b' : '#d185ff',
                                                                  elevation: this.props.octane === 94 ? 10 : 1}]}>
                                                <Text style={{color: 'white'}}>101.4</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Interactable.View>
                </View>

            </View>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicOrder);

const styles = StyleSheet.create({
    buttonContainer: {
        height: height * 0.2,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        height: height * 2,
        width: width,
        zIndex: 11,
        borderTopRightRadius: 7,
        borderTopLeftRadius: 7,
        alignItems: 'center'
    },
    cardContainer: {
        alignItems: 'center',
        width: width,
        height: height * 2 * 0.3,
    },
    buttonTitle: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 20,
        marginVertical: 10,
    },
    button: {
        flexDirection: 'column',
        alignItems: 'center',
        marginHorizontal: 12
    },
    prompt: {
        marginTop: 5,
        borderRadius: 30,
        backgroundColor: '#d185ff',
        alignItems: 'center',
        padding: 12,
        elevation: 5
    },
    buttons: {
        justifyContent: 'center',
        width: width,
        alignSelf: 'stretch',
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonOpacity: {
        marginTop: 5,
        borderRadius: 30,
        width: width * 0.35,
        alignItems: 'center',
        padding: 12,
        elevation: 5
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    send: {
        position: 'absolute',
        right: 15,
        bottom: 15,

    },
    sendButton: {
        borderRadius: 100,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7e4e9b',
        elevation: 10,
        paddingLeft: 5
    },
    selectionText: {
        fontWeight: 'bold',
    }
});

