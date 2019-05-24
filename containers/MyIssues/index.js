import React from 'react';
import {
    Text,
    View,
    AsyncStorage,
    FlatList,
    ActivityIndicator
} from 'react-native';
import gql from 'graphql-tag';
import { Query } from "react-apollo";

import { emptyStyles, styles } from './styles';
import { Link } from "react-router-native";
import BigIcon from '../../components/BigIcon';
import Button from '../../components/Button';
import Label from '../../components/Label';
import { ENUM_BACKBUTTON } from '../../enums/backButton';
import MyStorage from '../../constants/MyStorage';
import Colors from '../../constants/Colors';
import IssueItem from '../../components/IssueItem';

import { t } from '../../services/i18n';
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
                {t('common:noIssue')}
            </Text>
            <Text style={emptyStyles.text}>
                {t('common:noIssueYet')}
            </Text>
        </View>
        <View style={emptyStyles.bottom}>
            <View style={emptyStyles.button}>
                <Button to={'/report'} icon="exclamation">
                    {t('common:reportAnIssue')}
                </Button>
            </View>
            <Link to={'/allIssues'}>
                <Text style={emptyStyles.link}>{t('allIssues')}</Text>
            </Link>
            <Link to={'/'}>
                <Text style={emptyStyles.link}>{t('common:backToHome')}</Text>
            </Link>
        </View>
    </View>
)

class MyIssues extends React.PureComponent {
    state = {
        myIssues: [],
        loadingState: true,
    }
    componentDidMount(){
        this.props.header({title: t('myIssues'), back: ENUM_BACKBUTTON.BACK});
        this._loadMyIssues();
    }
    render() {
        const {myIssues, loadingState} = this.state;
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

                                return(
                                    <IssueItem issue={data.incidence} />
                                )
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

