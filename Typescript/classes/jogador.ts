import { Pilha } from "../components/staks.ts";
import { dataJogador, Item } from "../contract/interfaces.ts";
import { Inventario } from "./inventario.ts";

export class Jogador {
    public readonly nome: string;
    public vida: number;
    public readonly vidaMaximo: number;
    public escudo: number;
    public readonly escudoMaximo: number;
    public historico: Pilha<string>;
    public inventario: Inventario;
    public moedas: number;
    constructor(data: dataJogador) {
        this.nome = data.nome;
        this.vida = data.vida;
        this.vidaMaximo = data.vidaMaxima;
        this.escudo = data.escudo;
        this.escudoMaximo = data.escudoMaximo;
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
    public salvarObjeto(): dataJogador {
        return {
            nome: this.nome,
            vida: this.vida,
            vidaMaxima: this.vidaMaximo,
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
        console.log(`Vida: ${this.vida}/${this.vidaMaximo}`);
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