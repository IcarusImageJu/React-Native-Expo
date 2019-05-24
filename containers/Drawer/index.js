import React from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View,
    Animated,
    ToastAndroid,
    Vibration,
    Alert
} from 'react-native';

import { Icon, SecureStore } from 'expo';
import { Link } from "react-router-native";
import {
    FlingGestureHandler,
    Directions,
    State,
} from 'react-native-gesture-handler';

import { t } from '../../services/i18n';

import { styles } from './styles';
import MyStorage from '../../constants/MyStorage';
import LoginModal from './LoginModal';

export default class Drawer extends React.PureComponent {

    state = {
        fadeAnim: new Animated.Value(0),
        slide: new Animated.Value(-200),
        agentPress: 0,
        loginModal: false,
        open: false,
    }

    componentDidMount() {
        this._verifyAgent();
    }

    componentDidUpdate(prevProps){
        const {open} = this.props;
        if(open !== prevProps.open){
            if(open){
                this._openDrawer();
            }else{
                this._closeDrawer();
            }
        }
    }

    render() {
        const { fadeAnim, slide, loginModal, open } = this.state;
        const { current, version, agent = null} = this.props;
        if(!open){
            return <></>
        }
        return (
            <>
                <Animated.View style={{...styles.over, opacity: fadeAnim}}>
                    <TouchableOpacity
                        style={styles.closeBar}
                        onPress={() => this.props.drawer()}
                    />
                    <FlingGestureHandler
                        direction={Directions.LEFT}
                        onHandlerStateChange={({ nativeEvent }) => {
                            if (nativeEvent.state === State.ACTIVE) {
                                this.props.drawer();
                            }
                        }}
                    >
                        <Animated.ScrollView style={{...styles.container, left: slide}} contentContainerStyle={styles.innerContainer}>
                            <View style={styles.header}>
                                <Link to='/' onPress={this.props.drawer}>
                                    <Image
                                        source={require('../../assets/images/logo.png')}
                                        style={styles.logo}
                                        resizeMode={'contain'}
                                        resizeMethod={'resize'}
                                    />
                                </Link>
                                <TouchableOpacity onPress={this.props.drawer} style={styles.iconWrapper}>
                                    <Icon.FontAwesome
                                        style={styles.closeIcon}
                                        name={'times'}
                                        size={24}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.languages}>
                                <TouchableOpacity onPress={() => this.props.change('fr')} style={{...styles.languagesSelector, borderWidth: current === 'fr' ? 1 : 0}}>
                                    <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.languageLink}>FR</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.change('nl')} style={{...styles.languagesSelector, borderWidth: current === 'nl' ? 1 : 0}}>
                                    <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.languageLink}>NL</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.change('de')} style={{...styles.languagesSelector, borderWidth: current === 'de' ? 1 : 0}}>
                                    <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.languageLink}>DE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.change('en')} style={{...styles.languagesSelector, borderWidth: current === 'en' ? 1 : 0}}>
                                    <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.languageLink}>EN</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.menu}>
                                <Link onPress={this.props.drawer} to='/'>
                                    <Text style={styles.link}>Accueil</Text>
                                </Link>
                                <Link onPress={this.props.drawer} to='/myIssue'>
                                    <Text style={styles.link}>{t('myIssues')}</Text>
                                </Link>
                                <Link onPress={this.props.drawer} to='/allissues'>
                                    <Text style={styles.link}>{t('allIssues')}</Text>
                                </Link>
                            </View>
                            <View style={styles.menu}>
                                <Link onPress={this.props.drawer} to='/page/aboutus'>
                                    <Text style={styles.link}>{t('aboutUs')}</Text>
                                </Link>
                                <Link onPress={this.props.drawer} to='/page/help'>
                                    <Text style={styles.link}>{t('help')}</Text>
                                </Link>
                                <Link onPress={this.props.drawer} to='/page/faq'>
                                    <Text style={styles.link}>{t('faq')}</Text>
                                </Link>
                                <Link onPress={this.props.drawer} to='/page/termsofuse'>
                                    <Text style={styles.link}>{t('useConditions')}</Text>
                                </Link>
                            </View>
                            {agent && <View style={styles.menu}>
                                <TouchableOpacity onPress={() => this._logoutAsker()}>
                                    <Text style={styles.link}>Se deconnecter</Text>
                                </TouchableOpacity>
                            </View>}
                            <TouchableOpacity style={styles.versionContainer} onPress={() => this._agent()}>
                                <Text style={styles.version}>
                                    {t('version')} {version}
                                </Text>
                            </TouchableOpacity>
                        </Animated.ScrollView>
                    </FlingGestureHandler>
                </Animated.View>
                <LoginModal
                    open={loginModal}
                    login={(username, token) => this._login(username, token)}
                    closing={() => this.setState({loginModal: false})}
                />
            </>
        );
    }

    _openDrawer = () => {
        this.setState({open: true});
        Animated.parallel([
            // after decay, in parallel:
            Animated.timing(
                this.state.fadeAnim,            // The animated value to drive
                {
                    toValue: 1,                   // Animate to opacity: 1 (opaque)
                    duration: 150,              // Make it take a while
                }
            ),
            Animated.timing(
                this.state.slide,            // The animated value to drive
                {
                    toValue: 0,                   // Animate to opacity: 1 (opaque)
                    duration: 250,              // Make it take a while
                }
            ),
        ]).start();
    }

    _closeDrawer = () => {
        Animated.parallel([
            // after decay, in parallel:
            Animated.timing(
                this.state.fadeAnim,            // The animated value to drive
                {
                    toValue: 0,                   // Animate to opacity: 1 (opaque)
                    duration: 150,              // Make it take a while
                }
            ),
            Animated.timing(
                this.state.slide,            // The animated value to drive
                {
                    toValue: -200,                   // Animate to opacity: 1 (opaque)
                    duration: 250,              // Make it take a while
                }
            ),
        ]).start(() => this.setState({open: false}));
    }

    _agent = () => {
        const {agentPress} = this.state;
        const {agent = null} = this.props;
        // let the agent try to click 5 time before screening the modal
        if(agent) {
            ToastAndroid.showWithGravity(
                `Vous êtes déjà connecté en tant qu'agent`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        } else {
            if(agentPress < 2){
                this.setState({agentPress: agentPress + 1});
            } else if (agentPress < 4) {
                ToastAndroid.showWithGravity(
                    `Encore ${ 5 - agentPress} pour debloquer le mode agent`,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                this.setState({agentPress: agentPress + 1});
            } else {
                Vibration.vibrate(250);
                this.setState({agentPress: 0, loginModal: true});
            }
        }
    }

    _login = async (username, token) => {
        const agentLogged = {username, token, logged: true};
        await SecureStore.setItemAsync(MyStorage.AGENT, JSON.stringify(agentLogged));
        this.props.connect(agentLogged);
        this.setState({loginModal: false});
    }

    _logoutAsker = () => {
        Alert.alert(
            'Se deconnecter',
            `Vous allez être déconnecté et ne pourrez plus effectuer de maintenances d’incidents. Vous pourrez vous reconnecter à tout moment en appuyant 5 fois sur le numéro de version.`,
            [
                {text: 'Annuler', style: 'cancel'},
                {text: 'Deconnecter', onPress: () => this._logout()},
            ],
            { cancelable: false }
        )
    }

    _logout = async () => {
        await SecureStore.deleteItemAsync(MyStorage.AGENT);
        this.props.connect(null);
        Vibration.vibrate(250);
    }

    _verifyAgent = async () => {
        const value = await SecureStore.getItemAsync(MyStorage.AGENT);
        if (value !== null) {
            this.props.connect(JSON.parse(value));
        }
    }
}
