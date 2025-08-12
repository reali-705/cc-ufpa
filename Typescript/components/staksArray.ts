import { Vetor } from "./array.ts";

export class PilhaVetor<T> {
    private itens: Vetor<T>;
    constructor() {
        this.itens = new Vetor<T>();
    }
    inserir(data: T): void {
        this.itens.inserir(data);
    }
    remover(): T | undefined {
        if (this.itens.isEmpty()) {
            console.log("A pilha esta vazia.");
            return undefined;
        }
        return this.itens.remover(this.itens.getSize() - 1);
    }
    verTopo(): T | undefined {
        if (this.itens.isEmpty()) {
            console.log("A pilha esta vazia.");
            return undefined;
        }
        return this.itens.ver(this.itens.getSize() - 1);
    }
    tamanho(): number {
        return this.itens.getSize();
    }
    getSize(): number {
        return this.itens.getSize();
    }
    isEmpty(): boolean {
        return this.itens.isEmpty();
    }
    clear(): void {
        this.itens.clear();
    }
    print(): void {
        let result = "Topo -> ";
        for (let i = this.itens.getSize() - 1; i >= 0; i--) {
            result += this.itens.ver(i) + " -> ";
        }
        result += "Fim";
        console.log(result);
    }
}