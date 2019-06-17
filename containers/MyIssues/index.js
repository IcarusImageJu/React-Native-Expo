import React from 'react';
import {
    Text,
    View,
    AsyncStorage,
    FlatList,
    ActivityIndicator
} from 'react-native';
import posed from 'react-native-pose';
import gql from 'graphql-tag';
import { Query } from "react-apollo";
import { Link } from "react-router-native";
import moment from 'moment';

import { emptyStyles, styles } from './styles';
import { ENUM_BACKBUTTON } from '../../enums/backButton';
import { ENUM_STATUS, convertStatus } from '../../enums/status';
import MyStorage from '../../constants/MyStorage';
import Colors from '../../constants/Colors';
import { t } from '../../services/i18n';

import BigIcon from '../../components/BigIcon';
import Button from '../../components/Button';
import Label from '../../components/Label';
import IssueItem from '../../components/IssueItem';
import Filters from '../../components/Filters';
import IssuesCounter from '../../components/IssuesCounter';

const GET_ISSUE = gql`
    query Incidence($id: Int!) {
        incidence(id: $id) {
            id
            latitude
            longitude
            status {
                status
                date
            }
            address{
                name
                street
                postalCode
                city
            }
            attachments(pagination: { limit: 1 }) {
                id
                thumbnailPath
                baseUrl
            }
        }
    }
`

const EmptyState = () => (
    <View style={emptyStyles.container}>
        <View style={emptyStyles.top}>
            <View style={emptyStyles.icon}>
                <BigIcon icon={'sun-o'} color={'grey'}/>
            </View>
            <Text style={emptyStyles.title}>
                {t('noIssue')}
            </Text>
            <Text style={emptyStyles.text}>
                {t('noIssueYet')}
            </Text>
        </View>
        <View style={emptyStyles.bottom}>
            <View style={emptyStyles.button}>
                <Button to={'/report'} icon="exclamation">
                    {t('reportAnIssue')}
                </Button>
            </View>
            <Link to={'/allIssues'}>
                <Text style={emptyStyles.link}>{t('allIssues')}</Text>
            </Link>
            <Link to={'/'}>
                <Text style={emptyStyles.link}>{t('backToHome')}</Text>
            </Link>
        </View>
    </View>
)

class MyIssues extends React.PureComponent {
    state = {
        myIssues: [],
        loadingState: true,
        filter: {
            open: false,
            date: false,
            startDate: new Date(),
            endDate: new Date(),
            status: false,
            statusSelected: ENUM_STATUS.CREATED,
        }
    }
    componentDidMount(){
        this.props.header({title: t('myIssues'), back: ENUM_BACKBUTTON.BACK});
        this._loadMyIssues();
    }
    render() {
        const {myIssues, loadingState, filter} = this.state;
        // We avoid a blink of the empty state by waiting the loadingState
        if(loadingState){
            return <ActivityIndicator size="large" style={{paddingTop: 32, paddingBottom: 32}} color={Colors.orange} />
        }
        // Verify that we have issues, if not, bring the empty state
        if(myIssues.length === 0) {
            return(
                <EmptyState />
            )
        }
        return(
            <View style={styles.container}>
                <Filters filter={filter} update={filter => this.setState({filter})}/>
                <FlatList
                    ListHeaderComponent={() => (
                        <View style={styles.label}>
                            {loadingState && <Label>{t('loading')}</Label>}
                            {!loadingState && <IssuesCounter count={myIssues.length}/>}
                        </View>
                    )}
                    data={myIssues}
                    ListFooterComponent={() =>{
                        if(loadingState) {
                            return <ActivityIndicator size="large" style={{paddingTop: 32, paddingBottom: 32}} color={Colors.orange} />
                        }
                        return <></>
                    }}
                    keyExtractor={issue => issue.toString()}
                    renderItem={({item}) => (
                        <Query
                            query={GET_ISSUE}
                            variables={{id: parseInt(item)}}
                            fetchPolicy="cache-and-network"
                            onError={() => this._removeThisIssueFromCache(item)}
                        >
                            {({ loading, error, data }) => {
                                if (loading) return <ActivityIndicator size="small" style={{paddingTop: 16, paddingBottom: 16}} color={Colors.orange} />;
                                if (error) return <Text>Error! {error.message}</Text>;

                                // Fitler by status
                                const status = convertStatus(data.incidence.status[data.incidence.status.length - 1].status);
                                if (filter.status && filter.statusSelected !== status) {
                                    // If the status is used and the status is different from the one selected, return null
                                    return null
                                }

                                //filter by date
                                const date = data.incidence.status[0].date;
                                const dateIsBetween = moment(date).isBetween(filter.startDate, filter.endDate);
                                if(filter.date && !dateIsBetween) {
                                    // if the date filter is used and the date isn't in between the range, return null
                                    return null
                                }

                                return(<IssueItem issue={data.incidence} />)
                            }}
                        </Query>
                    )}
                />
            </View>
        )
    }
    _loadMyIssues = async () => {
        const currentIssues = await AsyncStorage.getItem(MyStorage.MY_ISSUES);
        if (currentIssues !== null) {
            this.setState({myIssues: JSON.parse(currentIssues)});
        }
        this.setState({loadingState: false});
    }
    _removeThisIssueFromCache = async issue => {
        const {myIssues} = this.state
        const newMyIssues = myIssues.filter(value => value !== issue);
        this.setState({myIssues: newMyIssues});
        await AsyncStorage.setItem(MyStorage.MY_ISSUES, JSON.stringify(newMyIssues));
    }
}

export default MyIssues;

