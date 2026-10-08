export type RoutineProfile = "homme" | "femme";
export function routineDay(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}
export function createRoutine(profile: RoutineProfile, minutes: 10 | 20 | 40) {
  const reading = minutes === 10 ? 4 : minutes === 20 ? 8 : 18;
  const learning = minutes === 10 ? 3 : minutes === 20 ? 6 : 12;
  return [
    { id: "coran", title: "Lire et comprendre", moment: "Au début de votre journée", minutes: reading, text: "Choisissez une courte portion du Coran et lisez son sens. Reprenez à votre dernier verset, sans objectif de quantité imposé.", href: "/coran", action: "Choisir ma lecture" },
    { id: "apprendre", title: "Apprendre un repère", moment: "Dans un moment calme", minutes: learning, text: "Découvrez un épisode de la Sîra ou une fiche biographique. Notez une idée à retenir et retrouvez sa référence.", href: profile === "femme" ? "/compagnons/khadija-bint-khuwaylid" : "/compagnons/abu-bakr-as-siddiq", action: "Lire ma fiche" },
    { id: "invocations", title: "Invoquer avec attention", moment: "Quand vous en ressentez le besoin", minutes: minutes === 40 ? 5 : minutes === 20 ? 3 : 1, text: "Choisissez une invocation référencée et prenez connaissance de son sens et de son contexte. Suivez les indications de la fiche lorsqu’un moment ou un nombre est établi.", href: "/invocations", action: "Consulter les invocations" },
    { id: "bilan", title: "Un geste et un bilan", moment: "Avant de terminer la journée", minutes: minutes === 40 ? 5 : minutes === 20 ? 3 : 2, text: "Rendez un service, préservez un lien familial ou prenez le temps d’écouter quelqu’un. Puis notez ce que vous souhaitez poursuivre demain.", href: "/apprendre", action: "Explorer les leçons" },
  ];
}
