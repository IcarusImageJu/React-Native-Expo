import React from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    SafeAreaView,
    Vibration,
    Platform
} from 'react-native';
import * as Icon from '@expo/vector-icons';
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";

import { t } from '../../services/i18n';

import {modalStyles} from './styles';

import SectionTitle from '../../components/SectionTitle';
import Label from '../../components/Label';
import Button from '../../components/Button';
import ErrorReport from '../../components/ErrorReport';
import Colors from '../../constants/Colors';

const AUTHENTICATE = gql`
    query Authenticate($user: String!, $password: String!) {
        authenticate(user: $user, password: $password) {
            token
            username
        }
    }
`;

class LoginModal extends React.PureComponent {
    state = {
        user: '',
        password: '',
        loading: false,
        error: null,
    }
    render(){
        const {open, closing} = this.props;
        const {user, password, loading, error} = this.state;
        return(
            <ApolloConsumer>
                {client => (
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={open}
                        onRequestClose={closing}
                    >
                        <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
                            <KeyboardAvoidingView style={modalStyles.container} behavior="padding" enabled>
                                <View style={modalStyles.header}>
                                    <View>
                                        <Text style={modalStyles.title}>{t('agentConnect')}</Text>
                                    </View>
                                    <TouchableHighlight onPress={closing} style={modalStyles.close}>
                                        <Icon.FontAwesome
                                            style={modalStyles.icon}
                                            name={'times'}
                                            size={24}
                                        />
                                    </TouchableHighlight>
                                </View>
                                <View style={modalStyles.body}>
                                    <SectionTitle>{t('user')}</SectionTitle>
                                    <Label>{t('agentConnect')}</Label>
                                    <TextInput
                                        style={modalStyles.input}
                                        value={user}
                                        onChangeText={user => this.setState({user})}
                                        textAlignVertical={'top'}
                                        numberOfLines={1}
                                        keyboardType={'email-address'}
                                        autoComplete={'email'}
                                        autoCapitalize={'none'}
                                    />
                                    <SectionTitle>{t('password')}</SectionTitle>
                                    <Label>{t('passwordDescription')}</Label>
                                    <TextInput
                                        style={modalStyles.input}
                                        value={password}
                                        onChangeText={password => this.setState({password})}
                                        textAlignVertical={'top'}
                                        numberOfLines={1}
                                        autoComplete={'password'}
                                        autoCapitalize={'none'}
                                        secureTextEntry={true}
                                    />
                                    <ErrorReport error={error} message={t('howToConnect')}/>
                                    <View style={modalStyles.button}>
                                        <Button loading={loading} icon="user-circle-o" handlePress={() => this._login(user, password, client)}>
                                            {t('connect')}
                                        </Button>
                                    </View>
                                    <TouchableHighlight onPress={closing}>
                                        <Text style={modalStyles.link}>{t('dontConnect')}</Text>
                                    </TouchableHighlight>
                                </View>
                            </KeyboardAvoidingView>
                        </SafeAreaView>
                    </Modal>
                )}
            </ApolloConsumer>
        )
    }

    _login = (user, password, client) => {
        // const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        // Error handler
        if(user === ''){
            Vibration.vibrate(250);
            this.setState({error: t('useUser')})
        // }else if(regEmail.test(user) === false){
        //     Vibration.vibrate(250);
        //     this.setState({error: 'Introduisez une adresse email valide.'})
        } else if (password === '') {
            Vibration.vibrate(250);
            this.setState({error: t('usePassword')})
        } else {
            // Set the loading state
            this.setState({loading: true, error: null});
            // Do the query
            this._authenticate(user,password,client);
        }
    }

    _authenticate = async (user, password, client) => {
        // Try the query with credentials
        try {
            const {data} = await client.query({
                query: AUTHENTICATE,
                variables:{
                    user,
                    password
                }
            })
            return this._loginSuccess(data.authenticate.username, data.authenticate.token);
        } catch (error) {
            return this._loginError(t('connectError'));
        }
    }

    _loginSuccess = (username, token) => {
        const {login} = this.props;
        // Tell the drawer that we're connected
        login(username, token);
        // Remove the loading state and remove creds from the state
        this.setState({loading: false, password: '', email: ''});
        // Load an alert + vibrate on success for UX sake
        if (Plateform.OS !== 'ios') {
            Alert.alert(
                t('welcomeX', {name: username}),
                t('youAreConnectedAgent'),
                [
                    {text: t('ok')},
                ],
                { cancelable: false }
            );
        }
        Vibration.vibrate(250);
    }
    _loginError = err => {
        // remove the loading state + throw an error
        this.setState({loading: false, error: err || t('retryLaterServerError')});
    }
}

export default LoginModal;