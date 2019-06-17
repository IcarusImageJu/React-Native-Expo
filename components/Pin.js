import React from 'react';
import {
    Image
} from 'react-native';
import { ENUM_STATUS } from '../enums/status';

const Pin = ({status}) => {
    switch (status) {
        case ENUM_STATUS.CLOSED:
            return <Image source={require('../assets/images/pin/pinGreen.png')} style={{height: 70, width: 66}} />
        case ENUM_STATUS.CREATED:
            return <Image source={require('../assets/images/pin/pinGrey.png')} style={{height: 70, width: 66}} />
        case ENUM_STATUS.DISMISSED:
            return <Image source={require('../assets/images/pin/pinGrey.png')} style={{height: 70, width: 66}} />
        case ENUM_STATUS.PROCESSING:
            return <Image source={require('../assets/images/pin/pinOrange.png')} style={{height: 70, width: 66}} />
        default:
            return <Image source={require('../assets/images/pin/pinGrey.png')} style={{height: 70, width: 66}} />
    }
}

export default Pin;