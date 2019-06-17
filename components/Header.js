import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    BackHandler
} from 'react-native';
import * as Icon from '@expo/vector-icons';
import { Link } from "react-router-native";
import { NetworkConsumer } from 'react-native-offline';

import { t } from '../services/i18n';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { ENUM_BACKBUTTON } from '../enums/backButton';

const BackButton = ({type}) => {
    switch(type){
        case ENUM_BACKBUTTON.CANCEL :
            return (
                <Link to={'/'} style={styles.menu}>
                    <View style={styles.backButton}>
                        <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.backText}>Annuler</Text>
                    </View>
                </Link>
            );
        case ENUM_BACKBUTTON.BACK :
            return (
                <Link to={'/'} style={styles.menu}>
                    <View style={styles.backButton}>
                        <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.backText}>Retour</Text>
                    </View>
                </Link>
            );
        case ENUM_BACKBUTTON.BACK_INACTIVE :
            return (
                <View style={styles.menu}>
                    <View style={{...styles.backButton, ...styles.inactive}}>
                        <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.backText}>Retour</Text>
                    </View>
                </View>
            );
        case ENUM_BACKBUTTON.CANCEL_INACTIVE :
            return (
                <View style={styles.menu}>
                    <View style={{...styles.backButton, ...styles.inactive}}>
                        <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.backText}>Annuler</Text>
                    </View>
                </View>
            );
        default:
            return <></>
    }
}

class Drawer extends React.PureComponent {
    state = {
        backPressed : 0
    }
    componentWillReceiveProps(props){
        const {header:{back}, history} = props;
        if (back === ENUM_BACKBUTTON.BACK || back === ENUM_BACKBUTTON.CANCEL) {
            this.setState({backPressed: 0});
            BackHandler.addEventListener('hardwareBackPress', () => this._handleBackPress(history))
        } else {
            BackHandler.removeEventListener('hardwareBackPress', () => this._handleBackPress(history));
        }
    }
    _handleBackPress = (history) => {
        this.setState({backPressed: this.state.backPressed + 1})
        if(this.state.backPressed === 2){
            BackHandler.exitApp()
        }
        history.push('/'); // works best when the goBack is async
        return true;
    }
    render() {
        const {header:{title, back}, drawer, history} = this.props;
        return (
            <>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity to={'drawer'} style={styles.menu} onPress={drawer}>
                            <View style={styles.menuButton}>
                                <Icon.FontAwesome
                                    style={styles.menuIcon}
                                    name={'bars'}
                                    size={22}
                                />
                                <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.menuText}>{t('menu')}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.containerTitle}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <BackButton type={back}/>
                    </View>
                </View>
                <NetworkConsumer>
                {({ isConnected }) => (
                    !isConnected && (<Text style={styles.offline}>{t('currentlyOffline')}</Text>)
                )}
                </NetworkConsumer>
            </>
        );
    }

}

export default Drawer;

const styles = StyleSheet.create({
    container: {
        width: Layout.window.width,
        height: 64,
        backgroundColor: Colors.white,
        // borderBottomWidth: 1,
        // borderBottomColor: Colors.black,
        elevation: 2,
        paddingLeft:16,
        paddingRight: 16,
        position: 'relative',
        marginBottom: 0
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    menu: {
        height: 32,
    },
    menuButton: {
        borderWidth: 1,
        borderColor: Colors.black,
        borderRadius: 4,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 4,
        paddingTop: 4,
        height: 32,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
    },
    menuIcon: {
        color: Colors.black,
        marginRight: 8,
    },
    menuText: {
        // fontWeight: 'bold',
        color: Colors.black,
        fontSize: 16,
        fontFamily: 'dosis-bold',
    },
    backButton: {
        backgroundColor: Colors.grey,
        borderRadius: 4,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 4,
        paddingTop: 4,
        alignSelf: 'flex-start',
    },
    inactive:{
        opacity: .54,
    },
    backText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'dosis-bold',
    },
    containerTitle: {
        flex:1,
        paddingLeft: 16,
        paddingRight: 16,
    },
    title: {
        color: Colors.black,
        fontSize: 16,
        fontFamily: 'dosis-regular',
    },
    offline:{
        backgroundColor: Colors.black,
        color: Colors.white,
        textAlign: 'center',
        fontFamily: 'dosis-bold',
        fontSize: 12,
    }
});
