let raqueteJogador, raqueteComputador, bola;
let jogadorY, computadorY, bolaX, bolaY, velocidadeBolaX, velocidadeBolaY;
let larguraRaquete = 10, alturaRaquete = 100;
let tamanhoBola = 20;
let alvoComputadorY;
let espessuraBorda = 5;  // Espessura das bordas superior e inferior
let aumentoVelocidade = 0.1;  // Valor pelo qual a velocidade da bola aumenta a cada impacto com a raquete
let fundo;  // Variável para a imagem de fundo

function preload() {
  // Carregar a imagem de fundo antes do setup
  fundo = loadImage('Sprites/fundo2.png');
}

function setup() {
  createCanvas(800, 400);
  
  // Posições iniciais das raquetes e da bola
  jogadorY = height / 2 - alturaRaquete / 2;
  computadorY = height / 2 - alturaRaquete / 2;
  reiniciarBola();
}

function draw() {
  background(fundo);

  // Desenhar as raquetes, a bola e as bordas
  desenharRaquetes();
  desenharBola();
  desenharBordas();
  
  // Movimento da raquete do jogador (seguir o mouse)
  jogadorY = constrain(mouseY - alturaRaquete / 2, espessuraBorda, height - alturaRaquete - espessuraBorda);
  
  // Movimento da bola
  bolaX += velocidadeBolaX;
  bolaY += velocidadeBolaY;
  
  // Verificar colisão da bola com as raquetes
  verificarColisaoRaquetes();
  
  // Verificar se houve gol (se a bola saiu pela direita ou esquerda)
  if (bolaX - tamanhoBola / 2 <= 0 || bolaX + tamanhoBola / 2 >= width) {
    reiniciarBola();  // Reiniciar a bola no centro
  }
  
  // Verificar colisão da bola com as bordas superior e inferior
  if (bolaY - tamanhoBola / 2 <= espessuraBorda || bolaY + tamanhoBola / 2 >= height - espessuraBorda) {
    velocidadeBolaY *= -1;  // Inverter a direção Y ao colidir com as bordas
  }
  
  // Movimento simples da raquete do computador
  inteligenciaComputador();
}

function desenharRaquetes() {
  // Raquete do jogador
  rect(10, jogadorY, larguraRaquete, alturaRaquete);
  
  // Raquete do computador
  rect(width - 20, computadorY, larguraRaquete, alturaRaquete);
}

function desenharBola() {
  ellipse(bolaX, bolaY, tamanhoBola, tamanhoBola);
}

function desenharBordas() {
  // Desenhar a borda superior
  rect(0, 0, width, espessuraBorda);
  
  // Desenhar a borda inferior
  rect(0, height - espessuraBorda, width, espessuraBorda);
}

function verificarColisaoRaquetes() {
  // Colisão com a raquete do jogador
  if (bolaX - tamanhoBola / 2 <= 20 && bolaY >= jogadorY && bolaY <= jogadorY + alturaRaquete) {
    velocidadeBolaX *= -1;

    let impacto = (bolaY - jogadorY) / alturaRaquete - 0.5; // Calcula o impacto relativo

    velocidadeBolaY = impacto * 6;  // Ajusta a velocidade Y com base no ponto de impacto (modifica o ângulo)
    bolaX = 20 + tamanhoBola / 2;  // Garantir que a bola não fique presa
    aumentarVelocidadeBola();  // Aumenta a velocidade após o impacto
    alvoComputadorY = random(espessuraBorda, height - alturaRaquete - espessuraBorda);  // Computador escolhe posição aleatória
  }
  
  // Colisão com a raquete do computador
  if (bolaX + tamanhoBola / 2 >= width - 20 && bolaY >= computadorY && bolaY <= computadorY + alturaRaquete) {
    velocidadeBolaX *= -1;

    let impacto = (bolaY - computadorY) / alturaRaquete - 0.5; // Calcula o impacto relativo

    velocidadeBolaY = impacto * 6;  // Ajusta a velocidade Y com base no ponto de impacto (modifica o ângulo)

    bolaX = width - 20 - tamanhoBola / 2;  // Garantir que a bola não fique presa

    aumentarVelocidadeBola();  // Aumenta a velocidade após o impacto
  }
}


function aumentarVelocidadeBola() {
  // Aumentar a velocidade da bola após impacto
  if (velocidadeBolaX > 0) {
    velocidadeBolaX += aumentoVelocidade;  // Aumentar a velocidade no eixo X
  } else {
    velocidadeBolaX -= aumentoVelocidade;  // Diminuir para aumentar a velocidade no eixo X negativo
  }

  if (velocidadeBolaY > 0) {
    velocidadeBolaY += aumentoVelocidade;  // Aumentar a velocidade no eixo Y
  } else {
    velocidadeBolaY -= aumentoVelocidade;  // Diminuir para aumentar a velocidade no eixo Y negativo
  }
}

function reiniciarBola() {
  bolaX = width / 2;
  bolaY = height / 2;
  velocidadeBolaX = random(3, 5) * (random() > 0.5 ? 1 : -1);
  velocidadeBolaY = random(2, 4) * (random() > 0.5 ? 1 : -1);
}

function inteligenciaComputador() {
  if (computadorY < alvoComputadorY) {
    computadorY += 3;
  } else if (computadorY > alvoComputadorY) {
    computadorY -= 3;
  }
  
  // Impedir que a raquete saia da tela
  computadorY = constrain(computadorY, espessuraBorda, height - alturaRaquete - espessuraBorda);
}
