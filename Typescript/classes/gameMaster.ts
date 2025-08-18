import { Planeta } from "./planeta.ts";
import { Jogador } from "./jogador.ts";
import { Node } from "../components/node.ts";
import { Bioma } from "./bioma.ts";
import { Dicionario } from "../components/maps.ts";
import { dataGameMaster, Item } from "../contract/interfaces.ts";

export class GameMaster {
    private planeta: Planeta;
    private jogador: Jogador;
    private biomaTabela = new Dicionario<string, Node<Bioma>>();
    constructor(data: dataGameMaster) {
        // carregando objetos
        this.planeta = Planeta.carregarObjeto(data.planeta);
        this.jogador = Jogador.carregarObjeto(data.jogador);
        // adicionando biomas à tabela
        let nodeBioma = this.planeta.biomas.getHead();
        if (nodeBioma === null) {
            throw new Error("O planeta não possui biomas.");
        }
        for (let i = 0; i < this.planeta.biomas.getSize(); i++) {
            this.biomaTabela.inserir(nodeBioma.data.id, nodeBioma);
            nodeBioma = nodeBioma.next!;
        }
        console.log(this.biomaTabela.toString());
        // tratando dados do jogador
        const posicaoAtual = this.jogador.verPosicaoAtual();
        if (posicaoAtual === "" || !posicaoAtual.includes(this.planeta.id)) {
            const bioma = this.planeta.biomas.getHead()!;
            this.jogador.atualizarPosicao(this.planeta.id + " - " + bioma.data.id);
        }
    }
    private procurarPosicao(): Node<Bioma> {
        // retorna o bioma correspondente à posição atual do jogador
        const posicaoAtual = this.jogador.verPosicaoAtual().split(" - ");
        return this.biomaTabela.obterValor(posicaoAtual[1])!;
    }
    public verJogador(): Jogador {
        return this.jogador;
    }
    public verPlaneta(): Planeta {
        return this.planeta;
    }
    public verPosicaoAtual(): string {
        return this.jogador.verPosicaoAtual();
    }
    public verHistoricoPosicoes(): string[] {
        return this.jogador.historico.toArray();
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
    public abrirInventario(): Dicionario<Item, number> {
        return this.jogador.inventario.slots;
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
    public static carregarObjeto(data: dataGameMaster): GameMaster {
        return new this(data);
    }
    public salvarObjeto(): dataGameMaster {
        return {
            planeta: this.planeta.salvarObjeto(),
            jogador: this.jogador.salvarObjeto()
        };
    }
    public print(): void {
        this.planeta.print();
        this.jogador.print();
    }
}