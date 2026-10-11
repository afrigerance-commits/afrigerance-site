import type { LearningQuestion } from "@/lib/types/content";
const q=(question:string,options:string[],answer:number,explanation:string):LearningQuestion=>({question,options,answer,explanation});
/** Exercices de compréhension fondés uniquement sur les leçons déjà documentées. */
export const learningPractice:Record<string,LearningQuestion[]>={
 "louange-et-misericorde":[
  q("Vous cherchez le thème du verset 4. Quel repère choisir ?",["Le Jour de la rétribution","Un nombre de répétitions","Une règle sur les dettes"],0,"Le verset 4 mentionne le Jour de la rétribution ; voir Coran 1:4."),
  q("Avant de partager une phrase française du verset, que faut-il noter ?",["Seulement le nom de l’application","Le traducteur et la référence du verset","Le récitateur de l’audio uniquement"],1,"Une traduction du sens reste identifiée par son traducteur et le passage concerné."),
  q("Cette leçon suffit-elle à épuiser le tafsîr d’Al-Fâtiha ?",["Oui, tous les commentaires sont identiques","Oui, les thèmes remplacent le texte","Non, elle propose des repères de lecture"],2,"La leçon accompagne la lecture ; elle ne se présente pas comme un tafsîr exhaustif.")],
 "adoration-et-guidance":[
  q("Quel verset associe l’adoration et la demande d’aide ?",["Le verset 5","Le verset 1 uniquement","Aucun"],0,"Ce sont les deux membres du verset 5 dans le passage étudié."),
  q("Un lecteur isole le verset 6 pour expliquer le chemin demandé. Quel conseil lui donner ?",["Ignorer les versets voisins","Lire aussi le verset 7 qui complète le passage","Remplacer le verset par un commentaire"],1,"Lire ensemble Coran 1:6–7 conserve l’enchaînement du passage."),
  q("Vous résumez l’enchaînement de la sourate. Comment nommer votre texte ?",["Une nouvelle traduction autorisée","Un hadith","Un résumé pédagogique distinct du Coran"],2,"Une reformulation de lecture n’est pas le texte coranique.")],
 "lire-ecouter-et-comparer":[
  q("Vous écoutez une sourate entière non découpée. Peut-on promettre un alignement exact avec chaque verset ?",["Non, le découpage ne le permet pas","Oui, sans aucune vérification","Oui, quel que soit l’enregistrement"],0,"La synchronisation par verset demande un enregistrement adapté."),
  q("Quel outil permet de retrouver une position de lecture ?",["Le nom du récitateur","Un signet","Le choix du thème sombre"],1,"Le signet est un repère ; il ne corrige pas la prononciation."),
  q("Qui peut aider à vérifier une prononciation difficile ?",["La couleur seule","Le compteur de pages","Un enseignant compétent"],2,"L’écoute et les outils de l’application accompagnent le travail ; ils ne remplacent pas une vérification par un enseignant.")],
 "intention-et-remboursement":[
  q("Quel recueil et numéro fondent cette leçon ?",["Al-Bukhârî 2387","Muslim 1054","Al-Bukhârî 1470"],0,"La référence consultée pour l’intention de rendre l’argent est Al-Bukhârî 2387."),
  q("Un résumé promet l’effacement automatique de toute dette. Respecte-t-il la leçon ?",["Oui, cette promesse est chiffrée","Non, il ajoute une garantie que la leçon ne donne pas","Oui, si le résumé est court"],1,"L’aide mentionnée et l’intention sincère ne doivent pas devenir une garantie financière inventée."),
  q("Pour retrouver le hadith après l’avoir partagé, que garder ?",["Uniquement une image","Une formule sans auteur","Le recueil et son numéro"],2,"La référence précise permet de consulter le texte et sa source.")],
 "capacite-et-difficulte":[
  q("Une personne possède les moyens de payer mais reporte volontairement. Quel texte étudier ?",["Al-Bukhârî 2400","Une promesse de richesse rapide","Le sommaire de la bibliothèque"],0,"Al-Bukhârî 2400 traite du retard du débiteur capable de payer."),
  q("Votre résumé assimile tout débiteur pauvre à celui qui retarde injustement. Quel est le problème ?",["Il est trop court","Il efface la distinction entre capacité et difficulté","Il cite deux recueils"],1,"La leçon distingue le retard injuste de la difficulté réelle, en rapprochant deux références distinctes."),
  q("Comment présenter la comparaison entre les deux hadiths ?",["Comme une troisième parole prophétique","Comme une citation unique","Comme une explication pédagogique avec deux références"],2,"La comparaison est un commentaire ; les textes et leurs références restent séparés.")],
 "richesse-et-contentement":[
  q("Le hadith Al-Bukhârî 6446 fixe-t-il un montant définissant la richesse ?",["Non","Oui, pour chaque lecteur","Oui, dans une monnaie précise"],0,"Le contraste porte sur les biens et la richesse de l’âme, sans seuil monétaire."),
  q("Une publication affirme que toute personne aisée manque de contentement. Que vérifier ?",["Sa couleur de fond","Cette généralisation n’est pas donnée par le texte étudié","Son nombre de partages"],1,"La leçon écarte ce jugement général ajouté au hadith."),
  q("Quel exemple respecte la portée du commentaire ?",["Cette lecture garantit un revenu","Toutes les personnes riches sont condamnées","Le propos met en valeur le contentement intérieur"],2,"C’est un résumé pédagogique du thème, sans montant ni promesse financière.")],
 "texte-traduction-commentaire":[
  q("Vous reformulez une explication en vos mots. Quel intitulé convient ?",["Commentaire personnel ou résumé","Texte arabe original","Citation exacte"],0,"La reformulation doit rester distincte de la citation."),
  q("Une traduction française du Coran constitue-t-elle le texte arabe original ?",["Oui","Non, elle rend le sens dans une autre langue","Oui, si elle est dans une application"],1,"L’origine et le type de texte doivent être identifiés."),
  q("Avant de copier un passage, quel contrôle aide le lecteur ?",["Le nombre d’animations","La popularité de la capture","Le type de texte et sa référence"],2,"Identifier citation, traduction et commentaire évite de les confondre.")],
 "auteur-edition-reference":[
  q("Deux éditions ont des paginations différentes. Comment citer précisément ?",["Nommer l’édition et la page consultée","Garder seulement le numéro de page","Choisir la page la plus courte"],0,"La référence bibliographique permet de retrouver le passage dans l’exemplaire concerné."),
  q("Deux numéros de hadith semblent différents. Que faire en premier ?",["Déclarer la citation fausse","Comparer les textes et les systèmes de numérotation","Supprimer le recueil"],1,"Les numérotations peuvent varier ; comparer les références évite une conclusion hâtive."),
  q("Quelle information une notice seule prouve-t-elle ?",["Que le PDF est distribué","Que toutes les traductions sont identiques","Qu’un ouvrage est identifié avec les renseignements disponibles"],2,"Une notice bibliographique ne donne pas automatiquement accès au texte intégral.")],
 "authenticite-et-disponibilite":[
  q("Un fichier est téléchargeable sur un groupe de discussion. Cela valide-t-il toutes ses attributions ?",["Non","Oui, automatiquement","Oui, si son titre est connu"],0,"Disponibilité du fichier et vérification du contenu sont deux questions distinctes."),
  q("Quelle information concerne la narration d’un hadith ?",["La taille du fichier","Son degré d’authenticité","La couleur de sa couverture"],1,"Le degré d’authenticité concerne la narration ; le statut éditorial et les droits concernent d’autres questions."),
  q("Une fiche authentique ne précise pas un moment imposé. Peut-on en ajouter un sans preuve ?",["Oui, pour embellir la fiche","Oui, si un groupe le partage","Non, cet ajout demande sa propre source"],2,"La leçon demande une preuve distincte pour les précisions ajoutées au texte transmis.")]
};
