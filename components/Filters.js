import React from 'react';
import posed from 'react-native-pose';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    DatePickerAndroid,
    DatePickerIOS,
} from 'react-native';
import CheckBox from 'react-native-check-box'

import { ENUM_STATUS, statusTitle } from '../enums/status';
import Colors from '../constants/Colors';
import { t } from '../services/i18n';
import Picker from './Picker';

const Box = posed.View({
    open: {
        elevation: 1,
        marginTop: 8,
        marginBottom: 8
    },
    close: {
        elevation: 0,
        marginTop: 0,
        marginBottom: 0
    }
});

const Opacity = posed.View({
    open: {
        opacity: 1,
    },
    close: {
        opacity: 0,
    }
});


class Filters extends React.PureComponent {
    options = [
        {
            "id": ENUM_STATUS.CREATED,
            "nameFr": statusTitle(ENUM_STATUS.CREATED),
        },
        {
            "id": ENUM_STATUS.PROCESSING,
            "nameFr": statusTitle(ENUM_STATUS.PROCESSING),
        },
        {
            "id": ENUM_STATUS.CLOSED,
            "nameFr": statusTitle(ENUM_STATUS.CLOSED),
        },
        {
            "id": ENUM_STATUS.INCOMPLETE,
            "nameFr": statusTitle(ENUM_STATUS.INCOMPLETE),
        },
        {
            "id": ENUM_STATUS.DISMISSED,
            "nameFr": statusTitle(ENUM_STATUS.DISMISSED),
        }
    ];

    DatePicker = (os, type) => {
        const { filter: {startDate, endDate} } = this.props;
        switch (os) {
            case 'ios':
                return(
                    <DatePickerIOS style={styles.date} date={type === 'start' ? startDate : endDate} onDateChange={newDate => this._update((type === 'start' ? 'startDate' : 'endDate'), newDate) }/>
                )
            default:
                return(
                    <TouchableOpacity onPress={() => this._pickDateAndroid(type)}>
                        <Text style={styles.date}>Date de début: {t("date", {date: (type === 'start' ? startDate : endDate)})}</Text>
                    </TouchableOpacity>
                )
        }
    }

    render() {
        const { filter: {open, date, status, statusSelected} } = this.props;
        const options = this.options;
        return(
            <Box style={styles.box} pose={open ? 'open':'close'}>
                <TouchableOpacity onPress={() => this._update('open', !open)}>
                    <Text style={styles.link}>{open ? t('closeFilters') : t('seeFilters')}</Text>
                </TouchableOpacity>
                    <Opacity style={styles.filter} pose={open ? 'open':'close'}>
                        {open && (<View>
                            <CheckBox
                                style={{paddingBottom: 8}}
                                onClick={() => this._update('date', !date)}
                                isChecked={date}
                                rightText={t('filterByDates')}
                            />
                            <Opacity pose={date ? 'open':'close'}>
                                {date && this.DatePicker(Platform.OS, 'start')}
                                {date && this.DatePicker(Platform.OS, 'end')}
                            </Opacity>
                            <CheckBox
                                style={{paddingBottom: 8}}
                                onClick={() => {this._update('status', !status)}}
                                isChecked={status}
                                rightText={t('filterByStatus')}
                            />
                            <Opacity pose={status ? 'open':'close'}>
                                {status && (
                                    <Picker
                                        options={options}
                                        selected={statusSelected}
                                        onChange={value => this._update('statusSelected', value)}/>
                                )}
                            </Opacity>
                        </View>)}
                    </Opacity>
            </Box>
        )
    }

    _pickDateAndroid = async type => {
        const { filter:{startDate, endDate} } = this.props;
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                // Use `new Date()` for current date.
                // May 25 2020. Month 0 is January.
                date: type === 'start' ? startDate : endDate
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                this._update((type === 'start' ? 'startDate' : 'endDate'), new Date(year, month, day))
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    _update = (type, data) => {
        const {update, filter} = this.props;
        const newFilter = {...filter, [type]: data};
        update(newFilter);
    }
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#fff',
        paddingTop: 8,
        borderRadius: 4,
        paddingLeft: 16,
        paddingRight: 16,
        marginLeft: 16,
        marginRight: 16,
    },
    link:{
        padding: 8,
        color:Colors.black,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'dosis-bold',
    },
    date:{
        paddingTop: 8,
        paddingBottom: 8,
        color:Colors.black,
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'dosis-bold',
    },
    filter:{
        marginBottom:8
    }
});

export default Filters;