let raqueteJogador, raqueteComputador, bola; 
let jogadorY, computadorY, bolaX, bolaY, velocidadeBolaX, velocidadeBolaY;
let larguraRaquete = 10, alturaRaquete = 100;
let tamanhoBola = 20;
let alvoComputadorY;
let espessuraBorda = 5;  // Espessura das bordas superior e inferior
let aumentoVelocidade = 1.0;
let fundo;
let anguloBola = 0;
let velocidadeRotacao = 0;
let somBounce;
let placarJogador = 0;
let placarComputador = 0;
let jogoIniciado = false;

let botaoIniciar = createButton('Iniciar Jogo');
botaoIniciar.position(width / 2 - 50, height / 2);
botaoIniciar.class('start-button'); 


function preload() {
  fundo = loadImage('Sprites/fundo2.png');
  raqueteJogadorImg = loadImage('Sprites/barra02.png');
  raqueteComputadorImg = loadImage('Sprites/barra02.png');
  bolaImg = loadImage('Sprites/bola.png');
  somBounce = loadSound('Sons/bounce.wav');
}

function setup() {
  createCanvas(1300, 800);
  jogadorY = height / 2 - alturaRaquete / 2;
  computadorY = height / 2 - alturaRaquete / 2;
  let botaoIniciar = createButton('Iniciar Jogo');
  botaoIniciar.position(width / 2 - 50, height / 2);
  botaoIniciar.mousePressed(() => {
  jogoIniciado = true;
  botaoIniciar.hide();
  userStartAudio();
  reiniciarBola();

  });
}

function draw() {
  if (!jogoIniciado) return;
  background(fundo);
  desenharRaquetes();
  desenharBola();
  desenharBordas();
  jogadorY = constrain(mouseY - alturaRaquete / 2, espessuraBorda, height - alturaRaquete - espessuraBorda);
  bolaX += velocidadeBolaX;
  bolaY += velocidadeBolaY;
  let velocidade = sqrt(sq(velocidadeBolaX) + sq(velocidadeBolaY));
  anguloBola += velocidade * 0.05;
  verificarColisaoRaquetes();
  if (bolaX - tamanhoBola / 2 <= 0 || bolaX + tamanhoBola / 2 >= width) {
    reiniciarBola();
  }
  if (bolaY - tamanhoBola / 2 <= espessuraBorda || bolaY + tamanhoBola / 2 >= height - espessuraBorda) {
    velocidadeBolaY *= -1;
  }
  inteligenciaComputador();
}

function desenharRaquetes() {
  image(raqueteJogadorImg, 10, jogadorY, larguraRaquete, alturaRaquete);
  image(raqueteComputadorImg, width - 20, computadorY, larguraRaquete, alturaRaquete);
}

function desenharBola() {
  push();
  translate(bolaX, bolaY);
  rotate(anguloBola);
  imageMode(CENTER);
  image(bolaImg, 0, 0, tamanhoBola, tamanhoBola);
  pop();
}

function desenharBordas() {
  rect(0, 0, width, espessuraBorda);
  rect(0, height - espessuraBorda, width, espessuraBorda);
}

function verificarColisaoRaquetes() {
  if (bolaX - tamanhoBola / 2 <= 20 && bolaY >= jogadorY && bolaY <= jogadorY + alturaRaquete) {
    velocidadeBolaX *= -1;
    let impacto = (bolaY - jogadorY) / alturaRaquete - 0.5;
    velocidadeBolaY = impacto * 6;
    bolaX = 20 + tamanhoBola / 2;
    aumentarVelocidadeBola();
    somBounce.play();
    alvoComputadorY = random(espessuraBorda, height - alturaRaquete - espessuraBorda);
  }
  if (bolaX + tamanhoBola / 2 >= width - 20 && bolaY >= computadorY && bolaY <= computadorY + alturaRaquete) {
    velocidadeBolaX *= -1;
    let impacto = (bolaY - computadorY) / alturaRaquete - 0.5;
    velocidadeBolaY = impacto * 6;
    bolaX = width - 20 - tamanhoBola / 2;
    aumentarVelocidadeBola();
    somBounce.play();
  }
}

function aumentarVelocidadeBola() {
  let fatorAumento = 1.5;
  if (velocidadeBolaX > 0) {
    velocidadeBolaX += aumentoVelocidade * fatorAumento;
  } else {
    velocidadeBolaX -= aumentoVelocidade * fatorAumento;
  }
  if (velocidadeBolaY > 0) {
    velocidadeBolaY += aumentoVelocidade * fatorAumento;
  } else {
    velocidadeBolaY -= aumentoVelocidade * fatorAumento;
  }
}

function reiniciarBola() {
  if (bolaX - tamanhoBola / 2 <= 0) {
    placarComputador++;
  } else if (bolaX + tamanhoBola / 2 >= width) {
    placarJogador++;
  }
  narrarPlacar();
  bolaX = width / 2;
  bolaY = height / 2;
  velocidadeBolaX = random(3, 5) * (random() > 0.5 ? 1 : -1);
  velocidadeBolaY = random(2, 4) * (random() > 0.5 ? 1 : -1);
  anguloBola = 0;
}

function inteligenciaComputador() {
    // Aumentar a velocidade do movimento da raquete do computador
    let velocidadeComputador = 3.5; // Ajuste a velocidade conforme necessário
    if (computadorY + alturaRaquete / 2 < bolaY) {
      computadorY += velocidadeComputador;
    } else if (computadorY + alturaRaquete / 2 > bolaY) {
      computadorY -= velocidadeComputador;
    }
    computadorY = constrain(computadorY, espessuraBorda, height - alturaRaquete - espessuraBorda);
  }

function narrarPlacar() {
  let narracao = new SpeechSynthesisUtterance(`${placarJogador} a ${placarComputador}`);
  narracao.lang = 'pt-BR';
  window.speechSynthesis.speak(narracao);
}
