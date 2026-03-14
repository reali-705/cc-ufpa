import { Personagem } from "./personagem.js";
export class Passaro extends Personagem {
    constructor(tamanho = 'pequeno', posicao_x, posicao_y) {
        super(tamanho, posicao_x, posicao_y);
        this.GRAVIDADE = 10;
        this.velocidade = { x: 0, y: 0 };
        this.voando = false;
        this.dano = 10 * this.raio;
    }
    lancar(angulo, velocidade) {
        angulo = (angulo * Math.PI) / 180;
        this.velocidade = { x: velocidade * Math.cos(angulo), y: -velocidade * Math.sin(angulo) };
        this.voando = true;
    }
    voar(tempo) {
        this.posicao.x += this.velocidade.x * tempo;
        this.velocidade.y += this.GRAVIDADE * tempo;
        this.posicao.y += this.velocidade.y * tempo;
    }
    acertar(alvo) {
        if (!this.voando || !alvo.vivo) {
            return;
        }
        alvo.receberDano(this.dano);
        if (alvo.vivo) {
            this.vivo = false;
            this.voando = false;
        }
        else {
            this.dano -= alvo.vida;
        }
    }
}
