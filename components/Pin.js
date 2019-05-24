import React from 'react';
import {
    Image
} from 'react-native';
import { ENUM_STATUS } from '../enums/status';

const Pin = ({status}) => {
    switch (status) {
        case ENUM_STATUS.FINALIZED:
            return <Image source={require('../assets/images/pin/pinGreen.png')} style={{height: 70, width: 66}} />
        case ENUM_STATUS.REPORTED:
            return <Image source={require('../assets/images/pin/pinGrey.png')} style={{height: 70, width: 66}} />
        case ENUM_STATUS.REFUSE:
            return <Image source={require('../assets/images/pin/pinGrey.png')} style={{height: 70, width: 66}} />
        case ENUM_STATUS.IN_PROGRESS:
            return <Image source={require('../assets/images/pin/pinOrange.png')} style={{height: 70, width: 66}} />
        default:
            return <Image source={require('../assets/images/pin/pinGrey.png')} style={{height: 70, width: 66}} />
    }
}

export default Pin;