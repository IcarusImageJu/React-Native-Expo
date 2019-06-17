import React from 'react';
import * as Icon from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Platform } from 'react-native';
import { Link } from "react-router-native";

import Colors from '../constants/Colors';
import { t } from '../services/i18n';
import { withSound } from './Sounds';

const invertedColor = color => {
    switch (color) {
        case 'orange':
            return 'white';
        case 'white':
            return 'orange';
        case 'green':
            return 'white';
        default:
            return 'white';
    }
}

const ButtonIntern = ({icon, children, color, loading}) => {
    return(
        <View style={{...styles.button, ...styles[`button${color}`]}}>
            <Text numberOfLines={1} style={{...styles.text, ...styles[`text${invertedColor(color)}`]}}>{children}</Text>
            {!loading && <Icon.FontAwesome
                style={{...styles.icon, ...styles[`text${invertedColor(color)}`]}}
                name={icon}
                size={24}
            />}
            {loading && <ActivityIndicator size="small" color={Colors[invertedColor(color)]} />}
        </View>
    )
}

class Button extends React.PureComponent{
    render(){
        const {icon, color = 'orange', children, to = '', loading = false, disabled = false, handlePress, sounds} = this.props;
        if(disabled) {
            return(
                <TouchableOpacity style={styles.loading} onPress={() => {sounds.error(); this._message(t('connectToInternet'))}}>
                    <ButtonIntern loading={loading} color={color} icon={icon}>{children}</ButtonIntern>
                </TouchableOpacity>
            )
        }
        if (loading) {
            return(
                <View style={styles.loading}>
                    <ButtonIntern loading={loading} color={color} icon={icon}>{children}</ButtonIntern>
                </View>
            )
        }
        if (to !== '') {
            return (
                <Link to={to} component={TouchableOpacity} onPress={() => sounds.button()}>
                    <ButtonIntern loading={loading} color={color} icon={icon}>{children}</ButtonIntern>
                </Link>
            )
        }
        return (
            <TouchableOpacity onPress={() => {sounds.button(); handlePress()}}>
                <ButtonIntern loading={loading} color={color} icon={icon}>{children}</ButtonIntern>
            </TouchableOpacity>
        )
    }

    _message = message => {
        // trigger the toast only on android
        if(Platform.OS === 'android') {
            ToastAndroid.showWithGravity(
                message,
                ToastAndroid.LONG,
                ToastAndroid.CENTER,
            );
        }
    }
}


const styles = StyleSheet.create({
    button: {
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 16,
        paddingBottom:  16,
        borderRadius: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    buttonorange:{
        backgroundColor: Colors.orange,
    },
    buttonwhite:{
        backgroundColor: Colors.white,
    },
    text: {
        // fontWeight: 'bold',
        fontSize: 18,
        flex: 1,
        fontFamily: 'dosis-bold',
    },
    icon: {
        color: Colors.white,
    },
    textorange:{
        color: Colors.orange,
    },
    textwhite:{
        color: Colors.white,
    },
    loading:{
        opacity: .87,
    }
})

export default withSound(Button);