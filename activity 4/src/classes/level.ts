import { Dificuldade, Tamanho } from "./enums.js";
import { Passaro } from "./passaro.js"
import { Porco } from "./porco.js";
import { enumAleatorio, getRandomInt } from "../funcoes.js";

export class Level {
    public tela = {x: 1200, y: 600};
    private posicaoEstilingue = {x: 50, y: this.tela.y - 75};
    private gravidade: number = 25;
    private vetorVelocidade: number = 200;
    private maxRaioPersonagem: number = 20;
    private maxInimigos: number;
    public dificuldade: Dificuldade;
    public pontuacaoAtual: number = 0;
    public porcos: Porco[] = [];
    public passaros: Passaro[] = [];

    constructor(dificuldade: Dificuldade) {
        this.dificuldade = dificuldade;
        switch (dificuldade) {
            case Dificuldade.FACIL:
                this.maxInimigos = 5;
                break;
            case Dificuldade.MEDIO:
                this.maxInimigos = 10;
                break;
            case Dificuldade.DIFICIL:
                this.maxInimigos = 15;
                break;
            default:
                this.maxInimigos = 5;
                break;
        }
        for (let i=0; i < this.maxInimigos; i++) {
            this.porcos.push(new Porco(
                enumAleatorio(Tamanho),
                getRandomInt(this.tela.x - this.maxRaioPersonagem, this.tela.x * 0.2),
                getRandomInt(this.tela.y / 2, this.tela.y - this.maxRaioPersonagem)
            ))
            this.passaros.push(new Passaro(
                enumAleatorio(Tamanho),
                this.posicaoEstilingue.x,
                this.posicaoEstilingue.y,
            ))
        }
        console.log(`level ${this.dificuldade} criado com ${this.passaros.length} passaros e ${this.porcos.length} porcos`);
    }
    
    pegarProximoPassaro(): Passaro {
        return this.passaros.shift()!;
    }

    lancarPassaro(passaro: Passaro, angulo: number, velocidade: number): void {
        passaro.lancar(angulo, this.vetorVelocidade * velocidade / 100);
    }

    voarPassaro(passaro: Passaro, deltaTempo: number): void {
        if (
            passaro.posicao.x + passaro.raio > this.tela.x || passaro.posicao.x - passaro.raio < 0 || // Verifica se o passaro saiu da tela pela esquerda ou direita)
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