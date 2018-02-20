
"use strict";

let canvas;
let context;
let contextLigne;
let contextLigneReception;

let i;
let varTimeOut;

let motATrouver = "maison";

let typeDeJoueur = "Dessinateur";

let couleurFond = "FloralWhite";

let intervalTemps;
let tempsRestantMax = 99;
let tempsRestant;
let couleurTempsRestant      = "#000000";
let couleurTempsRestantRouge = 0xFF;
let couleurTempsRestantVert  = 0x00;

let tempsRestantHaut;
let tempsRestantBas;
let tempsRestantGauche;
let tempsRestantDroite;

let color;
let colorBorder;

let nomJoueur1 = "Gagné";
let nomJoueur2 = "Perdu";
let scoreGagne = 0;
let scorePerdu = 0;

let espaceDroite = 150;
let espaceGauche = 150;
let espaceBas    = 125;
let espaceHaut   = 75;

let espaceTitre  = 70;

let etatManche  = "enCours"; // ou terminé
let etatRejouer = false;
let ecoutePosee = false;

let mousePos = {
  x: 0,
  y: 0
};

let tailleTitre;

let enDehors = true;

let titreHaut;
let titreBas;
let titreGauche;
let titreDroite;

let dessinHaut;
let dessinBas;
let dessinGauche;
let dessinDroite;

let tailleDessinHeight;
let tailleDessinWidth;

let etatBoutonPoint;
let boutonPointUp   = false;
let boutonPointDown = true;

let taillePointBouton;

let point2 = 2;
let point2Haut;
let point2Bas;
let point2Gauche;
let point2Droite;

let point4 = 4;
let point4Haut;
let point4Bas;
let point4Gauche;
let point4Droite;

let point6 = 6;
let point6Haut;
let point6Bas;
let point6Gauche;
let point6Droite;

let point8 = 8;
let point8Haut;
let point8Bas;
let point8Gauche;
let point8Droite;

let point10 = 10;
let point10Haut;
let point10Bas;
let point10Gauche;
let point10Droite;

let tailleCouleurBouton;

let couleurNoir;
let couleurNoirHaut;
let couleurNoirBas;
let couleurNoirGauche;
let couleurNoirDroite;

let couleurBleu;
let couleurBleuHaut;
let couleurBleuBas;
let couleurBleuGauche;
let couleurBleuDroite;

let couleurRouge;
let couleurRougeHaut;
let couleurRougeBas;
let couleurRougeGauche;
let couleurRougeDroite;

let couleurJaune;
let couleurJauneHaut;
let couleurJauneBas;
let couleurJauneGauche;
let couleurJauneDroite;

let couleurVert;
let couleurVertHaut;
let couleurVertBas;
let couleurVertGauche;
let couleurVertDroite;

let boutonActeurHaut;
let boutonActeurBas;
let boutonActeurGauche;
let boutonActeurDroite;

let boutonRejouerHaut;
let boutonRejouerBas;
let boutonRejouerGauche;
let boutonRejouerDroite;

let boutonReinitHaut;
let boutonReinitBas;
let boutonReinitGauche;
let boutonReinitDroite;

let reponse = "";

let champReponseHaut;
let champReponseBas;
let champReponseGauche;
let champReponseDroite;

let couleurCrayon = "black";
let taillePointCrayon = 2;

let ecouteMousemove = false;

let dessin = [];

let dessinPoint = {
  x: 0,
  y: 0,
  taille: 0,
  couleur: "",
  type: ""
};

let socket;

(function init() {

  canvas                = document.querySelector("#canvasPictionary");
  context               = canvas.getContext("2d");
  contextLigne          = canvas.getContext("2d");
  contextLigneReception = canvas.getContext("2d");

  let socket   = io.connect();

  couleurTempsRestantRouge = 0;    // (0xFF)
  couleurTempsRestantVert  = 255;

  canvas.width  = 640;
  canvas.height = 530;

  context.save();
  contextLigne.save();
  dessinePlateau();
  demarrerCompteurTemps();
  socket.emit("InitScore");
  socket.emit("Mot");
    dessineChampMotATrouver();
})();

function demarrerCompteurTemps() {
  clearInterval(intervalTemps);
  tempsRestantMax;
  tempsRestant = tempsRestantMax;

  dessinerTempsRestant();

  intervalTemps = setInterval(function() {
    console.log("temps restant");
    if (tempsRestant > 0) {
      tempsRestant--;
      dessinerTempsRestant();
    }
    if (tempsRestant <= 0) {
      arreterCompteurTemps();
      console.log("Partie Perdue");
      if (typeDeJoueur === "Dessinateur") {
        socket.emit("Perdu");
        // dessiner DESSINATEUR A GAGNE
        socket.emit("Point", "Perdu");
      }
    }
  }, 1000);

}

function dessinePerdu() {
  context.font = "bold 100px Cambria";
  context.textAlign = "center";
  context.fillStyle = "black";
  context.fillText("Perdu", (dessinDroite + dessinGauche) / 2 + 4, (dessinBas + dessinHaut) / 2);
  context.fillText("Perdu", (dessinDroite + dessinGauche) / 2 - 4, (dessinBas + dessinHaut) / 2);
  context.fillText("Perdu", (dessinDroite + dessinGauche) / 2 , (dessinBas + dessinHaut) / 2 + 4);
  context.fillText("Perdu", (dessinDroite + dessinGauche) / 2 , (dessinBas + dessinHaut) / 2 - 4);
  context.fillText("Perdu", (dessinDroite + dessinGauche) / 2 + 4, (dessinBas + dessinHaut) / 2 + 4);
  context.fillText("Perdu", (dessinDroite + dessinGauche) / 2 - 4, (dessinBas + dessinHaut) / 2 - 4);
  context.fillText("Perdu", (dessinDroite + dessinGauche) / 2 - 4, (dessinBas + dessinHaut) / 2 + 4);
  context.fillText("Perdu", (dessinDroite + dessinGauche) / 2 + 4, (dessinBas + dessinHaut) / 2 - 4);
  context.fillStyle = "gold";
  context.fillText("Perdu", (dessinDroite + dessinGauche) / 2 , (dessinBas + dessinHaut) / 2);
  etatManche = "Terminé";
  context.restore();
}

function dessineGagne() {
  context.font = "bold 80px Cambria";
  context.textAlign = "center";
  context.fillStyle = "black";
  context.fillText("Gagné", (dessinDroite + dessinGauche) / 2 - 4 , (dessinBas + dessinHaut) / 2);
  context.fillText("Gagné", (dessinDroite + dessinGauche) / 2 + 4 , (dessinBas + dessinHaut) / 2);
  context.fillText("Gagné", (dessinDroite + dessinGauche) / 2 , (dessinBas + dessinHaut) / 2 - 4);
  context.fillText("Gagné", (dessinDroite + dessinGauche) / 2 , (dessinBas + dessinHaut) / 2 + 4);
  context.fillText("Gagné", (dessinDroite + dessinGauche) / 2 - 4 , (dessinBas + dessinHaut) / 2 - 4);
  context.fillText("Gagné", (dessinDroite + dessinGauche) / 2 - 4, (dessinBas + dessinHaut) / 2 + 4);
  context.fillText("Gagné", (dessinDroite + dessinGauche) / 2 + 4, (dessinBas + dessinHaut) / 2 - 4);
  context.fillText("Gagné", (dessinDroite + dessinGauche) / 2 + 4 , (dessinBas + dessinHaut) / 2 + 4);
  context.fillStyle = "gold";
  context.fillText("Gagné", (dessinDroite + dessinGauche) / 2 , (dessinBas + dessinHaut) / 2);
  etatManche = "Terminé";
  context.restore();
}

function arreterCompteurTemps() {
  clearInterval(intervalTemps);

}

function toHex(d) {
    return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
}

function dessinePlateau() {
  dessineUnRectanglePlein(1, 1, canvas.width, canvas.height, couleurFond, couleurFond, 0);
  dessineStatics();
  if (!ecoutePosee) {
    ecouterWebSocket();
    ecouterSouris();
    ecouterClavier();
    ecoutePosee = true;
  }
}

function dessineStatics() {
  dessineTitre();
  dessineAutour();
  dessinePlancheADessin("white");
  calculerBoutons();
  dessineBoutonsCouleur();
  dessineBoutonNoir("gold");
  dessineBoutonsPoint();
}


function dessineTitre(couleurDebut, couleurMilieu, couleurFin) {
  if (!couleurDebut) {
    couleurDebut = "Blue";
  }
  if (!couleurMilieu) {
    couleurMilieu = "HotPink";
  }
  if (!couleurFin) {
    couleurFin = "GreenYellow";
  }
  context.font = "bold 60px Cambria";
  context.textAlign = "center";

  tailleTitre = Math.trunc(context.measureText("Pictionary").width);
  titreHaut   = 16;
  titreBas    = 60;
  titreGauche = (canvas.width - tailleTitre) / 2;
  titreDroite = (canvas.width + tailleTitre) / 2;

  let gradient = context.createLinearGradient(titreGauche, 0, titreDroite, 0);
  gradient.addColorStop(0, couleurFin);
  gradient.addColorStop(0.5, couleurMilieu);
  gradient.addColorStop(1, couleurDebut);

  context.fillStyle = gradient;
  context.fillText("Pictionary", canvas.width / 2 - 2, 60);
  context.fillText("Pictionary", canvas.width / 2 + 2, 60);
  context.fillText("Pictionary", canvas.width / 2, 60 - 2);
  context.fillText("Pictionary", canvas.width / 2, 60 + 2);

  gradient = context.createLinearGradient(titreGauche, 0, titreDroite, 0);
  gradient.addColorStop(0, couleurDebut);
  gradient.addColorStop(0.5, couleurMilieu);
  gradient.addColorStop(1, couleurFin);

  context.fillStyle = gradient;
  context.fillText("Pictionary", canvas.width / 2, 60);
  context.restore();
}

function dessineAutour() {

  let imageObj  = new Image();
  imageObj.src = "./images/table_jeu.jpg";
  imageObj.onload = function () {
    let drawImage = context.drawImage(imageObj,
                                      1, 1,
                                      imageObj.width, imageObj.height,
                                      1, 1,
                                      espaceGauche, espaceHaut + espaceTitre);
    drawImage = context.drawImage(imageObj,
                                      1, 1,
                                      imageObj.width, imageObj.height,
                                      canvas.width - espaceDroite, 1,
                                      espaceGauche, espaceHaut + espaceTitre);
    context.restore(); // reinit le pinceau

    context.font = "bold 60px Cambria";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(scoreGagne, (espaceGauche) / 2, (espaceTitre + espaceHaut ) / 2 - 10);

    context.font = "bold 25px Cambria";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(nomJoueur1, (espaceGauche) / 2 + 1, espaceTitre + espaceHaut - 30);
    context.fillText(nomJoueur1, (espaceGauche) / 2 - 1, espaceTitre + espaceHaut - 30);
    context.fillText(nomJoueur1, (espaceGauche) / 2, espaceTitre + espaceHaut - 30 + 1);
    context.fillText(nomJoueur1, (espaceGauche) / 2, espaceTitre + espaceHaut - 30 - 1);
    context.fillText(nomJoueur1, (espaceGauche) / 2 + 1, espaceTitre + espaceHaut - 30 + 1);
    context.fillText(nomJoueur1, (espaceGauche) / 2 + 1, espaceTitre + espaceHaut - 30 - 1);
    context.fillText(nomJoueur1, (espaceGauche) / 2 - 1, espaceTitre + espaceHaut - 30 + 1);
    context.fillText(nomJoueur1, (espaceGauche) / 2 - 1, espaceTitre + espaceHaut - 30 - 1);
    context.fillStyle = "gold";
    context.fillText(nomJoueur1, (espaceGauche) / 2, espaceTitre + espaceHaut - 30);

    context.font = "bold 60px Cambria";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(scorePerdu, canvas.width - (espaceDroite) / 2, (espaceTitre + espaceHaut) / 2 - 10);

    context.font = "bold 25px Cambria";
    context.textAlign = "center";
    context.fillStyle = "black";
    context.fillText(nomJoueur2, canvas.width - (espaceDroite) / 2 + 1, espaceTitre + espaceHaut - 30);
    context.fillText(nomJoueur2, canvas.width - (espaceDroite) / 2 - 1, espaceTitre + espaceHaut - 30);
    context.fillText(nomJoueur2, canvas.width - (espaceDroite) / 2, espaceTitre + espaceHaut - 30 + 1);
    context.fillText(nomJoueur2, canvas.width - (espaceDroite) / 2, espaceTitre + espaceHaut - 30 - 1);
    context.fillText(nomJoueur2, canvas.width - (espaceDroite) / 2 + 1, espaceTitre + espaceHaut - 30 + 1);
    context.fillText(nomJoueur2, canvas.width - (espaceDroite) / 2 + 1, espaceTitre + espaceHaut - 30 - 1);
    context.fillText(nomJoueur2, canvas.width - (espaceDroite) / 2 - 1, espaceTitre + espaceHaut - 30 + 1);
    context.fillText(nomJoueur2, canvas.width - (espaceDroite) / 2 - 1, espaceTitre + espaceHaut - 30 - 1);
    context.fillStyle = "gold";
    context.fillText(nomJoueur2, canvas.width - (espaceDroite) / 2, espaceTitre + espaceHaut - 30);

    context.restore(); // reinit le pinceau
    dessinerInterfaceActeur();
//    dessineBoutonActeur();
//    dessineBoutonRejouer();
//    dessineBoutonReinit();
//
//    context.restore();
//
//    if (typeDeJoueur === "Observateur") {
//      dessineChampReponse();
//    } else {
//      typeDeJoueur = "Dessinateur";
//      dessineChampMotATrouver();
//    }
  }
}

function dessinePlancheADessin(couleur) {
  if (!couleur) {
    couleur = "Black";
  }
  color = couleur;
  // Zone de dessin
  tailleDessinWidth  = canvas.width - espaceDroite - espaceGauche;
  tailleDessinHeight = canvas.height - espaceHaut - espaceTitre - espaceBas;
  dessinGauche = espaceDroite + 3;
  dessinDroite = canvas.width - espaceGauche - 3
  dessinHaut   = espaceTitre + espaceHaut + 3;
  dessinBas    = canvas.height  - espaceBas - 3;

  dessineUnRectanglePlein(dessinGauche, dessinHaut, dessinDroite - dessinGauche, dessinBas - dessinHaut, color, "black", 3);
  context.restore();
}

function changeEtatBoutonPoint() {
    etatBoutonPoint = !etatBoutonPoint;
    console.log(etatBoutonPoint);
}

function calculerBoutons() {
  calculerBoutonsCouleur();
  etatBoutonPoint = boutonPointUp;
  calculerBoutonsPoint();
}

function calculerBoutonsCouleur() {
  colorBorder = "black";

// emplacement Boutons couleur

  tailleCouleurBouton = (tailleDessinWidth - (10 * 4) ) / 5;
  // Bouton couleur blanc

  couleurNoir = "black";
  couleurNoirHaut   = espaceTitre + espaceHaut + tailleDessinHeight + 10;
  couleurNoirBas    = couleurNoirHaut + 30;
  couleurNoirGauche = espaceGauche;
  couleurNoirDroite = couleurNoirGauche + tailleCouleurBouton;

  // Bouton couleur bleu

  couleurBleu = "RoyalBlue";
  couleurBleuHaut   = couleurNoirHaut;
  couleurBleuBas    = couleurBleuHaut + 30;
  couleurBleuGauche = couleurNoirDroite + 10;
  couleurBleuDroite = couleurBleuGauche + tailleCouleurBouton;
  // Bouton couleur rouge

  couleurRouge = "red";
  couleurRougeHaut   = couleurBleuHaut;
  couleurRougeBas     = couleurRougeHaut + 30;
  couleurRougeGauche  = couleurBleuDroite + 10;
  couleurRougeDroite  = couleurRougeGauche + tailleCouleurBouton;

  // Bouton couleur jaune

  couleurJaune = "yellow";
  couleurJauneHaut   = couleurRougeHaut;
  couleurJauneBas     = couleurJauneHaut + 30;
  couleurJauneGauche  = couleurRougeDroite + 10;
  couleurJauneDroite  = couleurJauneGauche + tailleCouleurBouton;

  // Bouton couleur vert

  couleurVert = "LawnGreen";
  couleurVertHaut   = couleurJauneHaut;
  couleurVertBas     = couleurVertHaut + 30;
  couleurVertGauche  = couleurJauneDroite + 10;
  couleurVertDroite  = couleurVertGauche + tailleCouleurBouton;
}

function calculerBoutonsPoint() {
  colorBorder = "black";

// emplacement Boutons taille

  taillePointBouton = (tailleDessinHeight - 4 * 10) / 5;

  point2 = 2;
  point2Haut = dessinHaut + 3;
  point2Bas = point2Haut + taillePointBouton;
  point2Droite = dessinGauche - 10;
  point2Gauche = point2Droite - taillePointBouton;

  point4 = 4;
  point4Haut   = point2Bas + 10;
  point4Bas    = point4Haut + taillePointBouton;
  point4Droite = point2Droite;
  point4Gauche = point2Gauche;

  point6 = 6;
  point6Haut   = point4Bas + 10;
  point6Bas    = point6Haut + taillePointBouton;
  point6Droite = point2Droite;
  point6Gauche = point2Gauche;

  point8 = 8;
  point8Haut   = point6Bas + 10;
  point8Bas    = point8Haut + taillePointBouton;
  point8Droite = point2Droite;
  point8Gauche = point2Gauche;

  point10 = 10;
  point10Haut   = point8Bas + 10;
  point10Bas    = point10Haut + taillePointBouton;
  point10Droite = point2Droite;
  point10Gauche = point2Gauche;
}

function dessineBoutonsCouleur() {
  dessineBoutonNoir(colorBorder);
  dessineBoutonBleu(colorBorder);
  dessineBoutonRouge(colorBorder);
  dessineBoutonJaune(colorBorder);
  dessineBoutonVert(colorBorder);
  switch (couleurCrayon){
    case couleurNoir:
      dessineBoutonNoir("gold");
      break;
    case couleurBleu :
      dessineBoutonBleu("gold");
      break;
    case couleurRouge :
      dessineBoutonRouge("gold");
      break;
    case couleurJaune :
      dessineBoutonJaune("gold");
      break;
    case couleurVert :
      dessineBoutonVert("gold");
      break;
  }
}

function dessineBoutonsPoint() {
  dessineBoutonPoint2("black");
  dessineBoutonPoint4("black");
  dessineBoutonPoint6("black");
  dessineBoutonPoint8("black");
  dessineBoutonPoint10("black");
  switch (taillePointCrayon){
    case point2:
      dessineBoutonPoint2("gold");
      break;
    case point4 :
      dessineBoutonPoint4("gold");
      break;
    case point6 :
      dessineBoutonPoint6("gold");
      break;
    case point8 :
      dessineBoutonPoint8("gold");
      break;
    case point10 :
      dessineBoutonPoint10("gold");
      break;
  }
}

function effacerBoutons() {
  effacerBoutonsCouleur();
  effacerBoutonsPoint();
}

couleurNoirGauche,
                        couleurNoirHaut
function effacerBoutonsCouleur() {
  dessineUnRectanglePlein(couleurNoirGauche,
                          couleurNoirHaut,
                          couleurVertDroite - couleurNoirGauche,
                          30,
                          couleurFond,
                          couleurFond,
                          3);
}

function effacerBoutonsPoint() {
  dessineUnRectanglePlein(point2Gauche,
                          point2Haut,
                          taillePointBouton,
                          point10Bas - point2Haut,
                          couleurFond,
                          couleurFond,
                          3);
}



function dessineBoutonPoint2(colorBorder) {
  color = "white";
  dessineUnRectanglePlein(point2Gauche,
                          point2Haut,
                          taillePointBouton,
                          taillePointBouton,
                          color,
                          colorBorder,
                          3);
  dessineUnRectanglePlein((point2Gauche + point2Droite - point2) / 2,
                          (point2Haut + point2Bas - point2) / 2,
                          point2,
                          point2,
                          "black",
                          colorBorder,
                          0);
  context.restore();
}

function dessineBoutonPoint4(colorBorder) {
  color = "white";
  dessineUnRectanglePlein(point4Gauche,
                          point4Haut,
                          taillePointBouton,
                          taillePointBouton,
                          color,
                          colorBorder,
                          3);
  dessineUnRectanglePlein((point4Gauche + point4Droite - point4) / 2,
                          (point4Haut + point4Bas - point4) / 2,
                          point4,
                          point4,
                          "black",
                          colorBorder,
                          0);
  context.restore();
}

function dessineBoutonPoint6(colorBorder) {
  color = "white";
  dessineUnRectanglePlein(point6Gauche,
                          point6Haut,
                          taillePointBouton,
                          taillePointBouton,
                          color,
                          colorBorder,
                          3);
  dessineUnRectanglePlein((point6Gauche + point6Droite - point6) / 2,
                          (point6Haut + point6Bas - point6) / 2,
                          point6,
                          point6,
                          "black",
                          colorBorder,
                          0);
  context.restore();
}

function dessineBoutonPoint8(colorBorder) {
  color = "white";
  dessineUnRectanglePlein(point8Gauche,
                          point8Haut,
                          taillePointBouton,
                          taillePointBouton,
                          color,
                          colorBorder,
                          3);
  dessineUnRectanglePlein((point8Gauche + point8Droite - point8) / 2,
                          (point8Haut + point8Bas - point8) / 2,
                          point8,
                          point8,
                          "black",
                          colorBorder,
                          0);
  context.restore();
}

function dessineBoutonPoint10(colorBorder) {
  color = "white";
  dessineUnRectanglePlein(point10Gauche,
                          point10Haut,
                          taillePointBouton,
                          taillePointBouton,
                          color,
                          colorBorder,
                          3);
  dessineUnRectanglePlein((point10Gauche + point10Droite - point10) / 2,
                          (point10Haut + point10Bas - point10) / 2,
                          point10,
                          point10,
                          "black",
                          colorBorder,
                          0);
  context.restore();
}

function dessineBoutonNoir(colorBorder) {
  color = couleurNoir;
  dessineUnRectanglePlein(couleurNoirGauche,
                          couleurNoirHaut,
                          tailleCouleurBouton,
                          30,
                          color,
                          colorBorder,
                          3);
  context.restore();
}


function dessineBoutonBleu(colorBorder) {

  color = couleurBleu;
  dessineUnRectanglePlein(couleurBleuGauche,
                          couleurBleuHaut,
                          tailleCouleurBouton,
                          30,
                          color,
                          colorBorder,
                          3);
  context.restore();
}

function dessineBoutonRouge(colorBorder) {

  color = couleurRouge;
  dessineUnRectanglePlein(couleurRougeGauche,
                          couleurRougeHaut,
                          tailleCouleurBouton,
                          30,
                          color,
                          colorBorder,
                          3);
  context.restore();
}

function dessineBoutonJaune(colorBorder) {

  color = couleurJaune;
  dessineUnRectanglePlein(couleurJauneGauche,
                          couleurJauneHaut,
                          tailleCouleurBouton,
                          30,
                          color,
                          colorBorder,
                          3);
  context.restore();
}

function dessineBoutonVert(colorBorder) {

  color = couleurVert;
  dessineUnRectanglePlein(couleurVertGauche,
                          couleurVertHaut,
                          tailleCouleurBouton,
                          30,
                          color,
                          colorBorder,
                          3);
  context.restore();
}


function dessineBoutonActeur(couleurBord) {

  if (!couleurBord) {
    couleurBord = "black";
  }

  color              = "Gainsboro";
  boutonActeurGauche = (canvas.width - espaceDroite) / 2;
  boutonActeurDroite = boutonActeurGauche + espaceDroite;
  boutonActeurHaut   = espaceTitre + 20;
  boutonActeurBas    = boutonActeurHaut + 30;
  dessineUnRectanglePlein(boutonActeurGauche,
                          boutonActeurHaut,
                          espaceDroite,
                          30,
                          color,
                          couleurBord,
                          3);

  context.font         = "bold 20px Cambria";
  context.textAlign    = "center";
  context.textBaseline = "middle";

  context.fillStyle    = "grey";
  context.fillText(typeDeJoueur, (boutonActeurGauche + boutonActeurDroite) / 2, (boutonActeurHaut + boutonActeurBas) / 2);

  context.restore();
  if (typeDeJoueur === "Dessinateur") {
    document.body.style.cursor="url(./images/crayon_256x256.png), auto";
  } else {
    document.body.style.cursor="url(./images/Viseur.png), auto";
  }

}

function dessineBoutonRejouer(couleurBord) {

  if (typeDeJoueur === "Observateur") {

    color               = couleurFond;
    boutonRejouerGauche = canvas.width - espaceDroite;
    boutonRejouerDroite = boutonRejouerGauche + espaceDroite;
    boutonRejouerHaut   = espaceHaut + espaceTitre + 30 + 20;
    boutonRejouerBas    = boutonRejouerHaut + 30;
    dessineUnRectanglePlein(boutonRejouerGauche + 4,
                            boutonRejouerHaut,
                            espaceDroite - 8,
                            30,
                            color,
                            color,
                            3);

    if (!couleurBord) {
      couleurBord = "black";
    }

    color = "Gainsboro";
    dessineUnRectanglePlein(boutonRejouerGauche + 4,
                            boutonRejouerHaut,
                            espaceDroite - 8,
                            30,
                            color,
                            couleurBord,
                            3);

    context.font         = "bold 20px Cambria";
    context.textAlign    = "center";
    context.textBaseline = "middle";

    context.fillStyle    = "grey";
    context.fillText("Rejouer dessin", (boutonRejouerGauche + boutonRejouerDroite) / 2, (boutonRejouerHaut + boutonRejouerBas) / 2);

    context.restore();
  }
}

function dessineBoutonReinit(couleurBord) {

  if (typeDeJoueur === "Dessinateur") {

    color              = couleurFond;
    boutonReinitGauche = canvas.width - espaceDroite;
    boutonReinitDroite = boutonReinitGauche + espaceDroite;
    boutonReinitHaut   = espaceHaut + espaceTitre + 30+20;
    boutonReinitBas    = boutonReinitHaut + 30;
    dessineUnRectanglePlein(boutonReinitGauche + 4,
                            boutonReinitHaut,
                            espaceDroite - 8,
                            30,
                            color,
                            color,
                            3);

    if (!couleurBord) {
      couleurBord = "black";
    }

    color = "Gainsboro";
    dessineUnRectanglePlein(boutonReinitGauche + 4,
                            boutonReinitHaut,
                            espaceDroite - 8,
                            30,
                            color,
                            couleurBord,
                            3);

    context.font         = "bold 20px Cambria";
    context.textAlign    = "center";
    context.textBaseline = "middle";

    context.fillStyle    = "grey";
    context.fillText("Nouveau dessin", (boutonReinitGauche + boutonReinitDroite) / 2, (boutonReinitHaut + boutonReinitBas) / 2);

    context.restore();
  }
}

function dessinerTempsRestant() {

  color       = "Gainsboro";

  let tempsRestantGauche = canvas.width - espaceDroite + 10;
  let tempsRestantDroite = canvas.width - 10;
  let tempsRestantHaut   = espaceHaut + 210;
  let tempsRestantBas    = tempsRestantHaut + espaceDroite - 20;

  dessineUnRectanglePlein(tempsRestantGauche,
                          tempsRestantHaut,
                          espaceDroite - 20,
                          espaceDroite - 20,
                          couleurFond,
                          couleurFond,
                          3);

  context.font         = "bold 110px Cambria";
  context.textAlign    = "center";
  context.textBaseline = "middle";

  couleurTempsRestantRouge = 0xFF - Math.trunc((0xFF) * tempsRestant / tempsRestantMax);
  couleurTempsRestantVert  = 0x00 + Math.trunc((0xFF) * tempsRestant / tempsRestantMax);
  couleurTempsRestant      = "#" + toHex(couleurTempsRestantRouge) + toHex(couleurTempsRestantVert) + "00";

  context.fillStyle = couleurTempsRestant;
  context.fillText(tempsRestant, (tempsRestantGauche + tempsRestantDroite) / 2, (tempsRestantHaut + tempsRestantBas) / 2);

  context.restore();
}

function viderReponse() {
  dessineUnRectanglePlein(champReponseGauche,
                          champReponseHaut,
                          champReponseDroite - champReponseGauche,
                          60,
                          couleurFond,
                          couleurFond,
                          4);
  context.restore();

}

function dessineChampReponse(couleurBord) {

  if (!couleurBord) {
    couleurBord = "black";
  }

  color              = "Gainsboro";
  champReponseGauche = espaceGauche - (espaceGauche / 2) - 25;
  champReponseDroite = canvas.width - (espaceDroite / 2) + 25;
  champReponseHaut   = canvas.height - (espaceBas / 2) - 10;
  champReponseBas    = champReponseHaut + 60;
  dessineUnRectanglePlein(champReponseGauche,
                          champReponseHaut,
                          champReponseDroite - champReponseGauche,
                          60,
                          color,
                          couleurBord,
                          3);

  context.font         = "bold 55px Cambria";
  context.textAlign    = "center";
  context.textBaseline = "middle";

  context.fillStyle = "black";
  context.fillText(reponse, (champReponseGauche + champReponseDroite) / 2, (champReponseHaut + champReponseBas) / 2);

  context.restore();
}

function dessineChampMotATrouver(couleurBord) {

  if (!couleurBord) {
    couleurBord = "black";
  }

  color              = "Gainsboro";
  champReponseGauche = espaceGauche - (espaceGauche / 2) - 25;
  champReponseDroite = canvas.width - (espaceDroite / 2) + 25;
  champReponseHaut   = canvas.height - (espaceBas / 2) - 10;
  champReponseBas    = champReponseHaut + 60;
  dessineUnRectanglePlein(champReponseGauche,
                          champReponseHaut,
                          champReponseDroite - champReponseGauche,
                          60,
                          color,
                          couleurBord,
                          3);

  context.font         = "bold 55px Cambria";
  context.textAlign    = "center";
  context.textBaseline = "middle";

  context.font         = "bold 55px Cambria";
  context.textAlign    = "center";
  context.textBaseline = "middle";

  context.fillStyle = "black";
  context.fillText(motATrouver, (champReponseGauche + champReponseDroite) / 2, (champReponseHaut + champReponseBas) / 2);

  context.restore();
}

function dessineTempsRestant(couleurBord) {

  if (!couleurBord) {
    couleurBord = "black";
  }

  color              = "Gainsboro";
  boutonReinitGauche = canvas.width - espaceDroite;
  boutonReinitDroite = boutonRejouerGauche + espaceDroite;
  boutonReinitHaut   = espaceHaut + espaceTitre + 100;
  boutonReinitBas    = boutonReinitHaut + 30;
  dessineUnRectanglePlein(boutonReinitGauche,
                          boutonReinitHaut,
                          espaceDroite,
                          30,
                          color,
                          couleurBord,
                          3);

  context.font         = "bold 20px Cambria";
  context.textAlign    = "center";
  context.textBaseline = "middle";

  context.fillStyle    = "grey";
  context.fillText("Nouveau dessin", (boutonReinitGauche + boutonReinitDroite) / 2, (boutonReinitHaut + boutonReinitBas) / 2);

  context.restore();
}


function dessineUnRectanglePlein(x, y, width, height, fillStyle, couleurBord, tailleBordure) {

  let dessineCouleurBordure = couleurBord;

  let dessineTailleBordure = tailleBordure;

  if (tailleBordure > 0) {
    context.fillStyle = couleurBord;
    context.fillRect( x - tailleBordure, y - tailleBordure, width + (tailleBordure * 2), height + (tailleBordure * 2) );
  }

  context.fillStyle = fillStyle;
  context.fillRect( x, y, width, height);

//  context.rect( x, y, width, height);

  context.restore();
}


function dessineLigne(x, y, taille, couleur, type) {
  switch (type) {
    case "demarre" :
      demarreLigne(x, y, taille, couleur);
      break;
    case "continu" :
      continuLigne(x, y, taille, couleur);
      break;
    case "fini" :
      finiLigne(x, y, taille, couleur);
      break;
  }
}


function demarreLigne(x, y, taille, couleur) {
  contextLigne.beginPath();
  contextLigne.lineWidth   = taille;
  contextLigne.strokeStyle = couleur;
  contextLigne.lineCap = "round"
  contextLigne.moveTo (x, y);
  contextLigne.lineTo(x, y);
  contextLigne.stroke();
}


function continuLigne(x, y, taille, couleur) {
  contextLigne.lineWidth   = taille;
  contextLigne.strokeStyle = couleur;
  contextLigne.lineCap = "round"
  contextLigne.lineTo(x, y);
  contextLigne.stroke();
}


function finiLigne(x, y, taille, couleur) {
  contextLigne.closePath();
  contextLigne.restore();
}

function dessinerInterfaceActeur() {
  if (typeDeJoueur === "Dessinateur") {
    viderReponse();
    dessineChampMotATrouver();
    dessineBoutonsCouleur();
    dessineBoutonsPoint();
  } else {
    dessineChampReponse();
    effacerBoutons();
  }
  dessineBoutonRejouer();
  dessineBoutonReinit();
  dessineBoutonActeur();
}


function ecouterSouris() {
  $("body").on("contextmenu", "#canvasPictionary", function(e) { // supprime l"apparition du contexte-menu quand Click Bouton Droit
    return false;
  });

  $(canvas).on("mousemove touchmove", function (evt) { // au survol de la souris
    console.log("touchmove");
    mousePos = getMousePos(canvas, evt);
    if (typeDeJoueur === "Dessinateur") {
      if (ecouteMousemove) {
        if ((mousePos.x >= (dessinGauche + taillePointCrayon / 2) && mousePos.x <= (dessinDroite - taillePointCrayon / 2))
         && (mousePos.y >= (dessinHaut + taillePointCrayon / 2)   && mousePos.y <= (dessinBas - taillePointCrayon / 2) )) {
           let colorCrayon
           if(evt.which == 3) {
             console.log("Bouton droite enfoncé");
             colorCrayon = "white";
           } else {
             colorCrayon = couleurCrayon;
           }

        // dessineUnRectanglePlein(mousePos.x - (taillePointCrayon / 2), mousePos.y - (taillePointCrayon / 2), taillePointCrayon, taillePointCrayon, colorCrayon, "", 0);
           let dessinPoint = {
             x: 0,
             y: 0,
             taille: 0,
             couleur: "",
             type: ""
           };
           dessinPoint.x       = mousePos.x - (taillePointCrayon / 2);
           dessinPoint.y       = mousePos.y - (taillePointCrayon / 2);
           dessinPoint.taille  = taillePointCrayon;
           dessinPoint.couleur = colorCrayon;
           dessinPoint.type    = "continu";
          //  dessineLigne(dessinPoint.x, dessinPoint.y, dessinPoint.taille, dessinPoint.couleur, dessinPoint.type);

           let savePoint = new Point(dessinPoint.x, dessinPoint.y, dessinPoint.taille, dessinPoint.couleur, dessinPoint.type);
           savePoint.dessine(contextLigne);
           envoiPoint(savePoint);
        }
      }
      if ((mousePos.x >= couleurNoirGauche && mousePos.x <= couleurNoirDroite)
      &&  (mousePos.y >= couleurNoirHaut   && mousePos.y <= couleurNoirBas )) {
        dessineBoutonsCouleur();
        dessineBoutonNoir("gold");
      }
      if ((mousePos.x >= couleurBleuGauche && mousePos.x <= couleurBleuDroite)
      &&  (mousePos.y >= couleurBleuHaut   && mousePos.y <= couleurBleuBas )) {
        dessineBoutonsCouleur();
        dessineBoutonBleu("gold");
      }
      if ((mousePos.x >= couleurRougeGauche && mousePos.x <= couleurRougeDroite)
      &&  (mousePos.y >= couleurRougeHaut   && mousePos.y <= couleurRougeBas )) {
        dessineBoutonsCouleur();
        dessineBoutonRouge("gold");
      }
      if ((mousePos.x >= couleurJauneGauche && mousePos.x <= couleurJauneDroite)
      &&  (mousePos.y >= couleurJauneHaut   && mousePos.y <= couleurJauneBas )) {
        dessineBoutonsCouleur();
        dessineBoutonJaune("gold");
      }
      if ((mousePos.x >= couleurVertGauche && mousePos.x <= couleurVertDroite)
      &&  (mousePos.y >= couleurVertHaut   && mousePos.y <= couleurVertBas )) {
        dessineBoutonsCouleur();
        dessineBoutonVert("gold");
      }
      if  ( ((mousePos.x >= couleurNoirGauche - 30 && mousePos.x <= couleurVertDroite + 30)
      &&     (mousePos.y >= couleurNoirHaut - 30   && mousePos.y <= couleurNoirBas + 30))
      &&   !((mousePos.x >= couleurNoirGauche      && mousePos.x <= couleurVertDroite)
      &&     (mousePos.y >= couleurNoirHaut        && mousePos.y <= couleurNoirBas ))
          ) {
        dessineBoutonsCouleur();
        switch (couleurCrayon) {
          case couleurNoir :
          dessineBoutonNoir("gold");
          break;
          case couleurBleu :
          dessineBoutonBleu("gold");
          break;
          case couleurRouge :
          dessineBoutonRouge("gold");
          break;
          case couleurJaune :
          dessineBoutonJaune("gold");
          break;
          case couleurVert :
          dessineBoutonVert("gold");
          break;
        }
      }
      if  ( ((mousePos.x >= point2Gauche - 30 && mousePos.x <= point2Droite + 30)
      && (mousePos.y >= point2Haut - 30 && mousePos.y <= point10Bas + 30))
      && !((mousePos.x >= point2Gauche && mousePos.x <= point2Droite)
      && (mousePos.y >= point2Haut && mousePos.y <= point10Bas))
          ) {
        dessineBoutonsPoint();
        switch (taillePointCrayon) {
          case point2 :
          dessineBoutonPoint2("gold");
          break;
          case point4 :
          dessineBoutonPoint4("gold");
          break;
          case point6 :
          dessineBoutonPoint6("gold");
          break;
          case point8 :
          dessineBoutonPoint8("gold");
          break;
          case point10 :
          dessineBoutonPoint10("gold");
          break;
        }
      }
    }
});

  $(canvas).on("mousedown touchend", function (evt) { // au click de la souris
    console.log("touchend");

    mousePos = getMousePos(canvas, evt);
    if (typeDeJoueur === "Dessinateur") {
      ecouteMousemove = true;
      if (ecouteMousemove) {
        if ((mousePos.x >= (dessinGauche + taillePointCrayon / 2) && mousePos.x <= (dessinDroite - taillePointCrayon / 2))
         && (mousePos.y >= (dessinHaut + taillePointCrayon / 2)   && mousePos.y <= (dessinBas - taillePointCrayon / 2) )) {
           let colorCrayon
           if(evt.which == 3) {
             console.log("Bouton droite enfoncé");
             colorCrayon = "white";
           } else {
             colorCrayon = couleurCrayon;
           }
        //   dessineUnRectanglePlein(mousePos.x - (taillePointCrayon / 2), mousePos.y - (taillePointCrayon / 2), taillePointCrayon, taillePointCrayon, colorCrayon, "", 0);
           let dessinPoint = {
             x: 0,
             y: 0,
             taille: 0,
             couleur: "",
             type: ""
           };
           dessinPoint.x       = mousePos.x - (taillePointCrayon / 2);
           dessinPoint.y       = mousePos.y - (taillePointCrayon / 2);
           dessinPoint.taille  = taillePointCrayon;
           dessinPoint.couleur = colorCrayon;
           dessinPoint.type    = "demarre";
          //  dessineLigne(dessinPoint.x, dessinPoint.y, dessinPoint.taille, dessinPoint.couleur, dessinPoint.type);
           let savePoint = new Point(dessinPoint.x, dessinPoint.y, dessinPoint.taille, dessinPoint.couleur, dessinPoint.type);
           savePoint.dessine(contextLigne);

           envoiPoint(savePoint);
        }
      }
      if ((mousePos.x >= boutonReinitGauche && mousePos.x <= boutonReinitDroite)
       && (mousePos.y >= boutonReinitHaut   && mousePos.y <= boutonReinitBas )) {
        dessineBoutonReinit("gold");
      }
    }

    if (typeDeJoueur === "Observateur") {
      if ((mousePos.x >= boutonRejouerGauche && mousePos.x <= boutonRejouerDroite)
       && (mousePos.y >= boutonRejouerHaut   && mousePos.y <= boutonRejouerBas )) {
        dessineBoutonRejouer("gold");
      }
    }

    if ((mousePos.x >= boutonActeurGauche && mousePos.x <= boutonActeurDroite)
     && (mousePos.y >= boutonActeurHaut   && mousePos.y <= boutonActeurBas )) {
      dessineBoutonActeur("gold");
    }

  });

  $(canvas).on("mouseup touchstart", function (evt) { // au click de la souris
    ecouteMousemove = false;
    mousePos = getMousePos(canvas, evt);
    if (typeDeJoueur === "Dessinateur") {
      if ((mousePos.x >= (dessinGauche + taillePointCrayon / 2) && mousePos.x <= (dessinDroite - taillePointCrayon / 2))
       && (mousePos.y >= (dessinHaut + taillePointCrayon / 2)   && mousePos.y <= (dessinBas - taillePointCrayon / 2) )) {
         let colorCrayon = couleurCrayon;
         if(evt.which == 3) {
           console.log("Bouton droite enfoncé");
           let colorCrayon = "white";
         } else {
           let colorCrayon = couleurCrayon;
         }
      //   dessineUnRectanglePlein(mousePos.x - (taillePointCrayon / 2), mousePos.y - (taillePointCrayon / 2), taillePointCrayon, taillePointCrayon, colorCrayon, "", 0);
        let dessinPoint = {
          x: 0,
          y: 0,
          taille: 0,
          couleur: "",
          type: ""
        };

        dessinPoint.x       = mousePos.x - (taillePointCrayon / 2);
        dessinPoint.y       = mousePos.y - (taillePointCrayon / 2);
        dessinPoint.taille  = taillePointCrayon;
        dessinPoint.couleur = colorCrayon;
        dessinPoint.type    = "fini";

        // dessineLigne(dessinPoint.x, dessinPoint.y, dessinPoint.taille, dessinPoint.couleur, dessinPoint.type);
        let savePoint = new Point(dessinPoint.x, dessinPoint.y, dessinPoint.taille, dessinPoint.couleur, dessinPoint.type);
        savePoint.dessine(contextLigne);

        envoiPoint(savePoint);
      }

      if ((mousePos.x >= couleurNoirGauche && mousePos.x <= couleurNoirDroite)
       && (mousePos.y >= couleurNoirHaut   && mousePos.y <= couleurNoirBas )) {
        couleurCrayon = couleurNoir;
        dessineBoutonsCouleur();
        dessineBoutonNoir("gold");
      }
      if ((mousePos.x >= couleurBleuGauche && mousePos.x <= couleurBleuDroite)
       && (mousePos.y >= couleurBleuHaut   && mousePos.y <= couleurBleuBas )) {
        couleurCrayon = couleurBleu;
        dessineBoutonsCouleur();
        dessineBoutonBleu("gold");
      }
      if ((mousePos.x >= couleurRougeGauche && mousePos.x <= couleurRougeDroite)
       && (mousePos.y >= couleurRougeHaut   && mousePos.y <= couleurRougeBas )) {
        couleurCrayon = couleurRouge;
        dessineBoutonsCouleur();
        dessineBoutonRouge("gold");
      }
      if ((mousePos.x >= couleurJauneGauche && mousePos.x <= couleurJauneDroite)
       && (mousePos.y >= couleurJauneHaut   && mousePos.y <= couleurJauneBas )) {
        couleurCrayon = couleurJaune;
        dessineBoutonsCouleur();
        dessineBoutonJaune("gold");
      }
      if ((mousePos.x >= couleurVertGauche && mousePos.x <= couleurVertDroite)
       && (mousePos.y >= couleurVertHaut   && mousePos.y <= couleurVertBas )) {
        couleurCrayon = couleurVert;
        dessineBoutonsCouleur();
        dessineBoutonVert("gold");
      }

      if ((mousePos.x >= point2Gauche && mousePos.x <= point2Droite)
       && (mousePos.y >= point2Haut   && mousePos.y <= point2Bas )) {
        taillePointCrayon = point2;
        dessineBoutonsPoint();
        dessineBoutonPoint2("gold");
      }
      if ((mousePos.x >= point4Gauche && mousePos.x <= point4Droite)
       && (mousePos.y >= point4Haut   && mousePos.y <= point4Bas )) {
        taillePointCrayon = point4;
        dessineBoutonsPoint();
        dessineBoutonPoint4("gold");
      }
      if ((mousePos.x >= point6Gauche && mousePos.x <= point6Droite)
       && (mousePos.y >= point6Haut   && mousePos.y <= point6Bas )) {
        taillePointCrayon = point6;
        dessineBoutonsPoint();
        dessineBoutonPoint6("gold");
      }
      if ((mousePos.x >= point8Gauche && mousePos.x <= point8Droite)
       && (mousePos.y >= point8Haut   && mousePos.y <= point8Bas )) {
        taillePointCrayon = point8;
        dessineBoutonsPoint();
        dessineBoutonPoint8("gold");
      }
      if ((mousePos.x >= point10Gauche && mousePos.x <= point10Droite)
       && (mousePos.y >= point10Haut   && mousePos.y <= point10Bas )) {
        taillePointCrayon = point10;
        dessineBoutonsPoint();
        dessineBoutonPoint10("gold");
      }
      if ((mousePos.x >= boutonReinitGauche && mousePos.x <= boutonReinitDroite)
       && (mousePos.y >= boutonReinitHaut   && mousePos.y <= boutonReinitBas )) {
        dessineBoutonReinit();
        reinitDessin();
        socket.emit("InitScore");
        socket.emit("InitCompteurTemps");
        demarrerCompteurTemps();
        socket.emit("Mot");
      }
    }

    if (etatManche === "Terminé") {
      if ((mousePos.x >= boutonReinitGauche && mousePos.x <= boutonReinitDroite)
       && (mousePos.y >= boutonReinitHaut   && mousePos.y <= boutonReinitBas )) {
         dessineBoutonRejouer();
         rejouerDessin();
      }
    }

    if (typeDeJoueur === "Observateur") {
      if ((mousePos.x >= boutonRejouerGauche && mousePos.x <= boutonRejouerDroite)
       && (mousePos.y >= boutonRejouerHaut   && mousePos.y <= boutonRejouerBas )) {
        dessineBoutonRejouer();
        rejouerDessin();
      }
    }

    if ((mousePos.x >= boutonActeurGauche && mousePos.x <= boutonActeurDroite)
     && (mousePos.y >= boutonActeurHaut   && mousePos.y <= boutonActeurBas )) {
       if (typeDeJoueur === "Dessinateur") {
         typeDeJoueur = "Observateur";
       } else {
         typeDeJoueur = "Dessinateur";
       }

       dessinerInterfaceActeur();
    }
  });
  $(canvas).on("wheel", function (evt) {
    mousePos = getMousePos(canvas, evt);
    if ((mousePos.x >= point2Gauche && mousePos.x <= point2Droite)
     && (mousePos.y >= point2Haut   && mousePos.y <= point10Bas )) {
      if (typeDeJoueur === "Dessinateur") {
         if (evt.originalEvent.deltaY > 0) { // Tour de molette vers le bas
          switch (taillePointCrayon){
            case point2:
              dessineBoutonPoint2("black");
              dessineBoutonPoint4("gold");
              taillePointCrayon = 4;
              break;
            case point4 :
              dessineBoutonPoint4("black");
              dessineBoutonPoint6("gold");
              taillePointCrayon = 6;
              break;
            case point6 :
              dessineBoutonPoint6("black");
              dessineBoutonPoint8("gold");
              taillePointCrayon = 8;
              break;
            case point8 :
              dessineBoutonPoint8("black");
              dessineBoutonPoint10("gold");
              taillePointCrayon = 10;
              break;
          }
        } else {                            // Tour de molette vers le haut
          switch (taillePointCrayon) {
            case point4:
              dessineBoutonPoint4("black");
              dessineBoutonPoint2("gold");
              taillePointCrayon = 2;
              break;
            case point6 :
              dessineBoutonPoint6("black");
              dessineBoutonPoint4("gold");
              taillePointCrayon = 4;
              break;
            case point8 :
              dessineBoutonPoint8("black");
              dessineBoutonPoint6("gold");
              taillePointCrayon = 6;
              break;
            case point10 :
              dessineBoutonPoint10("black");
              dessineBoutonPoint8("gold");
              taillePointCrayon = 8;
              break;
          }
        }
      }
    }
  });
}


function ecouterClavier() {

  document.addEventListener("keydown", onKeyDown, false);

  function onKeyDown(evt) {
    if (typeDeJoueur === "Observateur") {
      let ewhich   = evt.which;
      let charCode = String.fromCharCode(evt.which);
      let key      = evt.key;

      console.log("----------------");
      console.log("ewhich   : " + ewhich);
      console.log("charCode : " + charCode);
      console.log("key      : " + key);

      if (ewhich >= 65 && ewhich <= 90) { // entre A et Z
        if (reponse.length < 10) {
          reponse += charCode;
          dessineChampReponse();
        }
      } else
      if (key === VK_BACKSPACE) { // Backspace
        if (reponse.length > 0) {
          reponse = reponse.substr(0, reponse.length - 1);
          dessineChampReponse();
        }
      } else
      if (key === VK_ENTER) { // Enter
        if (reponse.length > 0) {
          console.log(reponse);
          console.log(motATrouver.toUpperCase());
          if (reponse == motATrouver.toUpperCase()) {
            arreterCompteurTemps();
            console.log("Partie Gagné");
            // dessiner DESSINATEUR A GAGNE
            socket.emit("Gagne");
            socket.emit("Point", "Gagné");
            dessineGagne();
          }
        }
      }
    }
  }
}

function ecouterWebSocket() {
//  let exampleSocket = new WebSocket("ws://localhost:9000");

  socket = io();

  socket.on("Point", function(point){
    if (typeDeJoueur === "Observateur") {
      console.log("point", point);
      let pointReceive = new Point(point.x, point.y, point.taille, point.couleur, point.type);
      dessin.push(pointReceive);
      console.log("pointReceive", pointReceive);
      if (!etatRejouer) {
        pointReceive.dessine(contextLigneReception);
      }
    }
  });
  socket.on("Mot", function(mot){
    motATrouver = mot.toUpperCase();
    console.log("Mot = " + mot);
    if (typeDeJoueur === "Dessinateur") {
      dessineChampMotATrouver();
    }
    reinitDessin();
    demarrerCompteurTemps();
  });

  socket.on("Gagne", function(score){
    console.log("score = " + score);
    scoreGagne = score;
    console.log("scoreGagne = " + scoreGagne);
    arreterCompteurTemps();
    dessineGagne();
    dessineAutour();
    AttenteMancheSuivante();
  });

  socket.on("Perdu", function(score){
    console.log("score = " + score)
    console.log("scorePerdu = " + scorePerdu);
    scorePerdu = score;
    arreterCompteurTemps();
    dessinePerdu();
    dessineAutour();
    AttenteMancheSuivante();
  });

  socket.on("InitCompteurTemps", function(score){
    demarrerCompteurTemps();
  });

  socket.on("InverserActeur", function(score){
    if (typeDeJoueur === "Dessinateur") {
      typeDeJoueur = "Observateur";
    } else
    if (typeDeJoueur === "Observateur") {
      typeDeJoueur = "Dessinateur";
    }
    dessinePlateau();
    socket.emit("InitCompteurTemps");
    demarrerCompteurTemps();
    socket.emit("Mot");
    etatManche = "enCours"
  });

}

function AttenteMancheSuivante() {
  clearInterval(intervalTemps);
  intervalTemps = setInterval(function() {
    if (typeDeJoueur === "Dessinateur") {
      socket.emit("InverserActeur");
      clearInterval(intervalTemps);
    }
  }, 5000);

}

function getMousePos(canvas, evt) {
   return {
      x: evt.originalEvent.offsetX + (taillePointCrayon / 2),
      y: evt.originalEvent.offsetY + 32+ (taillePointCrayon / 2)
   };
}

function rejouerDessin() {
  dessinePlancheADessin("white");
  i = 0;
  document.body.style.cursor="progress";
  redessineDessin();
}

function reinitDessin() {
  dessinePlancheADessin("white");
  dessin = [];
  reponse = "";
}

function redessineDessin() {
  if (i < dessin.length) {
    etatRejouer = true;
    let dessinPoint = {
      x: 0,
      y: 0,
      taille: 0,
      couleur: "",
      type: ""
    };
    dessinPoint = dessin[i++];
    let savePoint = new Point(dessinPoint.x, dessinPoint.y, dessinPoint.taille, dessinPoint.couleur, dessinPoint.type);
  //  dessineUnRectanglePlein(dessinPoint.x, dessinPoint.y, dessinPoint.taille, dessinPoint.taille, dessinPoint.couleur, "", 0);
    savePoint.dessine(contextLigne);
    //dessineLigne(dessinPoint.x, dessinPoint.y, dessinPoint.taille, dessinPoint.couleur, dessinPoint.type);
    varTimeOut = setTimeout(redessineDessin, 0);
  } else {
    etatRejouer = false;
    if (typeDeJoueur === "Dessinateur") {
      document.body.style.cursor="url(./images/crayon_256x256.png), auto";
    } else {
      document.body.style.cursor="url(./images/Viseur.png), auto";
    }
  }
}


function envoiPoint(Point) {
  dessin.push(Point);
  if (typeDeJoueur === "Dessinateur") {
    socket.emit("Point", Point);
  }
//  socket.emit("Point", { point: [ savePoint ] });
/*  socket.emit("Point", Point); */
}
