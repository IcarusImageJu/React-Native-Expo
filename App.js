// Import all depedencies needed in order to wrap our app
import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Image, AsyncStorage, NetInfo } from 'react-native';
import { AppLoading, SplashScreen } from 'expo';
import * as Icon from '@expo/vector-icons';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import { NativeRouter, Route } from "react-router-native";
import { NetworkProvider } from 'react-native-offline';
// Import all dependecies and services for localization
import i18n from './services/i18n';
import i18next from 'i18next';
// import { t } from './services/i18n';

// Import all dependecies and create our config for ApolloClient
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { persistCache } from 'apollo-cache-persist';
import API from './constants/Api';
const cache = new InMemoryCache();

persistCache({
  cache,
  storage: AsyncStorage,
});

const uploadLink = createUploadLink({
  uri: API.GRAPHQL,
})

const client = new ApolloClient({
  link: uploadLink,
  cache
});

// Import all containers
import Home from './containers/Home';
import Drawer from './containers/Drawer';
import Header from './components/Header';
import AllIssues from './containers/AllIssues';
import Report from './containers/Report';
import SuccessReport from './containers/Success/Report';
import SuccessInProgress from './containers/Success/InProgress';
import SuccessFinalized from './containers/Success/Finalized';
import MyIssues from './containers/MyIssues';
import StatusIssue from './containers/StatusIssue';
import Aboutus from './containers/Page/Aboutus';
import Faq from './containers/Page/Faq';
import Help from './containers/Page/Help';
import Termsofuse from './containers/Page/Termsofuse';

// Import Constants
import Layout from './constants/Layout';
import MyStorage from './constants/MyStorage';

// Import Enums
import { ENUM_BACKBUTTON } from './enums/backButton';

const CurrentDevPage = Home;

class App extends React.Component {
  state = {
    isSplashReady: false,
    isAppReady: false,
    isI18nInitialized: false,
    isFontLoaded: false,
    drawer: false,
    currentLanguage: 'fr',
    version: '1.3.2',
    // TODO: Change this with local state management by Apollo
    header:{
      title:'',
      back: ENUM_BACKBUTTON.FALSE,
    },
    agent: null
  };

  componentDidMount() {
    i18n.init()
        .then(() => {
            this.setState({ isI18nInitialized: true, currentLanguage: i18n.locale });
        })
        .catch((error) => console.warn(error));
    Font.loadAsync({
      // We include Dosis because we use it in HomeScreen.js.
      'dosis-bold': require('./assets/fonts/Dosis-Bold.ttf'),
      // 'dosis-extrabold': require('./assets/fonts/Dosis-ExtraBold.ttf'),
      // 'dosis-extralight': require('./assets/fonts/Dosis-ExtraLight.ttf'),
      // 'dosis-light': require('./assets/fonts/Dosis-Light.ttf'),
      // 'dosis-medium': require('./assets/fonts/Dosis-Medium.ttf'),
      'dosis-regular': require('./assets/fonts/Dosis-Regular.ttf'),
      // 'dosis-semibold': require('./assets/fonts/Dosis-SemiBold.ttf'),
    }).then(() => {this.setState({isFontLoaded: true})});
  }

  render() {
    if (!this.state.isSplashReady) {
      return (
        <AppLoading
          startAsync={this._cacheSplashResourcesAsync}
          onFinish={this._handleFinishLoading}
          onError={this._handleLoadingError}
          autoHideSplash={true}
        />
      );
    }

    if (!this.state.isAppReady && !this.state.isI18nInitialized) {
      return (
        <View style={{ flex: 1, position: "relative" }}>
          <Image
            style={{flex: 1, height: '100%', width: '100%', resizeMode: 'cover', opacity: 0.1}}
            source={require('./assets/images/splash/background.jpg')}
            onLoad={this._cacheResourcesAsync}
          />
          <Image
            style={{
              position: "absolute",
              top: '-20%',
              left: '20%',
              width: '60%',
              resizeMode: "contain"
            }}
            source={require('./assets/images/logo.png')}
          />
        </View>
      );
    }
    // Had to do this to ensure we're not loading the page before we have all the fonts loaded :/ weird flex but ok
    if(!this.state.isFontLoaded) {
      return(
        <View style={{ flex: 1, position: "relative" }}>
          <Image
            style={{flex: 1, height: '100%', width: '100%', resizeMode: 'cover', opacity: 0.1}}
            source={require('./assets/images/splash/background.jpg')}
          />
          <Image
            style={{
              position: "absolute",
              top: '-20%',
              left: '20%',
              width: '60%',
              resizeMode: "contain"
            }}
            source={require('./assets/images/logo.png')}
          />
        </View>
      )
    }
    const {
      drawer,
      header,
      agent,
      version,
      currentLanguage
    } = this.state;
    return (
      <ApolloProvider client={client}>
        <NetworkProvider>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <NativeRouter>
                <View style={{flex: 1}}>
                  <Route render={({history}) => (
                    <Header
                      history={history}
                      drawer={() => this.setState({'drawer': !drawer})}
                      header={header}
                    />
                  )} />
                  <View style={styles.innerContainer}>
                    <Route exact path="/" render={() => <CurrentDevPage header={header => this.setState({header})} />} />
                    <Route exact path="/report" render={() => <Report header={header => this.setState({header})} />} />
                    <Route exact path="/report/:id/success" render={() => <SuccessReport header={header => this.setState({header})} />} />
                    <Route exact path="/allissues" render={() => <AllIssues header={header => this.setState({header})} />} />
                    <Route exact path="/page/aboutus" render={() => <Aboutus header={header => this.setState({header})} />} />
                    <Route exact path="/page/help" render={() => <Help header={header => this.setState({header})} />} />
                    <Route exact path="/page/faq" render={() => <Faq header={header => this.setState({header})} />} />
                    <Route exact path="/page/termsofuse" render={() => <Termsofuse header={header => this.setState({header})} />} />
                    <Route exact path="/myIssue" render={() => <MyIssues header={header => this.setState({header})} />} />
                    <Route exact path="/status/:id" render={() => <StatusIssue agent={agent} header={header => this.setState({header})} />} />
                    <Route exact path="/status/:id/success/processing" render={() => <SuccessInProgress agent={agent} header={header => this.setState({header})} />} />
                    <Route exact path="/status/:id/success/closed" render={() => <SuccessFinalized agent={agent} header={header => this.setState({header})} />} />
                    <Route exact path="/sandbox" render={() => <Sandbox header={header => this.setState({header})} />} />
                  </View>
                  <Drawer
                    agent={agent}
                    version={version}
                    current={currentLanguage}
                    connect={agent => this.setState({agent})}
                    change={lang => this._handleChangeLanguage(lang)}
                    drawer={() => this.setState({'drawer': !drawer})}
                    open={drawer}
                  />
                </View>
            </NativeRouter>
          </View>
        </NetworkProvider>
      </ApolloProvider>
    );
  }

  _handleChangeLanguage(lang){
    // Change the language of the app and set the currentLanguage state so the application do a refresh on top level
    i18next
      .changeLanguage(lang)
      .then(() => {
          this.setState({currentLanguage: i18next.language})
    });
    // Add the current selected language to the Storage, so on init we can retreive it
    AsyncStorage.setItem(MyStorage.LANG, lang)
  }

  _cacheSplashResourcesAsync = async () => {
    const bg = require('./assets/images/splash/background.jpg');
    return Asset.fromModule(bg).downloadAsync()
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isSplashReady: true });
  };

  _cacheResourcesAsync = async () => {
    Promise.all([
      Asset.loadAsync([
        require('./assets/images/logo.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.FontAwesome.font,
      }),
    ]);
    SplashScreen.hide();
    this.setState({ isAppReady: true });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative',
    paddingTop: Layout.statusBarHeight
  },
  innerContainer:{
    flex:1,
  }
});

export default App;