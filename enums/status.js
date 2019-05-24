import { t } from '../services/i18n';

export const ENUM_STATUS = {
    REPORTED: 0,
    IN_PROGRESS: 1,
    FINALIZED: 2,
    REFUSE: 3,
}

export const convertStatus = backStatus => {
    switch (backStatus){
        case "FINALIZED":
            return ENUM_STATUS.FINALIZED;
        case "REFUSE":
            return ENUM_STATUS.REFUSE;
        case "IN_PROGRESS":
            return ENUM_STATUS.IN_PROGRESS;
        default:
            return ENUM_STATUS.REPORTED;
    }
}

export const statusTitle = enumStatus => {
    switch (enumStatus){
        case ENUM_STATUS.FINALIZED:
            return t('done');
        case ENUM_STATUS.REFUSE:
            return t('refused');
        case ENUM_STATUS.IN_PROGRESS:
            return t('inProgress');
        default:
            return t('issued');
    }
}