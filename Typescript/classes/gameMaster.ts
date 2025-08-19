import { Planeta } from "./planeta.ts";
import { Jogador } from "./jogador.ts";
import { Node } from "../components/node.ts";
import { Bioma } from "./bioma.ts";
import { Dicionario } from "../components/maps.ts";
import { dataGameMaster, Item } from "../contract/interfaces.ts";
import { Tamanho } from "../contract/enums.ts";

export class GameMaster {
    private planeta: Planeta;
    private jogador: Jogador;
    private biomaTabela: Dicionario<string, Node<Bioma>>;
    constructor(data: dataGameMaster) {
        // carregando objetos
        this.planeta = Planeta.carregarObjeto(data.planeta);    
        this.jogador = Jogador.carregarObjeto(data.jogador);
        // adicionando biomas à tabela
        this.biomaTabela = this.criarTabela();
        // tratando dados do jogador
        const posicaoAtual = this.jogador.verPosicaoAtual();
        if (!posicaoAtual || !posicaoAtual.includes(this.planeta.id)) {
            const bioma = this.planeta.biomas.getHead()!;
            this.jogador.atualizarPosicao(bioma.data.id);
        }
    }
    private criarTabela(): Dicionario<string, Node<Bioma>> {
        const tabela = new Dicionario<string, Node<Bioma>>();
        let nodeBioma = this.planeta.biomas.getHead();
        if (nodeBioma === null) {
            throw new Error("O planeta não possui biomas.");
        }
        for (let i = 0; i < this.planeta.biomas.getSize(); i++) {
            tabela.inserir(nodeBioma.data.id, nodeBioma);
            nodeBioma = nodeBioma.next!;
        }
        return tabela
    }
    private procurarPosicao(): Node<Bioma> {
        return this.biomaTabela.obterValor(this.verPosicaoAtual())!;
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
            this.jogador.atualizarPosicao(proximoBioma.data.id);
            return true;
        }
        return false;
    }
    public irOeste(): boolean {
        const proximoBioma = this.procurarPosicao().prev;
        if (proximoBioma) {
            this.jogador.atualizarPosicao(proximoBioma.data.id);
            return true;
        }
        return false;
    }
    public abrirInventario(): Dicionario<Item, number> {
        return this.jogador.inventario.slots;
    }
    public minerar(): boolean {
        const bioma = this.procurarPosicao().data;
        const itens = bioma.recursos.values();
        if (itens.length > 0) {
            const item = itens[Math.floor(Math.random() * itens.length)];
            this.jogador.minerar(item, Math.floor(Math.random() * (10 - 5 * item.raridade)) + 1);
            return true;
        }
        return false;
    }
    public removerItem(item: Item, quantidade: number): void {
        this.jogador.inventario.removerItem(item, quantidade);
    }
    public static criarNovoObjeto(nomeJogador: string, tamanhoPlaneta: Tamanho): GameMaster {
        const jogador = Jogador.criarNovoObjeto(nomeJogador);
        const planeta = Planeta.criarNovoObjeto(tamanhoPlaneta);
        return new this({
            jogador,
            planeta
        });
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