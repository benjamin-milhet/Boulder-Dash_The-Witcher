import { ControleurLocalStorage } from "./controleurLocalStorage.js"; // Permet de manipuler le localStorage 

// Permet de lancer le jeu avec le premier niveau
document.getElementById("jouer").onclick = function (){
    document.location.href="./html/game.html?game=start"; // Redirection de lien vers l'interface de jeu
}

// Permet de lancer le jeu avec un niveau pré-enregistré dans le localStorage
document.getElementById("reprendre").onclick = function (){
    document.location.href="./html/game.html?game=reprendre"; // Redirection de lien vers l'interface de jeu
}

// Permet de lancer l'interface d'édition de niveau
document.getElementById("edition").onclick = function (){
    document.location.href="./html/editionNiveau.html"; // Redirection de lien vers l'interface d'édition de niveau
}

// Initialisation des variables
window.onload = () => {
    let controleurlocalStorage = new ControleurLocalStorage(); // Initialisation du controleur du localStorage
    let mapMap = new Map(); // Initialisation de la map des niveaux

    // Ajout des niveaux dans la map
    mapMap.set("Niveau facile", listMap[0]); 
    mapMap.set("Niveau moyen", listMap[1]);
    mapMap.set("Niveau difficile", listMap[2]);

    // Ajout de la map dans le localStorage si elle n'existe pas ou si elle est vide
    if(controleurlocalStorage.isExistInLocalStorage("maps") || controleurlocalStorage.getNbKeyFromLocalStorage("maps") == 0) controleurlocalStorage.addLocalStorage("maps", mapMap);
}

let titre = document.getElementById("titre"); // Récupération de la balise ayant pour id : titre
let soustitre = document.getElementById("sous-titre"); // Récupération de la balise ayant pour id : sous-titre

setInterval(() => { // Fonction qui permet de changer les couleurs du titre et du sous-titre
    titre.style.color = "rgb("+getRandomInt(254)+","+getRandomInt(254)+","+getRandomInt(254)+")"; // Changement de la couleur du titre
    soustitre.style.color = "rgb("+getRandomInt(254)+","+getRandomInt(254)+","+getRandomInt(254)+")"; // Changement de la couleur du sous-titre
}, 300); // Interval de changement de couleur de 300ms

// Fonction qui permet de générer un nombre aléatoire entre 0 et max
function getRandomInt(max) {
    return Math.floor(Math.random() * max); // Retourne un nombre aléatoire entre 0 et max
  }
