import { Level } from "./classes/level.js";
import { Dificuldade } from "./classes/enums.js";
import { enumAleatorio, CarregarNiveis } from "./funcoes.js";
let level;
let passaro;
let lastTime = 0;
// elementos html
let angulo;
let velocidade;
let lancarBotao;
let resposta;
let pontuacao;
let canvas;
let ctx;
let listaPassaros;
function initGame() {
    const niveis = CarregarNiveis();
    console.log(niveis);
    level = new Level(enumAleatorio(Dificuldade));
    angulo = document.getElementById("angulo");
    velocidade = document.getElementById("velocidade");
    lancarBotao = document.getElementById("lancarBotao");
    resposta = document.getElementById("resposta");
    pontuacao = document.getElementById("pontuacao");
    listaPassaros = document.getElementById("passaros");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    lancarBotao.addEventListener("click", lancarPassaro);
    draw();
    requestAnimationFrame(gameLoop);
}
function lancarPassaro() {
    if (passaro.vivo && !passaro.voando) {
        level.lancarPassaro(passaro, parseInt(angulo.value), parseInt(velocidade.value));
    }
}
function draw() {
    if (!ctx)
        return;
    ctx.clearRect(0, 0, level.tela.x, level.tela.y);
    level.porcos.forEach(porco => {
        if (porco.vivo) {
            ctx.beginPath();
            ctx.arc(porco.posicao.x, porco.posicao.y, porco.raio, 0, 2 * Math.PI);
            ctx.fillStyle = "green";
            ctx.fill();
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.stroke();
        }
    });
    if (passaro) {
        ctx.beginPath();
        ctx.arc(passaro.posicao.x, passaro.posicao.y, passaro.raio, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    pontuacao.textContent = `Pontuação: ${level.pontuacaoAtual}`;
}
function gameLoop(timestamp) {
    const DeltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    if (!passaro || !passaro.vivo && level.passaros.length > 0) {
        passaro = level.pegarProximoPassaro();
        listaPassaros.textContent = `Passaros restantes: ${level.passaros.length}`;
        resposta.textContent = "Pássaro pronto para ser lancado";
    }
    if (passaro.voando) {
        level.voarPassaro(passaro, DeltaTime);
        level.verificarColisao(passaro);
        resposta.textContent = "Pássaro voando";
    }
    if (!passaro.vivo && level.passaros.length <= 0 && level.porcos.length > 0) {
        resposta.textContent = "GAMER OVER";
    }
    if (passaro.vivo && level.porcos.length <= 0) {
        resposta.textContent = "PARABENS";
    }
    draw();
    requestAnimationFrame(gameLoop);
}
window.addEventListener("load", initGame);
