import React from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    StyleSheet
} from 'react-native';
import * as Icon from '@expo/vector-icons';
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Dialog, {
    DialogContent,
    SlideAnimation,
    DialogTitle,
} from 'react-native-popup-dialog';


import Colors from '../../constants/Colors';
import { t } from '../../services/i18n';

const GET_CATEGORIES = gql`
    query Categories($parentId: Int) {
        categories(parentId: $parentId, isPublic: true) {
            id
            nameNl
            nameFr
            nameEn
            parentId
            hasChildren
        }
    }
`;

class Categories extends React.PureComponent {
    state = {
        category: null
    }
    render() {
        const {category} = this.state;
        const {open, close} = this.props;
        return(
            <Query
                query={GET_CATEGORIES}
                fetchPolicy="network-only"
                notifyOnNetworkStatusChange={true}
            >
                {({ loading, error, data:{categories}, fetchMore, networkStatus }) => {
                    if (error) return <Text>Error! {error.message}</Text>;
                    return (
                        <Dialog
                            visible={open}
                            onTouchOutside={close}
                            onHardwareBackPress={close}
                            width={0.8}
                            dialogAnimation={new SlideAnimation({
                                slideFrom: 'bottom',
                            })}
                            dialogTitle={<DialogTitle title={t('typeOfIssue')} />}
                        >
                            <DialogContent>
                                <View>
                                    <View style={styles.menu}>
                                        <Text style={styles.title}>{category !== null ? category.nameFr : null}</Text>
                                        <TouchableOpacity onPress={() => (category !== null && !(loading || networkStatus === 4)) ? this._update(fetchMore) : close()}>
                                            <View style={styles.backButton}>
                                                <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.backText}>{(category !== null && !(loading || networkStatus === 4)) ? t('back') : t('cancel')}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    {(loading || networkStatus === 4) && <ActivityIndicator size="small" color={Colors.orange} />}
                                    {!(loading || networkStatus === 4) && <FlatList
                                        data={categories}
                                        keyExtractor={item => item.id.toString()}
                                        renderItem={({item}) => (
                                            <TouchableOpacity style={styles.select} onPress={() => this._update(fetchMore, item)}>
                                                <Text style={styles.text}>{item.nameFr}</Text>
                                                {item.hasChildren && <Icon.FontAwesome
                                                    style={styles.icon}
                                                    name={"caret-right"}
                                                    size={24}
                                                />}
                                            </TouchableOpacity>
                                        )}
                                    />}
                                </View>
                            </DialogContent>
                        </Dialog>
                    );
                }}
            </Query>
        )
    }

    _update = (fetchMore, category = null) => {
        const {update, close} = this.props;
        this.setState({category});
        if (category !== null && !category.hasChildren) {
            update(category)
            close();
        } else {
            fetchMore({
                variables: {
                    parentId: category ? category.id : null,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult && !pagination.hasNext) return prev;
                    return fetchMoreResult;
                }
            })
        }
    }
}

export default Categories;

const styles = StyleSheet.create({
    select:{
        borderBottomColor: Colors.grey,
        borderBottomWidth: 1,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 8,
    },
    text:{
        color:Colors.black,
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'dosis-bold',
    },
    title: {
        color:Colors.black,
        fontSize: 16,
        textAlign: 'left',
        fontFamily: 'dosis-regular',
    },
    icon:{
        color: Colors.orange
    },
    menu: {
        marginTop: 8,
        marginBottom: 8,
        height: 32,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    backText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: 'dosis-bold',
    },
    backButton: {
        backgroundColor: Colors.grey,
        borderRadius: 4,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 4,
        paddingTop: 4,
        alignSelf: 'flex-start',
    },
    inactive:{
        opacity: .54,
    },
});