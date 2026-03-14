import { dataPersonagem } from "../contract/interfaces.ts";

export class Personagem {
    public readonly nome: string;
    public vida: number;
    public readonly vidaMaxima: number;
    public escudo: number;
    public readonly escudoMaximo: number;
    constructor(data: dataPersonagem) {
        this.nome = data.nome;
        this.vida = data.vida ? data.vida : data.vidaMaxima;
        this.vidaMaxima = data.vidaMaxima;
        this.escudo = data.escudo ? data.escudo : data.escudoMaximo;
        this.escudoMaximo = data.escudoMaximo;
    }
    public receberDano(dano: number): void {
        if (this.escudo > 0) {
            const danoNoEscudo = Math.min(this.escudo, dano);
            this.escudo -= danoNoEscudo;
            dano -= Math.floor(danoNoEscudo);
        }
        if (dano > 0) {
            this.vida -= Math.floor(dano);
        }
        if (this.vida < 0) {
            this.vida = 0;
        }
    }
    public estaVivo(): boolean {
        return this.vida > 0;
    }
}