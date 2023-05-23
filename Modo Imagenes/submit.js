var score = document.getElementById("score");
var fallos = document.getElementById("fallos");
var checkbox = document.querySelector("#checkbox-id");
var imagen;
var mapaColor;
var diferencias = 0;

function preload() {
  imagenes = loadJSON("../JSONS-Scripts/imagenes.json");
}

var canvas1 = new p5(function (p1) {
  p1.setup = function () {
    p1.createCanvas(480, 480).parent("canva_ref");
    var imagenJsonRaw = localStorage.getItem("imagenjson");
    var imagenjson = JSON.parse(imagenJsonRaw);
    imagen = imagenjson.map((c) => p1.color(`${c}`));
    filas = Math.sqrt(imagenjson.length);
    Quadrille.CELL_LENGTH = Math.sqrt(230400 / imagenjson.length);
    enviarDatos();
    quadrille_ref = p1.createQuadrille(filas, imagen);
  };

  p1.draw = function () {
    p1.background(255);
    checkbox.checked
      ? p1.drawQuadrille(quadrille_ref, { outlineWeight: 0 })
      : p1.drawQuadrille(quadrille_ref);
  };
});

var canvas2 = new p5(function (p2) {
  p2.setup = function () {
    p2.createCanvas(480, 480).parent("canva_player");
    var mapaColorRaw = localStorage.getItem("mapaColor");
    var mapaColorJson = JSON.parse(mapaColorRaw);
    var mapaColorHex = hexArray(mapaColorJson);
    mapaColor = mapaColorHex.map((c) => p2.color(`${c}`));
    filas2 = Math.sqrt(mapaColor.length);
    enviarDatos();
    quadrille_player = p2.createQuadrille(filas2, mapaColor);
  };
  p2.draw = function () {
    p2.background(255);
    checkbox.checked
      ? p2.drawQuadrille(quadrille_player, { outlineWeight: 0 })
      : p2.drawQuadrille(quadrille_player);
  };
});

function hexArray(originalArray) {
  const hex = (num) => num.toString(16);
  const hexa = (str) => "#" + str;
  const finalArray = originalArray.map((element) => {
    if (typeof element === "object" && element.hasOwnProperty("levels")) {
      const hexstr = element.levels.map((level) => hex(level)).join("");
      return hexa(hexstr);
    } else if (typeof element === "number" && element === 255) {
      return "#FFFFFF";
    } else {
      return "";
    }
  });

  return finalArray;
}

function enviarDatos() {
  if (imagen && mapaColor) {
    var numeroDiferencias = compararLevels(imagen, mapaColor);
    fallos.textContent = "Fallos:" + numeroDiferencias;
    porcentaje = (numeroDiferencias * 100) / imagen.length;
    puntaje = 100 - porcentaje;
    score.textContent = "Score:" + puntaje.toFixed(1) + "%";
  }
}

function compararLevels(objeto1, objeto2) {
  for (var i = 0; i < objeto1.length; i++) {
    if (
      JSON.stringify(objeto1[i].levels) !== JSON.stringify(objeto2[i].levels)
    ) {
      diferencias++;
    }
  }
  return diferencias;
}
