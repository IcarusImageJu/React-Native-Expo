import React from 'react';
import {
    Text,
    View,
    Vibration,
    Animated,
    Linking,
    Platform
} from 'react-native';
import { withRouter } from "react-router";
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { Audio } from 'expo';

import { styles } from './styles';
import { Link } from "react-router-native";
import BigIcon from '../../components/BigIcon';
import Button from '../../components/Button';

import { t } from '../../services/i18n';
import {ENUM_BACKBUTTON} from '../../enums/backButton';

const GET_ISSUE = gql`
    query Incidence($id: Int!) {
        incidence(id: $id) {
            id
            latitude
            longitude
            address{
                name
                street
                postalCode
                city
            }
        }
    }
`

class SuccessInProgress extends React.PureComponent {
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
        this.props.header({title: "Pris en Charge !", back: ENUM_BACKBUTTON.CANCEL_INACTIVE})
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
            <Query query={GET_ISSUE} variables={{id: parseInt(id)}}>
            {({ loading, error, data }) => (
                <View style={styles.container}>
                    <View style={styles.top}>
                        <Animated.View style={{...styles.icon, opacity: icon.opacity, transform: [{scaleX: icon.scale}, {scaleY: icon.scale}]}}>
                            <BigIcon icon={'ticket'} color={'white'}/>
                        </Animated.View>
                        <Animated.View style={{opacity: icon.opacity, transform: [{scaleX: title.scale}, {scaleY: title.scale}]}}>
                            <Text style={styles.title}>
                                Pris en Charge !
                            </Text>
                        </Animated.View>
                        <Animated.View style={{opacity: icon.opacity, transform: [{scaleX: subTitle.scale}, {scaleY: icon.scale}]}}>
                            <Text style={styles.text}>
                                Le signalement est en cours de résolution.
                            </Text>
                        </Animated.View>
                    </View>
                    <View style={styles.bottom}>
                        {!error &&
                            <View style={styles.button}>
                                <Button loading={loading} color={'white'} handlePress={() => this._openMapsApp(data)} icon="map">
                                    Se rendre sur place
                                </Button>
                            </View>
                        }
                        <Link to={`/status/${id}`}>
                            <Text style={styles.link}>{t('followMyIssue')}</Text>
                        </Link>
                        <Link to={'/'}>
                            <Text style={styles.link}>{t('backToHome')}</Text>
                        </Link>
                    </View>
                </View>
            )}
            </Query>
        );
    }

    _openMapsApp = data => {
        const {incidence: {address, latitude, longitude}} = data;
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${latitude},${longitude}`;
        const label = address ? `${address.name} ${address.street}, ${address.postalCode} ${address.city}` : 'Incident';
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        return Linking.openURL(url);
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

export default withRouter(SuccessInProgress);