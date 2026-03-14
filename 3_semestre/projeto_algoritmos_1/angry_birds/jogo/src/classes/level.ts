import { Dificuldade, Tamanho } from "./enums.js";
import { LevelConfig, Posicao } from "../interfaces.js";
import { Passaro } from "./passaro.js"
import { Porco } from "./porco.js";
import { enumAleatorio, getRandomInt } from "../funcoes/auxiliares.js";

export class Level {
    public tela: Posicao = {x: 1200, y: 600};
    private posicaoEstilingue: Posicao = {x: 50, y: this.tela.y - 75};
    private gravidade: number = 25;
    private vetorVelocidade: number = 200;
    private maxRaioPersonagem: number = 20;
    private numPorcos: number;
    private numPassaros: number;
    public dificuldade: Dificuldade;
    public pontuacaoAtual: number = 0;
    public porcos: Porco[] = [];
    public passaros: Passaro[] = [];

    constructor(nivel: LevelConfig) {
        switch (nivel.dificuldade) {
            case Dificuldade.ALEATORIA:
                this.dificuldade = nivel.dificuldade;
                this.numPorcos = getRandomInt(10, 4);
                this.numPassaros = getRandomInt(10, this.numPorcos);
                break;
            case Dificuldade.FACIL:
            case Dificuldade.MEDIO:
            case Dificuldade.DIFICIL:
                this.dificuldade = nivel.dificuldade;
                this.numPorcos = nivel.porcos!;
                this.numPassaros = nivel.passaros!;
                break;
            default:
                throw new Error(`Dificuldade ${nivel.dificuldade} não encontrada.`);
        }
        for (let i = 0; i < this.numPorcos; i++) {
            this.porcos.push(new Porco(
                enumAleatorio(Tamanho),
                getRandomInt(this.tela.x - this.maxRaioPersonagem, this.tela.x * 0.2),
                getRandomInt(this.tela.y - this.maxRaioPersonagem, this.tela.y / 2)
            ));
        }
        for (let i = 0; i < this.numPassaros; i++) {
            this.passaros.push(new Passaro(
                enumAleatorio(Tamanho),
                this.posicaoEstilingue.x,
                this.posicaoEstilingue.y
            ));
        }
    }
    
    pegarProximoPassaro(): Passaro {
        return this.passaros.shift()!;
    }

    lancarPassaro(passaro: Passaro, angulo: number, velocidade: number): void {
        passaro.lancar(angulo, this.vetorVelocidade * velocidade / 100);
    }

    voarPassaro(passaro: Passaro, deltaTempo: number): void {
        if (
            passaro.posicao.x + passaro.raio > this.tela.x || passaro.posicao.x - passaro.raio < 0 || // Verifica se o passaro saiu da tela pela esquerda ou direita
            passaro.posicao.y + passaro.raio > this.tela.y || passaro.posicao.y - passaro.raio < 0 // Verifica se o passaro saiu da tela por cima ou por baixo
        ) {
            passaro.voando = false; // Passaro para de voar
            passaro.vivo = false; // Passaro morre
        } else {
            passaro.voar(deltaTempo, this.gravidade);
        }
    }

    verificarColisao(passaro: Passaro): void {
        let porco: Porco;
        for (let i = this.porcos.length - 1; i >= 0; i--) { // contando de trás pra frente para não alterar ao remover elemento
            porco = this.porcos[i];
            if (
                passaro.raio + porco.raio >= Math.hypot(
                    passaro.posicao.x - porco.posicao.x,
                    passaro.posicao.y - porco.posicao.y
                )
            ) {
                this.colidir(passaro, porco);
            }
        }
    }

    colidir(passaro: Passaro, porco: Porco): void {
        const pontuacao = porco.receberDano(passaro.causarDano());        
        if (pontuacao > 0) {
            this.pontuacaoAtual += pontuacao;
            this.porcos.splice(this.porcos.indexOf(porco), 1);
        } else {
            passaro.vivo = false;
            passaro.voando = false;
        }
    }
}