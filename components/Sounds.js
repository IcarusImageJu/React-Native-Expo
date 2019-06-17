import React from 'react';
import { Audio } from 'expo-av';

const _playSuccess = async () => {
    try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
            require('../assets/sounds/success.m4a'),
            { shouldPlay: true },
        );
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
    }
}

const _playError = async () => {
    try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
            require('../assets/sounds/error.m4a'),
            { shouldPlay: true },
        );
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
    }
}

const _playAddress = async () => {
    try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
            require('../assets/sounds/address.m4a'),
            { shouldPlay: true },
        );
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
    }
}

const _playButton = async () => {
    try {
        const { sound: soundObject, status } = await Audio.Sound.createAsync(
            require('../assets/sounds/button.m4a'),
            { shouldPlay: true },
        );
        // Your sound is playing!
    } catch (error) {
        // An error occurred!
    }
}

const sounds = {
    success: _playSuccess,
    button: _playButton,
    error: _playError,
    address: _playAddress,
}

export class Sounds extends React.PureComponent{
    render(){
        const {children} = this.props;
        return children(sounds);
    }
}

export function withSound(WrappedComponent) {
    return class extends React.PureComponent{
        render() {
            return <WrappedComponent sounds={sounds} {...this.props}/>
        }
    }
}

export default Sounds;