import React from 'react';
import {
    ScrollView,
    Text,
} from 'react-native';

import {styles} from './styles';
import { t } from '../../services/i18n';

import {ENUM_BACKBUTTON} from '../../enums/backButton';
import SectionTitle from '../../components/SectionTitle';

class Termsofuse extends React.PureComponent {
    componentDidMount(){
        this.props.header({title: t('useConditions'), back: ENUM_BACKBUTTON.BACK})
    }
    render() {
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <SectionTitle>Conditions d'utilisation et politique « vie privée » du Portail « Fix My Street Wallonie » (V 1.0.0)</SectionTitle>
                <Text style={styles.text}>
{`Les dispositions ci-dessous ont pour objet de définir les conditions auxquelles Wallonie Plus Propre vous donne accès au portail « Fix My Street Wallonie ».

Fix My Street Wallonie est une initiative de Wallonie Plus Propre - inspiré du Fix My Street Brussels développé par le CIRB, à l’initiative de Bruxelles Mobilité - en collaboration avec les communes participantes et les organismes partenaires.

Le site web et l'application mobile ont été développés et sont maintenus par l’asbl Be WaPP (numéro de TVA : BE 0697.701.204) dont le siège social est établi Chaussée de Liège 221, 5100 Namur.`}
                </Text>
                <SectionTitle>1. Acceptation des conditions générales d'utilisation</SectionTitle>
                <Text style={styles.text}>
{`Wallonie Plus Propre vous donne accès à « Fix My Street Wallonie » et aux informations qu'il contient pour autant que vous acceptiez, sans aucune réserve, les conditions mentionnées sur la présente page « conditions d'utilisation ». En consultant le site Internet « Fix My Street Wallonie » et les informations qui y figurent, vous acceptez ces conditions. L’asbl Be WaPP est susceptible de les modifier à tout moment.`}
                </Text>
                <SectionTitle>2. Utilisation de « Fix My Street Wallonie »</SectionTitle>
                <Text style={styles.text}>
{`Wallonie Plus Propre vous donne accès à « Fix My Street Wallonie ». L'utilisateur s'engage à utiliser le site internet et l’application mobile dans le respect des lois et des mentions légales et/ou contractuelles. L'utilisateur ne peut l'utiliser d'aucune manière qui serait préjudiciable aux intérêts de Wallonie Plus Propre, de ses fournisseurs et/ou de ses partenaires.`}
                </Text>
                <SectionTitle>3. Garanties et limitations de responsabilité quant à l'utilisation du portail « Fix My Street Wallonie »</SectionTitle>
                <Text style={styles.text}>
                    De manière générale, Wallonie Plus Propre, ses différents partenaires et l’asbl Be WaPP ne peuvent, en aucun cas, être tenu pour responsable de dommages directs ou indirects, ni d'aucun autre dommage de quelque nature que ce soit, résultant de l'utilisation de « Fix My Street Wallonie » ou de l'impossibilité de l'utiliser pour quelque raison que ce soit, que cette responsabilité soit ou non contractuelle, délictuelle ou quasi-délictuelle, ou qu'elle soit fondée sur une responsabilité sans faute ou autre, et cela quand bien même l’asbl Be WaPP aurait été prévenu de l'éventualité de tels dommages.
                </Text>
                <SectionTitle>3. 1. Informations</SectionTitle>
                <Text style={styles.text}>
{`En tant que gestionnaire du portail, l’asbl Be WaPP met en œuvre tous les moyens raisonnables pour publier sur le portail et l’application mobile « Fix My Street Wallonie » des informations qui, à sa connaissance, sont à jour. Il ne garantit pas pour autant le caractère adéquat, la précision ni l'exhaustivité de telles informations ni ne garantit que le site internet précité soit en permanence complet et mis à jour à tous égards. Les informations contenues sur ce portail peuvent comporter des inexactitudes de contenu, des inexactitudes techniques ou des erreurs de frappe. Ces informations sont fournies à titre indicatif et font périodiquement l'objet de modifications. L’asbl Be WaPP peut être amené à apporter, à tout moment et sans avertissement, des améliorations et/ou des modifications au site internet et application mobile

L'utilisation de ce site Internet, et par conséquent, des informations obtenues ou des éléments téléchargés lors de l'utilisation du service, se fait sous la seule responsabilité de l'utilisateur. L’asbl Be WaPP décline toute responsabilité pour les dommages pouvant résulter de l'utilisation des informations de ce site Internet.

L'utilisateur reconnaît en outre qu'il serait seul responsable pour tout dommage subi par son système informatique ou toute perte de données consécutifs au téléchargement d'un quelconque contenu.`}
                </Text>
                <SectionTitle>3. 2. Accès à « Fix My Street Wallonie »</SectionTitle>
                <Text style={styles.text}>
                    Ce site Internet est fourni sur la base d'un service « en l'état » et accessible en fonction de sa disponibilité. En tant que gestionnaire du portail, l’asbl Be WaPP ne peut garantir que le service sera ininterrompu, opportun, sûr ou dépourvu de toute erreur, que les résultats obtenus en utilisant le service seront exacts et/ou fiables, que les défauts dans les logiciels utilisés, s'il en existe, feront l'objet d'une correction.
                </Text>
                <SectionTitle>3. 3. Liens hypertextes</SectionTitle>
                <Text style={styles.text}>
{`Le portail « Fix My Street Wallonie » contient des liens hypertextes vers d'autres sites ainsi que des renvois à d'autres sources d'information, mis à votre disposition à titre indicatif uniquement. Wallonie Plus Propre ne contrôle pas ces sites et les informations qui y figurent et ne peut donc offrir aucune garantie quant à la qualité et/ou au caractère exhaustif de ces informations.

Wallonie Plus Propre décline toute responsabilité pour tout contenu inadapté, illégitime ou illégal présent sur les hyperliens ainsi que pour les dommages pouvant résulter de leur consultation.

Si vous souhaitez créer à partir de votre site un lien hypertexte vers le portail de Wallonie Plus Propre, nous vous invitons à prendre d'abord contact avec le webmaster (info@bewapp.be) qui vous informera dans les plus brefs délais de l'admissibilité de votre demande.`}
                </Text>
                <SectionTitle>3. 4. Actes des internautes&</SectionTitle>
                <Text style={styles.text}>
                    Wallonie Plus Propre ne pourra en aucune manière être tenu pour responsable des actes posés par les internautes.
                </Text>
                <SectionTitle>4. Droits de propriété intellectuelle </SectionTitle>
                <Text style={styles.text}>
{`L'ensemble des éléments et informations accessibles sur « Fix My Street Wallonie » ainsi que leur compilation et agencement (textes, photographies, images, icônes, vidéos, logiciels, base de données, données, etc.) sont protégés par les droits de propriété intellectuelle de l’asbl Be WaPP.

Les noms et logos de l’asbl Be WaPP ou de Wallonie Plus Propre qui apparaissent sur le présent site Internet sont des marques et/ou noms commerciaux protégés. Les marques du site « Fix My Street Wallonie » ne peuvent être utilisées en rapport avec tout autre produit ou service que ceux de ce site ou de l’asbl Be WaPP, de quelque manière que ce soit, susceptible de créer une confusion parmi les consommateurs ou de quelque manière qui déprécierait ou discréditerait l’asbl Be WaPP.

Sauf autorisation explicite en la matière, l'utilisateur ne peut, en aucun cas, copier, reproduire, traduire, représenter, modifier, transmettre, publier, adapter, distribuer, diffuser, concéder sous licence, transférer, vendre, sur quelque support que ce soit, par quelque moyen que ce soit, ou exploiter de quelque manière que ce soit, tout ou une partie de ce site Internet sans l'autorisation écrite préalable de l’asbl Be WaPP. Toute infraction peut entraîner des poursuites civiles et pénales.`}
                </Text>
                <SectionTitle>5. Politique en matière de protection de la vie privée</SectionTitle>
                <SectionTitle>5. 1. Principes</SectionTitle>
                <Text style={styles.text}>
{`« Fix My Street Wallonie » est soucieux de s’adapter aux nouvelles réalités du numérique et aux nouvelles dispositions du droit européen.

« Fix My Street Wallonie » s’est conformé au règlement (UE) 2016/679 du parlement européen et du conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données, abrogeant la directive 95/46/CE (règlement général sur la protection des données).

Ce règlement renforce les droits des citoyens européens et leur donne plus de contrôle sur leurs données personnelles notamment en offrant un cadre juridique unifié.

L’asbl Be WaPP, éditeur de « Fix My Street Wallonie » a défini une politique claire et précise sur la protection des données à caractère personnel en conformité avec les dispositions légales applicables en la matière.

Cette présente section répond aux questions suivantes sur l’utilisation de vos données personnelles :`}
                </Text>
                <SectionTitle>5. 2. Quelles sont les données à caractère personnel collectées et pour quelle(s) finalités ?</SectionTitle>
                <Text style={styles.text}>
{`Wallonie Plus Propre ne recueille des données personnelles que dans la mesure nécessaire pour remplir une fonction précise. Ces informations ne seront pas réutilisées à d'autres fins ;

Les données potentiellement collectées sont les suivantes :

Nom de la personne
Qualité de la personne
Adresse E-mail de la personne
Numéro de téléphone (facultatif)

Ces données à caractère personnel sont collectées et traitées afin de rencontrer la finalité suivante :

Permettre aux gestionnaires de recontacter les personnes ayant créés ou documentés des incidents lorsque ces derniers ont besoin d’éclaircissement sur les incidents en question.`}
                </Text>
                <SectionTitle>5. 3. Qui peut donner son consentement ?</SectionTitle>
                <Text style={styles.text}>
{`L’utilisateur confirme son adhésion et donne son consentement clair, explicite et univoque pour le traitement de ses données.

L’utilisateur a le droit de retirer son consentement à tout moment (voir 5.7).

En utilisant les services du site « Fix My Street Wallonie » l’utilisateur déclare, conformément au droit civil belge et européen, qu’il est compétent pour exercer ses droits, ou – s’il est mineur – qu’il a obtenu le consentement préalable valide de ses parents ou représentants légaux.

Wallonie Plus Propre veille à la protection de la vie privée des mineurs et encourage les parents ou les représentants légaux à s'impliquer activement dans les activités en ligne de leurs enfants.

Les mineurs de moins de 16 ans ne peuvent en aucun cas donner leur propre consentement au traitement de leurs données à caractère personnel aux fins de l’utilisation du présent site.

Wallonie Plus Propre ne peut être tenu responsable si les services étaient utilisés sans la supervision et la permission susmentionnées.`}
                </Text>
                <SectionTitle>5. 4. Qui est le destinataire des données à caractère personnel ?</SectionTitle>
                <Text style={styles.text}>
{`Les données à caractère personnel collectées et traitées sont réservées à l’usage exclusif du responsable du traitement. En aucun cas, elles ne seront transférées vers un tiers ou vers un État ne faisant pas partie de l'Union Européenne.`}
                </Text>
                <SectionTitle>5. 5. Qui est le responsable du traitement ?</SectionTitle>
                <Text style={styles.text}>
{`Pour le site internet « Fix My Street Wallonie », le responsable de traitement est

Be WaPP asbl
Chaussée de Liège 221, 5100 Namur
Tél. : 081 32 26 40
E-mail: info@bewapp.be`}
                </Text>
                <SectionTitle>5. 6. Quel est le traitement de vos données à caractère personnel ?</SectionTitle>
                <Text style={styles.text}>
{`Les données de l’utilisateur seront utilisées de manière licite, loyale et transparente pour le traitement direct de ses demandes, de ses messages ou de ses actions auxquelles il participe via le site web. Elles seront traitées de façon à garantir une sécurité appropriée des données à caractère personnel, y compris la protection contre le traitement non autorisé ou illicite et contre la perte.`}
                </Text>
                <SectionTitle>5. 7. Quel sont les droits que vous pouvez exercer sur les données vous concernant ?</SectionTitle>
                <Text style={styles.text}>
{`Conformément au règlement européen relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données, l’utilisateur dispose d’une lisibilité entière sur le traitement de ses données.

L'utilisateur peut faire valoir les droits qui lui sont reconnus ci-dessous en adressant au responsable de traitement une demande signée et datée, accompagnée d'une copie recto-verso de sa carte d'identité, qu'il remet sur place ou qu'il envoie par la poste, à l'adresse suivante –

Be WaPP asbl
Chaussée de Liège 221, 5100 Namur
Tél. : 081 32 26 40
E-mail: info@bewapp.be

– ou par tout autre moyen de télécommunication.

En cas de remise de la demande sur place, la personne, qui la reçoit, délivre immédiatement un accusé de réception daté et signé à l'auteur de la demande.

Si vous n’obtenez pas satisfaction pour une demande liée à vos données à caractère personnel, vous pouvez contacter notre délégué à la protection des données par mail : info@bewapp.be ou par courrier à l’adresse suivante : Délégué à la Protection des Données, Be WaPP asbl, Chaussée de Liège 221, 5100 Namur.`}
                </Text>
                <SectionTitle>5. 7. 1. Droit d'accès</SectionTitle>
                <Text style={styles.text}>
{`L'utilisateur du portail a le droit d'obtenir du responsable du traitement, la communication, sous une forme intelligible, des données faisant l'objet des traitements, ainsi que de toute information disponible sur l'origine de ces traitements.

Les renseignements sont communiqués sans délai et au plus tard dans les trente jours de la réception de la demande.`}
                </Text>
                <SectionTitle>5. 7. 2. Droit de rectification</SectionTitle>
                <Text style={styles.text}>
{`L'utilisateur peut, sans frais, faire rectifier toute donnée à caractère personnel inexacte qui le concerne et également faire effacer ou supprimer toute donnée à caractère personnel se rapportant à lui qui, compte tenu du but du traitement, est incomplète ou non pertinente ou dont l'enregistrement, la communication ou la conservation sont interdits ou encore qui a été conservée au-delà de la période autorisée.

Les rectifications ou effacements de données sollicités doivent être communiqués, par le responsable du traitement, dans le mois qui suit l'introduction de la demande, à l'utilisateur ainsi qu'aux personnes à qui les données incorrectes, incomplètes et non pertinentes ont été communiquées, à moins que la notification à ces destinataires ne s'avère impossible ou n'implique des efforts disproportionnés. `}
                </Text>
                <SectionTitle>5. 7. 3. Droit d'opposition</SectionTitle>
                <Text style={styles.text}>
{`L'utilisateur a le droit de s'opposer, pour des raisons sérieuses et légitimes tenant à une situation particulière, à ce que les données le concernant fassent l'objet d'un traitement sauf si elles sont recueillies pour respecter une obligation légale, si elles sont nécessaires à l’exécution d’un contrat auquel l’utilisateur est partie ou si elles sont utilisées pour une finalité pour laquelle l’utilisateur a indubitablement donné son consentement ;

En cas d'opposition justifiée, le traitement mis en œuvre par le responsable du traitement ne peut plus porter sur ces données.`}
                </Text>
                <SectionTitle>5. 7. 4. Droit à la portabilité des données</SectionTitle>
                <Text style={styles.text}>
{`L’utilisateur a le droit de recevoir les données à caractère personnel le concernant fournies au responsable du traitement, dans un format structuré, couramment utilisé et lisible par machine, et a le droit de transmettre ces données à un autre responsable du traitement sans que le responsable du traitement auquel les données à caractère personnel ont été communiquées y fasse obstacle, lorsque :

le traitement est fondé sur le consentement ou sur un contrat ;
le traitement est effectué à l'aide de procédés automatisés ;`}
                </Text>
                <SectionTitle>5. 7. 5. Droit à l’oubli et droit à la limitation du traitement des données</SectionTitle>
                <Text style={styles.text}>
{`L’utilisateur a le droit à ce que ses données personnelles soient supprimées. Il a également le droit à ce que l’utilisation de ses données personnelles soit limitée. Dans l’un comme dans l’autre cas, les conditions prévues par la réglementation doivent être réunies. L’utilisateur peut demander l’effacement de ses données personnelles par le lien suivant :

info@bewapp.be

La politique de protection des données ne porte pas préjudice aux droits dont dispose l’asbl Be WaPP à l'égard de certains utilisateurs vis-à-vis desquels un contrat, la loi ou tout autre document d'ordre contractuel, réglementaire ou légal, l'autorise à des opérations plus étendues. En ce cas, la norme la plus favorable pour l’asbl Be WaPP s'applique.

L’utilisateur peut également demander l’effacement de ses données personnelles.`}
                </Text>
                <SectionTitle>5. 8. Quelle est l’utilisation faite des cookies ?</SectionTitle>
                <Text style={styles.text}>
{`Le site internet « Fix My Street Wallonie » entend informer les visiteurs de l'utilisation de ce que la loi qualifie d’« informations stockées dans les équipements terminaux d'un utilisateur final», ce qui est plus communément appelé « cookies ».

Un cookie est un fichier envoyé par le serveur du site internet « Fix My Street Wallonie » qui s'enregistre sur le disque dur de votre ordinateur qui garde la trace du site internet visité et contient un certain nombre d'informations relatives à cette visite.

L'utilisateur peut refuser l'installation des cookies sur son ordinateur en configurant son navigateur de manière appropriée. Cependant, ce refus peut empêcher l'accès à certains services du Portail.`}
                </Text>
                <SectionTitle>5. 8. 1. Cookies fonctionnels :</SectionTitle>
                <Text style={styles.text}>
{`Les cookies spécifiques au site internet « Fix My Street Wallonie » sont utilisés pour permettre la gestion de fonctionnalités de confort du site. Les données suivantes sont stockées par nos cookies :

Nous stockons dans un cookie la langue utilisée par l’utilisateur lors de sa visite sur le site de manière à permettre, par la suite, de directement recharger le site dans la langue choisie par l’utilisateur lors de sa dernière visite. Ce cookie est valable pendant un an.
Nous stockons dans un cookie, lorsque le site est consulté en Anglais, la langue de référence d’affichage de la carte choisie de manière à pouvoir reproposer la carte dans la langue sélectionnée. Ce cookie est valable un an.
Nous stockons dans un cookie la clôture du bandeau afférent aux cookies de manière à ne pas reproposer ce dernier à chaque consultation du site. Ce cookie est valable une semaine.`}
                </Text>
                <SectionTitle>5. 8. 2. Cookies statistiques :</SectionTitle>
                <Text style={styles.text}>
{`Le site internet « Fix My Street Wallonie » utilise les services de « Google Analytics » afin d'analyser la fréquentation et le comportement des utilisateurs de son site.

Les cookies statistiques permettent au site internet « Fix My Street Wallonie » de connaître par exemple le nombre de visiteurs, leur situation géographique, leur parcours sur le site (comment ils y ont accédé, par quelle page, les pages qui ont suivi dans leur session et la page par laquelle ils ont quitté le site), le moment de la visite… Ces cookies sont anonymes et leur durée de vie peut aller jusqu'à 2 ans.`}
                </Text>
                <SectionTitle>5. 9. Quelles sont les mesures de sécurités qui sont prises pour la protection de vos données ?</SectionTitle>
                <SectionTitle>5. 9. 1. Qualité</SectionTitle>
                <Text style={styles.text}>
                    Le site internet « Fix My Street Wallonie » fait toute diligence pour rectifier ou supprimer les données inexactes, incomplètes, non pertinentes ou interdites, ainsi que pour les tenir à jour.
                </Text>
                <SectionTitle>5. 9. 2. Confidentialité</SectionTitle>
                <Text style={styles.text}>
                    Le site internet « Fix My Street Wallonie » veille d'une part, à ce que les personnes travaillant sous son autorité n'aient accès et ne puissent traiter que les données dont elles ont besoin pour l'exercice de leurs fonctions ou qui sont indispensables pour les nécessités du service et d'autre part, à ce que ces mêmes personnes soient informées des principes et des prescrits de la loi relative à la protection de la vie privée à l'égard des traitements des données à caractère personnel et de ses arrêtés d'exécution.
                </Text>
                <SectionTitle>5. 9. 3. Sécurité</SectionTitle>
                <Text style={styles.text}>
{`Afin de garantir la sécurité des données à caractère personnel, le site internet « Fix My Street Wallonie » a mis en place des mesures de sécurité techniques et organisationnelles appropriées contre la destruction accidentelle ou non autorisée, la perte accidentelle, la modification, l'accès et tout autre traitement non autorisé des informations reçues sur le portail.

Les mesures prises sont d'un niveau de protection adéquat compte tenu des frais qu'entraîne leur application, de l'état de la technique en la matière ainsi que de la nature des données à protéger et des risques potentiels.`}
                </Text>
                <SectionTitle>5. 10. Quelle est la durée de conservation des données à caractère personnel ?</SectionTitle>
                <Text style={styles.text}>
{`Les données à caractère personnel sont actuellement conservées sans limite de temps. Cependant, les données seront anonymisées après une période de deux ans. Auquel cas, l’utilisateur peut toujours demander d’effacer ses données à caractère personnel via le mail de Wallonie Plus Propre.`}
                </Text>
                <SectionTitle>5. 11. Y a-t-il registre des traitements de données à caractère personnel ?</SectionTitle>
                <Text style={styles.text}>
                    Conformément à l’article 30 du règlement (UE) 2016/679 du parlement européen et du conseil du 27 avril 2016 relatif à la protection des personnes physiques à l'égard du traitement des données à caractère personnel et à la libre circulation de ces données, abrogeant la directive 95/46/CE (règlement général sur la protection des données), l’asbl Be WaPP tient un registre des activités de traitement des données à caractère personnel.
                </Text>
                <SectionTitle>5. 12. Quels sont les recours ?</SectionTitle>
                <Text style={styles.text}>
{`S’il estime que les données à caractère personnel ont été traitées de manière non conforme au règlement européen, l'utilisateur peut adresser, sans frais, une plainte auprès de l’autorité de contrôle en cas de difficultés rencontrées dans l'exercice des droits susmentionnés ou de non-respect d'obligations découlant du règlement.

L’utilisateur bénéficie également d’un droit de recours judiciaire effectif à l’égard de certains actes et décisions de l’autorité de contrôle lorsqu’elle rend une décision juridiquement contraignante ou lorsqu’elle échoue à informer dans un délai de trois mois l’utilisateur sur les avancées ou l’issue de sa réclamation.`}
                </Text>
                <SectionTitle>6. Règlement des litiges, compétence et droit applicable</SectionTitle>
                <Text style={styles.text}>
{`Les présentes conditions d'utilisation sont régies par le droit belge et le règlement européen. Tout litige découlant de, ou lié à l'utilisation de ce service, fera l’objet d’une conciliation. En cas d’échec, le litige sera soumis à la compétence des tribunaux les tribunaux de l’arrondissement judiciaire de Namur (Belgique).

Une version imprimée de cet accord et de toute mention d'avertissement délivrée sous forme électronique sera acceptée dans toute procédure judiciaire ou administrative découlant de ou liée à cet accord, au même titre et aux mêmes conditions que d'autres documents et registres commerciaux créés et conservés sous forme imprimée.`}
                </Text>
                <SectionTitle>7. Contacts</SectionTitle>
                <Text style={styles.text}>
{`Be WaPP asbl
Chaussée de Liège 221, 5100 Namur
Tél. : 081 32 26 40

Adresse mail de contact : info@bewapp.be
Adresse mail de contact à toute demande relative aux droits des personnes : info@bewapp.be`}
                </Text>
            </ScrollView>
        );
    }

}

export default Termsofuse;