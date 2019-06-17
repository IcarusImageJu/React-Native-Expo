import React from 'react';
import {
    ScrollView,
    Text,
} from 'react-native';

import { Linking } from 'expo';

import * as WebBrowser from 'expo-web-browser';

import {styles} from './styles';
import { t } from '../../services/i18n';

import SectionTitle from '../../components/SectionTitle';
import {ENUM_BACKBUTTON} from '../../enums/backButton';

class Aboutus extends React.PureComponent {
    componentDidMount(){
        this.props.header({title: t('aboutUs'), back: ENUM_BACKBUTTON.BACK})
    }
    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <SectionTitle>Qui s'occupe de cette application ?</SectionTitle>
                <Text style={styles.text}>
                    Fix My Street Wallonie est une initiative de{` `}
                    <Text style={styles.link} onPress={() => WebBrowser.openBrowserAsync('https://www.walloniepluspropre.be/')}>Wallonie Plus Propre</Text>{` `}
                    en collaboration avec les communes et les institutions wallonnes partenaires.
                </Text>
                <Text style={styles.text}>
                    Le site web et l'application mobile ont été développés et sont maintenus par{` `}
                    <Text style={styles.link} onPress={() => WebBrowser.openBrowserAsync('https://www.walloniepluspropre.be/')}>l’ASBL Be WaPP</Text>.
                </Text>
                <Text style={styles.text}>
                    L'idée originale a été inspirée par{` `}
                    <Text style={styles.link} onPress={() => WebBrowser.openBrowserAsync('http://www.mysociety.org/projects/fixmystreet/')}>MySociety's FixMyStreet</Text>.
                </Text>
                <Text style={styles.text}>
                    Le projet a été réalisé et adapté pour la Région Wallonne par l’asbl Be WaPP à partir du code du{` `}
                    <Text style={styles.link} onPress={() => WebBrowser.openBrowserAsync('https://cirb.brussels/')}>CIRB (Centre d’Informatique pour la Région Bruxelloise)</Text>{` `}
                    lui-même issu du code Open Source du projet{` `}
                    <Text style={styles.link} onPress={() => WebBrowser.openBrowserAsync('http://www.fixmystreet.ca/')}>fixmystreet.ca</Text>{` `}
                    de visiblegovernment.ca.
                </Text>
                <SectionTitle>Coordonées de contact</SectionTitle>
                <Text style={styles.textNoMargin}>
                    Be WaPP asbl
                </Text>
                <Text style={styles.textNoMargin}>
                    Chaussée de Liège 221, 5100 Jambes (Namur)
                </Text>
                <Text style={styles.textNoMargin}>
                    T : 081 32 26 40
                </Text>
                <Text style={styles.text}>
                    E-mail: <Text style={styles.link} onPress={() => Linking.openURL('mailto:info@bewapp.be')}>info@bewapp.be</Text>
                </Text>
            </ScrollView>
        );
    }

}

export default Aboutus;