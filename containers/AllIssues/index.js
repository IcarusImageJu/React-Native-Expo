import React from 'react';
import {
    FlatList,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import moment from 'moment';
import { mergeDeep } from 'immutable';

import { t } from '../../services/i18n';
import {ENUM_BACKBUTTON} from '../../enums/backButton';
import {styles} from './styles';
import Colors from '../../constants/Colors';
import { ENUM_STATUS, convertStatusClientToBack } from '../../enums/status';

import IssueItem from '../../components/IssueItem';
import IssuesCounter from '../../components/IssuesCounter';
import Label from '../../components/Label';
import Filters from '../../components/Filters';

const GET_ISSUES = gql`
    query Incidences($page: Int!, $filter: FilterIncidences) {
        incidences(pagination: { limit: 20, page: $page }, filter: $filter) {
            id
            latitude
            longitude
            status{
                status
                date
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
        pagination {
            total
            page
            hasNext
            limit
            totalPage
            hasPrevious
        }
    }
`;

class AllIssues extends React.PureComponent {
    state = {
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
        this.props.header({title: t('allIssues'), back: ENUM_BACKBUTTON.BACK})
    }

    render() {
        const {filter} = this.state;
        return (
            <Query query={GET_ISSUES} variables={{page: 1}} fetchPolicy="network-only">
            {({ loading, error, data:{pagination = 0, incidences = []}, fetchMore, networkStatus }) => {
                if (error) return <Text>Error! {error.message}</Text>;
                return (
                    <View style={styles.container}>
                        <Filters filter={filter} update={filter => this._update(filter, fetchMore)}/>
                        <FlatList
                            pose={loading ? 'closed': 'open'}
                            ListHeaderComponent={() => (
                                <View style={styles.label}>
                                    {loading && <Label>{t('loading')}</Label>}
                                    {!loading && <IssuesCounter count={pagination.total}/>}
                                </View>
                            )}
                            ListFooterComponent={() =>{
                                if(networkStatus === 4 || loading) {
                                    return <ActivityIndicator size="large" style={{paddingTop: 32, paddingBottom: 32}} color={Colors.orange} />
                                }
                                return null
                            }}
                            data={incidences}
                            onRefresh={() => this._update(null, fetchMore)}
                            refreshing={false}
                            keyExtractor={item => item.id.toString()}
                            onEndReached={() => this._update(null, fetchMore, pagination.page + 1)}
                            renderItem={({item}) => <IssueItem issue={item} />}
                        />
                    </View>
                );
            }}
            </Query>
        );
    }

    _update = (filter = null, fetchMore, page = 1) => {
        if (filter) {
            this.setState({filter})
        }
        const {status, statusSelected, date, startDate, endDate} = filter ? filter : this.state.filter;
        const variables = {
            page,
            filter:{
                // Convert status for the mutation, so the back have is enumeration right
                status: status ? convertStatusClientToBack(statusSelected) : null,
                date: date ? {
                    // Convert Date to timestamp and float
                    start: parseFloat(moment(startDate).format('x')),
                    end: parseFloat(moment(endDate).format('x'))
                } : null
            }
        }
        fetchMore({
            variables,
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult && !pagination.hasNext) return prev;
                const newData = page === 1 ? fetchMoreResult : mergeDeep(prev, fetchMoreResult);
                return newData;
            }
        })
    }
}

export default AllIssues;