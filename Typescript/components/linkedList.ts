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
    retirarHead(): T | undefined {
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
    retirarTail(): T | undefined {
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
    retirarPorIndice(index: number): T | undefined {
        if (index >= this.size || index < 0) return undefined;
        if (index === 0) return this.retirarHead();
        if (index === this.size - 1) return this.retirarTail();
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