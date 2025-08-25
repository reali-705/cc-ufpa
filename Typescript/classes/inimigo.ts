import { TipoInimigo } from "../contract/enums.ts";
import { INIMIGOS_DATA } from "../contract/gameData.ts";
import { dataInimigo } from "../contract/interfaces.ts";
import { sortearEnum } from "../functions/utilidades.ts";
import { Personagem } from "./personagem.ts";

export class Inimigo extends Personagem {
    public readonly poder: number;
    public readonly dano: number;
    public readonly resistencia: number;
    constructor(data: dataInimigo) {
        super(data);
        this.dano = data.dano;
        this.resistencia = data.resistencia;
        this.poder = Math.floor((this.vidaMaxima + 2 * this.escudoMaximo + this.dano + 3 * this.resistencia) / 7);
    }
    public atacar(): number {
        return (Math.floor(Math.random() * this.dano) + this.dano) / 2;
    }
    public receberDano(dano: number): void {
        super.receberDano(dano - this.resistencia);
    }
    public salvarObjeto(): string {
        return JSON.stringify({
            nome: this.nome,
            vida: this.vida,
            vidaMaxima: this.vidaMaxima,
            escudo: this.escudo,
            escudoMaximo: this.escudoMaximo,
            dano: this.dano,
            resistencia: this.resistencia,
        });
    }
    public static carregarObjeto(data: string): Inimigo {
        return new this(JSON.parse(data) as dataInimigo);
    }
    public static criarNovoObjeto(): string {
        const inimigoTipo = sortearEnum(TipoInimigo);
        const inimigoData = INIMIGOS_DATA[inimigoTipo];
        const variacao = () => 1 + (Math.random() * 0.4 - 0.2);
        const vidaMaxima = Math.floor(inimigoData.vidaMaxima * variacao());
        const escudoMaximo = Math.floor(inimigoData.escudoMaximo * variacao());
        return JSON.stringify({
            nome: inimigoData.nome,
            vida: vidaMaxima,
            vidaMaxima: vidaMaxima,
            escudo: escudoMaximo,
            escudoMaximo: escudoMaximo,
            dano: Math.floor(inimigoData.dano * variacao()),
            resistencia: Math.floor(inimigoData.resistencia * variacao()),
        });
    }
}