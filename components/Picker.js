import React from 'react';
import {
    View,
    Picker,
    StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';

const PickerCustom = ({options = [], selected = '', onChange}) => (
    <View style={styles.pickerContainer}>
        <Picker
            selectedValue={selected}
            style={styles.picker}
            prompt={'Type de signalement'}
            onValueChange={(itemValue) => onChange(itemValue)}
        >
            {options.map(option => (
                <Picker.Item key={option.id} label={option.nameFr} value={option.id} />
            ))}
        </Picker>
    </View>
);

const styles = StyleSheet.create({
    picker: {
        height: 32,
        width: '100%',
    },
    pickerContainer: {
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        // fontWeight: 'bold',
        fontFamily: 'dosis-bold',
        width: '100%',
    }
});

export default PickerCustom;