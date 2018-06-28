import React from 'react';
import {StyleSheet, Platform, Image, Text, View, Button, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import {DrawerActions} from 'react-navigation';
import {withNavigation} from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';


import {connect} from 'react-redux';


import MapView from 'react-native-maps';
import Interactable from 'react-native-interactable';
import Icon from 'react-native-vector-icons/Ionicons';
import ServiceListItem from './ServiceListItem'


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

class SecondOrder extends React.Component {
    constructor() {
        super();
        this.state = {
            services: [
                {
                    title: 'Windshield Washer Fluid Top Up',
                    price: '$5'
                },
                {
                    title: 'Windshield Chip Repair',
                    price: '$5'
                },
                {
                    title: 'Tire Check & Fill',
                    price: '$5'
                }]

        }
    };


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

    pickerToggled(uid, value) {
        var newArray = [];
        if (value) {
            newArray = update(this.props.selected, {$push: [uid]});
        } else {
            // newArray = this.props.selected.filter(e => e !== uid);
            // console.log(this.props.selected);
        }
    }
    ;


    render() {
        return (
            <LinearGradient colors={['#e4f7f7', '#e4f7f7',]}
                            style={styles.container}>

                <Text style={styles.title}>ADDITIONAL SUREFUEL SERVICES</Text>

                <FlatList
                    style={{flex: 1, marginBottom: 30, marginTop: 10, width: width, }}
                    data={this.state.services}
                    keyExtractor={this._keyExtractor}
                    renderItem={({item, index}) =>
                        <ServiceListItem
                            index={index}
                            name={item.title}
                            selected={() => (item.title)}
                            callback={(value) => {
                                return this.pickerToggled(item.title, value)
                            }}
                        />
                    }
                />


            </LinearGradient>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SecondOrder);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 40
    },
    service: {
        width: width * 0.2,
        height: width * 0.2,
        marginBottom: 15
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    touchable: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    description: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold'
    }
});

