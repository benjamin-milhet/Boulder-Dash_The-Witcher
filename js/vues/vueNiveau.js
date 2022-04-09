export class VueNiveau {

    // Affiche le plateau de jeu avec le niveau donne en parametre et les informations de jeu
    afficherMap(niveau, nbDiamant, nbMouvement, nbNiveau, nbNiveauTotal) {

            let affichageNbDiamant = document.getElementById("nbDiamant"); // On recupere l'element HTML qui affiche le nombre de diamant collecte
            affichageNbDiamant.innerHTML = nbDiamant; // On actualise le nombre de diamant collecte

            let affichageNbMouvement = document.getElementById("nbMouvement"); // On recupere l'element HTML qui affiche le nombre de mouvement effectuer
            affichageNbMouvement.innerHTML = nbMouvement; // On actualise le nombre de mouvement effectuer
            
            let affichageNbNiveau = document.getElementById("nbNiveau"); // On recupere l'element HTML qui affiche le niveau actuel
            affichageNbNiveau.innerHTML = "Niveau numero : " + (nbNiveau+1) + "/" + nbNiveauTotal; // On actualise le niveau actuel
            
            let emplacement = document.querySelector("playground"); // On recupere l'element HTML qui contient le plateau de jeu

            niveau.forEach((element) => { // On parcourt chaque ligne du plateau de jeu
                let div = document.createElement("div"); // On cree une div qui va contenir la ligne
                div.className = "ligne"; // On lui donne la classe ligne

                element.forEach((donne) => { // On parcourt chaque case de la ligne
                    let minidiv = document.createElement("div"); // On cree une div qui va contenir la case
                    let img = document.createElement("img"); // On cree une image qui sera dans la case

                    minidiv.className = "case"; // On lui donne la classe case
                    minidiv.style.display = 'inline-block'; // On lui donne la propriete display
                    img.className = "imgCase"; // On lui donne la classe imgCase

                    if (donne != "V") img.src = '../images/' + donne + '.png'; // On lui donne l'image correspondante

                    minidiv.appendChild(img); // On ajoute l'image dans la case
                    div.appendChild(minidiv); // On ajoute la case dans la ligne

                });

                emplacement.appendChild(div); // On ajoute la ligne dans le plateau de jeu
        });
    }

    // Supprime le plateau de jeu
    clearMap() {
        let jeux = document.querySelector("playground"); // On recupere l'element HTML qui contient le plateau de jeu
        jeux.innerHTML = ""; // On vide le plateau de jeu
    }

    // Affiche un message dans une popup
    afficherPopUp(message) {
        let popUp = document.getElementById("popUp"); // On recupere l'element HTML qui contient la popup
        popUp.innerHTML = message; // On attribue le message dans la popup

        let btn = document.createElement("button"); // On cree un bouton
        btn.id = "btnDelete"; // On lui donne l'id btnDelete
        btn.innerHTML = "OK"; // On lui donne le texte "OK"
        btn.style.marginTop = "2vh"; // On lui donne la propriete marginTop

        popUp.appendChild(btn); // On ajoute le bouton dans la popup

        popUp.style.display = "block"; // On affiche la popup

    }

    // Supprime la popup
    clearPopUp() {
        let popUp = document.getElementById("popUp"); // On recupere l'element HTML qui contient la popup
        popUp.innerHTML = ""; // On vide la popup
        popUp.style.display = "none"; // On cache la popup
    }

}