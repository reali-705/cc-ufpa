import { Tamanho } from "./enums.js";
export class Personagem {
    constructor(tamanho, posicao_x, posicao_y) {
        this.posicao = { x: 0, y: 0 };
        this.vivo = true;
        this.tamanho = tamanho;
        this.posicao = { x: posicao_x, y: posicao_y };
        switch (tamanho) {
            case Tamanho.PEQUENO:
                this.raio = 5;
                this.vida = 25;
                break;
            case Tamanho.MEDIO:
                this.raio = 10;
                this.vida = 50;
                break;
            case Tamanho.GRANDE:
                this.raio = 20;
                this.vida = 100;
                break;
        }
    }
}
