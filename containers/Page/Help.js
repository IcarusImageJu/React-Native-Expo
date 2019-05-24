import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import {styles} from './styles';
import { t } from '../../services/i18n';

import {ENUM_BACKBUTTON} from '../../enums/backButton';
import SectionTitle from '../../components/SectionTitle';

class Help extends React.PureComponent {
    componentDidMount(){
        this.props.header({title: t('help'), back: ENUM_BACKBUTTON.BACK})
    }
    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                {/* <SectionTitle>Qui s'occupe de cette application ?</SectionTitle> */}
                <Text style={styles.text}>
                    Le site Fix My Street Wallonie est optimisé pour les systèmes d’exploitation Microsoft Windows, Apple Macintosh et Linux disposant des logiciels suivants :
                </Text>
                <Text style={styles.text}>
{`Microsoft Internet Explorer 11
Microsoft Edge 38 et supérieurs
Mozilla FireFox 50 et supérieurs
Google Chrome 53 et supérieurs
Adobe Acrobat Reader 9 et supérieurs `}
                </Text>
                <SectionTitle>Vous souhaitez signaler un incident avec votre smartphone ? </SectionTitle>
                <Text style={styles.text}>
                    C’est simple et efficace pour localiser l’incident, prendre les photos et transmettre l’incident aux gestionnaires.
                </Text>
                <Text style={styles.text}>
                    Vous trouverez l’application pour signaler un incident sur Fix My Street Wallonie sur les app stores pour iOS et Android.
                </Text>
                <TouchableOpacity style={styles.badgeContainer}>
                    <Image
                        source={require('../../assets/images/badges/apple.png')}
                        style={styles.logo}
                        resizeMode={'contain'}
                        resizeMethod={'resize'}
                        style={styles.badge}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.badgeContainer}>
                    <Image
                        source={require('../../assets/images/badges/google.png')}
                        style={styles.logo}
                        resizeMode={'contain'}
                        resizeMethod={'resize'}
                        style={styles.badge}
                    />
                </TouchableOpacity>
            </ScrollView>
        );
    }

}

export default Help;