import React from 'react';
import {
    ScrollView,
    TextInput,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { SecureStore } from 'expo';
import { withRouter } from "react-router";
import Dialog, {
    DialogContent,
    SlideAnimation,
    DialogTitle,
    DialogFooter,
    DialogButton,
} from 'react-native-popup-dialog';
import gql from 'graphql-tag';
import { Mutation } from "react-apollo";

import { t } from '../../services/i18n';
import {styles} from './styles';

import { ENUM_STATUS, statusTitle } from '../../enums/status';
import Picker from '../../components/Picker';
import SectionTitle from '../../components/SectionTitle';
import Label from '../../components/Label';
import MyStorage from '../../constants/MyStorage';

const UPDATE_STATUS = gql`
    mutation UpdateStatus(
        $incidenceId: Int!
        $comment: String
        $status: StatusEnum!
    ) {
        updateStatus(
            incidenceId: $incidenceId
            status: { status: $status, comment: $comment }
        ) {
            id
        }
    }
`

class UpdateStatus extends React.PureComponent{
    state={
        status: ENUM_STATUS.IN_PROGRESS,
        comment: '',
        token: null,
        typeDissmiss: "close",
    }
    async componentDidMount(){
        // retreive the token for the mutation
        const agent = await SecureStore.getItemAsync(MyStorage.AGENT);
        const {token} = JSON.parse(agent);
        this.setState({token});
    }

    componentDidUpdate(prevProps){
        const {to} = this.props;
        if(prevProps.to !== to){
            this.setState({status: to})
        }
    }

    render(){
        const {from, close, dialog} = this.props;
        const {status, comment, token} = this.state;
        // Create the status options for the dropdown list
        const options = [
            {
                "id": ENUM_STATUS.REPORTED,
                "nameFr": statusTitle(ENUM_STATUS.REPORTED),
            },
            {
                "id": ENUM_STATUS.IN_PROGRESS,
                "nameFr": statusTitle(ENUM_STATUS.IN_PROGRESS),
            },
            {
                "id": ENUM_STATUS.FINALIZED,
                "nameFr": statusTitle(ENUM_STATUS.FINALIZED),
            },
            {
                "id": ENUM_STATUS.REFUSE,
                "nameFr": statusTitle(ENUM_STATUS.REFUSE),
            }
        ];

        return(
            <Mutation
                mutation={UPDATE_STATUS}
                context={{headers:{"authorization": token}}}
                onCompleted={() => this._statusUpdated()}
            >
            {mutate => (
                <Dialog
                    visible={dialog}
                    onTouchOutside={close}
                    onHardwareBackPress={close}
                    // When the popup is dismissed, reftech the parent data
                    onDismiss={() => this._dismiss()}
                    width={0.8}
                    dialogAnimation={new SlideAnimation({
                        slideFrom: 'bottom',
                    })}
                    dialogTitle={<DialogTitle title="Modifier le status de l'incident" />}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="Annuler"
                                onPress={() => this._cancel()}
                            />
                            <DialogButton
                                text="Valider"
                                onPress={() => this._performMutation(mutate)}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <View style={styles.dialogContainer}>
                            <SectionTitle>Choisir un statut</SectionTitle>
                            <Label>Veuillez selectionner un statut dans la liste suivante</Label>
                            <Picker options={options} selected={status} onChange={value => this.setState({status: value})}/>
                            <SectionTitle>{t('comment')}</SectionTitle>
                            <Label>{t('commentDescription')}</Label>
                            <TextInput
                                style={styles.textArea}
                                value={comment}
                                onChangeText={text => this.setState({comment: text})}
                                textAlignVertical={'top'}
                                multiline={true}
                                numberOfLines={3}
                            />
                        </View>
                    </DialogContent>
                </Dialog>
            )}
            </Mutation>

        )
    }

    _performMutation = mutate => {
        const {status: unconvertedStatus, comment} = this.state;
        const { incidenceId } = this.props;
        // Convert status for the mutation, so the back have is enumeration right
        const status = () => {
            switch (unconvertedStatus) {
                case ENUM_STATUS.REPORTED:
                    return "REPORTED";
                case ENUM_STATUS.IN_PROGRESS:
                    return "IN_PROGRESS";
                case ENUM_STATUS.FINALIZED:
                    return "FINALIZED";
                case ENUM_STATUS.REFUSE:
                    return "REFUSE";
                default:
                    return "REPORTED";
            }
        };
        // Perform the mutation
        mutate({
            variables:{
                incidenceId,
                comment,
                status: status()
            }
        })
    }

    _statusUpdated = (data) => {
        const {status} = this.state;
        const { close, history } = this.props;
        // trigger a refetch if the status is REPORTED or REFUSE
        // Or show the right succes agent page
        switch (status) {
            case ENUM_STATUS.IN_PROGRESS:
                // on close, the popup will be the dismissed
                // and go to the in progress success page
                this.setState({typeDissmiss: ENUM_STATUS.IN_PROGRESS})
                return close();
            case ENUM_STATUS.FINALIZED:
                // on close, the popup will be the dismissed
                // and go to the finalized success page
                this.setState({typeDissmiss: ENUM_STATUS.FINALIZED})
                return close();;
            default:
                // on close, the popup will be the dismissed
                // and refetch the parent datas
                return close();
        }
    }

    _cancel = () => {
        const { close } = this.props;
        this.setState({typeDissmiss: "cancel"});
        close();
    }

    _dismiss = () => {
        const { updated, history, match: {params: {id}} } = this.props;
        const { typeDissmiss } = this.state;
        switch (typeDissmiss) {
            case ENUM_STATUS.IN_PROGRESS:
                return history.push(`/status/${id}/success/inprogress`);
            case ENUM_STATUS.FINALIZED:
                return history.push(`/status/${id}/success/finalized`);
            case 'cancel':
                break;
            default:
                return updated();
        }
    }
}

export default withRouter(UpdateStatus);