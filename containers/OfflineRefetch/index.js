import React from 'react';
import {
    Text,
    View,
} from 'react-native';

import { emptyStyles } from './styles';
import { t } from '../../services/i18n';

import BigIcon from '../../components/BigIcon';

const OfflineRefetch = () => (
    <View style={emptyStyles.container}>
        <View style={emptyStyles.top}>
            <View style={emptyStyles.icon}>
                <BigIcon icon={'refresh'} color={'grey'}/>
            </View>
            <Text style={emptyStyles.title}>
                Hu ho! Vous n'êtes pas connecté
            </Text>
            <Text style={emptyStyles.text}>
                Veuillez vous connecter à internet pour charger la page
            </Text>
        </View>
    </View>
)

export default OfflineRefetch;