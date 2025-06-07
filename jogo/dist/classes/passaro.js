import { Personagem } from "./personagem.js";
export class Passaro extends Personagem {
    constructor(tamanho, posicao_x, posicao_y) {
        super(tamanho, posicao_x, posicao_y);
        this.velocidade = { x: 0, y: 0 };
        this.dano = 10 * this.raio;
        this.vida = 2;
        this.voando = false;
    }
    lancar(angulo, velocidade) {
        angulo = (angulo * Math.PI) / 180;
        this.velocidade = { x: velocidade * Math.cos(angulo), y: -velocidade * Math.sin(angulo) };
        this.voando = true;
    }
    voar(tempo, gravidade) {
        this.posicao.x += this.velocidade.x * tempo;
        this.velocidade.y += gravidade * tempo;
        this.posicao.y += this.velocidade.y * tempo;
    }
    causarDano() {
        if (this.vida > 1) {
            this.vida--;
            this.dano /= 2;
        }
        return this.dano;
    }
}
