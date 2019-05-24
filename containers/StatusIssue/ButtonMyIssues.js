import React from 'react';

import Button from '../../components/Button';
import { t } from '../../services/i18n';

const ButtonMyIssues = ({loading, myIssues, id, add, remove}) => {
    const alreadyIn = myIssues.includes(id.toString());
    if(alreadyIn) {
        return(
            <Button loading={loading} color="white" icon="remove" handlePress={remove}>
                {t('removeFromMyIssues')}
            </Button>
        )
    }

    return(
        <Button loading={loading} icon="save" handlePress={add}>
            {t('addToMyIssues')}
        </Button>
    )
}

export default ButtonMyIssues;