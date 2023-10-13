/******************************************
           === variables globales === 
********************************************/
const EFFECTIF_MAX = 11; //effectif max pour une équipe
const POSTES = ["gardien","defenseur","milieu","attaquant"]; // noms des différents postes
const FORMATION_INITIALE="433"; // formation choisie par défaut au lancement

let joueurChoisi; // joueur choisi lors d'un click dans la zone joueurs


/**
 * initialisation
 */
const init = function(){
    raz();
    remplirPostes(FORMATION_INITIALE);
    const ok = document.getElementById("ok");
    ok.addEventListener("click", changeFormation);
}


/*****************************************************
           === Réinitialisation de la page=== 
******************************************************/

/**
 * Mise à l'état initial (feuille de match, effectifs et joueurs)
 * lors d'un changement de formation
 */
const raz = function(){
    razZoneJoueurs();
    abonneClickJoueurs();
    viderFeuilleDeMatch()
    effectifsA0();
}

/**
 * vide la feuille de match
 */
const viderFeuilleDeMatch = function(){
    //TO DO
    const joueursList = document.getElementById("feuilleDeMatch").querySelector('ul');
    joueursList.innerHTML = "";
}

/**
 * Réinitialise tous les effectifs du tableau HTML à 0
 */
const effectifsA0=function(){
    //TODO
    const cells = document.querySelectorAll('table tbody td');
    cells.forEach((cell) => {
      cell.textContent = '0';
    });}

/** 
 * Vide la <div> d'id "joueurs" puis la remplit à partir des données
 * présentes dans le script utilisé : "men.js" ou "women.js"
 */
const razZoneJoueurs = function(){
    //TODO décommenter le code suivant à la question Q6

    const joueurs = document.getElementById("joueurs");
    joueurs.innerHTML = "";
	for(let i = 0; i < playersData.length; i++) {
		joueurs.appendChild(creerJoueur(playersData[i])); //ajout sous elements de div de class "joeurs ""
	} 
}

/*****************************************************
           ===Changement de formation=== 
******************************************************/

/**
 *  change la formation présente sur le terrain
 *  puis remet la page dans on état initial.
 */
const changeFormation = function(){
    const input = document.getElementById('formation');
    if(verifFormation(input.value)){
        remplirPostes(input.value)
        raz();
    }
}

/**
 * Détermine si la formation de l'équipe est valide
 * 3 caractères correspondants à des nombres entiers 
 * de défenseurs, milieu et attaquants sont attendus :
 * - Les défenseurs sont 3 au moins, 5 au plus
 * - Les milieux : 3 au moins, 5 au plus
 * - Les attaquants : 1 au moins, 3 au plus
 * (Le gardien est toujours unique il n'est pas représenté dans la chaine de caractères).
 * @param {String} formation - la formation à tester provenant de l'input correspondant
 * @return {Boolean} - true si la formation est valide, false sinon
 */
const verifFormation = function(formation){
    if (!/^\d{3}$/.test(formation)) { //une chaîne de caractères composée exactement de trois chiffres (0-9) 
                                      // à l'aide d'une expression régulière. Si la chaîne ne correspond pas 
                                       // à l'expression régulière, la fonction renverra false
        return false;
    }
    
    // Extraire les nombres de la formation
    const defenseurs = parseInt(formation[0]);
    const milieux = parseInt(formation[1]);
    const attaquants = parseInt(formation[2]);

    const totalEffectif = defenseurs + milieux + attaquants;

    console.log(totalEffectif)

    if (totalEffectif > 11) {
        return false;
    }
    
    // Vérifier les nombres de défenseurs, milieux et attaquants
    if (defenseurs < 3 || defenseurs > 5) {
        return false;
    }
    if (milieux < 3 || milieux > 5) {
        return false;
    }
    if (attaquants < 1 || attaquants > 3) {
        return false;
    }
    
    // La formation est valide
    return true;
}



/**
 * Remplit les lignes de joueur en fonction de la formation choisie
 * @param {String} formation - formation d'équipe
 */
const remplirPostes = function(formation){
    const effectifs = [1]; // ajout du gardien
    for (c of formation)//le tableau effectifs contiendra [1, 4, 3, 3].
        effectifs.push(parseInt(c))
    const lignes = document.getElementById("terrain").children
    for (let i=0; i<lignes.length ; i ++){
        lignes[i].innerHTML = ""
        for (let j = 0; j<effectifs[i]; j++){
            lignes[i].innerHTML +="<div class='positions "+POSTES[i]+"'></div>";
        }
    }
}

/*****************************************************
           === création des joueurs=== 
******************************************************/

/** Crée une <div> représentant un joueur avec un id de la forme "j-xxxxxx"
 * @param {Object} data - données d'un joueur
 * @return {HTMLElement} - div représentant un joueur
 */
const creerJoueur = function(data){
    //TODO
    // Création de la div joueur
    const divJoueur = document.createElement("div"); // creation d'element
    divJoueur.classList.add("joueur");
    divJoueur.classList.add(data.poste); // ajout les class au meme div 
    divJoueur.setAttribute("id", "j-" + data.id); //modifier id par la nouvelle valeur
    
     // Création de l'image

    const imgJoueur = document.createElement("img");
    imgJoueur.setAttribute("src", "images/" + data.id + ".jpg");
    imgJoueur.setAttribute("alt", data.nom);
    divJoueur.appendChild(imgJoueur);  // le fils de div
    
    // Création de la div nom
    const divNom = document.createElement("div");
    divNom.classList.add("nom");
    divNom.textContent = data.nom; //contenu du element
    divJoueur.appendChild(divNom); //fils de div 
    
    // Création de la div poste
    const divPoste = document.createElement("div");
    divPoste.classList.add("poste");
    divPoste.textContent = data.poste;
    divJoueur.appendChild(divPoste); //fils de div
    
    return divJoueur;

}


/*****************************************************
           ===Sélection des joueurs=== 
******************************************************/

/** 
 * Abonne les <div> de class "joueur" à la fonction selectionneJoueur pour un click
 */
const abonneClickJoueurs = function(){
    //TODO
    const divJoueur =document.getElementsByClassName("joueur"); //envoie une collection de div
    for (let i = 0; i < divJoueur.length; i++){
        const div = divJoueur[i];
        div.addEventListener("click",selectionneJoueur)
    }//Cet écouteur d'événement est configuré pour détecter l'événement "click" (clic de souris) 
    //sur l'élément, et pour appeler la fonction selectionneJoueur lorsqu'il se produit.
}

/** 
 * Selectionne un joueur, change son opacité puis le place sur le terrain
 */
const selectionneJoueur = function(){
    joueurChoisi = this;
    this.style.opacity="0.3"; // mettre le joueur selectionner en transparent
    placeJoueur();
}


/*************************************************************
           ===Modifications des joueurs sur le terrain=== 
************************************************************/

/**
 * Renvoie le noeud DOM correspondant à la position disponible pour placer un
 *  joueur sur le terrain ou null si aucune n'est disponible
 * @param {HTMLElement} ligne - une div ligne de joueurs sur le terrain
 * @returns {HTMLElement || null} - une div de class "positions" disponible dans cette ligne
 */
const trouveEmplacement = function(ligne){
    // récupère tous les éléments de la ligne qui ont la classe "positions"
    const positions = ligne.querySelectorAll(".positions");
    // itère sur ces éléments et renvoie le premier élément qui n'a pas de valeur dans sa propriété "title"
    for(let i = 0; i < positions.length; i++){
      if(positions[i].title === ""){
        return positions[i];
      }
    }
    // si aucun élément n'a été trouvé, renvoie null
    return null;
  }

/**
/**
 * Renvoie le noeud DOM correspondant à la 
 * ligne où placer un joueur qur le terrain en fonction de son poste
 * @param {String} poste - poste du joueur
 * @returns {HTMLElement} - une div parmi les id #ligne...
 */
const trouveLigne = function(poste){
    return document.getElementById("ligne" + poste.substring(0,1).toUpperCase() +poste.substring(1));
/*La fonction utilise la méthode document.getElementById() pour trouver
 l'élément HTML correspondant à la ligne sur le terrain où placer le 
 joueur. L'ID de chaque ligne est préfixé par "ligne", suivi de
  la première lettre en majuscule du poste (par exemple "ligneGardien"
   pour les attaquants). Pour créer cet ID, la fonction utilise 
   la méthode substring() pour extraire la première lettre du poste 
   et la convertir en majuscule, puis la concatène avec le reste de 
   la chaîne de caractères. "ligneGardien"*/
}


/** 
 * Place un joueur sélectionné par un click sur la bonne ligne
 * dans une <div> de class "positions" avec un id de la forme "p-xxxxx"
 */
const placeJoueur = function(){
    //TODO
    const poste = joueurChoisi.classList[1] // le poste correspond à la 2ème classe;
    const ligne = trouveLigne(poste);
    const emplacementLibre = trouveEmplacement(ligne) //ligneGardien
    if (emplacementLibre){
        // ajoute le nom du joueur et appelle la fonction permettant de mettre à jour la 
        // feuille de match
        const nom = joueurChoisi.querySelector(".nom").textContent;
        emplacementLibre.title = nom;
        /* La méthode querySelector() est utilisée pour 
        sélectionner l'élément HTML correspondant au nom du joueur
        la propriété textContent est utilisée pour 
        obtenir le texte à l'intérieur de cet élément */ 

           // Mettre à jour l'image de l'emplacement libre
        const src=joueurChoisi.querySelector("img").src;
        emplacementLibre.style.backgroundImage='url('+src+')';
        
        
        // Mettre à jour l'id de l'emplacement libre
        const id = joueurChoisi.id;
        emplacementLibre.id="p-"+id.substring(2)
        console.log(id)
        ajouteJoueurListe(nom, id); //ajoute un joueur à la feuille de match dans un élément

        // Désactiver le click sur le joueur sélectionné et activer le click sur l'emplacement
        joueurChoisi.removeEventListener("click", selectionneJoueur);
        emplacementLibre.addEventListener("click", deselectionneCompo);

        // mise à jour des effectifs de la table ) qu'o il renoie true alors , le joeur est place sur le terrain
        // pour qu'il rajoute au tableau et feuille de match
        miseAJourNeffectifs(poste, true);
    }
    else     
        joueurChoisi.style.opacity="";
    }


/** 
 * Enléve du terrain le joueur sélectionné par un click
*/
const deselectionneCompo = function(){
    const poste = this.classList[1];
    const idJoueur = "j-" + this.id.substring(2);
    const joueur = document.getElementById(idJoueur);
    joueur.style.opacity="";
    joueur.addEventListener('click', selectionneJoueur);
    enleveJoueurFeuilleMatch(this.title); // nom du joeur 
    console.log(this.title)
    this.removeEventListener("click", deselectionneCompo);
    this.title="";
    this.style="";
    this.id="";
    miseAJourNeffectifs(poste, false); // suprimer joeur choisi de feeille match
}

/*************************************************************
           ===Mise à jour des effectifs=== 
************************************************************/

/**
 * Met à jour les effectifs dans le tableau lorsqu'un joueur est ajouté 
 * ou retiré du terrain.
 * Après chaque modification, une vérification de la composition compléte
 * doit être effectuée et le changement d'image de la feuille de match
 * doit être éventuellement réalisé.
 * @param {String} poste - poste du joueur
 * @param {Boolean} plus - true si le joueur est ajouté, false s'il est retiré
 */
const miseAJourNeffectifs = function(poste, plus){
    const tbody = document.querySelector("tbody"); // tableau des eff
    const tdGardien = tbody.querySelector("td.gardien"); // td du gar
    const tdDefenseur = tbody.querySelector('td.defenseur');
    const tdMilieu = tbody.querySelector('td.milieu');
    const tdattaquant = tbody.querySelector('td.attaquant');
   /// querySelector selectionne class element ou id

   // Gardien 
    if(poste === POSTES[0]){
      if(plus){ //true car  la fonction placejoeur revoie true si le joeur est placer sur le terrain
        tdGardien.textContent = parseInt(tdGardien.textContent) + 1; //incremente 1
      } else {
        tdGardien.textContent = parseInt(tdGardien.textContent) - 1; //si false enleve
        // car focntion deselectioncomp renvoie false q'on on enleve joeur du terrain
      }
    }    // Defenseur
    else if (poste === POSTES[1]){
      if(plus){
        tdDefenseur.textContent = parseInt(tdDefenseur.textContent) + 1;
      } else {
        tdDefenseur.textContent = parseInt(tdDefenseur.textContent) - 1;
      }} // Milieeu
     else if (poste === POSTES[2]) {
        if(plus){
            tdMilieu.textContent = parseInt(tdMilieu.textContent) + 1;
        } else {
            tdMilieu.textContent = parseInt(tdMilieu.textContent) - 1;
        }
    } // attaquant
    else if (poste === POSTES[3]){
        if(plus){
            tdattaquant.textContent = parseInt(tdattaquant.textContent) + 1;
        } else {
            tdattaquant.textContent = parseInt(tdattaquant.textContent) - 1;
        }
    }
    verifCompoComplete();
  }
  

/**
 * Verifie si l'effectif est complet.
 * L'image de la feuille de match est changée en conséquence.
 * @returns {Boolean} - true si l'effectif est au complet, false sinon
 */
const verifCompoComplete = function() {
    const tbody = document.querySelector("tbody");
    const tdGardien = tbody.querySelector("td.gardien");
    const tdDefenseur = tbody.querySelector("td.defenseur");
    const tdMilieu = tbody.querySelector("td.milieu");
    const tdAttaquant = tbody.querySelector("td.attaquant");
  
    const totalEffectifs =
      parseInt(tdGardien.textContent) +
      parseInt(tdDefenseur.textContent) +
      parseInt(tdMilieu.textContent) +
      parseInt(tdAttaquant.textContent);
    console.log(totalEffectifs) //calculer le nombre de joeur sur le terrain

  // EFFECTIF_MAX :11
    const equipeComplete = totalEffectifs === EFFECTIF_MAX;
   //verification
    if (equipeComplete) {
      changeImageComplete(true); // changer image par check
    } else {
      changeImageComplete(false); // changer image par notok
    }
  
  };
  

/*************************************************************
           ===Mise à jour de la feuille de match=== 
************************************************************/

/**
 * Modifie l'image de la feuille de match
 * en fonction de la taille de l'effectif
 * @param {Boolean} complet - true si l'effectif est complet, false sinon
 */
const changeImageComplete = function(complet){
    const img = document.getElementById("check");
    if (complet) {
      img.src = "./images/check.png";
    } else {
      img.src = "./images/notok.png";
    }
}


/**
 * Enleve un joueur de la feuille de match
 * @param {String} nom - nom du joueur à retirer
 */
//y
const enleveJoueurFeuilleMatch = function(nom){
    let joueursElems = document.querySelectorAll("li");
    for(let i = 0; i < joueursElems.length; i++){
        if(joueursElems[i].textContent.includes(nom)){
            joueursElems[i].remove();
            break;
        }
    }
}



/**
 * ajoute un joueur à la feuille de match dans un élément
 * <li> avec un id de la forme "f-xxxxx"
 * @param {String} nom - nom du joueur
 * @param {String} id - id du joueur ajouté au terrain de la forme "p-xxxxx"
 */
const ajouteJoueurListe = function(nom, id){
    const liste = document.getElementById('feuilleDeMatch').querySelector('ul');
    const li = document.createElement('li');
    li.textContent = nom;
    li.id =  "f-"+id.substring(2)
    liste.appendChild(li)
}


/*************************************************************
           ===Initialisation de la page=== 
************************************************************/

init();