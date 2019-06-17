import React from 'react';

import {
    TouchableOpacity,
    Text,
    View
} from 'react-native';

import {styles} from './styles';
import { ENUM_STATUS } from '../../enums/status';
import { t } from '../../services/i18n';
import Button from '../../components/Button';

const ButtonUpdateIssue = ({from, onPress}) => {
    switch (from) {
        case ENUM_STATUS.CREATED:
            return (
                <View>
                    <Button icon="ticket" handlePress={() => onPress(ENUM_STATUS.PROCESSING)}>
                        {t('takeIssue')}
                    </Button>
                    <TouchableOpacity onPress={() => onPress(ENUM_STATUS.DISMISSED)}>
                        <Text style={styles.link}>
                            {t('refuseIssue')}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        case ENUM_STATUS.PROCESSING:
            return (
                <View>
                    <Button icon="check" handlePress={() => onPress(ENUM_STATUS.CLOSED)}>
                        {t('finalizeIssue')}
                    </Button>
                    <TouchableOpacity onPress={() => onPress(ENUM_STATUS.DISMISSED)}>
                        <Text style={styles.link}>
                            {t('refuseIssue')}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        case ENUM_STATUS.CLOSED:
            return (
                <TouchableOpacity onPress={() => onPress(ENUM_STATUS.PROCESSING)}>
                    <Text style={styles.link}>
                        {t('reopenIssue')}
                    </Text>
                </TouchableOpacity>
            );
        default:
            return (
                <TouchableOpacity onPress={() => onPress(ENUM_STATUS.PROCESSING)}>
                    <Text style={styles.link}>
                        {t('modifyIssue')}
                    </Text>
                </TouchableOpacity>
            );
    }
}

export default ButtonUpdateIssue;