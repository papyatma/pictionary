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
        this.demarreLaLigne(context);
        break;
      case "continu" :
        this.continuLaLigne(context);
        break;
      case "fini" :
        this.finiLaLigne(context);
        break;
    }
  }

  demarreLaLigne(context) {
    context.beginPath();
    context.lineWidth   = this.taille;
    context.strokeStyle = this.couleur;
    context.moveTo (this.x, this.y);
    context.lineTo(this.x, this.y);
    context.stroke();
  }

  continuLaLigne(context) {
    context.lineWidth   = this.taille;
    context.strokeStyle = this.couleur;
    context.lineTo(this.x, this.y);
    context.stroke();
  }

  finiLaLigne(context) {
    context.closePath();
    context.restore();
  }

}
