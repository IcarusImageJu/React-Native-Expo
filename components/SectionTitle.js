import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

const SectionTitle = ({children, color = 'black'}) => (
    <View style={styles.button}>
        <Text style={{...styles.text, ...styles[color]}}>{children.toUpperCase()}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    text: {
        color: Colors.black,
        fontSize: 10,
        opacity: .87,
        marginBottom: 4,
        textTransform: 'uppercase',
        fontFamily: 'dosis-regular',
    },
    black: {
        color: Colors.black,
    },
    white: {
        color: Colors.white,
    }
})

export default SectionTitle;