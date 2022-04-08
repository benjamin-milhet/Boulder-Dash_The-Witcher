export class ControleurLocalStorage {

    // Permet d'ajouter un eelement dans le localStorage
    addLocalStorage(key, value) {
        if(key == "maps") value = Array.from(value); // Convertir un Map en Array pour pouvoir l'ajouter dans le localStorage si la value est une map
        localStorage.setItem(key, JSON.stringify(value)); // Convertir la value en string pour pouvoir l'ajouter dans le localStorage
    }

    // Permet d'ajouter un niveau dans la Map "maps" du localStorage
    addMapToMapsInLocalStorage(name, map) {
        let maps = this.getFromLocalStorage("maps"); // On recupere la Map "maps" du localStorage
        if(maps == null) maps = []; // Si la Map "maps" n'existe pas on la crée
        maps.set(name, map); // On ajoute le niveau dans la Map "maps"
        this.addLocalStorage("maps", maps); // On ajoute la Map "maps" dans le localStorage
    }

    // Permet de supprimer un niveau dans la Map "maps" du localStorage
    deleteMapToMapsInLocalStorage(name) {
        let maps = this.getFromLocalStorage("maps"); // On recupere la Map "maps" du localStorage
        maps.delete(name); // On supprime le niveau dans la Map "maps"
        this.addLocalStorage("maps", maps); // On ajoute la Map "maps" dans le localStorage
    }

    // Permet de connaitre le nombre d'element de "key" d'une Map dans le localStorage
    getNbKeyFromLocalStorage(key) {
        let maps = this.getFromLocalStorage(key); // On recupere la Map "maps" du localStorage
        return maps.size; // On retourne le nombre d'element de la Map "maps"
    }

    // Permet de recuperer un element "key" dans le localStorage
    getFromLocalStorage(key) {
        let get = JSON.parse(localStorage.getItem(key)); // On recupere la value de la key "key" du localStorage
        if(key == "maps") get = new Map(get); // Convertir un Array en Map pour pouvoir l'utiliser dans le code si la value est "maps"
        return get; // On retourne la value de la key "key" du localStorage
    }

    // Permet de savoir si un element est present dans le localStorage
    isExistInLocalStorage(key) {
        let res = false; // On initialise la variable de retour res a false
        if(localStorage.getItem(key) === null){ // Si la key "key" n'existe pas dans le localStorage
            res = true; // On attribue true a la variable de retour res
        }
        return res; // On retourne la variable de retour res
    }

    // Permet de supprimer la sauvegarde du niveau dans le localStorage
    deleteSaveMapinLocalStorage(){
        localStorage.removeItem("save"); // On supprime la sauvegarde du niveau dans le localStorage
    }
}