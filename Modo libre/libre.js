var columnas;
var cuadrados;
var mapaColor;
var nuevocolor;
var cuadradoColumnas;
var elementosFaltantes;
var queue = [];
var accion = false;

document.addEventListener("coloris:pick", (event) => {
  nuevocolor = event.detail.color;
});

var checkbox = document.querySelector("#checkbox-id");

function preload() {
  dino = loadImage("../Imagenes-Fuentes/Dino_Azul.png");
  mapas = loadJSON("../JSONS-Scripts/mapas.json");
}

function setup() {
  canva = createCanvas(480, 480);
  canva.parent("canva");
  mapaColor = mapas.mapasColor._6x6Color;
  mapaDino = mapas.mapasDino._6x6Dino;
  columnas = filas = Math.sqrt(mapaColor.length);
  cuadrados = Math.sqrt(230400 / mapaColor.length);
  mapaDino[0] = dino;
}

function updateValue() {
  columnas = parseInt(document.querySelector("#columnas").value);
  if (columnas <= 0 || isNaN(columnas)) {
    columnas = 1;
  }
  if (columnas > 40) {
    columnas = 40;
  }
  cuadradoColumnas = columnas * columnas;
  elementosFaltantes = columnas * columnas - mapaColor.length;
  for (var i = 0; i < elementosFaltantes; i++) {
    mapaColor.push(255);
    mapaDino.push(null);
  }
  cuadrados = parseInt(document.querySelector("#cuadrados").value);
  if (cuadrados < 15 || isNaN(cuadrados)) {
    cuadrados = 15;
  }
  if (cuadrados > 100) {
    cuadrados = 100;
  }
  x = cuadrados * columnas;
  resizeCanvas(x, x);
}

function draw() {
  handlequeue();
  Quadrille.CELL_LENGTH = cuadrados;
  posicion = mapaDino.indexOf(dino);
  quadrilleColor = createQuadrille(columnas, mapaColor);
  quadrilleDino = createQuadrille(columnas, mapaDino);
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

function exportPNG() {
  drawQuadrille(quadrilleColor, { outlineWeight: 0 });
  save(canva, "myCanvas.png");
}

Coloris({
  el: ".coloris",
});

Coloris.setInstance(".instance2", {});
