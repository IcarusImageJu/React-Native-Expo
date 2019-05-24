import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import { Icon } from 'expo';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const BigIcon = ({icon, color}) => (
    <View style={styles.container}>
        <Icon.FontAwesome
            style={{...styles.pin, ...styles[color]}}
            name={'map-marker'}
            size={160}
        />
        <Icon.FontAwesome
            style={{...styles.icon, ...styles[color]}}
            name={icon}
            size={40}
        />
    </View>
)

const styles = StyleSheet.create({
    container:{
        position: 'relative',
        height: 161,
        width: '100%',
        flex: 1,
    },
    pin:{
        color: Colors.white,
        position: 'absolute',
        top:0,
        left: (Layout.window.width / 2) - 50,
        textShadowColor: 'rgba(0, 0, 0, 0.16)',
        textShadowOffset: {width: 0, height: 3},
        textShadowRadius: 6
    },
    icon: {
        color: Colors.white,
        position: 'absolute',
        top:38,
        left: (Layout.window.width / 2) - 50 + 25,
    },
    white:{
        color: Colors.white,
    },
    orange:{
        color: Colors.orange,
    },
    grey:{
        color: Colors.grey,
    }
});

export default BigIcon;
