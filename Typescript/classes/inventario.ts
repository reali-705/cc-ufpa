import { Item } from "./item.ts";

export class Inventario {
    private capacidadeMax: number;
    private pilhas: Item[];
    constructor(capacidade: number, itens: Item[] = []) {
        this.capacidadeMax = capacidade;
        this.pilhas = [...itens];
    }
    public addItem(itemAdd: Item): boolean {
        let quantidadeRestante = itemAdd.quantidade;
        for (const pilha of this.pilhas) {
            if (pilha.nome === itemAdd.nome && !pilha.cheia()) {
                const quantiadeDisponivel = pilha.disponivel();
                const quantidadeAdicionar = Math.min(quantidadeRestante, quantiadeDisponivel);
                if (quantidadeAdicionar > 0) {
                    pilha.quantidade += quantidadeAdicionar;
                    quantidadeRestante -= quantidadeAdicionar;
                    if (!quantidadeRestante) return true;
                }
            }
        }
        while (quantidadeRestante > 0 && this.pilhas.length < this.capacidadeMax) {
            const limitePilha = itemAdd.pilhaMax;
            const quantidadeAdicionar = Math.min(quantidadeRestante, limitePilha);
            const novaPilha = new Item(
                itemAdd.nome,
                itemAdd.descricao,
                quantidadeAdicionar,
                itemAdd.pilhaMax,
                itemAdd.id
            );
            this.pilhas.push(novaPilha);
            quantidadeRestante -= quantidadeAdicionar;
        }
        return quantidadeRestante < itemAdd.quantidade;
    }
    public removeItem(nomeItem: string, quantidadeItem: number): boolean {
        let quantidadeRemovida = 0;
        const pilhasItem = this.pilhas.filter((item) => item.nome === nomeItem);
        if (!pilhasItem.length) return false;
        const totalDisponivel = pilhasItem.reduce((total, pilha) => total + pilha.quantidade, 0);
        if (totalDisponivel < quantidadeItem) return false;
        for (let i = pilhasItem.length -1; i >= 0 && quantidadeItem > 0; i--) {
            const pilha = pilhasItem[i];
            const quantidadeRestante = Math.min(quantidadeItem, pilha.quantidade);
            pilha.quantidade -= quantidadeRestante;
            quantidadeItem -= quantidadeRestante;
            quantidadeRemovida += quantidadeRestante;
            if (!pilha.quantidade) {
                const index = this.pilhas.indexOf(pilha);
                if (index > -1) this.pilhas.splice(index, 1);
            }
        }
        return true;
    }
    public getItens(): Item[] {
        return this.pilhas;
    }
    public salvarObjeto(): any {
        return {
            capacidadeMax: this.capacidadeMax,
            itens: this.pilhas.map((item) => item.salvarObjeto())
        };
    }
    public static carregarObjeto(data: any): Inventario {
        const itens: Item[] = [];
        if (data.itens) {
            data.itens.forEach((itemData: any) => {
                try {
                    const item = Item.carregarObjeto(itemData);
                    itens.push(item);
                } catch (error) {
                    console.warn(error);
                }
            });
        }
        return new this(data.capacidadeMax, itens);
    }
    public print(): void {
        console.log("===== Inventário =====");
        if (!this.pilhas.length) {
            console.log("Vazio.");
        } else {
            const itens = new Map<string, { total: number, pilhas: number }>();
            this.pilhas.forEach((item) => {
                const itemData = itens.get(item.nome) || { total: 0, pilhas: 0 };
                itemData.total += item.quantidade;
                itemData.pilhas++;
                itens.set(item.nome, itemData);
            });
            itens.forEach((itemData, item) => {
                console.log(`${item}: ${itemData.total} (${itemData.pilhas} pilhas)`);
            });
        }
        console.log(`Slots Ocupados: ${this.pilhas.length}/${this.capacidadeMax}`);
        console.log("======================");
    }
}