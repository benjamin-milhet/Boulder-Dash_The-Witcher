export class VueEditionNiveau {

    //Affiche sur la page html le l'ensemble des map contenu dans la maps
    afficherNiveuxFromMaps(maps) {
        let emplacement = document.querySelector("ordre"); // On recupere la balise contenant les niveaux disponibles
        let compteur = 0; // On initialise un compteur pour savoir si on est sur le premier ou dernier element de la liste


        maps.forEach(element => { // Pour chaque element de la liste
            let div = document.createElement("div"); // On cree une balise div
            div.className = "ligne"; // On lui donne la classe ligne

            let nom = document.createElement("p"); // On cree une balise p
            nom.innerHTML = element; // On lui donne le nom du niveau
            nom.className = "nomNiveau"; // On lui donne la classe nomNiveau

            let btnDelete = document.createElement("button"); // On cree une balise button
            btnDelete.classList.add("btnDelete"); // On lui donne la classe btnDelete
            btnDelete.classList.add("btnEdit"); // On lui donne la classe btnEdit
            if (compteur == 0 && compteur == maps.length - 1) btnDelete.classList.add("leftCenter"); // Si on est sur le premier ou dernier element de la liste, on lui donne la classe leftCenter
            btnDelete.value = element; // On lui donne la valeur de l'element

            let imgDelete = document.createElement("img"); // On cree une balise img
            imgDelete.src = '../images/delete.png'; // On lui donne l'image delete.png
            imgDelete.className = "imgEdit"; // On lui donne la classe imgEdit

            div.appendChild(nom); // On ajoute le nom du niveau dans la balise div


            if (compteur != 0) { // Si on n'est pas sur le premier element de la liste
                let flecheHaut = document.createElement("button"); // On cree une balise button
                flecheHaut.classList.add("flecheHaut"); // On lui donne la classe flecheHaut
                flecheHaut.classList.add("btnEdit"); // On lui donne la classe btnEdit
                flecheHaut.classList.add("leftCenter"); // On lui donne la classe leftCenter
                flecheHaut.value = element; // On lui donne la valeur de l'element

                let imgFlecheHaut = document.createElement("img") // On cree une balise img
                imgFlecheHaut.src = '../images/flecheHaut.png'; // On lui donne l'image flecheHaut.png
                imgFlecheHaut.className = "imgEdit"; // On lui donne la classe imgEdit

                flecheHaut.appendChild(imgFlecheHaut); // On ajoute l'image flecheHaut.png dans la balise button
                div.appendChild(flecheHaut); // On ajoute la balise button dans la balise div

            }

            if (compteur != maps.length - 1) { // Si on n'est pas sur le dernier element de la liste
                let flecheBas = document.createElement("button"); // On cree une balise button
                flecheBas.classList.add("flecheBas"); // On lui donne la classe flecheBas
                flecheBas.classList.add("btnEdit"); // On lui donne la classe btnEdit
                if (compteur == 0) flecheBas.classList.add("leftCenter"); //
                flecheBas.value = element; // On lui donne la valeur de l'element

                let imgFlecheBas = document.createElement("img") // On cree une balise img
                imgFlecheBas.src = '../images/flecheBas.png'; // On lui donne l'image flecheBas.png
                imgFlecheBas.className = "imgEdit"; // On lui donne la classe imgEdit

                flecheBas.appendChild(imgFlecheBas); // On ajoute l'image flecheBas.png dans la balise button
                div.appendChild(flecheBas); // On ajoute la balise button dans la balise div

            }

            compteur++; // On incremente le compteur


            btnDelete.appendChild(imgDelete); // On ajoute l'image delete.png dans la balise button
            div.appendChild(btnDelete); // On ajoute la balise button dans la balise div


            emplacement.appendChild(div); // On ajoute la balise div dans la balise contenant les niveaux disponibles

        });
    }

    // Permet d'effacer l'affichage des niveaux
    clearOrdre() {
        let emplacement = document.querySelector("ordre"); // On recupere la balise contenant les niveaux disponibles
        emplacement.innerHTML = ""; // On vide la balise contenant les niveaux disponibles
    }
}