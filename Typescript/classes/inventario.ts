import { Elementos } from "../enums";

export class Inventario {
    private capacidade: number;
    private items: Map<Elementos, number>;
    private itemsTotal: number;
    constructor(capacidade: number) {
        this.capacidade = capacidade;
        this.items = new Map<Elementos, number>();
        this.itemsTotal = 0;
    }
    public print(): void {
        console.log("Inventário - Capacidade: " + this.capacidade);
        for (const [elemento, quantidade] of this.items) {
            console.log(`${elemento}: ${quantidade}`);
        }
    }
    public getCapacidade(): number {
        return this.capacidade;
    }
    public getItems(): Map<Elementos, number> {
        return this.items;
    }
    public clear(): void {
        this.items.clear();
        this.itemsTotal = 0;
    }
    public capacidadeRestante(): number {
        return this.capacidade - this.itemsTotal;
    }
    public addItem(item: Elementos, quantidade: number): boolean {
        if (quantidade <= 0) return false;
        if (this.capacidadeRestante() < quantidade) return false;
        const quantidadeAtual = this.items.get(item) || 0;
        this.items.set(item, quantidadeAtual + quantidade);
        this.itemsTotal++;
        return true;
    }
    public removeItem(item: Elementos, quantidade: number): boolean {
        if (!this.items.get(item)) return false;
        this.items.set(item, this.items.get(item)! - quantidade);
        this.itemsTotal--;
        if (this.items.get(item) === 0) this.items.delete(item);
        return true;
    }
    public addCapacidade(capacidade: number): void {
        this.capacidade += capacidade;
    }
}