import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Link } from "react-router-native";

import Colors from '../constants/Colors';
import { statusTitle, ENUM_STATUS, convertStatus } from '../enums/status';

const Status = ({status}) => {
    const backStatus = status.length === 0 ? ENUM_STATUS.REPORTED : convertStatus(status[status.length - 1].status);
    return(
        <View style={styles.contentTop}>
            <View style={{...styles.status, ...styles[`status${backStatus}`]}}/>
            <Text numberOfLines={1} style={styles.statusText}>{statusTitle(backStatus)}</Text>
        </View>
    )
}

const IssueItem = ({issue:{status, id, attachments, address}}) => (
    <Link style={styles.container} to={`/status/${id}`}>
        <View style={styles.item}>
            <Image
                style={styles.image}
                source={{uri: attachments[0] ? `${attachments[0].baseUrl}${attachments[0].thumbnailPath}` : null}}
            />
            <View style={styles.content}>
                <Status status={status} />
                {address && <Text ellipsizeMode={'clip'} numberOfLines={1} style={styles.text}>
                    {address.name} {address.street}, {address.postalCode} {address.city}
                </Text>}
            </View>
        </View>
    </Link>
)

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    item: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1
    },
    image: {
        width: 48,
        height: 48,
        marginRight: 8,
        backgroundColor: Colors.grey,
    },
    content: {
        height: 48,
    },
    contentTop: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        height: 12
    },
    status: {
        height: 10,
        width: 10,
        borderRadius: 12,
        borderWidth: 2,
        marginRight: 4
    },
    status0: {
        borderColor: Colors.orange,
        backgroundColor: Colors.white,
    },
    status1: {
        borderColor: Colors.orange,
        backgroundColor: Colors.orange,
    },
    status2: {
        borderColor: Colors.green,
        backgroundColor: Colors.green,
    },
    status3: {
        borderColor: Colors.grey,
        backgroundColor: Colors.grey,
    },
    statusText: {
        // fontWeight: 'regular',
        color: Colors.black,
        fontSize: 12,
        opacity: .54,
        fontFamily: 'dosis-regular',
    },
    text: {
        height: 36,
        flex: 1,
    }
})

export default IssueItem;