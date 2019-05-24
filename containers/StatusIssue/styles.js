import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 8,
        paddingLeft:8,
        paddingRight: 8,
    },
    actions: {
        paddingLeft:16,
        paddingRight: 16,
        marginBottom: 32,
    },
    textArea: {
        width: '100%',
        // height: 64,
        padding: 8,
        borderRadius: 4,
        color: Colors.black,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.black,
        marginBottom:16,
        fontFamily: 'dosis-regular',
    },
    link:{
        padding: 8,
        color:Colors.black,
        fontSize: 16,
        fontFamily: 'dosis-bold',
        // fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    attachment: {
        marginBottom:16,
        width: '100%',
    },
    dialogContainer:{
        paddingTop: 8,
        paddingBottom: 8,
    }
});