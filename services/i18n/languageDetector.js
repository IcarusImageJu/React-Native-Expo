import {Localization} from 'expo';
import { AsyncStorage } from 'react-native';
import MyStorage from '../../constants/MyStorage';

const languageDetector = {
    type: 'languageDetector',
    async: true,
    detect: async (callback) => {
        const lang = await AsyncStorage.getItem(MyStorage.LANG);
        if(lang !== null) {
            return callback(lang)
        }
        return Localization.getLocalizationAsync()
            // We will get back a string like "en_US". We
            // return a string like "en" to match our language
            // files.
            .then((lng) => { callback(lng.locale.split(/-|_/g)[0]); })
    },
    init: () => {},
    cacheUserLanguage: () => {},
};

export default languageDetector;