import { Node } from "./node.ts";

export class ListaVinculada<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    clear(): void {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    isEmpty(): boolean {
        return this.size === 0;
    }
    getHead(): Node<T> | null {
        return this.head;
    }
    getSize(): number {
        return this.size;
    }
    inserir(data: T): void {
        this.inserirTail(data);
    }
    inserirPrimeiroNode(node: Node<T>): boolean {
        if (!this.size) {
            this.head = node;
            this.tail = node;
            this.size++;
            return true;
        }
        return false;
    }
    inserirHead(data: T): void {
        const newNode = new Node(data);
        if (this.inserirPrimeiroNode(newNode)) return;
        newNode.next = this.head;
        this.head!.prev = newNode;
        this.head = newNode;
        this.size++;
    }
    inserirTail(data: T): void {
        const newNode = new Node(data);
        if (this.inserirPrimeiroNode(newNode)) return;
        this.tail!.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
        this.size++;
    }
    inserirPorIndice(data: T, index: number): boolean {
        if (index > this.size || index < 0) return false;
        if (index === 0) {
            this.inserirHead(data);
            return true;
        }
        if (index === this.size) {
            this.inserirTail(data);
            return true;
        }
        const newNode = new Node(data);
        let current = this.head!;
        for (let i = 1; i < index; i++) {
            current = current.next!;
        }
        newNode.next = current;
        newNode.prev = current.prev;
        current.prev!.next = newNode;
        current.prev = newNode;
        this.size++;
        return true;
    }
    verPorIndice(index: number): T | undefined {
        if (index > this.size || index < 0) return undefined;
        let current = this.head!;
        for (let i = 0; i < index; i++) {
            current = current.next!;
        }
        return current.data;
    }
    removerHead(): T | undefined {
        if (!this.head) return undefined;
        const removeNode = this.head;
        if (this.size === 1) {
            this.clear();
            return removeNode.data;
        }
        this.head = this.head.next!;
        this.head.prev = null;
        this.size--;
        return removeNode.data;
    }
    remover(data: T): boolean {
        if (this.isEmpty()) return false;
        let current = this.getHead();
        while (current !== null) {
            if (current.data === data) {
                if (current.prev !== null) {
                    current.prev.next = current.next;
                } else {
                    this.head = current.next; // Atualiza head se for o primeiro
                }
                if (current.next !== null) {
                    current.next.prev = current.prev;
                } else {
                    this.tail = current.prev; // Atualiza tail se for o último
                }
                this.size--;
                return true;
            }
            current = current.next;
        }
        return false;
    }
    removerTail(): T | undefined {
        if (!this.tail) return undefined;
        const removeNode = this.tail;
        if (this.size === 1) {
            this.clear();
            return removeNode.data;
        }
        this.tail = this.tail.prev!;
        this.tail.next = null;
        this.size--;
        return removeNode.data;
    }
    removerPorIndice(index: number): T | undefined {
        if (index >= this.size || index < 0) return undefined;
        if (index === 0) return this.removerHead();
        if (index === this.size - 1) return this.removerTail();
        let removeNode = this.head!;
        for (let i = 1; i < index; i++) {
            removeNode = removeNode.next!;
        }
        const prevNode = removeNode.prev!;
        const nextNode = removeNode.next!;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        this.size--;
        return removeNode.data;
    }
    print(): void {
        if (!this.head) return console.log("Lista vazia");
        let result = "Head -> ";
        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            result += current.data;
            if (current.next) result += " <-> ";
            current = current.next!;
        }
        result += " <- Tail";
        console.log(result);
    }
}