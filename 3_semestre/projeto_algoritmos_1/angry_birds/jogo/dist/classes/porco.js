import { Personagem } from "./personagem.js";
export class Porco extends Personagem {
    constructor(tamanho, posicao_x, posicao_y) {
        super(tamanho, posicao_x, posicao_y);
        this.pontos = 10 * this.raio;
    }
    receberDano(dano) {
        this.vida -= dano;
        if (this.vida <= 0) {
            this.vivo = false;
            return this.pontos;
        }
        else {
            return 0;
        }
    }
}
