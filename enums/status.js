import { t } from '../services/i18n';

export const ENUM_STATUS = {
    INCOMPLETE: 0,
    CREATED: 1,
    PROCESSING: 2,
    DISMISSED: 3,
    CLOSED: 4,
}

export const convertStatus = backStatus => {
    switch (backStatus){
        case "INCOMPLETE":
            return ENUM_STATUS.INCOMPLETE;
        case "CREATED":
            return ENUM_STATUS.CREATED;
        case "PROCESSING":
            return ENUM_STATUS.PROCESSING;
        case "DISMISSED":
            return ENUM_STATUS.DISMISSED;
        case "CLOSED":
            return ENUM_STATUS.CLOSED;
        default:
            return ENUM_STATUS.CREATED;
    }
}

export const convertStatusClientToBack = unconvertedStatus => {
    switch (unconvertedStatus) {
        case ENUM_STATUS.INCOMPLETE:
            return "INCOMPLETE";
        case ENUM_STATUS.CREATED:
            return "CREATED";
        case ENUM_STATUS.PROCESSING:
            return "PROCESSING";
        case ENUM_STATUS.DISMISSED:
            return "DISMISSED";
        case ENUM_STATUS.CLOSED:
                return "CLOSED";
        default:
            return "CREATED";
    }
};

export const statusTitle = enumStatus => {
    switch (enumStatus) {
        case ENUM_STATUS.INCOMPLETE:
            return t('incomplete');
        case ENUM_STATUS.CREATED:
            return t('issued');
        case ENUM_STATUS.PROCESSING:
            return t('inProgress');
        case ENUM_STATUS.DISMISSED:
            return t('refused');
        case ENUM_STATUS.CLOSED:
            return t('done');
        default:
            return t('issued');
    }
};