import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Colors from '../constants/Colors';

const Label = ({children}) => (
    <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    text: {
        // fontWeight: 'regular',
        color: Colors.black,
        fontSize: 12,
        opacity: .54,
        marginBottom: 4,
        fontFamily: 'dosis-regular',
    }
})

export default Label;