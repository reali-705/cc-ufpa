import { Node } from "../components/node.ts";
import { dataJogador, IDClass, Posicao } from "../contract/interfaces.ts";
import { Bioma } from "./bioma.ts";
import { Inventario } from "./inventario.ts";
import { Nave } from "./nave.ts";

export class Jogador implements IDClass {
    public readonly id: string;
    public nome: string;
    public vida: number;
    public vidaMaximo: number;
    public escudo: number;
    public escudoMaximo: number;
    public posicaoAtual: Posicao;
    public biomaNode: Node<Bioma>;
    public inventario: Inventario;
    public nave: Nave | null; // TODO Nave
    public emNave: boolean; // TODO Nave
    public moedas: number;
    constructor(data: dataJogador) {
        this.id = data.id;
        this.nome = data.nome;
        this.vida = data.vida;
        this.vidaMaximo = data.vidaMaxima;
        this.escudo = data.escudo;
        this.escudoMaximo = data.escudoMaximo;
        this.posicaoAtual = data.posicao;
        this.inventario = Inventario.carregarObjeto(data.inventario);
        if (data.idNave) {
            // TODO criar nave
            this.emNave = true;
        } else {
            this.nave = null;
            this.emNave = false;
        }
        this.moedas = data.moedas;
    }
    public coletarItem(): void {
        
    }
    public salvarObjeto(): dataJogador {
        return {
            id: this.id,
            nome: this.nome,
            vida: this.vida,
            vidaMaxima: this.vidaMaximo,
            escudo: this.escudo,
            escudoMaximo: this.escudoMaximo,
            posicao: this.posicaoAtual,
            inventario: this.inventario.salvarObjeto(),
            idNave: this.nave ? this.nave.id : null, // TODO Nave
            moedas: this.moedas
        };
    }
    public static carregarObjeto(data: dataJogador): Jogador {
        return new this(data);
    }
    public print(): void {
        console.log(`Jogador: ${this.nome} (ID: ${this.id})`);
        console.log(`Vida: ${this.vida}/${this.vidaMaximo}`);
        console.log(`Escudo: ${this.escudo}/${this.escudoMaximo}`);
        console.log(`Moedas: ${this.moedas}`);
    }
}