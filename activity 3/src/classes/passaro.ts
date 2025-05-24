import { Personagem } from "./personagem.ts";
import { Porco } from "./porco.ts";

export class Passaro extends Personagem {
    // Atributos especificos do Passaro
    public dano: number;
    public GRAVIDADE: number = 10;
    public velocidade: {x: number, y: number} = {x: 0, y: 0};
    public voando: boolean = false;

    constructor(tamanho: string = 'pequeno', posicao_x: number, posicao_y: number) {
        super(tamanho, posicao_x, posicao_y);
        this.dano = 10 * this.raio;
    }

    public lancar(angulo: number, velocidade: number) {
        angulo = (angulo * Math.PI) / 180;
        this.velocidade = {x: velocidade * Math.cos(angulo), y: - velocidade * Math.sin(angulo)};
        this.voando = true;
    }

    public voar(tempo: number) {
        this.posicao.x += this.velocidade.x * tempo;
        this.velocidade.y += this.GRAVIDADE * tempo;
        this.posicao.y += this.velocidade.y * tempo;
    }

    public acertar(alvo: Porco) {
        if (!this.voando || !alvo.vivo) {
            return;
        }
        alvo.receberDano(this.dano)
        if (alvo.vivo) {
            this.vivo = false;
            this.voando = false;
        } else {
            this.dano -= alvo.vida;
        }
    }
}