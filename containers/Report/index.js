import React from 'react';
import {
    ScrollView,
    TextInput,
    View,
    Text,
    KeyboardAvoidingView,
    AsyncStorage,
    TouchableOpacity,
} from 'react-native';
import { NetworkConsumer } from 'react-native-offline';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { ReactNativeFile } from 'apollo-upload-client';
import { withRouter } from "react-router";

import { t } from '../../services/i18n';
import {ENUM_BACKBUTTON} from '../../enums/backButton';
import MyStorage from '../../constants/MyStorage';

import Label from '../../components/Label';
import Button from '../../components/Button';
import SectionTitle from '../../components/SectionTitle';
import AttachedFiles from '../AttachedFiles';
import {styles} from './styles';
import CardMap from '../../components/CardMap';
import ErrorReport from '../../components/ErrorReport';
import Categories from './Categories';

const CREATE_INCIDENCE = gql`
    mutation Incidence(
        $latitude: Float!
        $longitude: Float!
        $categoryId: Int!
        $attachments: [Upload!]!
        $comment: String
        $address: InputAddress
    ) {
        incidence(
            incidence: {
            latitude: $latitude
            longitude: $longitude
            categoryId: $categoryId
            attachments: $attachments
            status: { comment: $comment, status: CREATED }
            address: $address
            }
        ) {
            id
        }
    }
`;

class Report extends React.PureComponent {
    state = {
        attachedFiles :{
            limit: 5,
            add: true,
            images:[]
        },
        location: null,
        errorMessage: null,
        loading: false,
        error: null,
        typeSelect: false,
        token: null,
        form: {
            location: {
                latitude: 0,
                longitude: 0,
            },
            category: null,
            status: {
                status: 'CREATED',
                comment: '',
            },
            attachments:[],
            address: {},
        }
    }
    componentWillMount() {
        this._getLocationAsync();
    }
    async componentDidMount(){
        this.props.header({title: t('reportAnIssue'), back: ENUM_BACKBUTTON.CANCEL});
        // retreive the token for the mutation
        const agent = await SecureStore.getItemAsync(MyStorage.AGENT);
        if(agent !== null) {
            const {token} = JSON.parse(agent);
            this.setState({token});
        }
    }
    render() {
        const {
            attachedFiles,
            location,
            form,
            loading,
            error,
            token,
            typeSelect
        } = this.state;
        return (
            <NetworkConsumer>
                {({ isConnected }) => (
                <Mutation
                    mutation={CREATE_INCIDENCE}
                    context={{headers:{"authorization": token}}}
                    onCompleted={data => this._issueSubmitted(data)}
                    onError={error => {this.setState({loading: false, error: t('retryLaterServerError')})}}
                >
                {incidence =>
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            <SectionTitle>{t('situation')}</SectionTitle>
                            <Label>{t('situationDescription')}</Label>
                            <CardMap location={location} center={region => this._updateLocation(region)} updateAddress={address => this._updateAddress(address)}/>
                            <SectionTitle>{t('typeOfIssue')}</SectionTitle>
                            <Label>{t('typeOfIssueDescription')}</Label>
                            <TouchableOpacity onPress={() => this.setState({typeSelect: true})}>
                                <Text style={styles.typeSelect}>{form.category !== null ? form.category.nameFr : t('selectionTypeIssue')}</Text>
                            </TouchableOpacity>
                            <Categories update={category => this._updatePicker(category)} open={typeSelect} close={() => this.setState({typeSelect: false})}/>
                            <SectionTitle>{t('comment')}</SectionTitle>
                            <Label>{t('commentDescription')}</Label>
                            <TextInput
                                style={styles.textArea}
                                value={form.status.comment}
                                onChangeText={text => this._updateComment(text)}
                                textAlignVertical={'top'}
                                multiline={true}
                                numberOfLines={3}
                            />
                            <SectionTitle>{t('addPictures')}</SectionTitle>
                            <Label>{t('addPicturesDescription')}</Label>
                            <View style={styles.attachment}>
                                <AttachedFiles attachedFiles={attachedFiles} handleChange={(images) => this._updateImages(images)}/>
                            </View>
                            <ErrorReport error={error}/>
                            <View style={styles.button}>
                                <Button loading={loading} icon="info" handlePress={() => this._submitIssue(incidence)} disabled={!isConnected}>
                                    {t('reportThisIssue')}
                                </Button>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                }
                </Mutation>
            )}
            </NetworkConsumer>
        );
    }
    _updatePicker = category => {
        this.setState({form: {...this.state.form, category}})
    }
    _updateComment = value => {
        this.setState({form: {...this.state.form, status: {...this.state.form.status, comment: value}}})
    }
    _updateLocation = ({latitude, longitude}) =>{
        this.setState({form: {...this.state.form, location: {latitude, longitude}}})
    }
    _updateImages = ({images}) => {
        // Create an empty array to store our new data
        let files = [];
        // Fill our array with our images converted in ReactNativeFile
        images.map(image => {
            const file = new ReactNativeFile({
                uri: image.uri,
                name: image.name,
                type: 'image/jpeg'
            })
            files = [...files, file]
        })
        // Set the state both for our visual and ou form to send to the back
        this.setState({attachedFiles:{...this.state.attachedFiles, images}, form:{...this.state.form, attachments:files}})
    }
    _updateAddress = address => {
        this.setState({form: {...this.state.form, address}})
    }
    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: t('errorPermissionLocation'),
            });
        }
        let location = await Location.getCurrentPositionAsync();
        this.setState({ location });
    };

    _submitIssue = incidence => {
        const {
            form:{
                location:{
                    latitude,
                    longitude
                },
                category,
                status:{
                    comment
                },
                attachments,
                address
            }
        } = this.state;
        // Enter loading state
        this.setState({loading: true, error: null})
        // Manage Errors
        if(attachments.length === 0) {
            this.setState({loading: false, error: t('pleaseAddPïcture')})
        } else if (comment.length === 0) {
            this.setState({loading: false, error: t('pleaseAddComment')})
        } else if (category === null) {
            this.setState({loading: false, error: t('pleaseAddType')})
        } else {
            // Perform the mutation
            incidence({variables: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                categoryId: parseInt(category.id),
                attachments,
                comment,
                address
            }})
        }
    };

    _issueSubmitted = async ({incidence}) => {
        const {history} = this.props;
        // Put the id in the local storage on success with the others
        const myIssues = await AsyncStorage.getItem(MyStorage.MY_ISSUES);
        let newMyIssues = [incidence.id.toString()];
        if (myIssues !== null) {
            convertedMyIssues = JSON.parse(myIssues);
            newMyIssues = [...newMyIssues, ...convertedMyIssues];
        }
        await AsyncStorage.setItem(MyStorage.MY_ISSUES, JSON.stringify(newMyIssues));
        // Remove loading and error state
        this.setState({loading: false, error: null})
        // Go to the success page with ID for tracking
        history.replace(`/report/${incidence.id}/success`);
    }
}

export default withRouter(Report);