"use strict";
//Variables globales
BigNumber.config({DECIMAL_PLACES: 2, ROUNDING_MODE: BigNumber.ROUND_HALF_UP});
var FMT_MONEDA = "$0,0.00",
    forma = document.getElementById("forma"),
    salidaSuma = document.getElementById("salidaSuma"),
    salidaResta = document.getElementById("salidaResta"),
    salidaMulti = document.getElementById("salidaMulti"),
    salidaDiv = document.getElementById("salidaDiv");

Node.prototype.error = function(mensaje) {
  this.className = "error";
  this.textContent = mensaje;
};

Node.prototype.info = function(mensaje) {
  this.className = "";
  this.textContent = mensaje;
};

//Evento Procesar
forma.addEventListener("submit", procesa, false);
function procesa() {
  //Variables a usar
  var num1 = numeral().unformat(forma["op1"].value),
      num2 = numeral().unformat(forma["op2"].value),
      error = false;

  if (isNaN(num1)) {
    error = true;
    salidaSuma.error("Entero Incorrecto");
  }
  if (isNaN(num2)) {
    error = true;
    salidaResta.error("Entero Incorrecto");
  }
  if (!error) {   
    //BigNumber y operaciones
    var suma = new BigNumber(num1).plus(new BigNumber(num2)),
        resta = new BigNumber(num1).minus(new BigNumber(num2)),
        multi = new BigNumber(num1).times(new BigNumber(num2)),
        div = new BigNumber(num1).div(new BigNumber(num2));
        
    salidaSuma.info("Suma: "+ numeral(suma).format(FMT_MONEDA));
    salidaResta.info("Resta: "+ numeral(resta).format(FMT_MONEDA));
    salidaMulti.info("Multiplicación: "+ numeral(multi).format(FMT_MONEDA));
    salidaDiv.info("División: "+ numeral(div).format(FMT_MONEDA));
  }
}

//Evento Limpiar
forma["limpiar"].addEventListener("click", limpiar, false);
function limpiar(){
  forma["op1"].value = "";
  forma["op2"].value = "";
  salidaSuma.textContent="";
  salidaResta.textContent="";
  salidaMulti.textContent="";
  salidaDiv.textContent="";
}