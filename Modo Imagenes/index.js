var imagenJsonRaw = localStorage.getItem("imagenjson");
var imagenjson = JSON.parse(imagenJsonRaw);
var paleta = generarPaleta(imagenjson);
var nivelImagenes = parseInt(localStorage.getItem("nivelImagenes"));
var mapaColor;
var nuevocolor;
var filas;
var queue = [];
var accion = false;

var checkbox = document.querySelector("#checkbox-id");

document.addEventListener("coloris:pick", (event) => {
  nuevocolor = event.detail.color;
});

function preload() {
  dino = loadImage("../Imagenes-Fuentes/Dino_Azul.png");
  mapas = loadJSON("../JSONS-Scripts/mapas.json");
}

function setup() {
  let canva = createCanvas(480, 480);
  canva.parent("canva");
  if (nivelImagenes === 1) {
    mapaColor = mapas.mapasColor._6x6Color;
    mapaDino = mapas.mapasDino._6x6Dino;
  } else if (nivelImagenes === 2) {
    mapaColor = mapas.mapasColor._10x10Color;
    mapaDino = mapas.mapasDino._10x10Dino;
  } else if (nivelImagenes === 3) {
    mapaColor = mapas.mapasColor._16x16Color;
    mapaDino = mapas.mapasDino._16x16Dino;
  }
  Quadrille.CELL_LENGTH = Math.sqrt(230400 / mapaColor.length);
  filas = Math.sqrt(mapaColor.length);
  mapaDino[0] = dino;
}

function draw() {
  handlequeue();
  posicion = mapaDino.indexOf(dino);
  quadrilleColor = createQuadrille(filas, mapaColor);
  quadrilleDino = createQuadrille(filas, mapaDino);
  checkbox.checked
    ? drawQuadrille(quadrilleColor, { outlineWeight: 0 })
    : drawQuadrille(quadrilleColor);
  drawQuadrille(quadrilleDino, { outlineWeight: 0 });
}

function keyPressed() {
  if (!accion && !queue.includes(keyCode)) {
    queue.push(keyCode);
  }
}

function handlequeue() {
  if (queue.length > 0) {
    const keyactual = queue[0];
    if (key == "w") {
      nuevaposicion = posicion - Math.sqrt(mapaColor.length);
      if (nuevaposicion <= -1) {
        aux =
          posicion +
          Math.sqrt(mapaColor.length) * (Math.sqrt(mapaColor.length) - 1);
        mapaDino[posicion] = null;
        mapaDino[aux] = dino;
      } else {
        mapaDino[posicion] = null;
        mapaDino[nuevaposicion] = dino;
      }
    }

    if (key == "s") {
      nuevaposicion = posicion + Math.sqrt(mapaColor.length);
      if (nuevaposicion >= mapaColor.length) {
        aux =
          posicion -
          Math.sqrt(mapaColor.length) * (Math.sqrt(mapaColor.length) - 1);
        mapaDino[posicion] = null;
        mapaDino[aux] = dino;
      } else {
        mapaDino[posicion] = null;
        mapaDino[nuevaposicion] = dino;
      }
    }

    if (key == "d") {
      nuevaposicion = posicion + 1;
      if (nuevaposicion >= mapaColor.length) {
        aux = posicion - (Math.sqrt(mapaColor.length) - 1);
        mapaDino[posicion] = null;
        mapaDino[aux] = dino;
      } else {
        mapaDino[posicion] = null;
        mapaDino[nuevaposicion] = dino;
      }
    }

    if (key == "a") {
      nuevaposicion = posicion - 1;
      if (nuevaposicion <= -1) {
        aux = posicion + (Math.sqrt(mapaColor.length) - 1);
        mapaDino[posicion] = null;
        mapaDino[aux] = dino;
      } else {
        mapaDino[posicion] = null;
        mapaDino[nuevaposicion] = dino;
      }
    }

    if (keyCode === 32) {
      mapaColor[posicion] = color(`${nuevocolor}`);
    }
    queue.shift();
  }
  accion = queue.length > 0;
}

function submit() {
  var arrayString = JSON.stringify(mapaColor);
  localStorage.setItem("mapaColor", arrayString);
}

function generarPaleta(elementos) {
  var paleta = [...new Set(elementos)];
  return paleta;
}

Coloris({
  el: ".coloris",
  swatches: paleta,
});

Coloris.setInstance(".instance3", {
  theme: "polaroid",
  swatchesOnly: true,
});
