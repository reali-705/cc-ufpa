import { Vetor } from "./array.ts";
import { Node } from "./node.ts";

export class ListaVinculadaCircular<T> {
    private head: Node<T> | null;
    private size: number;
    constructor() {
        this.head = null;
        this.size = 0;
    }
    clear(): void {
        this.head = null;
        this.size = 0;
    }
    getSize(): number {
        return this.size;
    }
    isEmpty(): boolean {
        return this.size === 0;
    }
    getHead(): Node<T> | null {
        return this.head;
    }
    paraVetor(): Vetor<T> {
        const result = new Vetor<T>();
        if (!this.head) return result;
        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            result.inserir(current.data);
            current = current.next!;
        }
        return result;
    }
    forEach(funcao: (item: T) => void): void {
        if (!this.head) return;
        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            funcao(current.data);
            current = current.next!;
        }
    }
    print(): void {
        let current = this.head;
        if (!current) return console.log("Lista vazia");
        let result = "Head -> ";
        for (let i = 0; i < this.size; i++) {
            result += current.data;
            if (i !== this.size - 1) result += " <-> ";
            current = current.next!;
        }
        result += " (Circular para Head)";
        console.log(result);
    }
    pegarPorIndice(index: number): T | undefined {
        if (index >= this.size || index < 0 || !this.head) {
            return undefined;
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next!;
        }
        return current.data;
    }
    tem(data: T): boolean {
        let current = this.head;
        if (!current) return false;
        for (let i = 0; i < this.size; i++) {
            if (current.data === data) return true;
            current = current.next!;
        }
        return false;
    }
    inserir(data: T, index: number = this.size): void {
        if (index > this.size || index < 0) return;
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
            this.size++;
            return;
        }
        let nextNode = this.head;
        for (let i = 0; i < index; i++) {
            nextNode = nextNode.next!;
        }
        const prevNode = nextNode.prev!;
        newNode.next = nextNode;
        newNode.prev = prevNode;
        nextNode.prev = newNode;
        prevNode.next = newNode;
        if (index === 0) this.head = newNode;
        this.size++;
    }
    removerPorIndice(index: number): T | undefined {
        if (index >= this.size || index < 0 || !this.head) return undefined;
        if (this.size === 1) {
            const data = this.head.data;
            this.clear();
            return data;
        }
        let removeNode = this.head;
        for (let i = 0; i < index; i++) {
            removeNode = removeNode.next!;
        }
        const prevNode = removeNode.prev!;
        const nextNode = removeNode.next!;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        if (index === 0) this.head = nextNode;
        this.size--;
        return removeNode.data;
    }
    apagarPorDado(data: T): boolean {
        if (!this.head) return false;
        let removeNode = this.head;
        for (let i = 0; i < this.size; i++) {
            if (removeNode.data === data) {
                const prevNode = removeNode.prev!;
                const nextNode = removeNode.next!;
                prevNode.next = nextNode;
                nextNode.prev = prevNode;
                if (i === 0) this.head = nextNode;
                this.size--;
                return true;
            }
            removeNode = removeNode.next!;
        }
        return false;
    }
}