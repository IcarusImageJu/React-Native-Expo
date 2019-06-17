import React from 'react';
import {
    View,
    Picker,
    StyleSheet,
    Platform
} from 'react-native';

import Colors from '../constants/Colors';
import { t } from '../services/i18n';

const PickerCustom = ({options = [], selected = '', onChange}) => (
    <View style={styles.pickerContainer}>
        <Picker
            selectedValue={selected}
            style={styles.picker}
            prompt={t('typeOfIssue')}
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
        height: Platform.OS === 'ios' ? 'auto' : 32,
        width: '100%',
    },
    pickerContainer: {
        borderColor: Colors.black,
        borderWidth: 1,
        borderRadius: 4,
        marginBottom: 16,
        fontFamily: 'dosis-bold',
        width: '100%',
    }
});

export default PickerCustom;