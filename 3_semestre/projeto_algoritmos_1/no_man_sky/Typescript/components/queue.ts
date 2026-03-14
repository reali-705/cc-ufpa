import { Node } from "./node.ts";

export class Fila<T> {
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
                result += " <- ";
            }
            current = current.next;
        }
        result += " Tail";
        console.log(result);
    }
    inserir(data: T): void {
        const newNode = new Node(data);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    remover(): T | undefined {
        if (this.head === null) {
            console.log("A fila esta vazia.");
            return undefined;
        }
        const data = this.head.data;
        this.head = this.head.next;
        this.size--;
        return data;
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