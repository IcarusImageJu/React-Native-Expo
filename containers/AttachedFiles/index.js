import React from 'react';
import {
    Image,
    TouchableOpacity,
    View,
} from 'react-native';
import { Icon, ImagePicker, Permissions } from 'expo';

import { styles } from './styles';
import ModalGallery from './modal';

class AttachedFiles extends React.PureComponent{
    state = {
        images: [],
        hasCameraPermission: null,
        modal: {
            open: false,
            image: '',
        }
    };
    componentDidMount() {
        this._askPermission();
    }
    render(){
        const { modal } = this.state;
        const {attachedFiles: {images, limit, add}, attachments = []} = this.props;
        return(
            <View style={styles.listCards}>
                {images.map(image => (
                    <View key={image.id} style={styles.card}>
                        <Image source={{uri: image.uri}} style={styles.cardImage}/>
                        <TouchableOpacity style={styles.show} onPress={() => this._openModalWithImage(image.uri)}>
                            <Icon.FontAwesome
                                style={styles.icon}
                                name={'search'}
                                size={16}
                            />
                        </TouchableOpacity>
                        { add && <TouchableOpacity onPress={() => this._removePicutre(image.id)} style={styles.delete}>
                            <Icon.FontAwesome
                                style={styles.icon}
                                name={'trash'}
                                size={16}
                            />
                        </TouchableOpacity> }
                    </View>
                ))}
                {attachments.map(attachment => (
                    <TouchableOpacity key={attachment.id} onPress={() => this._openModalWithImage(`${attachment.baseUrl}${attachment.filePath}`)}>
                        <View style={styles.card}>
                            <Image source={{uri: `${attachment.baseUrl}${attachment.thumbnailPath}`}} style={styles.cardImage}/>
                            <View style={styles.show}>
                                <Icon.FontAwesome
                                    style={styles.icon}
                                    name={'search'}
                                    size={16}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
                {add && <TouchableOpacity onPress={this._takePicture}>
                    <View style={{...styles.add, ...styles.addCamera}}>
                        <Icon.FontAwesome
                            style={styles.addIcon}
                            name={'camera'}
                            size={24}
                        />
                    </View>
                </TouchableOpacity>}
                {add && <TouchableOpacity onPress={this._pickImage}>
                    <View style={styles.add}>
                        <Icon.FontAwesome
                            style={styles.addIcon}
                            name={'image'}
                            size={24}
                        />
                    </View>
                </TouchableOpacity>}
                <ModalGallery modal={modal} close={() => this.setState({modal: {image: '', open: false}})}/>
            </View>
        )
    }

    _askPermission = async () => {
        const { status: statusCam } = await Permissions.askAsync(Permissions.CAMERA);
        const { status: statusRoll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: (statusCam === 'granted' && statusRoll === 'granted') });
    }

    _pickImage = async () => {
        const { hasCameraPermission } = this.state;
        if(hasCameraPermission){
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                aspect: [4, 3],
            });
            const {attachedFiles:{images}, handleChange} = this.props
            if (!result.cancelled) {
                const name = result.uri.substring(result.uri.lastIndexOf('/') +1)
                const image = {
                    uri: result.uri,
                    id: images.length + 1,
                    type: result.type,
                    name
                };
                handleChange({ images: [...images, image] });
            }
        } else {
            this._askPermission().then(() => {
                if(hasCameraPermission){this._pickImage()}
            })
        }
    };

    _takePicture = async () => {
        const { hasCameraPermission } = this.state;
        if(hasCameraPermission){
            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: false,
                aspect: [4, 3],
            });
            const {attachedFiles:{images}, handleChange} = this.props
            if (!result.cancelled) {
                const name = result.uri.substring(result.uri.lastIndexOf('/') +1)
                const image = {
                    uri: result.uri,
                    id: images.length + 1,
                    type: result.type,
                    name
                };
                handleChange({ images: [...images, image] });
            }
        } else {
            this._askPermission().then(() => {
                if(hasCameraPermission){this._takePicture()}
            })
        }
    };

    _removePicutre = (id) => {
        const {attachedFiles:{images}, handleChange} = this.props
        const newImages = images.filter((image) => image.id !== id);
        handleChange({images: newImages});
    }

    _openModalWithImage(image){
        this.setState({modal:{open: true, image}});
    }
}

export default AttachedFiles;