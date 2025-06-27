import { Node } from "./node";

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
    print(): void {
        if (this.size === 0) {
            console.log("Lista vazia");
            return;
        }
        let result = "Head -> ";
        let current = this.head!;
        for (let i = 0; i < this.size; i++) {
            result += current!.data + " <-> ";
            if (current.next === this.head) result += this.head!.data;
            current = current!.next!;
        }
        result += " <- Head";
        console.log(result);
    }
    getAt(index: number): T | null {
        if (index >= this.size || index < 0 || this.size === 0) {
            return null;
        }
        let current = this.head!;
        for (let i = 0; i < index; i++) {
            current = current.next!;
        }
        return current.data;
    }
    insert(data: T, index: number = this.size): void {
        if (index > this.size || index < 0) {
            return;
        }
        const newNode = new Node(data);
        if (this.size === 0) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
            this.size++;
            return;
        }
        let nextNode = this.head!;
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
    removeAt(index: number): boolean {
        if (index >= this.size || index < 0 || this.size === 0) {
            return false;
        }
        if (this.size === 1) {
            this.clear();
            return true;
        }
        let removeNode = this.head!;
        for (let i = 0; i < index; i++) {
            removeNode = removeNode.next!;
        }
        const prevNode = removeNode.prev!;
        const nextNode = removeNode.next!;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        if (index === 0) this.head = nextNode;
        this.size--;
        return true;
    }
}