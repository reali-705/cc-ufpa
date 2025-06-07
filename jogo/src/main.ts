import { Level } from "./classes/level.js";
import { Passaro } from "./classes/passaro.js";
import { Porco } from "./classes/porco.js";
import { Tamanho, Dificuldade } from "./classes/enums.js";
import { LevelConfig } from "./interfaces.js";
import { enumAleatorio, CarregarNiveis } from "./funcoes.js";

let level: Level;
let passaro: Passaro;
let lastTime: number = 0;
// elementos html
let angulo: HTMLInputElement;
let velocidade: HTMLInputElement;
let lancarBotao: HTMLButtonElement;
let botaoAleatorio: HTMLButtonElement;
let botaoFacil: HTMLButtonElement;
let botaoMedio: HTMLButtonElement;
let botaoDificil: HTMLButtonElement;
let resposta: HTMLElement;
let pontuacao: HTMLElement;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;
let listaPassaros: HTMLElement;

async function initGame() {
    const niveis = await CarregarNiveis();

    if (niveis.length === 0) {
        console.error("Nenhum nivel carregado");
        return;
    }

    angulo = document.getElementById("angulo") as HTMLInputElement;
    velocidade = document.getElementById("velocidade") as HTMLInputElement;
    lancarBotao = document.getElementById("lancarBotao") as HTMLButtonElement;
    botaoAleatorio = document.getElementById("botaoAleatorio") as HTMLButtonElement;
    botaoFacil = document.getElementById("botaoFacil") as HTMLButtonElement;
    botaoMedio = document.getElementById("botaoMedio") as HTMLButtonElement;
    botaoDificil = document.getElementById("botaoDificil") as HTMLButtonElement;
    resposta = document.getElementById("resposta") as HTMLElement;
    pontuacao = document.getElementById("pontuacao") as HTMLElement;
    listaPassaros = document.getElementById("passaros") as HTMLElement;

    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    ctx = canvas.getContext("2d")!;

    lancarBotao.addEventListener("click", lancarPassaro);
    botaoAleatorio.addEventListener("click", () => selecionarNivel(niveis[0]));
    botaoFacil.addEventListener("click", () => selecionarNivel(niveis[1]));
    botaoMedio.addEventListener("click", () => selecionarNivel(niveis[2]));
    botaoDificil.addEventListener("click", () => selecionarNivel(niveis[3]));

    selecionarNivel(niveis[0]); // comecando o jogo em nivel aleatorio

    requestAnimationFrame(gameLoop);
}

function lancarPassaro() {
    if (passaro.vivo && !passaro.voando) {
        level.lancarPassaro(passaro, parseInt(angulo.value), parseInt(velocidade.value));
    }    
}

function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, level.tela.x, level.tela.y)

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

function gameLoop(timestamp: number) {
    const DeltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    if (!passaro.vivo && level.passaros.length > 0) {
        passaro = level.pegarProximoPassaro();
        listaPassaros.textContent = `Passaros restantes: ${level.passaros.length}`
        resposta.textContent = "Pássaro pronto para ser lancado";
    }

    if (passaro.voando) {
        level.voarPassaro(passaro, DeltaTime);
        level.verificarColisao(passaro);
        resposta.textContent = "Pássaro voando";
    }

    if (!passaro.vivo && level.passaros.length <= 0 && level.porcos.length > 0) {
        resposta.textContent = "GAMER OVER"
    }

    if (passaro.vivo && level.porcos.length <= 0) {
        resposta.textContent = "PARABENS";
    }

    draw();
    requestAnimationFrame(gameLoop);
}

function selecionarNivel(nivel: LevelConfig) {
    level = new Level(nivel);
    if (level.passaros.length > 0) {
        passaro = level.passaros.shift()!;
        listaPassaros.textContent = `Passaros restantes: ${level.passaros.length}`
        resposta.textContent = "Passaro pronto para ser lancado";
    } else {
        resposta.textContent = "Nenhum passaro pronto para ser lancado";
    }
    
    requestAnimationFrame(gameLoop);
}

window.addEventListener("load", initGame);