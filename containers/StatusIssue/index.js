import React from 'react';
import {
    ScrollView,
    TextInput,
    Text,
    View,
    ActivityIndicator,
    AsyncStorage,
    RefreshControl,
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { NetworkConsumer } from 'react-native-offline';
import { withRouter } from "react-router";

import { t } from '../../services/i18n';

import Picked from '../../components/Picked';
import Status from '../../components/Status';
import SectionTitle from '../../components/SectionTitle';
import AttachedFiles from '../AttachedFiles';
import {styles} from './styles';
import { ENUM_STATUS, convertStatus } from '../../enums/status';
import { ENUM_BACKBUTTON } from '../../enums/backButton';
import Colors from '../../constants/Colors';
import CardMap from '../../components/CardMap';
import MyStorage from '../../constants/MyStorage';
import OfflineRefetch from '../OfflineRefetch';
import UpdateStatus from './UpdateStatus';
import ButtonMyIssues from './ButtonMyIssues';
import ButtonUpdateIssue from './ButtonUpdateIssue';

const GET_ISSUE = gql`
    query Incidence($id: Int!) {
        incidence(id: $id) {
            id
            latitude
            longitude
            status {
                status
                date
                comment
            }
            address{
                name
                street
                postalCode
                city
            }
            category {
                nameFr
                nameEn
                nameNl
                id
            }
            attachments {
                id
                thumbnailPath
                filePath
                baseUrl
            }
        }
    }
`

class StatusIssue extends React.PureComponent {
    state = {
        loadingState: true,
        myIssues: [],
        attachedFiles :{
            limit: 5,
            add: false,
            images: [],
        },
        dialog: {
            open: false,
            to: ENUM_STATUS.PROCESSING,
        },
    }

    componentDidMount(){
        this.props.header({title: t('loading'), back: ENUM_BACKBUTTON.BACK})
        this._loadMyIssues();
    }

    componentWillUnmount(){
        this._loadMyIssues = null;
    }

    render() {
        const {
            attachedFiles,
            loadingState,
            myIssues,
            dialog,
        } = this.state;
        const { match:{params:{id}}, agent = null } = this.props;
        return (
            <Query
                query={GET_ISSUE}
                fetchPolicy="cache-and-network"
                variables={{id: parseInt(id)}}
                onCompleted={({incidence}) => this.props.header({title: `${incidence.address.name} ${incidence.address.street}, ${incidence.address.postalCode} ${incidence.address.city}`, back: ENUM_BACKBUTTON.BACK})}
            >
            {({ loading, error, data, refetch }) => {
                if (loading) return <ActivityIndicator size="large" style={{paddingTop: 64}} color={Colors.orange} />;
                if (error) {
                    return(
                        <NetworkConsumer>
                        {({ isConnected }) => {
                            if (isConnected) return <Text>Error! {error.message}</Text>;
                            return(
                                <OfflineRefetch />
                            )
                        }}
                        </NetworkConsumer>
                    )
                }
                // Destructure all the data
                const {incidence:{id, latitude, address, longitude, attachments, category, status: statusBack}} = data;
                // Create the object for the current status of the incidence
                const status = {
                    comment: statusBack.length > 1 ? statusBack[statusBack.length - 1].comment : null,
                    status: statusBack.length !== 0 ? convertStatus(statusBack[statusBack.length - 1].status) : ENUM_STATUS.CREATED,
                    date: statusBack.length !== 0 ? statusBack[0].date : null
                }
                // Use the first comment as the comment of the reporting user
                const comment = statusBack.length !== 0 ? statusBack[0].comment : '';
                // In case the location have a fail answer from the back
                const location = {
                    coords:{
                        latitude: latitude || 0,
                        longitude: longitude || 0,
                    }
                }
                return (
                    <ScrollView
                        style={styles.container}
                        contentContainerStyle={styles.contentContainer}
                        refreshControl={
                            <RefreshControl
                                refreshing={loading}
                                onRefresh={refetch}
                            />
                        }
                    >
                        <SectionTitle>{t('status')}</SectionTitle>
                        <Status status={status}/>
                        <SectionTitle>{t('situation')}</SectionTitle>
                        <CardMap location={location} marker={status.status} address={address} fixed navigate/>
                        <SectionTitle>{t('typeOfIssue')}</SectionTitle>
                        <Picked picked={category.nameFr} />
                        <SectionTitle>{t('comment')}</SectionTitle>
                        <TextInput
                            style={styles.textArea}
                            value={comment}
                            textAlignVertical={'top'}
                            multiline={true}
                            // numberOfLines={3}
                            editable={false}
                        />
                        <SectionTitle>{t('addPictures')}</SectionTitle>
                        <View style={styles.attachment}>
                            <AttachedFiles attachedFiles={attachedFiles} attachments={attachments}/>
                        </View>
                        <View style={styles.actions}>
                            <ButtonMyIssues
                                loading={loadingState}
                                myIssues={myIssues}
                                id={id}
                                add={() => this._addToMyIssues()}
                                remove={() => this._removeFromMyIssues()}
                            />
                            {agent &&
                                <ButtonUpdateIssue
                                    from={status.status}
                                    onPress={to => this._updateIssue(to)}
                                />
                            }
                        </View>
                        {agent &&
                            <UpdateStatus
                                from={status.status}
                                to={dialog.to}
                                close={() => this.setState({dialog: {...dialog, open: false}})}
                                dialog={dialog.open}
                                updated={refetch}
                                incidenceId={id}
                            />
                        }
                    </ScrollView>
                );
            }}
            </Query>
        );
    }

    _loadMyIssues = async () => {
        const currentIssues = await AsyncStorage.getItem(MyStorage.MY_ISSUES);
        if (currentIssues !== null) {
            this.setState({myIssues: JSON.parse(currentIssues)});
        }
        this.setState({loadingState: false});
    }

    _addToMyIssues = async () => {
        const { match:{params:{id}} } = this.props;
        const { myIssues } = this.state;
        // verify that we don't already have this id in the array
        if(!myIssues.includes(id.toString())){
            // create our new array
            const newMyIssues = [...myIssues, id];
            // Push it to the state so we can change the render
            this.setState({myIssues: newMyIssues, loadingState: true});
            // Push it to the localStorage so we can share it internally and keep the info on the device
            await AsyncStorage.setItem(MyStorage.MY_ISSUES, JSON.stringify(newMyIssues));
            // remove the loading state
            this.setState({loadingState: false});
        }
    }

    _removeFromMyIssues = async () => {
        const { match:{params:{id}} } = this.props;
        const { myIssues } = this.state;
        // verify that we already have this id in the array
        if(myIssues.includes(id.toString())){
            // create our new array
            const newMyIssues = myIssues.filter(value => value !== id.toString());
            // Push it to the state so we can change the render
            this.setState({myIssues: newMyIssues, loadingState: true});
            // Push it to the localStorage so we can share it internally and keep the info on the device
            await AsyncStorage.setItem(MyStorage.MY_ISSUES, JSON.stringify(newMyIssues));
            // remove the loading state
            this.setState({loadingState: false});
        }
    }

    _updateIssue = to => {
        // Open popup to add a comment
        this.setState({dialog: {open: true, to}})
    }
}

export default withRouter(StatusIssue);