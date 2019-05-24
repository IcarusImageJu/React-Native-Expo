import {StyleSheet} from 'react-native';

import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

export const styles = StyleSheet.create({
    over:{
        backgroundColor: 'rgba(0,0,0,0.87)',
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 0,
        flex: 1,
        zIndex: 4,
        elevation: 2,
        height: Layout.window.height,
        width: Layout.window.width,
    },
    closeBar:{
        position: 'absolute',
        right: 0,
        bottom: 0,
        top: 0,
        flex: 1,
        zIndex: 2,
        width: 64,
        height: Layout.window.height,
    },
    container: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        top: 0,
        flex: 1,
        zIndex: 2,
        height: Layout.window.height,
        width: Layout.window.width - 64,
        backgroundColor: Colors.white,
        elevation: 2,
    },
    innerContainer:{
        flex: 1,
    },
    header:{
        width: '100%',
        height: 64,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.12)',
        paddingLeft:16,
        paddingRight: 16,
        marginBottom: 16,
        position: 'relative',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'left',
    },
    languages:{
        marginBottom: 32,
        flexDirection: 'row',
        paddingLeft: 32,
        paddingRight: 32,
    },
    languageLink: {
        fontSize: 16,
        // fontWeight: 'bold',
        color: Colors.grey,
        fontFamily: 'dosis-bold',
    },
    languagesSelector: {
        marginRight: 16,
        padding: 4,
        borderRadius: 4,
        borderWidth: 0,
        borderBottomColor: Colors.grey,
    },
    languagesSelectorActive: {
        borderWidth: 1,
    },
    menu:{
        marginBottom: 32,
        paddingLeft: 32,
        paddingRight: 32,
    },
    link: {
        paddingTop: 8,
        paddingBottom: 8,
        width: '100%',
        fontSize: 16,
        // fontWeight: 'bold',
        fontFamily: 'dosis-bold',
        color: Colors.grey,
    },
    versionContainer: {
        position:'absolute',
        bottom: 0,
    },
    version:{
        color: 'rgba(0,0,0,0.54)',
        fontSize: 12,
        fontFamily: 'dosis-regular',
        width: '100%',
        // textAlign: 'center',
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 16,
        paddingBottom: 32,
    },
    iconWrapper:{
    },
    closeIcon: {
        padding: 8,
        color: Colors.grey,
    },
    logo: {
        height: 64,
        width: 156
    }
});

export const modalStyles = StyleSheet.create({
    container:{
        flex: 1,
    },
    header:{
        height: 64,
        paddingLeft: 16,
        paddingRight: 16,
        borderBottomColor: Colors.grey,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    title:{
        fontFamily: 'dosis-bold',
        fontSize: 16,
    },
    close:{
        padding: 16,
    },
    icon: {
        color:Colors.black,
    },
    body: {
        padding: 16,
        marginBottom: 32,
    },
    input:{
        width: '100%',
        height: 32,
        padding: 8,
        borderRadius: 4,
        color: Colors.black,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.black,
        marginBottom:16,
        fontFamily: 'dosis-regular',
    },
    button:{
        paddingLeft: 16,
        paddingRight: 16,
    },
    link:{
        padding: 8,
        color: Colors.black,
        fontSize: 16,
        fontFamily: 'dosis-bold',
        textAlign: 'center',
    },
});