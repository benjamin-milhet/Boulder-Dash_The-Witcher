import { ControleurLocalStorage }  from "./controleurLocalStorage.js"; // Permet de manipuler le localStorage
import { ControleurNiveau }  from "./controleurNiveau.js"; // Permet de manipuler le niveau
import { VueNiveau }  from "../vues/vueNiveau.js"; // Permet d'afficher le niveau en cours

export class Game{
    constructor(listMap) {
        this.listMap = listMap;
        this.vueNiveau = new VueNiveau();
        this.localStorage = new ControleurLocalStorage();
        this.gestionMouvement();
    }

    // Action realiser lorsque le joueur commence une nouvelle partie
    start() {
        this.niveauEnCours = 0; // Initialisation du niveau en cours a 0 -> Nouvelle partie
        this.genererNiveau(); // Génération du niveau
        this.afficherMap(); // Affichage du niveau
    }

    // Action realiser lorsque le joueur veut reprendre une partie en cours
    reprendre() {
        // S'il n'y a pas toutes les informations dans le localStorage, alors on lance une nouvelle partie
        if(this.localStorage.getFromLocalStorage("niveauEnCours") === null || this.localStorage.getFromLocalStorage("save") === null || this.localStorage.getFromLocalStorage("nbMouvement") === null || this.localStorage.getFromLocalStorage("nbDiamant") === null){
            alert("Vous n'avez pas encore de partie sauvegardée, nous vous en avons créé une par défaut !"); // Message d'information pour prevenir l'utilisateur qu'il n'a pas de partie sauvegardée
            this.start(); // Lancement d'une nouvelle partie
        } else { // Sinon on lance la partie en cours
            this.niveauEnCours = this.localStorage.getFromLocalStorage("niveauEnCours"); // Récupération de l'index du niveau en cours
            this.niveau = new ControleurNiveau(this.localStorage.getFromLocalStorage("save")); // Récupération du niveau en cours
            this.niveau.setNbDeplacement(this.localStorage.getFromLocalStorage("nbMouvement")); // Récupération du nombre de mouvement
            this.niveau.setNbDiamant(this.localStorage.getFromLocalStorage("nbDiamant")); // Récupération du nombre de diamant collectes
            this.niveau.setAffichageNbDiamantRestant(this.localStorage.getFromLocalStorage("nbDiamant")); // Affichage du nombre de diamant restant
            this.afficherMap(); // Affichage du niveau
        }
    }

    // Affiche le niveau en cours
    afficherMap() {
        this.niveau.verifierPosRocher();
        this.vueNiveau.afficherMap(this.niveau.getMap(), this.niveau.getNbDiamant(), this.niveau.getNbDeplacement(), this.niveauEnCours, this.listMap.size); // Affichage du niveau en cours
    }

    // Permet de supprimer l'affichage du niveau en cours
    clearMap() {
        this.vueNiveau.clearMap(); // Suppression de l'affichage du niveau en cours
    }

    // Permet d'instancier l'evenement de la recuperation des touches du clavier
    gestionMouvement() {
        document.addEventListener("keyup", (event) => { // Evenement de la recuperation des touches du clavier (Le keyup est voulu pour ne pas risquer d'appuyer 2 fois sur une touche)
           this.reactionMouvement(event); // Action realiser lorsque le joueur appuie sur une touche du clavier
        }); 
    }

    // Action a realiser suivant les touches du clavier appuyer et leur consequence
    reactionMouvement(event) {
        if(this.niveau.getPositionHero() != 0){ // Si le joueur n'est plus dans le niveau
            let value = this.niveau.deplacerHero(event.key); // Action realiser lorsque le joueur appuie sur une touche du clavier
            this.clearMap(); // Suppression de l'affichage du niveau en cours
            this.afficherMap() // Affichage du niveau en cours actualise
            if(value.length == 0) this.endGame(); // Si le joueur n'est plus dans le niveau, alors on lance la fin de la partie
        }

        if(this.niveau.getNbDiamantMap() == 0) { // Si le joueur a recuperer tous les diamants
            this.gagner(); // Action realiser lorsque le joueur a recuperer tous les diamants
        }
    }

    // Permet de generer un nouveau niveau
    genererNiveau() {
        let map = Array.from(this.listMap); // Conversion de la Map en tableau
        let copyArray = this.copyArray(Array.from(map[this.niveauEnCours][1])); // Copie du tableau de la Map
        this.niveau = new ControleurNiveau(copyArray); // Instanciation du niveau
    }

    // Action a realiser lorsque le personnage est mort
    endGame() {
        this.vueNiveau.afficherPopUp("Vous avez perdu !"); // Affichage du message de fin de partie
        let btnDelete = document.getElementById("btnDelete"); // Recuperation du bouton de suppression du message de fin de partie
        btnDelete.onclick = () => { // Action realiser lorsque le bouton est clique
            this.vueNiveau.clearPopUp(); // Suppression du message de fin de partie
            this.genererNiveau(); // Regeneration du niveau
            this.clearMap(); // Suppression de l'affichage du niveau en cours
            this.afficherMap(); // Affichage du niveau en cours actualise
        }
    }

    // Action a realiser lorsque le joueur a cliquer sur le bouton rejouer
    rejouer() {
        if (confirm("Voulez-vous rejouer ce niveau?")) { // Confirmation pour rejouer
            this.genererNiveau(); // Regeneration du niveau
            this.clearMap(); // Suppression de l'affichage du niveau en cours
            this.afficherMap(); // Affichage du niveau en cours actualise
        } 
    }

    // Action a realiser lorsque le jouer a collecter tous les diamants
    gagner() {        
        this.vueNiveau.afficherPopUp("Vous avez termine ce niveau en " + this.niveau.getNbDeplacement() + " mouvements !"); // Affichage du message de fin de partie
        let btnNextNiveau = document.getElementById("btnDelete"); // Recuperation du bouton de suppression du message de fin de partie
        if (this.niveau.getPositionHero().length != 0) this.niveau.removeCase(this.niveau.getPositionHero()[0], this.niveau.getPositionHero()[1]); // Suppression de la case du hero pour eviter les deplacements lors de la fin de partie

        btnNextNiveau.onclick = () => { // Action realiser lorsque le bouton est clique
            this.vueNiveau.clearPopUp(); // Suppression du message de fin de partie
            this.niveauEnCours++; // Incrementation du niveau en cours

            if(this.niveauEnCours >= this.listMap.size){ // Si le niveau en cours est le dernier niveau
                this.localStorage.deleteSaveMapinLocalStorage(); // Suppression de la sauvegarde du niveau
                document.location.href=".././index.html"; // Redirection vers la page d'accueil
            } else { // Sinon
                this.genererNiveau(); // Generation du prochain niveau
                this.clearMap(); // Suppression de l'affichage du niveau en cours
                this.afficherMap(); // Affichage du niveau en cours actualise
            }
        }
    }

    // Permet de dupliquer un tableau
    copyArray(array) {
        let newArray = []; // Nouveau tableau a retourner
        for (let i = 0; i < array.length; i++) { // Parcours du tableau donne en parametre
            newArray[i] = []; // Creation d'une nouvelle ligne dans le tableau
            for (let j = 0; j < array[i].length; j++) { // Parcours de la ligne du tableau donne en parametre
                newArray[i][j] = array[i][j]; // Copie de la valeur de la case dans la nouvelle ligne
            }
        }
        return newArray; // Retourne le nouveau tableau
    }

    // Lors du retour au menu, permet de sauvegarder le niveau en cours dans le localStorage
    save() {
        this.localStorage.addLocalStorage("niveauEnCours", this.niveauEnCours); // Sauvegarde l'index du niveau en cours
        this.localStorage.addLocalStorage("save", this.niveau.getMap()); // Sauvegarde le niveau en cours
        this.localStorage.addLocalStorage("nbMouvement", this.niveau.getNbDeplacement()); // Sauvegarde le nombre de mouvement du joueur
        this.localStorage.addLocalStorage("nbDiamant", this.niveau.getNbDiamant()); // Sauvegarde le nombre de diamant du joueur
    }
}

let partie = 0; // Variable globale qui contient l'instance de la partie

// Initialisation du script lorsque la page est charge
window.onload = () => {
    let controleurLocalStorage = new ControleurLocalStorage(); // Instanciation du controleur localStorage
    let listMap = controleurLocalStorage.getFromLocalStorage("maps"); // Recuperation de la liste des niveaux depuis le localStorage

    partie = new Game(listMap); // Instanciation de la partie
    if(getParametersURL() == "start") partie.start(); // Si on veut commencer une partie, initialisation 'une nouvelle partie
    else if(getParametersURL() == "reprendre") partie.reprendre(); // Si on veut reprendre une partie, initialisation 'reprendre partie'
    else document.location.href=".././index.html";  // Sinon, redirection vers la page d'accueil
};

// Evenement lorsque le joueur clique sur le bouton rejouer
document.getElementById("rejouer").onclick = function () {
    partie.rejouer() // Le niveau est recommence depuis le debut
}

// Evenement lorsque le joueur clique sur le bouton menu
document.getElementById("menu").onclick = function () {
    if (confirm("Voulez-vous retourner au menu?")) { // Confirmation pour revenir au menu
        partie.save(); // Sauvegarde du niveau en cours
        document.location.href=".././index.html"; // Redirection vers la page d'accueil
      }
}

// Permet de recuperer le premier parametre de l'URL
function getParametersURL() {
    let url = new URL(document.location.href); // Recuperation de l'URL
    let params = new URLSearchParams(url.search); // Recuperation des parametres de l'URL
    return params.get("game"); // Retourne le premier parametre de l'URL
}



