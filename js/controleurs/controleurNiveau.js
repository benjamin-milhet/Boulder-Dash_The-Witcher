export class ControleurNiveau {
    constructor(map){
        this.nbDiamant = 0;
        this.nbMouvement = 0;
        this.lastMouvement = 0;
        this.limitSpell = 1;
        this.map = map;

        let nbDiamantRestant = document.querySelector("#nbDiamantRestant");
        nbDiamantRestant.innerHTML = this.getNbDiamantMap();
    }
    
    // Permet de recuperer la position du personnage
    getPositionHero() {
        let res = [] // Tableau qui contiendra les coordonnées du personnage
        for (let i = 0; i < this.map.length; i++) { // Parcours du niveau par ligne
            for (let j = 0; j < this.map[i].length; j++) { // Parcours du niveau par case de ligne
                if(this.map[i][j] == "P") { // Si la case est un personnage
                    // On ajoute les coordonnées dans le tableau
                    res.push(i); 
                    res.push(j);
                }
            }            
        }
        return res; // Retourne le tableau des coordonnées
    }

    // Permet d'actualiser la position des rochers
    verifierPosRocher() {
        let posPerso = this.getPositionHero(); // Recupere les coordonnées du personnage
        let x = posPerso[0]; // Recupere la ligne du personnage
        let y = posPerso[1]; // Recupere la colonne du personnage

        if(this.map[x-1][y] == "V" && this.map[x-2][y] == "R"){ // Si la case du dessus est vide et que celle encore dessus est un rocher
            this.map[x-2][y] = "V"; // On remplace le rocher par une case vide
            this.map[x][y] = "R"; // On remplace la case du personnage par le rocher -> mort du personnage
        }

        //Parcours du niveau en partant de la fin si plusieurs richer sont empiles
        for (let i = this.map.length-1; i >= 0 ; i--) { // Parcours du niveau par ligne
            for (let j = this.map[i].length-1; j >= 0; j--) { // Parcours du niveau par case de ligne
                if(this.map[i][j] == "R") { // Si la case est un rocher
                    let  ii = i+1; // On recupere la ligne suivante
                    while(this.map[ii][j] == "V"){ // Tant que la case suivante est vide
                        this.map[ii-1][j] = "V"; // On remplace la case rocher par une case vide
                        this.map[ii][j] = "R"; // On remplace la case vide par une case rocher
                        
                        ii++ // On incremente la ligne
                    }
                }
            }            
        }
    }

    // Permet de deplacer le personnage en fonction de la touche clavier appuye
    deplacerHero(direction) {
        let tab = this.getPositionHero(); // On recupere les coordonnées du personnage
        let x = tab[0]; // On recupere la ligne du personnage
        let y = tab[1]; // On recupere la colonne du personnage

        let newCase = "V"; // 
        this.lastMouvement = direction; // On enregistre la derniere direction du personnage

        switch (direction) { // On verifie la direction du personnage
            case "w":
            case "z":
                if(x-1 >= 0){ // On verifie que la case du dessus existe
                    if(this.map[x-1][y] != "B" && this.map[x-1][y] != "R"){ // On verifie que la case du dessus n'est pas un rocher ou un mur
                        if(this.map[x-1][y] == "D") this.augmenterDiamant(); // Si la case du dessus est un diamant, on l'ajoute au nombre de diamant
                        this.map[x][y] = newCase; // On remplace la case du personnage par une case vide
                        this.map[x-1][y] = "P"; // On remplace la case du dessus par le personnage
                        this.augmenterNbMouvement(); // On augmente le nombre de mouvement
                    }
                }
                break;
            case "s":
                if(x+1 <= 16){ // On verifie que la case du dessous existe
                    if(this.map[x+1][y] != "B" && this.map[x+1][y] != "R"){ // On verifie que la case du dessous n'est pas un rocher ou un mur
                        if(this.map[x+1][y] == "D") this.augmenterDiamant(); // Si la case du dessous est un diamant, on l'ajoute au nombre de diamant
                        this.map[x][y] = newCase; // On remplace la case du personnage par une case vide
                        this.map[x+1][y] = "P"; // On remplace la case du dessous par le personnage
                        this.augmenterNbMouvement(); // On augmente le nombre de mouvement
                    }
                }
                break;
            case "a":
            case "q":
                if(y-1 >= 0){ // On verifie que la case de gauche existe
                    if(this.map[x][y-1] == "R"){ // Si la case de gauche est un rocher
                        this.deplacerRocher(x,y-1); // On essaye de le deplacer
                    }
                    else if(this.map[x][y-1] != "B" && this.map[x][y-1] != "R"){ // Si la case de gauche n'est pas un rocher ou un mur
                        if(this.map[x][y-1] == "D") this.augmenterDiamant(); // Si la case de gauche est un diamant, on l'ajoute au nombre de diamant
                        this.map[x][y] = newCase; // On remplace la case du personnage par une case vide
                        this.map[x][y-1] = "P"; // On remplace la case de gauche par le personnage
                        this.augmenterNbMouvement(); // On augmente le nombre de mouvement
                    }
                }
                break;
            case "d":
                if(y+1 <= 32){ // On verifie que la case de droite existe
                    if(this.map[x][y+1] == "R"){ // Si la case de droite est un rocher
                            this.deplacerRocher(x,y+1); // On essaye de le deplacer
                    }
                    else if(this.map[x][y+1] != "B" && this.map[x][y+1] != "R"){ // Si la case de droite n'est pas un rocher ou un mur
                        if(this.map[x][y+1] == "D") this.augmenterDiamant(); // Si la case de droite est un diamant, on l'ajoute au nombre de diamant
                        this.map[x][y] = newCase; // On remplace la case du personnage par une case vide
                        this.map[x][y+1] = "P"; // On remplace la case de droite par le personnage
                        this.augmenterNbMouvement(); // On augmente le nombre de mouvement
                        
                    }
                }
                break;
            default:
                break;
        }

        this.verifierPosRocher(); // On actualise la position des rochers
        return (this.getPositionHero()); // On retourne les coordonnées du personnage
    }

    // Permet de deplacer le rocher en fonction de la touche clavier appuye
    deplacerRocher(posX, posY){
        let i = 0; // Variable pour savoir si on doit deplacer le rocher vers la gauche ou la droite

        if(this.lastMouvement == "a" || this.lastMouvement == "q"){ // Si la derniere direction du personnage est a gauche
            i = -1; // On doit deplacer le rocher vers la gauche
        } else {
            i = 1; // On doit deplacer le rocher vers la droite
        }

        if(this.map[posX][posY + i] == "V"){ // Si la case du rocher vers la droite ou la gauche est vide
            this.map[posX][posY + i] = "R"; // On remplace la case du rocher vers la droite ou la gauche par le rocher
            this.map[posX][posY] = "P"; // On remplace la case du rocher par le personnage
            this.map[posX][posY - i] = "V"; // On remplace la case du personnage par une case vide
        }
        this.verifierPosRocher(); // On actualise la position des rochers
    }

    // Permet d'actualiser le nombre de diamant restant
    setAffichageNbDiamantRestant(nb){
        let nbDiamantRestant = document.querySelector("#nbDiamantRestant"); // On recupere la balise permettant d'afficher le nombre de diamant restant
        nbDiamantRestant.innerHTML = (this.getNbDiamantMap() + nb); // On actualise le nombre de diamant restant
    }

    // Permet de rendre une case vide
    removeCase(posX, posY){
        this.map[posX][posY] = "V";
    }

    //getters et setters
    getNbDiamantMap(){
        let nbDiamant = 0;
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if(this.map[i][j] == "D") {
                    nbDiamant++;
                }
            }
        }
        return nbDiamant;
    }

    augmenterDiamant(){
        this.nbDiamant++;
    }

    augmenterNbMouvement(){
        this.nbMouvement++;
    }

    getRandom(entier) {
        return Math.floor(Math.random() * (entier+1)); 
    }

    getNbDeplacement(){
        return this.nbMouvement;
    }

    getMap(){
        return this.map;
    }

    setNbDeplacement(nb){
        this.nbMouvement = nb;
    }

    getNbDiamant(){
        return this.nbDiamant;
    }

    setNbDiamant(nb){
        this.nbDiamant = nb;
    }




    
}

