import { Porco } from "./classes/porco.js";
import { Passaro } from './classes/passaro.js';
import { getRandomInt, gerarTamanho } from './funcoes.js';
import { Level } from './classes/level.js';

// Constantes
const TELA: {x: number, y: number} = {x: 1200, y: 600};
const RAIO_MAX_PERSONAGEM: number = 20;
// Variaveis
let level: Level;
let passaro: Passaro | null = null;
let lastTime: number = 0;
let angulo: HTMLInputElement;
let velocidade: HTMLInputElement;
let lancarBotao: HTMLButtonElement;
let resposta: HTMLElement;
let pontuacao: HTMLElement;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

function criarLevel(inimigos_max: number = 10): Level {
    let porcos: Porco[] = [];
    let passaros: Passaro[] = [];
    let num_porcos: number = getRandomInt(inimigos_max, 3);
    let num_passaros: number = getRandomInt(inimigos_max, num_porcos);
    let pontuacao: number = 0;
    // criando os personagens
    for (let i = 0; i < num_porcos; i++) {
        porcos.push(
                new Porco(
                gerarTamanho(),
                getRandomInt(TELA.x - RAIO_MAX_PERSONAGEM, RAIO_MAX_PERSONAGEM),
                getRandomInt(TELA.y - RAIO_MAX_PERSONAGEM, TELA.y / 2)
            )
        );
    }
    for (let i = 0; i < num_passaros; i++) {
        passaros.push(
            new Passaro(
                gerarTamanho(),
                RAIO_MAX_PERSONAGEM,
                TELA.y - RAIO_MAX_PERSONAGEM
            )
        );
    }
    // retornando o level com os personagens e ponturacao
    return {porcos, passaros, pontuacao};
}

function initGame() {
    level = criarLevel(10);
    console.log("Jogo iniciado:");

    angulo = document.getElementById("angulo") as HTMLInputElement;
    velocidade = document.getElementById("velocidade") as HTMLInputElement;
    lancarBotao = document.getElementById("lancarBotao") as HTMLButtonElement;
    resposta = document.getElementById("resposta") as HTMLElement;
    pontuacao = document.getElementById("pontuacao") as HTMLElement;

    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    ctx = canvas.getContext("2d")!;

    console.log(`Porcos: ${level.porcos.length}`);
    console.log(`Passaros: ${level.passaros.length}`);

    lancarBotao.addEventListener("click", lancarPassaro)

    if (level.passaros.length > 0) {
        passaro = level.passaros.shift()!;
        console.log("Passaro pronto para ser lancado");
    } else {
        console.log("Nenhum passaro pronto para ser lancado");
    }

    draw();
    requestAnimationFrame(gameLoop);
}

function draw() {
    if (!ctx) return; // Verifica se o contexto do canvas foi criado
    ctx.clearRect(0, 0, TELA.x, TELA.y); // Limpa o canvas

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

    pontuacao.textContent = `Pontuação: ${level.pontuacao}`
}

function lancarPassaro() {
    if (passaro && !passaro.voando) {
        passaro.lancar(parseInt(angulo.value), parseInt(velocidade.value));
        resposta.textContent = `Pássaro lançado! Ângulo: ${angulo.value}\nVelocidade: ${velocidade.value}`
    } else {
        resposta.textContent = "Nenhum pássaro pronto para ser lancado ou existe um pássaro voando";
    }
}

function gameLoop(timestamp: number) {
    const DeltaTime = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    if (passaro && passaro.voando) {
        passaro.voar(DeltaTime);
        if (
            passaro.posicao.x + passaro.raio > TELA.x || passaro.posicao.x - passaro.raio < 0 || // Verifica se o passaro saiu da tela pela esquerda ou direita
            passaro.posicao.y + passaro.raio > TELA.y || passaro.posicao.y - passaro.raio < 0 // Verifica se o passaro saiu da tela por cima ou por baixo
        ) {
            passaro.voando = false;
            passaro.vivo = false;
            console.log("Passaro saiu da tela");
        } else {
            for (let i = level.porcos.length - 1; i >= 0; i--) {
                if (passaro.verificarColisao(level.porcos[i])) {
                    passaro.acertar(level.porcos[i]);
                    if (!level.porcos[i].vivo) {
                        level.pontuacao += level.porcos[i].pontos;
                        level.porcos.splice(i, 1);
                    }
                }
            }
        }
    }
    
    if (passaro && !passaro.vivo && !passaro.voando) {
        console.log("Passaro morreu");
        if (level.passaros.length > 0) {
            passaro = level.passaros.shift()!;
            console.log("Passaro pronto para ser lancado");
        } else {
            console.log("Todos os passaros ja foram lancados");
        }
    }

    if (level.porcos.length === 0) {
        console.log("Todos os porcos foram atingidos");
        console.log(`Pontuação final: ${level.pontuacao}`);
        return;
    }

    if (level.passaros.length === 0 && !passaro) {
        console.log("Todos os passaros ja foram lancados");
        console.log(`Pontuação final: ${level.pontuacao}`);
        return;
    }

    draw();

    requestAnimationFrame(gameLoop);
}

window.addEventListener('load', initGame);