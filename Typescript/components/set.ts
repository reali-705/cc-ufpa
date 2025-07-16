import { Vetor } from "./array";

export class Conjunto<T> {
    private items: Map<T, T>;
    constructor() {
        this.items = new Map<T, T>();
    }
    has(element: T): boolean {
        return this.items.has(element);
    }
    clear(): void {
        this.items.clear();
    }
    values(): T[] {
        return Array.from(this.items.values());
    }
    size(): number {
        return this.items.size;
    }
    isEmpty(): boolean {
        return this.size() === 0;
    }
    print(): void {
        if (this.isEmpty()) {
            console.log("Conjunto vazio");
            return;
        }
        console.log("Elementos do Conjunto:\n", this.values().join("\n"));
    }
    add(element: T): boolean {
        if (this.has(element)) {
            return false;
        }
        this.items.set(element, element);
        return true;
    }
    remove(element: T): boolean {
        return this.items.delete(element);
    }
    get(element: T): T | undefined {
        return this.items.get(element);
    }
    pop(element: T): T | undefined {
        if (!this.has(element)) {
            return undefined;
        }
        const value = this.items.get(element);
        this.items.delete(element);
        return value;
    }
    map<U>(callbackfn: (value: T, key: T, set: Conjunto<T>) => U): Conjunto<U> {
        const conjuntoMapeado = new Conjunto<U>();
        this.values().forEach(item => conjuntoMapeado.add(callbackfn(item, item, this)));
        return conjuntoMapeado;
    }
    toVetor(): Vetor<T> {
        const vetor = new Vetor<T>(this.size());
        this.values().forEach(item => vetor.inserir(item));
        return vetor;
    }
    union(otherSet: Conjunto<T>): Conjunto<T> {
        const unionSet = new Conjunto<T>();
        this.values().forEach(item => unionSet.add(item));
        otherSet.values().forEach(item => unionSet.add(item));
        return unionSet;
    }
    intersection(otherSet: Conjunto<T>): Conjunto<T> {
        const intersectionSet = new Conjunto<T>();
        this.values().forEach(item => {
            if (otherSet.has(item)) {
                intersectionSet.add(item);
            }
        });
        return intersectionSet;
    }
    difference(otherSet: Conjunto<T>): Conjunto<T> {
        const differenceSet = new Conjunto<T>();
        this.values().forEach(item => {
            if (!otherSet.has(item)) {
                differenceSet.add(item);
            }
        });
        return differenceSet;
    }
    isSubsetOf(otherSet: Conjunto<T>): boolean {
        if (this.size() > otherSet.size()) {
            return false;
        }
        return this.values().every(item => otherSet.has(item));
    }
    isSupersetOf(otherSet: Conjunto<T>): boolean {
        if (this.size() < otherSet.size()) {
            return false;
        }
        return otherSet.values().every(item => this.has(item));
    }
}