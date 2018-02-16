class Point {
  constructor(x, y, taille, couleur, type) {
    this.x       = x;
    this.y       = y;
    this.taille  = taille;
    this.couleur = couleur;
    this.type    = type;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getTaille() {
    return this.taille;
  }
  getCouleur() {
    return this.couleur;
  }
  getType() {
    return this.type;
  }
  setX(x) {
    this.x;
  }
  setY(y) {
    this.y;
  }
  setTaille(taille) {
    this.taille;
  }
  setCouleur(couleur) {
    this.couleur;
  }
  setType(type) {
    this.type;
  }

  dessine(context) {
    this.dessineLaLigne(context);
  }

  dessineLaLigne(context) {
    switch (this.type) {
      case "demarre" :
        this.demarreLaLigne();
        break;
      case "continu" :
        this.continuLaLigne();
        break;
      case "fini" :
        this.finiLaLigne();
        break;
    }
  }

  demarreLaLigne() {
    console.log("demarreLaLigne(" + this.x + ", " + this.y + ", " + this.taille + ", " + this.couleur + ")")
    contextLigne.beginPath();
    contextLigne.lineWidth   = this.taille;
    contextLigne.strokeStyle = this.couleur;
    contextLigne.moveTo (this.x, this.y);
    contextLigne.lineTo(this.x, this.y);
    contextLigne.stroke();
  }

  continuLaLigne() {
    console.log("continuLaLigne(" + this.x + ", " + this.y + ", " + this.taille + ", " + this.couleur + ")")
    contextLigne.lineWidth   = this.taille;
    contextLigne.strokeStyle = this.couleur;
    contextLigne.lineTo(this.x, this.y);
    contextLigne.stroke();
  }

  finiLaLigne() {
    console.log("   finiLaLigne")
    contextLigne.closePath();
    contextLigne.restore();
  }

}
