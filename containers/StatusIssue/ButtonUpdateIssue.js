import React from 'react';

import {
    TouchableOpacity,
    Text,
    View
} from 'react-native';

import {styles} from './styles';
import { ENUM_STATUS } from '../../enums/status';
import Button from '../../components/Button';

const ButtonUpdateIssue = ({from, onPress}) => {
    switch (from) {
        case ENUM_STATUS.REPORTED:
            return (
                <View>
                    <Button icon="ticket" handlePress={() => onPress(ENUM_STATUS.IN_PROGRESS)}>
                        Prendre en charge
                    </Button>
                    <TouchableOpacity onPress={() => onPress(ENUM_STATUS.REFUSE)}>
                        <Text style={styles.link}>
                            Refuser la prise en charge
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        case ENUM_STATUS.IN_PROGRESS:
            return (
                <View>
                    <Button icon="check" handlePress={() => onPress(ENUM_STATUS.FINALIZED)}>
                        Cloturer l'incident
                    </Button>
                    <TouchableOpacity onPress={() => onPress(ENUM_STATUS.REFUSE)}>
                        <Text style={styles.link}>
                            Refuser la prise en charge
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        case ENUM_STATUS.FINALIZED:
            return (
                <TouchableOpacity onPress={() => onPress(ENUM_STATUS.IN_PROGRESS)}>
                    <Text style={styles.link}>
                        Ouvrir à nouveau l'incident
                    </Text>
                </TouchableOpacity>
            );
        default:
            return (
                <TouchableOpacity onPress={() => onPress(ENUM_STATUS.IN_PROGRESS)}>
                    <Text style={styles.link}>
                        Modifier le status
                    </Text>
                </TouchableOpacity>
            );
    }
}

export default ButtonUpdateIssue;