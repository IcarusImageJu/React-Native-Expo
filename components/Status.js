import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import { ENUM_STATUS } from '../enums/status';
import SectionTitle from './SectionTitle';
import StatusBar from './StatusBar';

import { t } from '../services/i18n';

import { statusTitle } from '../enums/status';

const Status = ({status:{status: enumStatus, comment, date}}) => {
    if(comment) {
        return(
            <View style={{...commentStyles.commentContainer, ...commentStyles[enumStatus]}}>
                <Text style={commentStyles.title}>{statusTitle(enumStatus)}</Text>
                {date && <SectionTitle color='white'>{t('issue')}</SectionTitle>}
                {date && <Text style={commentStyles.comment}>{t("date", {date})}</Text>}
                <SectionTitle color='white'>{t('comment')}</SectionTitle>
                <Text style={commentStyles.comment}>{comment}</Text>
            </View>
        )
    }

    return(
        <View style={barStyle.commentContainer}>
            <Text style={barStyle.title}>{statusTitle(enumStatus)}</Text>
            <StatusBar status={enumStatus}/>
            {date && <SectionTitle>{t('issue')}</SectionTitle>}
            {date && <Text style={barStyle.text}>{t("date", {date})}</Text>}
        </View>
    )
}


const commentStyles = StyleSheet.create({
    title: {
        color: Colors.white,
        // fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 16,
        fontFamily: 'dosis-bold',
    },
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
    },
    [ENUM_STATUS.FINALIZED] :{
        backgroundColor: Colors.green,
    },
    [ENUM_STATUS.IN_PROGRESS] :{
        backgroundColor: Colors.orange,
    },
    [ENUM_STATUS.REFUSE] :{
        backgroundColor: Colors.grey,
    }
});

const barStyle = StyleSheet.create({
    title: {
        color: Colors.black,
        // fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 8,
        fontFamily: 'dosis-bold',
    },
    commentContainer: {
        marginBottom: 16,
        width: '100%',
    },
    text: {
        fontSize: 14,
        fontFamily: 'dosis-regular',
    },
    [ENUM_STATUS.FINALIZED] :{
        backgroundColor: Colors.green,
    },
    [ENUM_STATUS.IN_PROGRESS] :{
        backgroundColor: Colors.orange,
    },
    [ENUM_STATUS.REFUSE] :{
        backgroundColor: Colors.grey,
    }
});

export default Status;