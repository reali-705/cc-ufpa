import { Planeta } from "./planeta.ts";
import { Jogador } from "./jogador.ts";
import { Node } from "../components/node.ts";
import { Bioma } from "./bioma.ts";
import { TabelaHash } from "../components/hashTable.ts";
import { Dicionario } from "../components/maps.ts";
import { Item } from "../contract/interfaces.ts";

export class GameMaster {
    public planeta: Planeta;
    public jogador: Jogador;
    private biomaTabela = new Dicionario<string, Node<Bioma>>();
    // public naves: Dicionario<Posicao, Nave>;
    constructor(planeta: Planeta, jogador: Jogador) {
        // adicionando biomas à tabela
        let nodeBioma = planeta.biomas.getHead();
        if (nodeBioma === null) {
            throw new Error("O planeta não possui biomas.");
        }
        for (let i = 0; i < planeta.biomas.getSize(); i++) {
            this.biomaTabela.inserir(nodeBioma.data.id, nodeBioma);
            nodeBioma = nodeBioma.next!;
        }
        console.log(this.biomaTabela.toString());
        // obtendo planeta
        this.planeta = planeta;
        // tratando dados do jogador
        const posicaoAtual = jogador.verPosicaoAtual();
        if (posicaoAtual === "Desconhecida" || !posicaoAtual.includes(planeta.id)) {
            const bioma = this.planeta.biomas.getHead()!;
            jogador.atualizarPosicao(this.planeta.id + " - " + bioma.data.id);
        }
        this.jogador = jogador;
    }
    private procurarPosicao(): Node<Bioma> {
        // retorna o bioma correspondente à posição atual do jogador
        const posicaoAtual = this.jogador.verPosicaoAtual().split(" - ");
        return this.biomaTabela.obterValor(posicaoAtual[1])!;
    }
    public irLeste(): boolean {
        const proximoBioma = this.procurarPosicao().next;
        if (proximoBioma) {
            this.jogador.atualizarPosicao(this.planeta.id + " - " + proximoBioma.data.id);
            return true;
        }
        return false;
    }
    public irOeste(): boolean {
        const proximoBioma = this.procurarPosicao().prev;
        if (proximoBioma) {
            this.jogador.atualizarPosicao(this.planeta.id + " - " + proximoBioma.data.id);
            return true;
        }
        return false;
    }
    public minerar(): boolean {
        const bioma = this.procurarPosicao().data;
        if (bioma) {
            this.jogador.minerar(bioma.recursos.values());
            return true;
        }
        return false;
    }
    public removerItem(item: Item, quantidade: number): void {
        this.jogador.inventario.removerItem(item, quantidade);
    }
}