export class VueNiveau {

     afficherMap(niveau, nbDiamant, nbMouvement, nbNiveau, nbNiveauTotal) {

            let affichageNbDiamant = document.getElementById("nbDiamant");
            affichageNbDiamant.innerHTML = nbDiamant;

            let affichageNbMouvement = document.getElementById("nbMouvement");
            affichageNbMouvement.innerHTML = nbMouvement;
            
            let affichageNbNiveau = document.getElementById("nbNiveau");
            affichageNbNiveau.innerHTML = "Niveau numero : " + (nbNiveau+1) + "/" + nbNiveauTotal;
            
            let emplacement = document.querySelector("playground");

            niveau.forEach((element) => {
                let div = document.createElement("div");
                div.className = "ligne"

                element.forEach((donne) => {
                    let minidiv = document.createElement("div")
                    let img = document.createElement("img")

                    minidiv.className = "case"
                    minidiv.style.display = 'inline-block';
                    img.className = "imgCase";

                    if(donne == "T") {
                        img.src = '../images/'+ donne + "1" +'.png';
                    } else if (donne == "V") {

                    } else {
                        img.src = '../images/' + donne + '.png';
                    }

                    minidiv.appendChild(img);
                    div.appendChild(minidiv);

                });

                emplacement.appendChild(div);
        });
        
    }


    clearMap() {
        let jeux = document.querySelector("playground");
        jeux.innerHTML = "";
    }

    afficherPopUp(message) {
        let popUp = document.getElementById("popUp");
        popUp.innerHTML = message;

        let btn = document.createElement("button");
        btn.id = "btnDelete";
        btn.innerHTML = "OK";
        btn.style.marginTop = "2vh";

        popUp.appendChild(btn);

        popUp.style.display = "block";

    }

    clearPopUp() {
        let popUp = document.getElementById("popUp");
        popUp.innerHTML = "";
        popUp.style.display = "none";
    }

}