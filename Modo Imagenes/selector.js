var nivelImagenes = parseInt(localStorage.getItem("nivelImagenes"));
var checkbox = document.querySelector("#checkbox-id");
var linkEmpezar = document.getElementById("linkEmpezar");
var timerDisplay = document.getElementById("timerDisplay");
var modoh2 = document.getElementById("modoh2");
var imagenes;
var imagenjson;
var imagen;
var timer;
var seconds;
var filas;
var keys;
var keyAleatoria;
var clickempezar=false;

function empezar(link) {
  cuentaAtras();
  link.removeEventListener("click", empezar);
  link.style.pointerEvents = "none";
  clickempezar=true;
  reemplazarLink();
}

function preload() {
  imagenes = loadJSON("../JSONS-Scripts/imagenes.json");
}

function setup() {
  let canva = createCanvas(480, 480);
  canva.parent("canva");
  if (nivelImagenes === 1) {
    keys = Object.keys(imagenes.imagenes_facil);
    keyAleatoria = keys[Math.floor(Math.random() * keys.length)];
    imagenjson = imagenes.imagenes_facil[keyAleatoria];
    modoh2.textContent = "Modo Facil";
    seconds = 150;
  } else if (nivelImagenes === 2) {
    keys = Object.keys(imagenes.imagenes_intermedio);
    keyAleatoria = keys[Math.floor(Math.random() * keys.length)];
    imagenjson = imagenes.imagenes_intermedio[keyAleatoria];
    modoh2.textContent = "Modo Intermedio";
    seconds = 120;
  } else if (nivelImagenes === 3) {
    keys = Object.keys(imagenes.imagenes_dificil);
    keyAleatoria = keys[Math.floor(Math.random() * keys.length)];
    imagenjson = imagenes.imagenes_dificil[keyAleatoria];
    modoh2.textContent = "Modo Dificil";
    seconds = 90;
  }
  var arrayString = JSON.stringify(imagenjson);
  localStorage.setItem("imagenjson", arrayString);
  Quadrille.CELL_LENGTH = Math.sqrt(230400 / imagenjson.length);
  filas = Math.sqrt(imagenjson.length);
  imagen = imagenjson.map((c) => color(`${c}`));
  timerDisplay.innerHTML = seconds + "<sub>s</sub>";
}

function draw() {
  quadrille = createQuadrille(filas, imagen);
  clickempezar
  ? checkbox.checked
    ? drawQuadrille(quadrille, { outlineWeight: 0 })
    : drawQuadrille(quadrille)
  : null;
    
}

function cuentaAtras() {
  timer = setInterval(function () {
    seconds--;
    if (seconds < 0) {
      clearInterval(timer);
      finTimer();
    } else {
      document.getElementById("timerDisplay").innerHTML =
        seconds + "<sub>s</sub>";
    }
  }, 1000);
}

function reemplazarLink() {
  let linkSaltar = document.createElement("a");
  linkSaltar.href = "index.html";
  linkSaltar.textContent = "Saltar";
  linkSaltar.classList.add("eightbit-btn");

  linkEmpezar.replaceWith(linkSaltar);
}

function finTimer() {
  window.location.href = "index.html";
}
