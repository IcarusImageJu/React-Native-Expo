import React from 'react';
import {
    FlatList,
    View,
    Text,
    ActivityIndicator,
} from 'react-native';
import gql from "graphql-tag";
import { Query } from "react-apollo";

import IssueItem from '../../components/IssueItem';
import {styles} from './styles';
import {ENUM_BACKBUTTON} from '../../enums/backButton';

import { t } from '../../services/i18n';
import Colors from '../../constants/Colors';
import { mergeDeep } from 'immutable';
import IssuesCounter from '../../components/IssuesCounter';
import Label from '../../components/Label';

const GET_ISSUES = gql`
    query Incidences($page: Int!) {
        incidences(pagination: { limit: 20, page: $page }) {
            id
            latitude
            longitude
            status{
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
    componentDidMount(){
        this.props.header({title: t('allIssues'), back: ENUM_BACKBUTTON.BACK})
    }

    render() {
        return (
            <Query query={GET_ISSUES} variables={{page: 1}} fetchPolicy="network-only">
            {({ loading, error, data:{pagination = 0, incidences = []}, refetch, fetchMore, networkStatus }) => {
                if (error) return <Text>Error! {error.message}</Text>;
                return (
                    <View style={styles.container}>
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
                                return <></>
                            }}
                            data={incidences}
                            onRefresh={() => refetch()}
                            refreshing={false}
                            keyExtractor={item => item.id.toString()}
                            onEndReached={() => {
                                fetchMore({
                                    variables: {
                                        page: pagination.page + 1
                                    },
                                    updateQuery: (prev, { fetchMoreResult }) => {
                                        if (!fetchMoreResult && !pagination.hasNext) return prev;
                                        const newData = mergeDeep(prev, fetchMoreResult);
                                        return newData;
                                    }
                                })
                            }}
                            renderItem={({item}) => <IssueItem issue={item} />}
                        />
                    </View>
                );
            }}
            </Query>
        );
    }

}

export default AllIssues;