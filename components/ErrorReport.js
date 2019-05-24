import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import SectionTitle from './SectionTitle';

import { t } from '../services/i18n';
import { withSound } from './Sounds';

const ErrorReport = ({error, message = null, sounds}) => {
    if(error){
        sounds.error();
        return(
            <View style={commentStyles.commentContainer}>
                <SectionTitle color='white'>{message ? message : `Votre signalement ne s'est pas envoyé :`}</SectionTitle>
                <Text style={commentStyles.comment}>{error}</Text>
            </View>
        )
    }
    return <></>
}

const commentStyles = StyleSheet.create({
    comment: {
        color: Colors.white,
        // fontWeight: 'bold',
        fontSize: 14,
        fontFamily: 'dosis-regular',
    },
    commentContainer: {
        backgroundColor: Colors.grey,
        paddingTop: 16,
        paddingBottom: 16,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4,
        marginBottom: 16,
        // fontWeight: 'bold',
        width: '100%',
        fontFamily: 'dosis-bold',
    }
});

export default withSound(ErrorReport);