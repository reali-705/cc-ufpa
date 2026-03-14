import { Personagem } from "./personagem.js";
export class Porco extends Personagem {
    constructor(tamanho = 'pequeno', posicao_x, posicao_y) {
        super(tamanho, posicao_x, posicao_y);
        this.vida = 5 * this.raio;
        this.pontos = 10 * this.raio;
        console.log(`Porco ${this.tamanho} criado na posicao (${this.posicao.x}, ${this.posicao.y})`);
    }
    receberDano(dano) {
        this.vida -= dano;
        if (this.vida <= 0) {
            this.vivo = false;
        }
        else {
            console.log(`Porco ${this.tamanho} ainda vivo...`);
        }
    }
}
