import {
    StyleSheet,
} from 'react-native';

import Colors from '../../constants/Colors';

export const emptyStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        justifyContent: 'space-between',
        flexDirection:'column',
    },
    top:{
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    bottom:{
        marginBottom: 48,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    button:{
        paddingLeft:32,
        paddingRight: 32,
    },
    icon:{
        marginTop: 48,
        height: 160,
        marginBottom: 16,
    },
    title: {
        marginBottom: 8,
        color:Colors.grey,
        fontSize: 24,
        fontFamily: 'dosis-bold',
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    text:{
        color:Colors.grey,
        fontSize: 16,
        fontFamily: 'dosis-regular',
        textAlign: 'center',
    },
    link:{
        padding: 8,
        color:Colors.black,
        fontSize: 16,
        fontFamily: 'dosis-bold',
        // fontWeight: 'bold',
        textAlign: 'center',
    },
});

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 8,
    },
    label:{
        paddingLeft: 16,
        paddingRight: 16
    },
});