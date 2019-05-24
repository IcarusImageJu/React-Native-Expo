import React, {PureComponent} from 'react';
import {Modal, TouchableHighlight, View, Image, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';
import { Icon } from 'expo';

class ModalGallery extends PureComponent {

    render() {
        const {modal:{open, image}, close} = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={open}
                onRequestClose={close}>
                <View style={styles.container}>
                    <View>
                        <Image source={{uri: image}} style={styles.image} resizeMode={'contain'}/>
                        <TouchableHighlight onPress={close} style={styles.close}>
                            <Icon.FontAwesome
                                style={styles.icon}
                                name={'times'}
                                size={24}
                            />
                        </TouchableHighlight>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.black,
        position: 'relative',
        flex: 1,
    },
    image: {
        width: '100%',
        height: Layout.window.height,
    },
    close:{
        position: 'absolute',
        top: 16,
        right: 16,
        padding: 16,
    },
    icon: {
        color:Colors.white,
        textShadowColor: 'rgba(0, 0, 0, 0.54)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 4,
    },
});

export default ModalGallery;