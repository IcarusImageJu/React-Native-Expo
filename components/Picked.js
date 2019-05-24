import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';

const Picked = ({picked}) => (
    <View style={styles.pickerContainer}>
        <Text numberOfLines={1} style={styles.text}>{picked}</Text>
    </View>
);

const styles = StyleSheet.create({
    text: {
        color: Colors.white,
        // fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'dosis-bold',
    },
    pickerContainer: {
        backgroundColor: Colors.orange,
        padding: 8,
        borderRadius: 4,
        marginBottom: 16,
        fontWeight: 'bold',
        width: '100%',
    }
});

export default Picked;