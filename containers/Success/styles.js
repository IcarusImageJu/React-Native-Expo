import {
    StyleSheet,
} from 'react-native';

import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.orange,
        justifyContent: 'space-between',
        flexDirection:'column',
    },
    containerGreen: {
        flex: 1,
        backgroundColor: Colors.green,
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
        color:Colors.white,
        fontSize: 24,
        // fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'dosis-bold',
    },
    text:{
        color:Colors.white,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'dosis-regular',
    },
    link:{
        padding: 8,
        color:Colors.white,
        fontSize: 16,
        // fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'dosis-bold',
    },
});