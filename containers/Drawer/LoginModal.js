import React from 'react';
import {
    Modal,
    Text,
    TouchableHighlight,
    View,
    TextInput,
    KeyboardAvoidingView,
    Alert,
    Vibration
} from 'react-native';
import { Icon } from 'expo';
import gql from "graphql-tag";
import { ApolloConsumer } from "react-apollo";

import {modalStyles} from './styles';

import SectionTitle from '../../components/SectionTitle';
import Label from '../../components/Label';
import Button from '../../components/Button';
import ErrorReport from '../../components/ErrorReport';

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
                        <KeyboardAvoidingView style={modalStyles.container} behavior="padding" enabled>
                            <View style={modalStyles.header}>
                                <View>
                                    <Text style={modalStyles.title}>Se connecter en tant qu'agent</Text>
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
                                <SectionTitle>Utilisateur</SectionTitle>
                                <Label>Veuillez introduire votre adresse email ou nom d'utilisateur</Label>
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
                                <SectionTitle>Mot de passe</SectionTitle>
                                <Label>Veuillez introduire votre mot de passe</Label>
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
                                <ErrorReport error={error} message="Comment me connecter ?"/>
                                <View style={modalStyles.button}>
                                    <Button loading={loading} icon="user-circle-o" handlePress={() => this._login(user, password, client)}>
                                        Me connecter
                                    </Button>
                                </View>
                                <TouchableHighlight onPress={closing}>
                                    <Text style={modalStyles.link}>Je ne souhaite pas me connecter</Text>
                                </TouchableHighlight>
                            </View>
                        </KeyboardAvoidingView>
                    </Modal>
                )}
            </ApolloConsumer>
        )
    }

    _login = (user, password, client) => {
        const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        // Error handler
        if(user === ''){
            Vibration.vibrate(250);
            this.setState({error: `Introduisez votre adresse email ou nom d'utilisateur.`})
        // }else if(regEmail.test(user) === false){
        //     Vibration.vibrate(250);
        //     this.setState({error: 'Introduisez une adresse email valide.'})
        }else if(password === ''){
            Vibration.vibrate(250);
            this.setState({error: 'Introduisez votre mot de passe.'})
        }else{
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
            return this._loginError(`Cet utilisateur n'existe pas ou la combinaison utilisateur et mot de passe ne sont pas correct`);
        }
    }

    _loginSuccess = (username, token) => {
        const {login} = this.props;
        // Load an alert + vibrate on success for UX sake
        Alert.alert(
            `Bienvenue ${username}`,
            `Vous êtes desormais connecté en tant qu'agent.`,
            [
                {text: 'OK'},
            ],
            { cancelable: false }
        );
        Vibration.vibrate(250);
        // Tell the drawer that we're connected
        login(username, token);
        // Remove the loading state and remove creds from the state
        this.setState({loading: false, password: '', email: ''});
    }
    _loginError = err => {
        // remove the loading state + throw an error
        this.setState({loading: false, error: err || 'Ressayer plus tard, nous éprouvons des difficultés serveurs.'});
    }
}

export default LoginModal;