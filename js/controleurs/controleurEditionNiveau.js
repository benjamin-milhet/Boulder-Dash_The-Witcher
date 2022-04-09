import { ControleurLocalStorage }  from "./controleurLocalStorage.js"; // Permet de manipuler le localStorage 
import { VueEditionNiveau }  from "../vues/vueEditionNiveau.js"; // Vue qui affichage l'interface de gestion des niveaux

let controleurLocalStorage = new ControleurLocalStorage();
let vueEditionNiveau = new VueEditionNiveau();

// Initialisation du controleur en affichant l'ensemble des niveaux disponibles
window.onload = function () {
    let maps = controleurLocalStorage.getFromLocalStorage("maps"); // On recupere l'ensemble des niveaux
    if(maps == null) maps = []; // S'il est vide, on initialise un nouveau tableau vide
    vueEditionNiveau.clearOrdre(); // On efface l'affichge des niveaux
    vueEditionNiveau.afficherNiveuxFromMaps(getNomMapFromMaps(maps)); // On reaffiche l'ensemble des niveaux actualises
    afficherNomNouveauNiveau();  // On actualise le nom du nouveau niveau 
    gestionDeleteNiveau(); // On actualise la gestion des niveaux
    flecheHautNiveau(); // On actualise l'evenement de changement de niveau vers le haut
    flecheBasNiveau(); // On actualise l'evenement de changement de niveau vers le bas
    
}

// Permet de charger un nouveau niveau lors de l'importation d'un fichier
document.getElementById("charger").onclick = function () {
    if (document.getElementById("file").files[0]) { // On verifie si un fichier a ete selectionne  
        if (!nomIsExist(document.getElementById("nom").value)) { // On verifie si le nom du niveau existe deja
            getContentFromFile(document.getElementById("nom").value, document.getElementById("file")); // On recupere le contenu du fichier
        } else { // Sinon
            alert("Ce nom de niveau existe deja !"); // On affiche un message indiquant que le niveau existe deja
        }
    }
}

// Evenement permettant de revenir au menu
document.getElementById("menu").onclick = function () {
    if (confirm("Voulez-vous retourner au menu?")) { // On demande confirmation a l'utilisateur avant de revenir au menu
        document.location.href=".././index.html"; // Redirection de lien pour revenir au menu
    }
}

document.getElementById("reset").onclick = function () {
    if (confirm("Voulez-vous reinitialier les niveaux ?")) {
        let mapMap = new Map(); // Initialisation de la map des niveaux

        // Ajout des niveaux dans la map
        mapMap.set("Niveau facile", listMap[0]); 
        mapMap.set("Niveau moyen", listMap[1]);
        mapMap.set("Niveau difficile", listMap[2]);

        controleurLocalStorage.addLocalStorage("maps", mapMap); // On ajoute la nouvelle Map dans le localStorage

        let maps = controleurLocalStorage.getFromLocalStorage("maps"); // On recupere l'ensemble des niveaux
        if(maps == null) maps = []; // S'il est vide, on initialise un nouveau tableau vide

        refresh(maps); // On recharge l'affichage des niveaux
    }
}

// Permet de supprimer un niveau
function gestionDeleteNiveau() {
    let listImg = document.getElementsByClassName("btnDelete"); // On recupere toutes les boutons de suppression de niveau

    for(let i = 0; i < listImg.length; i++){ // Pour chaque bouton de suppression de niveau
        listImg[i].onclick = () => { // On instancie l'evenement de suppression de niveau
            if(confirm("Voulez-vous supprimer ce niveau?")) { // On demande confirmation a l'utilisateur avant de supprimer le niveau
                controleurLocalStorage.deleteMapToMapsInLocalStorage(listImg[i].value); // On supprime le niveau dans le localStorage
                let maps = controleurLocalStorage.getFromLocalStorage("maps"); // On recupere l'ensemble des niveaux depuis le localStorage
                if(maps == null) maps = []; // S'il est vide, on initialise un nouveau tableau vide
                vueEditionNiveau.clearOrdre(); // On efface l'affichge des niveaux
                refresh(maps); // On recharge l'affichage des niveaux
            }
        }
    }
}

// Permet de changer l'ordre d'un niveau vers le haut
function flecheHautNiveau() {
    let listNiveau = document.getElementsByClassName("flecheHaut"); // On recupere toutes les fleches de changement d'ordre vers le haut

    for(let i = 0; i < listNiveau.length; i++){ // Pour chaque fleche de changement d'ordre vers le haut
        listNiveau[i].onclick = () => { // On instancie l'evenement de changement d'ordre vers le haut
            let key1 = listNiveau[i].value; // On recupere la clef du niveau
            let maps = controleurLocalStorage.getFromLocalStorage("maps"); // On recupere l'ensemble des niveaux depuis le localStorage
            let index = Array.from(maps.keys()).findIndex(key => key == listNiveau[i].value); // On recupere l'index du niveau dans le tableau
            let key2 = Array.from(maps.keys())[index-1]; // On recupere la clef du niveau precedent
            let newMap = newMapFromMap(maps, key1, key2); // On recupere la nouvelle map avec le changement d'ordre
            controleurLocalStorage.addLocalStorage("maps", newMap); // On ajoute le nouveau tableau dans le localStorage
            refresh(newMap); // On recharge l'affichage des niveaux
        }
    }
}

// Permet de changer l'ordre d'un niveau vers le bas
function flecheBasNiveau() {
    let listNiveau = document.getElementsByClassName("flecheBas"); // On recupere toutes les fleches de changement d'ordre vers le bas

    for(let i = 0; i < listNiveau.length; i++){ // Pour chaque fleche de changement d'ordre vers le bas
        listNiveau[i].onclick = () => { // On instancie l'evenement de changement d'ordre vers le bas
            let key1 = listNiveau[i].value; // On recupere la clef du niveau
            let maps = controleurLocalStorage.getFromLocalStorage("maps"); // On recupere l'ensemble des niveaux depuis le localStorage
            let index = Array.from(maps.keys()).findIndex(key => key == listNiveau[i].value); // On recupere l'index du niveau dans le tableau
            let key2 = Array.from(maps.keys())[index+1]; // On recupere la clef du niveau suivant
            let newMap = newMapFromMap(maps, key1, key2); // On recupere la nouvelle map avec le changement d'ordre
            controleurLocalStorage.addLocalStorage("maps", newMap); // On ajoute le nouveau tableau dans le localStorage
            refresh(newMap); // On recharge l'affichage des niveaux

        }
    }
}

// Permet de changer l'ordre d'un niveau
function newMapFromMap(maps, index1, index2) {
    let newMap = new Map(); // On initialise la nouvelle map
    let value1 = maps.get(index1); // On recupere les valeurs du niveau 1
    let value2 = maps.get(index2); // On recupere les valeurs du niveau 2
    for(let [key, value] of maps){ // Pour chaque valeur de la map
        if(key == index1){ // Si la clef est egale a l'index 1
            newMap.set(index2, value2); // On ajoute l'index 2 avec la valeur du niveau 2
        }
        else if(key == index2){ // Si la clef est egale a l'index 2
            newMap.set(index1, value1); // On ajoute l'index 1 avec la valeur du niveau 1
        }
        else{ // Sinon
            newMap.set(key, value); // On ajoute la clef et la valeur de la map
        }
    }

    return newMap; // On retourne la nouvelle map

}

// Permet d'actualiser le nom du nouveau niveau
function afficherNomNouveauNiveau() {
    document.getElementById("nom").value = "Niveau importe " + (controleurLocalStorage.getNbKeyFromLocalStorage("maps")+1); // On actualise le nom du nouveau niveau
}

// Permet de lire le cotenu d'un fichier
function getContentFromFile(name, file) {
    let reader = new FileReader(); // On instancie un objet FileReader qui permet de lire un fichier
    reader.readAsText(file.files[0]); // On lance la lecture du fichier

    reader.onload = function () { // On attend que la lecture du fichier soit terminer
        let recupData = convertirDataToArray(reader.result); // On recupere le contenu du fichier
        if (verificationContenuFile(recupData)) { // Si le contenu du fichier est valide
            controleurLocalStorage.addMapToMapsInLocalStorage(name, recupData); // On ajoute le niveau dans le localStorage
            vueEditionNiveau.clearOrdre(); // On efface l'affichge des niveaux
            let maps = controleurLocalStorage.getFromLocalStorage("maps"); // 
            refresh(maps); // On actualise l'affichage des niveaux
        } else {
            alert("Le fichier importe comporte des characteres invalides !"); // On affiche un message d'erreur
        }
        
    }
}


// Permet de convertir les donnes du fichier en un tableau de string a deux dimensions
function convertirDataToArray(data) {
    let res = []; // On initialise un tableau vide
    let lignes = data.split("\n"); // On recupere toutes les lignes du fichier

    lignes.forEach(ligne => { // Pour chaque ligne du fichier
        let ligneATraiter = ligne.split(""); // On recupere toutes les lettres de la ligne
        if(ligneATraiter[ligneATraiter.length-1] == "\r") ligneATraiter.pop(); // Si la derniere lettre est un retour a la ligne, on la supprime
        res.push(ligneATraiter); // On ajoute la ligne a notre tableau
    });
    return res; // On retourne le tableau du niveau
}

//Retourne un tableau contenant le nom de toutes les maps
function getNomMapFromMaps(maps) {
    let resMap = []; // On initialise un tableau vide
    let listMap = Array.from(maps); // On convertit la Map en ArrayList

    listMap.forEach(element => { // Pour chaque element de la liste
        resMap.push(element[0]); // On ajoute le nom de la map a notre tableau
    }
    );
    return resMap; // On retourne le tableau des noms des maps
}

// Permet de savoir si un nom de niveau est deja utilise
function nomIsExist(nom) {
    let maps = controleurLocalStorage.getFromLocalStorage("maps"); // On recupere l'ensemble des niveaux depuis le localStorage
    let listMap = Array.from(maps.keys()); // On convertit la Map en ArrayList
    return listMap.includes(nom); // On retourne true si le nom existe, false sinon
}

// Permet de reinitialiser les niveaux afficher
function refresh(maps) {
    vueEditionNiveau.clearOrdre(); // On efface l'affichge des niveaux
    vueEditionNiveau.afficherNiveuxFromMaps(getNomMapFromMaps(maps)); // On reaffiche l'ensemble des niveaux actualises
    controleurLocalStorage.deleteSaveMapinLocalStorage(); // On efface le niveau sauvegarde dans le localStorage
    afficherNomNouveauNiveau();  // On actualise le nom du nouveau niveau 
    gestionDeleteNiveau(); // On actualise la gestion des niveaux
    flecheHautNiveau(); // On actualise l'evenement de changement de niveau vers le haut
    flecheBasNiveau(); // On actualise l'evenement de changement de niveau vers le bas
}

// Permet de verifier si le niveau est valide
function verificationContenuFile(data) {
    for(let i = 0; i < data.length; i++) { // On parcours la liste des lignes du fichier
        for(let j = 0; j < data[i].length; j++) { // On parcours la liste des cases de la ligne
            if(data[i][j] != "R" && data[i][j] != "P" && data[i][j] != "M" && data[i][j] != "V" && data[i][j] != "T" && data[i][j] != "D") { // Si la case n'est pas une case valide
                return false; // On retourne false
            }
        }
    }
    return true; // Sinon on retourne true
}



