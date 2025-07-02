import { Pilha } from "../elements/staks.ts";
import { Item, Itens } from "./item.ts";

export class Inventario {
    private maxItensPorPilha: number;
    private maxPilhas: number;
    private pilhas: Pilha<Item>[];
    constructor(maxItensPorPilha: number = 64, maxPilhas: number = 10, itens: Itens[] = []) {
        this.maxItensPorPilha = maxItensPorPilha;
        this.maxPilhas = maxPilhas;
        this.pilhas = new Array<Pilha<Item>>(maxPilhas);
        for (let i = 0; i < maxPilhas; i++) {
            this.pilhas[i] = new Pilha<Item>();
        }
        for (let i = 0; i < itens.length; i++) {
            this.addItem(itens[i]);
        }
    }
    public addItem(itens: Itens): boolean {
        let quantidadeRestante = itens.quantidade;
        const maxItensNessaPilha = Math.floor(this.maxItensPorPilha / itens.item.tamanho);
        const pilhasOcupadas = this.pilhas.filter((pilha) => pilha.getData());
        for (let i = 0; i < pilhasOcupadas.length; i++) {
            const pilha = pilhasOcupadas[i];
            if (pilha.getData()!.id === itens.item.id && pilha.getSize() < maxItensNessaPilha) {
                const quantidadeAdd = Math.min(quantidadeRestante, maxItensNessaPilha - pilha.getSize());
                for (let j = 0; j < quantidadeAdd; j++) pilha.push(itens.item);
                quantidadeRestante -= quantidadeAdd;
                if (!quantidadeRestante) return true;
            }
        }
        const pilhasVazias = this.pilhas.filter((pilha) => pilha.isEmpty());
        for (let i = 0; i < pilhasVazias.length; i++) {
            const pilha = pilhasVazias[i];
            if (pilha.getSize() < maxItensNessaPilha) {
                const quantidadeAdd = Math.min(quantidadeRestante, maxItensNessaPilha - pilha.getSize());
                for (let j = 0; j < quantidadeAdd; j++) pilha.push(itens.item);
                quantidadeRestante -= quantidadeAdd;
                if (!quantidadeRestante) return true;
            }
        }
        return false;
    }
    public removeItem(itens: Itens): boolean {
        if (!this.pilhas.filter((pilha) => pilha.getData())) return false;
        let quantidadeRestante = itens.quantidade;
        const pilhasComItem = this.pilhas.filter((pilha) => {
            return pilha.getData()!.id === itens.item.id;
        });
        if (pilhasComItem.reduce((total, pilha) => total + pilha.getSize(), 0) < quantidadeRestante) return false;
        for (let i = pilhasComItem.length - 1; i >= 0; i--) {
            const pilha = pilhasComItem[i];
            const quantidadeRemove = Math.min(quantidadeRestante, pilha.getSize());
            for (let j = 0; j < quantidadeRemove; j++) {
                pilha.pop();
            }
            quantidadeRestante -= quantidadeRemove;
            if (pilha.isEmpty()) pilha.clear();
            if (!quantidadeRestante) return true;
        }
        return false;
    }
    public isFull(): boolean {
        return this.maxPilhas === this.pilhas.filter((pilha) => pilha.getData()).length;
    }
    public getItens(): Itens[] {
        return this.pilhas.map((pilha) => ({ item: pilha.getData()!, quantidade: pilha.getSize() }));
    }
    public salvarObjeto(): any {
        return {
            maxItensPorPilha: this.maxItensPorPilha,
            maxPilhas: this.maxPilhas,
            itens: this.pilhas.map((pilha) => {
                return {
                    item: pilha.getData()!.salvarObjeto(),
                    quantidade: pilha.getSize()
                };
            })
        };
    }
    public static carregarObjeto(data: any): Inventario {
        const itens: Itens[] = [];
        if (data.itens) {
            data.itens.forEach((itemData: any) => {
                try {
                    const item = Item.carregarObjeto(itemData.item);
                    itens.push({ item: item, quantidade: itemData.quantidade });
                } catch (error) {
                    console.warn(error);
                }
            });
        }
        return new this(data.maxItensPorPilha, data.maxPilhas, itens);
    }
    public print(): void {
        console.log("------ Inventário ------");
        const pilhasOcupadas = this.pilhas.filter((pilha) => pilha.getData());
        console.log(`Pilhas Ocupadas: ${pilhasOcupadas.length}/${this.maxPilhas}`);
        pilhasOcupadas.forEach((pilha) => {
            const item = pilha.getData()!;
            console.log(`Item: ${item.id} - ${item.nome} (${item.raridade})\nQuantidade: ${pilha.getSize()}`);
        });
        console.log("------------------------");
    }
}