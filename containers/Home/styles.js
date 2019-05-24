import {StyleSheet} from 'react-native';

import Layout from '../../constants/Layout';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        position: 'relative'
    },
    card: {
        width: Layout.window.width - 32,
        marginLeft: 16,
        backgroundColor: Colors.white,
        elevation: 4,
        marginTop: (Layout.window.height - Layout.statusBarHeight)/5*4,
        marginBottom: 24,
    },
    button:{
        paddingLeft: 32,
        paddingRight: 32,
        marginTop: -24
    },
    label:{
        paddingLeft: 16,
        paddingRight: 16
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
        fontFamily: 'dosis-regular',
    },
    maps:{
        flex: 1,
        width: Layout.window.width,
        height: Layout.window.height - 64 - Layout.statusBarHeight,
        backgroundColor: Colors.grey,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    emptyList:{
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 32
    }
});