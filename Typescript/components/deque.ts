import { Vetor } from "./array.ts";
import { Node } from "./node.ts";

export class FilaDupla<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    print(): void {
        let result = "Head -> ";
        let current = this.head;
        while (current !== null) {
            result += current.data
            if (current.next !== null) {
                result += " <-> ";
            }
            current = current.next;
        }
        result += " <- Tail";
        console.log(result);
    }
    inserirHead(data: T): void {
        const newNode = new Node(data);
        if (this.head === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.size++;
    }
    inserirTail(data: T): void {
        const newNode = new Node(data);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    removerHead(): T | undefined {
        if (this.head === null) {
            console.log("A fila esta vazia.");
            return undefined;
        }
        const data = this.head.data;
        this.head = this.head.next;
        if (this.head === null) {
            this.tail = null;
        } else {
            this.head.prev = null;
        }
        this.size--;
        return data;
    }
    removerTail(): T | undefined {
        if (this.tail === null) {
            console.log("A fila esta vazia.");
            return undefined;
        }
        const data = this.tail.data;
        this.tail = this.tail.prev;
        if (this.tail === null) {
            this.head = null;
        } else {
            this.tail.next = null;
        }
        this.size--;
        return data;
    }
    paraVetor(): Vetor<T> {
        const result = new Vetor<T>(this.size);
        if (!this.head) {
            return result;
        }
        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            result.inserir(current.data);
            current = current.next!;
        }
        return result;
    }
    forEach(callback: (data: T) => void): void {
        if (!this.head) {
            return;
        }
        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            callback(current.data);
            current = current.next!;
        }
    }
    getSize(): number {
        return this.size;
    }
    isEmpty(): boolean {
        return this.size === 0;
    }
    clear(): void {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
}