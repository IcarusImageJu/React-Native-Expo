import React from 'react';
import {
  ScrollView,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import { Location, Permissions } from 'expo';
import posed from 'react-native-pose';
import MapView ,{ MAP_TYPES, UrlTile } from 'react-native-maps';
import { ApolloConsumer } from 'react-apollo';
import gql from "graphql-tag";
import { NetworkConsumer } from 'react-native-offline';

import Button from '../../components/Button';
import SectionTitle from '../../components/SectionTitle';
import IssueItem from '../../components/IssueItem';

import {styles} from './styles';

import { t } from '../../services/i18n';
import { ENUM_BACKBUTTON } from '../../enums/backButton';
import Layout from '../../constants/Layout';
import Api from '../../constants/Api';
import Colors from '../../constants/Colors';
import Pins from './Pins';
import IssuesCounter from '../../components/IssuesCounter';

const ASPECT_RATIO = Layout.window.width / Layout.window.height;
const LATITUDE_DELTA = 0.0100;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const ActionsZone = posed.View({
  open:{
    opacity: 1,
    y: 0
  },
  close:{
    opacity: 0,
    y: 250,
  }
})

const GET_MAPPED_ISSUES = gql`
    query MappedIncidences($region: InputRegion!) {
      mappedIncidences(region: $region ) {
        count
        around
        latitude
        longitude
        incidences {
          id
          latitude
          longitude
          status {
            status
          }
          attachments(pagination: { limit: 1 }) {
            id
            thumbnailPath
            baseUrl
          }
          address{
            name
            street
            postalCode
            city
          }
        }
      }
    }
`;


class Home extends React.PureComponent {

  state = {
    location: null,
    errorMessage: null,
    mappedIncidences: [],
    loadingIncidences: true,
  };

  componentDidMount(){
    this._getLocationAsync();
    this.props.header({title: 'FixMyStreet Wallonie', back: ENUM_BACKBUTTON.FALSE})
  }

  componentWillUnmount(){
    this._loadIncidencesFromRegion = null;
    this._getLocationAsync = null;
  }

  render() {
    const {location, mappedIncidences, loadingIncidences} = this.state;

    return (
      <NetworkConsumer>
        {({ isConnected }) => (
        <ApolloConsumer>
          {client => (
          <View style={styles.container}>
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.maps}>
                  {location && (
                    <MapView
                      provider={null}
                      mapType={MAP_TYPES.NONE}
                      style={{ flex: 1 }}
                      showsUserLocation={true}
                      loadingEnabled={true}
                      rotateEnabled={false}
                      onRegionChangeComplete={region => this._loadIncidencesFromRegion(region, client, isConnected)}
                      initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      }}
                    >
                      <UrlTile
                        urlTemplate={Api.MAPSTILE}
                        maximumZ={19}
                      />
                      <Pins mappedIncidences={mappedIncidences}/>
                    </MapView>
                  )}
                </View>
                <ActionsZone pose={location === null ? 'close' : 'open'} style={styles.card}>
                  <View style={styles.button}>
                    <Button color={'orange'} to='/report' icon="exclamation" disabled={!isConnected}>
                      {t('reportAnIssue')}
                    </Button>
                  </View>
                  <FlatList
                    ListHeaderComponent={() => (
                      <View style={styles.label}>
                        <IssuesCounter count={mappedIncidences.length} area/>
                      </View>
                    )}
                    data={mappedIncidences}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <FlatList
                        data={item.incidences}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => <IssueItem issue={item} />}
                      />
                    )}
                    ListEmptyComponent={() => (
                      <View style={styles.emptyList}>
                        <SectionTitle>Veuillez deplacer la carte pour trouver des signalements</SectionTitle>
                      </View>
                    )}
                  />
                  {loadingIncidences && <ActivityIndicator size="large" style={{paddingTop: 16, paddingBottom: 16}} color={Colors.orange} />}
                </ActionsZone>
            </ScrollView>
          </View>
          )}
        </ApolloConsumer>
      )}
      </NetworkConsumer>
    );
  }

  _getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    const location = await Location.getCurrentPositionAsync();
    this.setState({ location });
  };

  _loadIncidencesFromRegion = async (region, client, isConnected) => {
    if(isConnected){
      this.setState({loadingIncidences: true});
      try {
        const { data } = await client.query({
          query: GET_MAPPED_ISSUES,
          variables: {region},
        });
        const {mappedIncidences} = data;
        this.setState({mappedIncidences, loadingIncidences: false});
      } catch (error) {
        this.setState({loadingIncidences: false});
      }
    }
  }
}

export default Home;