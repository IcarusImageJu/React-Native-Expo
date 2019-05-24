import React from 'react';
import {
    ScrollView,
    TextInput,
    View,
    Text,
    ActivityIndicator,
    KeyboardAvoidingView,
    AsyncStorage
} from 'react-native';
import { NetworkConsumer } from 'react-native-offline';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import {Location, Permissions } from 'expo';
import { ReactNativeFile } from 'apollo-upload-client';
import { withRouter } from "react-router";

import { t } from '../../services/i18n';
import {ENUM_BACKBUTTON} from '../../enums/backButton';
import Colors from '../../constants/Colors';
import MyStorage from '../../constants/MyStorage';

import Picker from '../../components/Picker';
import Label from '../../components/Label';
import Button from '../../components/Button';
import SectionTitle from '../../components/SectionTitle';
import AttachedFiles from '../AttachedFiles';
import {styles} from './styles';
import CardMap from '../../components/CardMap';
import ErrorReport from '../../components/ErrorReport';

const GET_CATEGORIES = gql`
    query {
        categories{
            id
            nameNl
            nameFr
            nameEn
        }
    }
`;

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
            status: { comment: $comment, status: REPORTED }
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
        form: {
            location: {
                latitude: 0,
                longitude: 0,
            },
            categoryId: 0,
            status: {
                status: 'REPORTED',
                comment: '',
            },
            attachments:[],
            address: {},
        }
    }
    componentWillMount() {
        this._getLocationAsync();
    }
    componentDidMount(){
        this.props.header({title: t('reportAnIssue'), back: ENUM_BACKBUTTON.CANCEL})
    }
    render() {
        const {
            attachedFiles,
            location,
            form,
            loading,
            error
        } = this.state;
        return (
            <NetworkConsumer>
                {({ isConnected }) => (
                <Mutation
                    mutation={CREATE_INCIDENCE}
                    onCompleted={data => this._issueSubmitted(data)}
                    onError={error => {this.setState({loading: false, error: "Probleme de connection avec le serveur, veuillez ressayer plus tard."})}}
                >
                {(incidence) =>
                    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                            <SectionTitle>{t('situation')}</SectionTitle>
                            <Label>{t('situationDescription')}</Label>
                            <CardMap location={location} center={region => this._updateLocation(region)} updateAddress={address => this._updateAddress(address)}/>
                            <SectionTitle>{t('typeOfIssue')}</SectionTitle>
                            <Label>{t('typeOfIssueDescription')}</Label>
                            <Query
                                query={GET_CATEGORIES}
                                fetchPolicy="network-only"
                            >
                            {({ loading, error, data:{categories} }) => {
                                if (loading) return <ActivityIndicator size="small" color={Colors.orange} />;
                                if (error) return <Text>Error! {error.message}</Text>;
                                return (
                                    <Picker options={categories} selected={form.categoryId} onChange={value => this._updatePicker(value)}/>
                                );
                            }}
                            </Query>
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
    _updatePicker = value => {
        this.setState({form: {...this.state.form, categoryId: value}})
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
                errorMessage: 'Permission to access location was denied',
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
                categoryId,
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
        // if(attachments.length === 0) {
        //     this.setState({loading: true, error: null})
        // } else {
            // Perform the mutation
            incidence({variables: {
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                categoryId: parseInt(categoryId),
                attachments,
                comment,
                address
            }})
        // }
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