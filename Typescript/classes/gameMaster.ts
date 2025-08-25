import { Planeta } from "./planeta.ts";
import { Jogador } from "./jogador.ts";
import { Node } from "../components/node.ts";
import { Bioma } from "./bioma.ts";
import { Dicionario } from "../components/maps.ts";
import { dataGameMaster, Item } from "../contract/interfaces.ts";
import { Tamanho } from "../contract/enums.ts";
import { Inimigo } from "./inimigo.ts";

type GameState = 'explorando' | 'combate' | 'vitoria' | 'derrota';

export class GameMaster {
    private planeta: Planeta;
    private jogador: Jogador;
    private biomaTabela: Dicionario<string, Node<Bioma>>;
    private estadoAtual: GameState;
    public inimigoAtual: Inimigo | null;
    public inimigosDerrotados: Inimigo[];
    constructor(data: dataGameMaster) {
        this.planeta = Planeta.carregarObjeto(data.planeta);    
        this.jogador = Jogador.carregarObjeto(data.jogador);
        this.biomaTabela = this.criarTabela();
        this.estadoAtual = 'explorando';
        this.inimigoAtual = null;
        this.inimigosDerrotados = [];
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
    public procurarPosicao(): Node<Bioma> {
        return this.biomaTabela.obterValor(this.verPosicaoAtual())!;
    }
    private verificarEncontroDeInimigo(): string | null {
        return (Math.random() < 0.35) ? this.iniciarCombate() : null;
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
    public getEstado(): GameState {
        return this.estadoAtual;
    }
    public verHistoricoPosicoes(): string[] {
        return this.jogador.historico.toArray();
    }
    public abrirInventario(): Dicionario<Item, number> {
        return this.jogador.inventario.slots;
    }
    public removerItem(item: Item, quantidade: number): void {
        this.jogador.inventario.removerItem(item, quantidade);
    }
    public iniciarCombate(): string {
        if (this.planeta.inimigos.isEmpty()) {
            return "Sorte sua, não há mais inimigos neste planeta.";
        }
        this.inimigoAtual = this.planeta.inimigos.remover()!;
        this.estadoAtual = 'combate';
        return `--- UM INIMIGO APARECEU: ${this.inimigoAtual.nome} (Poder: ${this.inimigoAtual.poder}) ---`;
    }
    public irLeste(): string | null {
        if (this.estadoAtual !== 'explorando') {
            return "Não pode se mover agora.";
        }
        const proximoBioma = this.procurarPosicao().next;
        if (proximoBioma) {
            this.jogador.atualizarPosicao(proximoBioma.data.id);
            return this.verificarEncontroDeInimigo();
        }
        return "Você não pode ir mais leste.";
    }
    public irOeste(): string | null {
        if (this.estadoAtual !== 'explorando') {
            return "Não pode se mover agora.";
        }
        const proximoBioma = this.procurarPosicao().prev;
        if (proximoBioma) {
            this.jogador.atualizarPosicao(proximoBioma.data.id);
            return this.verificarEncontroDeInimigo();
        }
        return "Você não pode ir mais Oeste.";
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
     public atacarInimigo(): string[] {
        if (this.estadoAtual !== 'combate' || !this.inimigoAtual) {
            return ["Não há inimigo para atacar."];
        }

        const mensagens: string[] = [];
        const danoJogador = this.jogador.calcularDano();
        
        // Turno do Jogador
        mensagens.push(`Você ataca ${this.inimigoAtual.nome}!`);
        this.inimigoAtual.receberDano(danoJogador);
        mensagens.push(`${this.inimigoAtual.nome} sofreu ${danoJogador} de dano.`);

        if (!this.inimigoAtual.estaVivo()) {
            return this.finalizarCombate(true);
        }

        // Turno do Inimigo
        const danoInimigo = this.inimigoAtual.atacar();
        mensagens.push(`${this.inimigoAtual.nome} ataca de volta!`);
        this.jogador.receberDano(danoInimigo);
        mensagens.push(`Você sofreu ${danoInimigo.toFixed(0)} de dano.`);

        if (!this.jogador.estaVivo()) {
            return this.finalizarCombate(false);
        }
        return mensagens;
    }
    public fugirCombate(): string {
        if (this.estadoAtual !== 'combate' || !this.inimigoAtual) {
            return "Não há combate para fugir.";
        }
        this.planeta.inimigos.inserir(this.inimigoAtual);
        this.inimigoAtual = null;
        this.estadoAtual = 'explorando';
        return "Você fugiu do combate com sucesso!";
    }

    private finalizarCombate(vitoria: boolean): string[] {
        if (vitoria) {
            const loot = Math.floor(Math.random() * 50) + 25;
            this.jogador.moedas += loot;
            this.inimigosDerrotados.push(this.inimigoAtual!);
            this.inimigoAtual = null;
            this.estadoAtual = 'explorando';
            return [
                `Você derrotou o inimigo!`,
                `Você encontrou ${loot} moedas.`
            ];
        } else {
            this.estadoAtual = 'derrota';
            return ["Você foi derrotado! Fim de jogo."];
        }
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