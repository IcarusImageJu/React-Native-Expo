import {StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        padding: 16,
    },
    text:{
        marginBottom: 16,
        fontFamily: 'dosis-regular',
    },
    textNoMargin:{
        fontFamily: 'dosis-regular',
    },
    link: {
        fontFamily: 'dosis-bold',
        textDecorationLine: 'underline',
    },
    badgeContainer:{
    },
    badge:{
        height: 64,
        width: 166,
        alignSelf: 'center'
    }
});