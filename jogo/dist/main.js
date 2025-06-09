var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Level } from "./classes/level.js";
import { carregarNiveis } from "./funcoes/auxiliares.js";
let level;
let passaro;
let lastTime = 0;
// elementos html
let angulo;
let velocidade;
let lancarBotao;
let botaoAleatorio;
let botaoFacil;
let botaoMedio;
let botaoDificil;
let resposta;
let pontuacao;
let canvas;
let ctx;
let listaPassaros;
function initGame() {
    return __awaiter(this, void 0, void 0, function* () {
        const niveis = yield carregarNiveis();
        if (niveis.length === 0) {
            console.error("Nenhum nivel carregado");
            return;
        }
        angulo = document.getElementById("angulo");
        velocidade = document.getElementById("velocidade");
        lancarBotao = document.getElementById("lancarBotao");
        botaoAleatorio = document.getElementById("botaoAleatorio");
        botaoFacil = document.getElementById("botaoFacil");
        botaoMedio = document.getElementById("botaoMedio");
        botaoDificil = document.getElementById("botaoDificil");
        resposta = document.getElementById("resposta");
        pontuacao = document.getElementById("pontuacao");
        listaPassaros = document.getElementById("passaros");
        canvas = document.getElementById("canvas");
        ctx = canvas.getContext("2d");
        lancarBotao.addEventListener("click", lancarPassaro);
        botaoAleatorio.addEventListener("click", () => selecionarNivel(niveis[0]));
        botaoFacil.addEventListener("click", () => selecionarNivel(niveis[1]));
        botaoMedio.addEventListener("click", () => selecionarNivel(niveis[2]));
        botaoDificil.addEventListener("click", () => selecionarNivel(niveis[3]));
        selecionarNivel(niveis[0]); // comecando o jogo em nivel aleatorio
        requestAnimationFrame(gameLoop);
    });
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
            ctx.fillStyle = "white";
            ctx.font = "12px Arial";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(`${porco.vida}`, porco.posicao.x, porco.posicao.y);
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
    if (!passaro.vivo && level.passaros.length > 0) {
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
        return;
    }
    if (passaro.vivo && level.porcos.length <= 0) {
        resposta.textContent = "PARABENS";
        return;
    }
    draw();
    requestAnimationFrame(gameLoop);
}
function selecionarNivel(nivel) {
    level = new Level(nivel);
    if (level.passaros.length > 0) {
        passaro = level.pegarProximoPassaro();
        listaPassaros.textContent = `Passaros restantes: ${level.passaros.length}`;
        resposta.textContent = "Passaro pronto para ser lancado";
    }
    else {
        resposta.textContent = "Nenhum passaro pronto para ser lancado";
    }
    requestAnimationFrame(gameLoop);
}
window.addEventListener("load", initGame);
