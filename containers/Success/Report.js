import React from 'react';
import {
    Text,
    View,
    Vibration,
    Animated
} from 'react-native';
import { withRouter } from "react-router";
import { Audio } from 'expo';

import { styles } from './styles';
import { Link } from "react-router-native";
import BigIcon from '../../components/BigIcon';
import Button from '../../components/Button';

import { t } from '../../services/i18n';
import {ENUM_BACKBUTTON} from '../../enums/backButton';

class SuccessReport extends React.PureComponent {
    state = {
        icon: {
            opacity: new Animated.Value(0),
            scale: new Animated.Value(0.5),
        },
        title: {
            opacity: new Animated.Value(0),
            scale: new Animated.Value(0.5),
        },
        subTitle: {
            opacity: new Animated.Value(0),
            scale: new Animated.Value(0.5),
        }
    }

    componentDidMount(){
        // Trigger the header change
        this.props.header({title: t('thankYou'), back: ENUM_BACKBUTTON.CANCEL_INACTIVE})
        // Play Success sound
        this._successSound();
        // Animate the page
        const {icon, title, subTitle} = this.state;
        Vibration.vibrate(250);
        Animated.stagger(150, [
            Animated.parallel([
                Animated.timing(
                    icon.opacity, {
                        toValue: 1,
                        duration: 150,
                    }
                ),
                Animated.spring(
                    icon.scale, {
                        toValue: 1,
                        duration: 300,
                    }
                ),
            ]),
            Animated.parallel([
                Animated.timing(
                    title.opacity, {
                        toValue: 1,
                        duration: 150,
                    }
                ),
                Animated.spring(
                    title.scale, {
                        toValue: 1,
                        duration: 300,
                    }
                ),
            ]),
            Animated.parallel([
                Animated.timing(
                    subTitle.opacity, {
                        toValue: 1,
                        duration: 150,
                    }
                ),
                Animated.spring(
                    subTitle.scale, {
                        toValue: 1,
                        duration: 300,
                    }
                ),
            ])
        ]).start();
    }

    render() {
        const { icon, title, subTitle } = this.state;
        const { match:{params:{id}} } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Animated.View style={{...styles.icon, opacity: icon.opacity, transform: [{scaleX: icon.scale}, {scaleY: icon.scale}]}}>
                        <BigIcon icon={'check'} color={'white'}/>
                    </Animated.View>
                    <Animated.View style={{opacity: icon.opacity, transform: [{scaleX: title.scale}, {scaleY: title.scale}]}}>
                        <Text style={styles.title}>
                            {t('thankYou')}
                        </Text>
                    </Animated.View>
                    <Animated.View style={{opacity: icon.opacity, transform: [{scaleX: subTitle.scale}, {scaleY: icon.scale}]}}>
                        <Text style={styles.text}>
                            {t('issueSent')}
                        </Text>
                    </Animated.View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.button}>
                        <Button color={'white'} to={`/status/${id}`} icon="history">
                            {t('followMyIssue')}
                        </Button>
                    </View>
                    <Link to={'/'}>
                        <Text style={styles.link}>{t('backToHome')}</Text>
                    </Link>
                </View>
            </View>
        );
    }

    _successSound = async () => {
        try {
            const { sound: soundObject, status } = await Audio.Sound.createAsync(
                require('../../assets/sounds/success.m4a'),
                { shouldPlay: true },
            );
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    }
}

export default withRouter(SuccessReport);