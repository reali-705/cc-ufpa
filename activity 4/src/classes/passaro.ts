import { Personagem } from "./personagem.ts";
import { Tamanho } from "./enums.ts";

export class Passaro extends Personagem {
    private velocidade = {x: 0, y: 0};
    private dano: number;
    public voando: boolean;

    constructor(tamanho: Tamanho, posicao_x: number, posicao_y: number) {
        super(tamanho, posicao_x, posicao_y);
        this.dano = 10 * this.raio;
        this.vida = 2;
        this.voando = false;
    }

    lancar(angulo: number, velocidade: number): void {
        angulo = (angulo * Math.PI) / 180;
        this.velocidade = { x: velocidade * Math.cos(angulo), y: -velocidade * Math.sin(angulo) };
        this.voando = true;
    }

    voar(tempo: number, gravidade: number): void {
        this.posicao.x += this.velocidade.x * tempo;
        this.velocidade.y += gravidade * tempo;
        this.posicao.y += this.velocidade.y * tempo;
    }

    causarDano(): number {
        if (this.vida > 1) {
            this.vida--;
            this.dano /= 2;
        }
        return this.dano;
    }
}