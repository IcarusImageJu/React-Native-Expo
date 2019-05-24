export const fallback = "fr";

import {fr, nl, de, en} from '../lang/messages';
export const supportedLocales = {
    fr: {
        name: "Français",
        translationFileLoader: fr,
        momentLocaleLoader: () => import('moment/locale/fr'),
    },
    de: {
        name: "Deutsch",
        translationFileLoader: de,
        momentLocaleLoader: () => import('moment/locale/de'),
    },
    nl: {
        name: "Nederlands",
        translationFileLoader: nl,
        momentLocaleLoader: () => import('moment/locale/nl'),
    },
    en: {
        name: "English",
        translationFileLoader: en,
        momentLocaleLoader: () => import('moment/locale/en-gb'),
    },
};

export const defaultNamespace = "common";

export const namespaces = [
    "common",
];