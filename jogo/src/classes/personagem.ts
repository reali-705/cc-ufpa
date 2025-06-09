import { Tamanho } from "./enums.js";
import { Posicao } from "../interfaces.js";

export class Personagem {
    public posicao: Posicao = {x: 0, y: 0};
    public tamanho: Tamanho;
    public raio: number;
    public vivo: boolean;
    public vida: number;

    constructor(tamanho: Tamanho, posicao_x: number, posicao_y: number) {
        this.vivo = true;
        this.tamanho = tamanho;
        this.posicao = {x: posicao_x, y: posicao_y};
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