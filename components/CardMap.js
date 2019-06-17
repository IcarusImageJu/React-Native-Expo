import React from 'react';
import * as Icon from '@expo/vector-icons';
import * as Location from 'expo-location';
import MapView ,{ MAP_TYPES, UrlTile } from 'react-native-maps';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Linking,
    Platform,
    Image
} from 'react-native';

import Label from './Label';
import Pin from './Pin';

import Colors from '../constants/Colors';
import { t } from '../services/i18n';
import Layout from '../constants/Layout';
import Api from '../constants/Api';
import { withSound } from './Sounds';

const ASPECT_RATIO = (Layout.window.width - 32) / (Layout.window.height / 2);
const LATITUDE_DELTA = 0.0020;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class CardMap extends React.PureComponent{

    state = {
        address: null
    }

    componentWillUnmount(){
        this._getAddressAsync = null;
    }

    render(){
        const {location, marker = false, fixed, navigate} = this.props;
        const {address} = this.state;
        return(
            <View style={styles.cardMap}>
                {location && (
                    <MapView
                    provider={null}
                    mapType={MAP_TYPES.NONE}
                    style={styles.map}
                    showsUserLocation={true}
                    loadingEnabled={true}
                    rotateEnabled={false}
                    zoomEnabled={!fixed}
                    zoomControlEnabled={!fixed}
                    zoomTapEnabled={!fixed}
                    scrollEnabled={!fixed}
                    pitchEnabled={!fixed}
                    toolbarEnabled={false}
                    onRegionChangeComplete={region => this._getCenterMaps(region)}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }}
                    >
                        {(marker !== false) &&
                            <MapView.Marker
                                coordinate={{
                                    latitude: location.coords.latitude,
                                    longitude: location.coords.longitude,
                                }}
                            >
                                <Pin status={marker}/>
                            </MapView.Marker>
                        }
                        <UrlTile
                            urlTemplate={Api.MAPSTILE}
                            maximumZ={19}
                        />
                    </MapView>
                )}
                {!fixed && <Image source={require('../assets/images/pin/pinGrey.png')} style={styles.pinPoint} />}

                <View style={styles.coordCard}>
                    <View style={styles.coord}>
                        <Label>Signalement proche de</Label>
                        {address && <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.address}>
                            {address.name} {address.street}, {address.postalCode} {address.city}
                        </Text>}
                    </View>
                    {navigate &&
                        <TouchableOpacity style={styles.navigate} onPress={() => this._openMapsApp(location)}>
                            <Icon.FontAwesome
                                style={styles.navigateIcon}
                                name={'map'}
                                size={24}
                            />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }

    _getAddressAsync = async ({coords}) => {
        const { sounds, updateAddress } = this.props;
        const {address: stateAddress} = this.state;
        if(stateAddress !== null){
            // play a sound only when we move the address
            sounds.address();
        }
        const address = await Location.reverseGeocodeAsync(coords);
        this.setState({ address: address[0] });
        updateAddress(address[0]);
    };

    _openMapsApp = ({coords:{latitude, longitude}}) => {
        const {address} = this.state;
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${latitude},${longitude}`;
        const label = address ? `${address.name} ${address.street}, ${address.postalCode} ${address.city}` : t('issue');
        const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });
        return Linking.openURL(url);
    }

    _getCenterMaps = region => {
        const {address} = this.props;
        const location = {
            coords: region
        }
        if(!this.props.fixed) {
            this.props.center(region);
        }
        if(address){
            this.setState({ address });
        } else {
            this._getAddressAsync(location);
        }
    }
}

const styles = StyleSheet.create({
    cardMap:{
        height: (Layout.window.height - Layout.statusBarHeight)/2,
        width: '100%',
        borderRadius: 4,
        marginBottom: 16,
        position: 'relative',
        elevation: 1,
        backgroundColor: Colors.grey,
    },
    map:{
        flex: 1,
        zIndex: 1,
        borderRadius: 4,
    },
    coordCard: {
        position: 'absolute',
        left: 16,
        bottom: 16,
        borderRadius: 4,
        width: Layout.window.width - 64,
        height: 56,
        zIndex: 2,
        elevation : 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    coord: {
        padding: 8,
    },
    address: {
        color: Colors.black,
        fontSize: 14,
        fontFamily: 'dosis-regular',
        width: '100%',
    },
    navigate: {
        width: 56,
        height: '100%',
        backgroundColor: Colors.orange,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    navigateIcon: {
        color: Colors.white,
    },
    pinPoint: {
        height: 70,
        width: 66,
        position: "absolute",
        left: ((Layout.window.width - 32)/2) - 33,
        top: ((Layout.window.height - Layout.statusBarHeight)/4) - 70,
        zIndex: 2,
    }
});

export default withSound(CardMap);