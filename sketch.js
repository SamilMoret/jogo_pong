let raqueteJogador, raqueteComputador, bola;
let jogadorY, computadorY, bolaX, bolaY, velocidadeBolaX, velocidadeBolaY;
let larguraRaquete = 10, alturaRaquete = 100;
let tamanhoBola = 20;
let alvoComputadorY;

function setup() {
  createCanvas(800, 400);
  
  // Posições iniciais das raquetes e da bola
  jogadorY = height / 2 - alturaRaquete / 2;
  computadorY = height / 2 - alturaRaquete / 2;
  reiniciarBola();
}

function draw() {
  background(0);

  // Desenhar as raquetes e a bola
  desenharRaquetes();
  desenharBola();
  
  // Movimento da raquete do jogador (seguir o mouse)
  jogadorY = constrain(mouseY - alturaRaquete / 2, 0, height - alturaRaquete);
  
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
  if (bolaY - tamanhoBola / 2 <= 0 || bolaY + tamanhoBola / 2 >= height) {
    velocidadeBolaY *= -1;  // Inverter a direção Y
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

function verificarColisaoRaquetes() {
  // Colisão com a raquete do jogador
  if (bolaX - tamanhoBola / 2 <= 20 && bolaY >= jogadorY && bolaY <= jogadorY + alturaRaquete) {
    velocidadeBolaX *= -1;
    bolaX = 20 + tamanhoBola / 2;  // Garantir que a bola não fique presa
    alvoComputadorY = random(0, height - alturaRaquete);  // Computador escolhe posição aleatória
  }
  
  // Colisão com a raquete do computador
  if (bolaX + tamanhoBola / 2 >= width - 20 && bolaY >= computadorY && bolaY <= computadorY + alturaRaquete) {
    velocidadeBolaX *= -1;
    bolaX = width - 20 - tamanhoBola / 2;  // Garantir que a bola não fique presa
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
  computadorY = constrain(computadorY, 0, height - alturaRaquete);
}

class Bola {
    constructor() {
      this.tamanho = 20;
      this.x = width / 2;
      this.y = height / 2;
      this.velocidadeX = random(3, 5) * (random() > 0.5 ? 1 : -1);
      this.velocidadeY = random(2, 4) * (random() > 0.5 ? 1 : -1);
    }
  
    desenhar() {
      ellipse(this.x, this.y, this.tamanho, this.tamanho);
    }
  
    mover() {
      this.x += this.velocidadeX;
      this.y += this.velocidadeY;
    }
  
    verificarColisaoBordas() {
      if (this.y - this.tamanho / 2 <= 0 || this.y + this.tamanho / 2 >= height) {
        this.velocidadeY *= -1;  // Inverte a direção Y ao colidir com as bordas superior ou inferior
      }
    }
  
    verificarGol() {
      if (this.x - this.tamanho / 2 <= 0 || this.x + this.tamanho / 2 >= width) {
        this.reiniciar();  // Reinicia a bola no centro
      }
    }
  
    reiniciar() {
      this.x = width / 2;
      this.y = height / 2;
      this.velocidadeX = random(3, 5) * (random() > 0.5 ? 1 : -1);
      this.velocidadeY = random(2, 4) * (random() > 0.5 ? 1 : -1);
    }
  }
  