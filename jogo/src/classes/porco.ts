import { Personagem  } from "./personagem.ts";
import { Tamanho } from "./enums.ts";

export class Porco extends Personagem {
    private pontos: number;

    constructor(tamanho: Tamanho, posicao_x: number, posicao_y: number) {
        super(tamanho, posicao_x, posicao_y);
        this.pontos = 10 * this.raio;
    }

    receberDano(dano: number): number {
        this.vida -= dano;
        if (this.vida <= 0) {
            this.vivo = false;
            return this.pontos;
        } else {
            return 0;
        }
    }
}