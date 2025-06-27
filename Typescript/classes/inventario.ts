import { Conjunto } from "../elements/set";
import { Materiais } from "../interfaces";


export class Inventario {
    private capacidade: number;
    private items: Conjunto<Materiais>;
    constructor(capacidade: number) {
        this.capacidade = capacidade;
        this.items = new Conjunto<Materiais>();
    }
    public getCapacidade(): number {
        return this.capacidade;
    }
    public getItems(): Conjunto<Materiais> {
        return this.items;
    }
    public clear(): void {
        this.items.clear();
    }
    public capacidadeRestante(): number {
        return this.capacidade - this.items.size();
    }
    public addItem(item: Materiais): boolean {
        if (this.items.size() < this.capacidade) {
            this.items.add(item);
            return true;
        }
        return false;
    }
    public getItem(item: Materiais): Materiais | undefined {
        return this.items.get(item);
    }
    public removeItem(item: Materiais): boolean {
        if (!this.items.has(item)) return false;
        return this.items.delete(item);
    }
    public addCapacidade(capacidade: number): void {
        this.capacidade += capacidade;
    }
}