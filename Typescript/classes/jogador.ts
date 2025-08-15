import { Node } from "../components/node.ts";
import { Pilha } from "../components/staks.ts";
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
    public historico: Pilha<Posicao>;
    public inventario: Inventario;
    public moedas: number;
    constructor(data: dataJogador) {
        this.id = data.id;
        this.nome = data.nome;
        this.vida = data.vida;
        this.vidaMaximo = data.vidaMaxima;
        this.escudo = data.escudo;
        this.escudoMaximo = data.escudoMaximo;
        this.historico = new Pilha<Posicao>();
        data.historico.forEach(posicao => this.historico.inserir(posicao));
        this.inventario = Inventario.carregarObjeto(data.inventario);
        this.moedas = data.moedas;
    }
    private atualizarPosicao(Bioma: Node<Bioma> | null): void {
        if (!Bioma) {
            return;
        }
        const posicaoAnterior = this.historico.verTopo();
        if (!posicaoAnterior) {
            throw new Error("Histórico de posições vazio.");
        }
        this.historico.inserir({
            sistemaID: posicaoAnterior.sistemaID,
            planetaID: posicaoAnterior.planetaID,
            biomaID: Bioma.data.id
        });
    }
    public mostrarHistorico(): void {
        console.log("Histórico de Posições:");
        const historico = this.historico;
        historico.toArray().forEach(posicao => {
            console.log(` - ${posicao.sistemaID} => ${posicao.planetaID} => ${posicao.biomaID}`);
        });
    }
    public verPosicaoAtual(): Posicao | undefined {
        return this.historico.verTopo();
    }
    public irLeste(bioma: Node<Bioma>): void {
        this.atualizarPosicao(bioma.next);
    }
    public irOeste(bioma: Node<Bioma>): void {
        this.atualizarPosicao(bioma.prev);
    }
    public minerar(bioma: Bioma): void {
        const recursos = bioma.recursos.values();
        const item = recursos[Math.floor(Math.random() * recursos.length)];
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
        const posicaoAtual = this.verPosicaoAtual();
        if (!posicaoAtual) {
            console.log("Posição Atual: Desconhecida");
        } else {
            console.log(`Posição Atual: ${posicaoAtual.sistemaID} => ${posicaoAtual.planetaID} => ${posicaoAtual.biomaID}`);
        }
        console.log("\nMochila:");
        this.inventario.print();
    }
}