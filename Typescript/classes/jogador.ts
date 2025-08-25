import { Pilha } from "../components/staks.ts";
import { dataJogador, Item } from "../contract/interfaces.ts";
import { Inventario } from "./inventario.ts";
import { Personagem } from "./personagem.ts";

export class Jogador extends Personagem {
    public historico: Pilha<string>;
    public inventario: Inventario;
    public moedas: number;
    constructor(data: dataJogador) {
        super(data);
        this.historico = new Pilha<string>();
        data.historico.forEach(posicao => this.historico.inserir(posicao));
        this.inventario = Inventario.carregarObjeto(data.inventario);
        this.moedas = data.moedas;
    }
    public atualizarPosicao(posicao: string): void {
        this.historico.inserir(posicao);
    }
    public verPosicaoAtual(): string {
        return this.historico.verTopo()!;
    }
    public minerar(item: Item, quantidade: number): void {
        this.inventario.adicionarItem(item, quantidade);
    }
    public recuperarEscudo(): boolean {
        if (Math.random() < 0.5) {
            this.escudo += Math.min(Math.floor(this.escudoMaximo * 0.25), this.escudoMaximo);
            return false;
        }
        this.escudo = this.escudoMaximo;
        return true;
    }
    public calcularDano(): number {
        const danoBase = 20;
        const variacao = 1 + (Math.random() * 0.4 - 0.2);
        return Math.floor(danoBase * variacao);
    }
    public salvarObjeto(): dataJogador {
        return {
            nome: this.nome,
            vida: this.vida,
            vidaMaxima: this.vidaMaxima,
            escudo: this.escudo,
            escudoMaximo: this.escudoMaximo,
            historico: this.historico.toArray().filter(item => item !== null),
            inventario: this.inventario.salvarObjeto(),
            moedas: this.moedas
        };
    }
    public static carregarObjeto(data: dataJogador): Jogador {
        return new this(data);
    }
    public static criarNovoObjeto(nomeJogador: string): dataJogador {
        const vidaMaxima = 100;
        const escudoMaximo = 50;
        return {
            nome: nomeJogador,
            vida: vidaMaxima,
            vidaMaxima: vidaMaxima,
            escudo: escudoMaximo,
            escudoMaximo: escudoMaximo,
            historico: [],
            inventario: {
                capacidadeMaxima: 100,
                capacidadeAtual: 0,
                slots: []
            },
            moedas: 100
        };
    }
    public print(): void {
        console.log(`Jogador: ${this.nome}`);
        console.log(`Vida: ${this.vida}/${this.vidaMaxima}`);
        console.log(`Escudo: ${this.escudo}/${this.escudoMaximo}`);
        console.log(`Moedas: ${this.moedas}`);
        console.log(`Posição Atual: ${this.verPosicaoAtual()}`);
        console.log("\nMochila:");
        this.inventario.print();
    }
    public printHistorico(): void {
        console.log("Histórico de Posições:");
        const historico = this.historico;
        historico.toArray().forEach((posicao, indice) => {
            console.log(`${indice} : ${posicao}`);
        });
    }
}