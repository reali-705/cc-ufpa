import { Pilha } from "../components/staks.ts";
import { dataJogador, IDClass, Item } from "../contract/interfaces.ts";
import { Inventario } from "./inventario.ts";

export class Jogador implements IDClass {
    public readonly id: string;
    public nome: string;
    public vida: number;
    public vidaMaximo: number;
    public escudo: number;
    public escudoMaximo: number;
    public historico: Pilha<string>;
    public inventario: Inventario;
    public moedas: number;
    constructor(data: dataJogador) {
        this.id = data.id;
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
        const posicaoAnterior = this.verPosicaoAtual();
        if (posicaoAnterior === "") {
            this.historico.remover();
        }
        this.historico.inserir(posicao);
    }
    public verPosicaoAtual(): string {
        return this.historico.verTopo() || "";
    }
    public minerar(itens: Item[]): void {
        const item = itens[Math.floor(Math.random() * itens.length)];
        const quantidade = Math.floor(Math.random() * (10 - item.raridade * 2 + 1)) + 1;
        this.inventario.adicionarItem(item, quantidade);
    }
    public salvarObjeto(): dataJogador {
        return {
            id: this.id,
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
    public print(): void {
        console.log(`Jogador: ${this.nome} (ID: ${this.id})`);
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