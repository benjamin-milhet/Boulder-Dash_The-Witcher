export class GenerateMap {
    constructor(map){
        this.nbDiamant = 0;
        this.nbMouvement = 0;
        this.lastMouvement = 0;
        this.limitSpell = 1;
        this.map = map;
    }
    

    afficherMap() {
        let nbDiamant = document.querySelector("#nbDiamant");
        nbDiamant.innerHTML = this.nbDiamant;
        let nbMouvement = document.querySelector("#nbMouvement");
        nbMouvement.innerHTML = this.nbMouvement;
        let nbDiamantRestant = document.querySelector("#nbDiamantRestant");
        nbDiamantRestant.innerHTML = this.getNbDiamantMap();

        let emplacement = document.querySelector("playground");
        this.verifierPosRocher();
        this.map.forEach(element => {
            let div = document.createElement("div");
            div.className = "ligne"
            element.forEach(donne => {
                let minidiv = document.createElement("div")
                let img = document.createElement("img")
                minidiv.className = "case"
                minidiv.style.display = 'inline-block';
                img.className = "imgCase";
                if(donne == "T"){
                    img.src = '../images/'+donne + "1" +'.png';
                } else if(donne == "V"){

                } else {
                    img.src = '../images/'+donne+'.png';
                }
                //minidiv.innerHTML = "";
                minidiv.appendChild(img);
                //qminidiv.style.backgroundImage = "url('images/"+donne+".png')";

                div.appendChild(minidiv);
            });
            emplacement.appendChild(div);
        });

        
    }

    getPositionHero() {
        let res = []
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if(this.map[i][j] == "P") {
                    res.push(i);
                    res.push(j);
                }
            }            
        }
        return res;
    }

    verifierPosRocher(){
        let posPerso = this.getPositionHero();
        let x = posPerso[0];
        let y = posPerso[1];
        if(this.map[x-1][y] == "V" && this.map[x-2][y] == "R"){
            this.map[x-2][y] = "V";
            this.map[x][y] = "R";
        }
        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[i].length; j++) {
                if(this.map[i][j] == "R") {
                    let  ii = i+1;
                    while(this.map[ii][j] == "V"){
                        this.map[ii-1][j] = "V";
                        this.map[ii][j] = "R";
                        
                        ii++
                    }
                }
            }            
        }

    }

    deplacerHero(direction) {
        let tab = this.getPositionHero();

        let x = tab[0];
        let y = tab[1];
        let newCase = "V";
        this.lastMouvement = direction;

        if(this.lastMouvement == "e"){
            //newCase = "TT";
        }

        switch (direction) {
            case "w":
                if(x-1 >= 0){
                    if(this.map[x-1][y] != "B" && this.map[x-1][y] != "R"){
                        if(this.map[x-1][y] == "D") this.augmenterDiamant();
                        this.map[x][y] = newCase;
                        this.map[x-1][y] = "P";
                        this.augmenterNbMouvement();
                    }
                }
                break;
            case "s":
                if(x+1 <= 16){
                    if(this.map[x+1][y] != "B" && this.map[x+1][y] != "R"){
                        if(this.map[x+1][y] == "D") this.augmenterDiamant();
                        this.map[x][y] = newCase;
                        this.map[x+1][y] = "P";
                        this.augmenterNbMouvement();
                    }
                }
                break;
            case "a":
                if(y-1 >= 0){
                    if(this.map[x][y-1] == "R"){
                        this.deplacerRocher(x,y-1);
                    }
                    else if(this.map[x][y-1] != "B" && this.map[x][y-1] != "R"){
                        if(this.map[x][y-1] == "D") this.augmenterDiamant();
                        this.map[x][y] = newCase;
                        this.map[x][y-1] = "P";
                        this.augmenterNbMouvement();
                    }
                }
                break;
            case "d":
                if(y+1 <= 32){
                    if(this.map[x][y+1] == "R"){
                            this.deplacerRocher(x,y+1);
                    }
                    else if(this.map[x][y+1] != "B" && this.map[x][y+1] != "R"){
                        if(this.map[x][y+1] == "D") this.augmenterDiamant();
                        this.map[x][y] = newCase;
                        this.map[x][y+1] = "P";
                        this.augmenterNbMouvement();
                        
                    }
                }
                break;
            
            case "e":
                if(this.limitSpell > 0){
                    this.limitSpell--;
                    this.teleporteur();
                }
                break;
        
            default:
                break;
        }
        this.clearMap();
        this.afficherMap();
        return (this.getPositionHero());
    }

    deplacerRocher(posX, posY){
        
        let i = 0;
        if(this.lastMouvement == "a"){
            i = -1;
        } else {
            i = 1;
        }

        if(this.map[posX][posY + i] == "V"){
            this.map[posX][posY + i] = "R";
            this.map[posX][posY] = "P";
            this.map[posX][posY - i] = "V";
        }
        this.clearMap();
        this.afficherMap();
    }


    teleporteur(){
        let x = this.getRandom(14) + 1;
        let y = this.getRandom(30) + 1;
        if(this.map[x][y] != "P") {
            let posP = this.getPositionHero();
            let xP = posP[0];
            let yP = posP[1];

            this.map[xP][yP] = "V";
            this.map[x][y] = "P";
        }
    }

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

    clearMap() {
        let jeux = document.querySelector("playground");
        jeux.innerHTML = "";
    }

    getRandom(entier) {
        return Math.floor(Math.random() * (entier+1)); 
    }

    getNbDeplacement(){
        return this.nbMouvement;
    }

    addLocalStorage(){
        localStorage.setItem("save", this.map);
    }




    
}

