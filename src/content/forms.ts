/**
 * Libellés, options et messages des formulaires (devis et contact).
 * Les valeurs techniques (`value`) sont utilisées par la validation serveur :
 * modifier un libellé est sans risque, modifier une valeur demande de vérifier src/lib/forms.
 */

export type Option = {
  value: string;
  label: string;
};

export const formCommon = {
  requiredNote: "Tous les champs sont obligatoires, sauf mention « facultatif ».",
  optional: "facultatif",
  privacy:
    "Les informations transmises servent uniquement au traitement de votre demande. Ne communiquez jamais de mot de passe ni de donnée sensible.",
  errorSummaryTitle: "Veuillez corriger les points suivants :",
  honeypotLabel: "Ne pas remplir ce champ",
  referenceLabel: "Référence :",
  submitErrors: {
    not_configured:
      "Rien n’a été envoyé : l’enregistrement des demandes n’est pas encore activé sur ce site. Vos réponses sont conservées sur cette page.",
    storage_failed:
      "Votre demande n’a pas pu être enregistrée à cause d’un problème technique : rien n’a été transmis. Vos réponses sont conservées, réessayez dans quelques instants.",
    rate_limited:
      "Trop de demandes ont été envoyées depuis votre connexion : rien n’a été transmis. Réessayez plus tard.",
    server_error:
      "Un problème technique a empêché de confirmer l’envoi. Vos réponses sont conservées : réessayez dans quelques instants, un nouvel essai ne crée pas de doublon.",
    network:
      "La connexion au serveur a échoué avant la confirmation. Vérifiez votre connexion Internet puis réessayez : vos réponses sont conservées et un nouvel essai ne crée pas de doublon.",
    invalid:
      "Certaines informations ne sont pas valides. Corrigez les champs signalés puis renvoyez le formulaire.",
    bad_request:
      "Le formulaire n’a pas pu être traité : rien n’a été transmis. Rechargez la page puis réessayez.",
  },

} as const;

export type SubmitErrorCode = keyof typeof formCommon.submitErrors;

export const validationMessages = {
  required: "Ce champ est obligatoire.",
  choiceRequired: "Choisissez une réponse.",
  polesRequired: "Choisissez au moins un pôle.",
  prestationsRequired: (pole: string) =>
    `Choisissez au moins une prestation pour le pôle « ${pole} ».`,
  tooShort: (min: number) => `Écrivez au moins ${min} caractères.`,
  tooLong: (max: number) => `Ce champ est limité à ${max} caractères.`,
  emailInvalid: "Saisissez une adresse email valide, par exemple nom@entreprise.com.",
  phoneInvalid:
    "Saisissez un numéro de téléphone valide, avec l’indicatif si possible (par exemple +221).",
  contactRequired:
    "Indiquez au moins un moyen de contact : une adresse email ou un numéro de téléphone.",
  contactInvalid:
    "Saisissez une adresse email ou un numéro de téléphone valide.",
  invalidChoice: "Ce choix n’est pas valide.",
} as const;

export const quoteForm = {
  title: "Formulaire de demande de devis",
  progressLabel: "Progression",
  steps: [
    { id: "besoin", title: "Votre besoin" },
    { id: "details", title: "Détails de la demande" },
    { id: "coordonnees", title: "Vos coordonnées" },
    { id: "recapitulatif", title: "Récapitulatif" },
  ],
  stepCounter: (current: number, total: number) => `Étape ${current} sur ${total}`,
  fields: {
    poles: {
      legend: "Quel pôle est concerné ?",
      hint: "Vous pouvez choisir les deux.",
    },
    prestations: {
      legend: (pole: string) => `Prestations souhaitées : ${pole}`,
      hint: "Plusieurs choix possibles.",
      other: { value: "autre", label: "Autre besoin (à préciser à l’étape suivante)" },
    },
    description: {
      label: "Description du besoin",
      hint: "Situation actuelle, résultat souhaité, contraintes de calendrier… N’indiquez aucun mot de passe.",
    },
    city: {
      label: "Ville d’intervention",
    },
    workstations: {
      legend: "Nombre approximatif de postes informatiques",
      options: [
        { value: "1-5", label: "1 à 5" },
        { value: "6-20", label: "6 à 20" },
        { value: "21-50", label: "21 à 50" },
        { value: "51-100", label: "51 à 100" },
        { value: "100+", label: "Plus de 100" },
        { value: "inconnu", label: "Je ne sais pas" },
      ] satisfies Option[],
    },
    infrastructure: {
      legend: "Disposez-vous déjà d’une infrastructure informatique ?",
      hint: "Serveurs, réseau, sauvegardes, logiciels…",
      options: [
        { value: "oui", label: "Oui" },
        { value: "non", label: "Non, tout est à mettre en place" },
        { value: "inconnu", label: "Je ne sais pas" },
      ] satisfies Option[],
    },
    premises: {
      legend: "Type de locaux",
      options: [
        { value: "bureaux", label: "Bureaux" },
        { value: "commerce", label: "Commerce ou agence" },
        { value: "enseignement", label: "Établissement d’enseignement" },
        { value: "industriel", label: "Entrepôt ou site industriel" },
        { value: "chantier", label: "Chantier ou site BTP" },
        { value: "residence", label: "Résidence ou domicile" },
        { value: "autre", label: "Autre" },
      ] satisfies Option[],
    },
    installation: {
      legend: "S’agit-il d’une installation nouvelle ou existante ?",
      options: [
        { value: "nouvelle", label: "Nouvelle installation" },
        {
          value: "existante",
          label: "Installation existante (extension, remplacement ou reprise)",
        },
        { value: "inconnu", label: "Je ne sais pas" },
      ] satisfies Option[],
    },
    name: { label: "Nom et prénom" },
    company: { label: "Entreprise ou organisation" },
    email: { label: "Email" },
    phone: { label: "Téléphone", hint: "Avec l’indicatif si possible, par exemple +221." },
    contactGroup: {
      legend: "Comment vous recontacter ?",
      hint: "Indiquez au moins un moyen de contact : email ou téléphone.",
    },
  },
  buttons: {
    next: "Continuer",
    back: "Retour",
    submit: "Envoyer ma demande",
    submitting: "Envoi en cours…",
    edit: "Modifier",
  },
  summary: {
    intro: "Vérifiez vos réponses avant l’envoi. Vous pouvez modifier chaque partie.",
    pricingNote:
      "Aucun tarif n’est calculé en ligne. Votre demande est étudiée avant tout chiffrage ; des précisions pourront vous être demandées.",
    notProvided: "Non renseigné",
    labels: {
      poles: "Pôles",
      prestations: "Prestations",
      description: "Description du besoin",
      city: "Ville d’intervention",
      workstations: "Nombre de postes",
      infrastructure: "Infrastructure existante",
      premises: "Type de locaux",
      installation: "Installation",
      name: "Nom",
      company: "Entreprise",
      email: "Email",
      phone: "Téléphone",
      contact: "Moyen de contact",
    },
  },
  success: {
    title: "Demande envoyée",
    text: "Votre demande a bien été transmise à AFRIGÉRANCE. Notre équipe prendra connaissance des éléments et vous contactera selon les modalités indiquées.",
    backHome: "Retour à l’accueil",
  },
  noscript:
    "Ce formulaire nécessite JavaScript. Activez-le dans votre navigateur pour envoyer une demande.",
} as const;

export const contactForm = {
  title: "Envoyer un message",
  fields: {
    name: { label: "Votre nom" },
    contact: {
      label: "Email ou téléphone",
      hint: "Nous vous répondrons par ce moyen.",
    },
    subject: { label: "Objet" },
    message: {
      label: "Message",
      hint: "N’indiquez aucun mot de passe ni donnée sensible.",
    },
  },
  buttons: {
    submit: "Envoyer le message",
    submitting: "Envoi en cours…",
    again: "Écrire un autre message",
  },
  success: {
    title: "Message envoyé",
    text: "Votre message a bien été transmis à AFRIGÉRANCE. Notre équipe en prendra connaissance et vous répondra par le moyen de contact indiqué.",
  },
  noscript:
    "Ce formulaire nécessite JavaScript. Activez-le dans votre navigateur pour envoyer un message.",
} as const;
