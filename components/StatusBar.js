import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import { ENUM_STATUS } from '../enums/status';

const StatusBar = ({status}) => {

    const loading = () => {
        switch (status){
            case ENUM_STATUS.CLOSED:
                return '100%';
            case ENUM_STATUS.DISMISSED:
                return '100%';
            case ENUM_STATUS.PROCESSING:
                return '50%';
            default:
                return '0%';
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.bar}/>
            <View style={{...styles.loading, width: loading()}}/>
            <View style={{...styles.bullet, left: 0}}/>
            <View style={{...styles.bullet, left: '50%', marginLeft: -8, backgroundColor: Colors.orange}}/>
            <View style={{...styles.bullet, right: 0, backgroundColor: Colors.green}}/>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
        width: '100%',
        height: 16,
        position: 'relative',
    },
    bar: {
        height: 10,
        width: '100%',
        borderRadius: 5,
        borderColor: Colors.orange,
        borderWidth: 2,
        position: "absolute",
        top: 3,
    },
    loading: {
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.orange,
        position: "absolute",
        top: 3,
    },
    bullet: {
        height: 16,
        width: 16,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: Colors.orange,
        backgroundColor: Colors.white,
        position: "absolute",
        top: 0,
    },
    [ENUM_STATUS.CLOSED] :{
        backgroundColor: Colors.green,
    },
    [ENUM_STATUS.PROCESSING] :{
        backgroundColor: Colors.orange,
    },
    [ENUM_STATUS.DISMISSED] :{
        backgroundColor: Colors.grey,
    }
});

export default StatusBar;