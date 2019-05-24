import React from 'react';
import {
    ScrollView,
    Text,
} from 'react-native';

import {styles} from './styles';
import { t } from '../../services/i18n';

import {ENUM_BACKBUTTON} from '../../enums/backButton';
import SectionTitle from '../../components/SectionTitle';

class Page extends React.PureComponent {
    componentDidMount(){
        this.props.header({title: t('faq'), back: ENUM_BACKBUTTON.BACK})
    }
    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <Text style={styles.text}>
{`1. Qu’est-ce que Fix My Street Wallonie? Quels sont ses objectifs?

Fix My Street Wallonie est une plateforme internet et mobile mise à la disposition du citoyen et de l’administration pour signaler des incidents dans l’espace public.

Une aide pour localiser et décrire les dégradations.
Un outil qui informe les citoyens et les administrations à chaque étape clef de la résolution de l’incident.

2. Quels incidents puis-je signaler ?

Un incident est une défectuosité de l'espace public.

Les types d’incidents suivants sur chaussées, espaces verts, pistes cyclables, ponts, tunnels et trottoirs sont couverts :

Débris / Objets abandonnés
Mobilier urbain
Etc ...

3. Quelles communes participent ?

Fix My Street Wallonie est une initiative de Wallonie Plus Propre, en collaboration avec les communes et instances participantes.

4. Pourquoi mon incident n'est-il pas publié ?

Un incident peut être invalidé par les gestionnaires du site :

L’incident signalé ne concerne pas une dégradation qui requiert une remise en état. Vous serez notifié par le gestionnaire que votre incident a été invalidé.
L’incident a déjà été signalé par quelqu’un d’autre. Le numéro de l’incident déjà signalé vous sera communiqué pour que vous puissiez vous y abonner si souhaité.
L’incident concerne une dégradation qui ne rentre pas dans le périmètre de Fix My Street Wallonie.

5. Pourquoi ma photo ou mes commentaires ne sont-ils pas publiés ?

Les photos ou les commentaires pourraient ne pas être publiés dans la mesure ou leur contenu (photos ou commentaires) est abusif ou illégal. Les gestionnaires du site se réservent le droit de ne pas publier ou de supprimer tous les rapports ou les mises à jour qu'ils considèrent comme étant inappropriés. Pour plus d’informations à ce sujet, veuillez consulter la page « conditions d’utilisation ».

6. Le lieu de l’incident sur la carte et l’adresse proposée par Fix My Street Wallonie ne correspondent pas.

Dans certains cas, l’adresse proposée par Fix My Street Wallonie et le lieu de l’incident sur la carte ne correspondent pas.

Déplacez le curseur sur la carte à l’endroit précis ou vous avez localisé l’incident.
Ne tenez pas compte de l’adresse proposée par Fix My Street Wallonie.
Entrez dans le champ « commentaire » l’adresse où se trouve l’incident.


7. Qui peut voir mes informations personnelles ?

Si vous soumettez un incident, nous transmettons vos coordonnées ainsi que les détails de l'incident au gestionnaire responsable (communal, régional ou autre). Les coordonnées que vous fournissez (nom, téléphone, email) serviront à éventuellement reprendre contact avec vous si cela s'avère nécessaire.

Aucune information personnelle n'est affichée sur le site public ou communiquée à un tiers, à moins que nous n’y soyons obligés par la loi.

8. Protection des données à caractère personnel

Nous garantissons la confidentialité de toutes les informations qui nous sont transmises. Conformément à la loi (voir site du Moniteur Belge) vous disposez d'un droit d'accès aux données vous concernant, ainsi qu'un droit de modification et de suppression de celles-ci.

Les données reçues dans le cadre d'une demande d'information sont conservées par l’asbl Be WaPP et les instances participantes mais servent uniquement à répondre à la demande d'information qui a été introduite. Conformément à la loi du 8 décembre 1992 relative à la protection de la vie privée à l'égard du traitement de données à caractère personnel, vous avez le droit de consulter et, si nécessaire, de faire rectifier les données en question. Vous devez pour ce faire prendre contact avec l’asbl Be WaPP via le numéro 081/32.26.40 ou via l'adresse e-mail info@bewapp.be.

9. Allez-vous envoyer du spam à mon adresse email ?

Votre adresse email sera utilisée par l’administration dans le seul cadre des incidents que vous avez signalés et si vous avez souscrit un abonnement.

Les mails que vous pourriez recevoir sont :

des messages de notification pour être tenu au courant de l'évolution de la résolution d'un incident que vous avez déclaré.
des messages de notification pour être tenu au courant de l'évolution de la résolution d'un incident déclaré par une autre personne et auquel vous avez souscrit un abonnement.
des messages en provenance d'un gestionnaire qui voudrait communiquer personnellement avec vous de l'évolution d'un incident que vous avez déclaré.

10. Qui gère ce site ?

Fix My Street Wallonie est une initiative de Wallonie Plus Propre en collaboration avec les communes et les institutions wallonnes partenaires.

Le site web et l'application mobile ont été développés et sont maintenus par l’asbl Be WaPP.

L'idée originale a été inspirée par MySociety's FixMyStreet.

Le projet a été réalisé et adapté pour la Région Wallonne par l’asbl Be WaPP à partir du code du CIRB (Centre d’Informatique pour la Région Bruxelloise) lui-même issu du code Open Source du projet fixmystreet.ca de visiblegovernment.ca.


Coordonnées de contact :

Be WaPP asbl
Chaussée de Liège 221, 5100 Jambes (Namur)
T : 081 32 26 40
E-mail: info@bewapp.be

11. Configuration requise

Le site Fix My Street Wallonie est optimisé pour les systèmes d’exploitation Microsoft Windows, Apple Macintosh et Linux disposant des logiciels suivants :

Microsoft Internet Explorer 11
Microsoft Edge 38 et supérieurs
Mozilla FireFox 50 et supérieurs
Google Chrome 53 et supérieurs
Adobe Acrobat Reader 9 et supérieurs

12. Application mobile

Vous souhaitez signaler un incident avec votre smartphone ?

C’est simple et efficace pour localiser l’incident, prendre les photos et transmettre l’incident aux gestionnaires.

Vous trouverez l’application pour signaler un incident sur Fix My Street Wallonie sur les app stores pour iOS et Android.`}
                </Text>
            </ScrollView>
        );
    }

}

export default Page;