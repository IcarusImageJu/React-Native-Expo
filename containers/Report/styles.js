import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
// import Layout from '../../constants/Layout';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingLeft:8,
        paddingRight: 8,
    },
    button:{
        paddingLeft:16,
        paddingRight: 16,
        marginBottom: 32,
    },
    contentContainer: {
        paddingTop: 8,
    },
    textArea: {
        width: '100%',
        height: 64,
        padding: 8,
        borderRadius: 4,
        color: Colors.black,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.black,
        marginBottom:16,
        fontFamily: 'dosis-regular',
    },
    attachment: {
        marginBottom:16,
        width: '100%',
    },
});