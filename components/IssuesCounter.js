import React from 'react';
import Label from './Label';
import { t } from '../services/i18n';

const IssuesCounter = ({count, area}) => {
    if(area){
        switch (count) {
            case 0:
                return <Label>{t('common:noIssueReportedInthisArea', {count})}</Label>
            case 1:
                return <Label>{t('common:xIssueReportedInthisArea', {count})}</Label>
            default:
                return <Label>{t('common:xIssuesReportedInthisArea', {count})}</Label>
        }
    } else {
        switch (count) {
            case 0:
                return <Label>{t('common:noIssueReported', {count})}</Label>
            case 1:
                return <Label>{t('common:xIssueReported', {count})}</Label>
            default:
                return <Label>{t('common:xIssuesReported', {count})}</Label>
        }
    }
}

export default IssuesCounter;