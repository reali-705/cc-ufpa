import { Personagem } from "./personagem.ts";

export class Porco extends Personagem {
    // Atributos especificos do Porco
    public vida: number;
    public pontos: number;

    constructor(tamanho: string = 'pequeno', posicao_x: number, posicao_y: number) {
        super(tamanho, posicao_x, posicao_y);
        this.vida = 5 * this.raio;
        this.pontos = 10 * this.raio;
        console.log(`Porco ${this.tamanho} criado na posicao (${this.posicao.x}, ${this.posicao.y})`);
    }

    public receberDano(dano: number) {
        this.vida -= dano;
        if (this.vida <= 0) {
            this.vivo = false;
        } else {
            console.log(`Porco ${this.tamanho} ainda vivo...`);
        }
    }
}