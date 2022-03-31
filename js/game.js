import { GenerateMap }  from "./generateMap.js"; 
class Game{
    constructor() {
        this.listMap = [
            [
                ["B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","R","R","R","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","D","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","D","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","D","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","R","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","P","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B"],
    
            ],            
            [
                ["B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","R","R","R","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","D","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","D","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","D","T","T","T","T","T","T","T","B"],
                ["B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","R","R","B","B","B","B","B","B","B","B","B","B","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","R","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","T","T","T","T","T","T","T","T","T","T","T","T","T","P","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","T","B"],
                ["B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B","B"],
    
            ],

        ];
        for (let i = 0; i < this.listMap.length; i++) {
            this.addLocalStorage("niveau " + i, this.listMap[i]);
        }
        this.niveauEnCours = 0;
        this.genererNiveeau();
        this.niveau.afficherMap();
    }

    start() {
        document.onkeydown = (event) => {
            if(this.niveau.getPositionHero() != 0){
                if(this.niveau.deplacerHero(event.key) == 0){
                    setTimeout(() => {
                        this.endGame();
                    }, 300);
                }
            }
            if(this.niveau.getNbDiamantMap() == 0){
                setTimeout(() => {
                    this.gagner();
                }, 300);
            }
            
        }
    }

    genererNiveeau(){
        let copyArray = this.copyArray(this.listMap[this.niveauEnCours]);
        this.niveau = new GenerateMap(copyArray);
    }

    endGame() {
        alert("Vous avez perdu !");
        this.genererNiveeau();
        this.niveau.clearMap();
        this.niveau.afficherMap();
    }

    rejouer() {
        if (confirm("Voulez-vous rejouer ce niveau?")) {
            this.genererNiveeau();
            this.niveau.clearMap();
            this.niveau.afficherMap();
          } 
    }

    gagner() {

        alert("Vous avez terminé ce niveau en " + this.niveau.getNbDeplacement() + " mouvements !");
        this.niveauEnCours++;
        if(this.niveauEnCours >= this.listMap.length){
            document.location.href=".././index.html"; 
        }else{
            this.genererNiveeau();
            this.niveau.clearMap();
            this.niveau.afficherMap();
        }
    }

    copyArray(array) {
        let newArray = [];
        for (let i = 0; i < array.length; i++) {
            newArray[i] = [];
            for (let j = 0; j < array[i].length; j++) {
                newArray[i][j] = array[i][j];
            }
        }
        return newArray;
    }
    
    addLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }

    save(){
        this.niveau.addLocalStorage();
        this.addLocalStorage("niveauEnCours", this.niveauEnCours);
    }

}

let partie = 0;

window.onload = function (){
    partie = new Game();
    partie.start();
};

document.getElementById("rejouer").onclick = function (){
    partie.rejouer()
}

document.getElementById("menu").onclick = function (){
    if (confirm("Voulez-vous retourner au menu?")) {
        partie.save();
        document.location.href=".././index.html"; 
      }
}



