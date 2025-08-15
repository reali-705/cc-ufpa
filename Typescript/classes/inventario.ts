import { Dicionario } from "../components/maps.ts";
import { dataInventario, IDClass, Item } from "../contract/interfaces.ts";

export class Inventario {
    public capacidadeMaxima: number;
    public capacidadeAtual: number;
    public slots: Dicionario<Item, number>;
    constructor(data: dataInventario) {
        this.capacidadeMaxima = data.capacidadeMaxima;
        this.capacidadeAtual = data.capacidadeAtual;
        this.slots = new Dicionario<Item, number>((item: Item) => item.id);
        if (Array.isArray(data.slots)) {
            data.slots.forEach(([item, quantidade]) => this.slots.inserir(item, quantidade));
        }
    }
    public adicionarItem(item: Item, quantidade: number): void {
        let capacidadeOcupada = quantidade * item.tamanho;
        while (quantidade > 0) {
            if (capacidadeOcupada + this.capacidadeAtual <= this.capacidadeMaxima) {
                break;
            }
            quantidade--;
            capacidadeOcupada -= item.tamanho;
        }
        if (capacidadeOcupada + this.capacidadeAtual > this.capacidadeMaxima) {
            throw new Error("Capacidade máxima do inventário excedida");
        }
        this.capacidadeAtual += capacidadeOcupada;
        this.slots.inserir(item, quantidade);
    }
    public removerItem(item: Item, quantidade: number): void {
        if (!this.slots.existeChave(item)) {
            throw new Error("Item não existe no inventário");
        }
        const quantidadeAtual = this.slots.obterValor(item) || 1;
        if (quantidade > quantidadeAtual) {
            throw new Error("Quantidade a ser removida é maior que a quantidade atual");
        }
        this.capacidadeAtual -= quantidade * item.tamanho;
        if (quantidade === quantidadeAtual) {
            this.slots.remover(item);
        } else {
            this.slots.inserir(item, quantidadeAtual - quantidade);
        }
    }
    public salvarObjeto(): dataInventario {
        const mapa: [Item, number][] = new Array(this.slots.tamanho());
        this.slots.forEach((item, quantidade) => {
            mapa.push([item, quantidade]);
        });
        return {
            capacidadeMaxima: this.capacidadeMaxima,
            capacidadeAtual: this.capacidadeAtual,
            slots: mapa.filter(item => item !== null)
        };
    }
    public static carregarObjeto(data: dataInventario): Inventario {
        return new this(data);
    }
    public print(): void {
        console.log(`Inventario: ${this.capacidadeAtual}/${this.capacidadeMaxima}`);
        this.slots.forEach((item, quantidade) => {
            console.log(`-(${item.id}) ${item.nome}: ${quantidade} (x${item.tamanho})`);
        });
    }
}