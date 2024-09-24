let raqueteJogador, raqueteComputador, bola;
let jogadorY, computadorY, bolaX, bolaY, velocidadeBolaX, velocidadeBolaY;
let larguraRaquete = 10, alturaRaquete = 100;
let tamanhoBola = 20;
let alvoComputadorY;
let espessuraBorda = 5;  // Espessura das bordas superior e inferior
let aumentoVelocidade = 1.0;  // Valor pelo qual a velocidade da bola aumenta a cada impacto com a raquete
let fundo;  // Variável para a imagem de fundo
let anguloBola = 0;  // Ângulo atual da bola para rotação
let velocidadeRotacao = 0;  // Velocidade da rotação
let somBounce;  // Variável para o som de bounce


function preload() {
  // Carregar a imagem de fundo antes do setup
  fundo = loadImage('Sprites/fundo2.png');
  raqueteJogadorImg = loadImage('Sprites/barra02.png');
  raqueteComputadorImg = loadImage('Sprites/barra02.png');
  bolaImg = loadImage('Sprites/bola.png');
  somBounce = loadSound('Sons/bounce.wav');
}

function setup() {
  createCanvas(1000, 600);
  
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
  
   // Atualizar a velocidade de rotação com base na velocidade da bola
   let velocidade = sqrt(sq(velocidadeBolaX) + sq(velocidadeBolaY));
   anguloBola += velocidade * 0.05;  // Ajuste o multiplicador para controlar a rotação

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
  // Desenhar a raquete do jogador
  image(raqueteJogadorImg, 10, jogadorY, larguraRaquete, alturaRaquete);
  
  // Desenhar a raquete do computador
  image(raqueteComputadorImg, width - 20, computadorY, larguraRaquete, alturaRaquete);
}

function desenharBola() {
   // Isolar a transformação da bola para não afetar outros elementos
   push();
   translate(bolaX, bolaY);  // Mover a origem para o centro da bola
   rotate(anguloBola);  // Aplicar a rotação
   imageMode(CENTER);  // Desenhar a partir do centro da imagem
   image(bolaImg, 0, 0, tamanhoBola, tamanhoBola);
   pop();  // Restaurar o estado anterior
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
    
    // Ajuste a posição da bola para garantir que não fique presa
    bolaX = 20 + tamanhoBola / 2;  // Ajuste a posição X da bola

    // Chama a função para aumentar a velocidade e tocar o som
    aumentarVelocidadeBola();
    somBounce.play();  // Tocar o som de bounce
    alvoComputadorY = random(espessuraBorda, height - alturaRaquete - espessuraBorda);  // Computador escolhe posição aleatória
  }
  
  // Colisão com a raquete do computador
  if (bolaX + tamanhoBola / 2 >= width - 20 && bolaY >= computadorY && bolaY <= computadorY + alturaRaquete) {
    velocidadeBolaX *= -1;

    let impacto = (bolaY - computadorY) / alturaRaquete - 0.5; // Calcula o impacto relativo
    velocidadeBolaY = impacto * 6;  // Ajusta a velocidade Y com base no ponto de impacto (modifica o ângulo)

    // Ajuste a posição da bola para garantir que não fique presa
    bolaX = width - 20 - tamanhoBola / 2;  // Ajuste a posição X da bola

    // Chama a função para aumentar a velocidade e tocar o som
    aumentarVelocidadeBola();
    somBounce.play();  // Tocar o som de bounce
  }
}


function aumentarVelocidadeBola() {
  // Aumentar ainda mais a velocidade após o impacto
  let fatorAumento = 1.5;  // Multiplicador para aumentar mais rapidamente a velocidade
  
  if (velocidadeBolaX > 0) {
    velocidadeBolaX += aumentoVelocidade * fatorAumento;  // Aumentar mais rápido no eixo X
  } else {
    velocidadeBolaX -= aumentoVelocidade * fatorAumento;  // Aumentar mais rápido no eixo X negativo
  }

  if (velocidadeBolaY > 0) {
    velocidadeBolaY += aumentoVelocidade * fatorAumento;  // Aumentar mais rápido no eixo Y
  } else {
    velocidadeBolaY -= aumentoVelocidade * fatorAumento;  // Aumentar mais rápido no eixo Y negativo
  }
}


function reiniciarBola() {
  bolaX = width / 2;
  bolaY = height / 2;
  velocidadeBolaX = random(3, 5) * (random() > 0.5 ? 1 : -1);
  velocidadeBolaY = random(2, 4) * (random() > 0.5 ? 1 : -1);
  anguloBola = 0;  // Reiniciar o ângulo da bola
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
