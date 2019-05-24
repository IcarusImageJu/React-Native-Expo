import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    listCards:{
        flex:1,
        flexDirection: 'row',
        width: '100%',
        flexWrap: 'wrap'
    },
    card:{
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.grey,
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        marginBottom: 8,
        position: 'relative',
    },
    cardImage:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%',
    },
    icon: {
        color:Colors.white,
        textShadowColor: 'rgba(0, 0, 0, 0.54)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 4
    },
    show: {
        // backgroundColor: Colors.orange,
        padding: 8,
        position: 'absolute',
        top:0,
        left: 0,
    },
    delete: {
        padding: 8,
        position: 'absolute',
        bottom:0,
        right: 0,
    },
    add:{
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.orange,
        height: 80,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addCamera:{
        marginRight: 8,
    },
    addIcon:{
        color: Colors.orange,
    }
});