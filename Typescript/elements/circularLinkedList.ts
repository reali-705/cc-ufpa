import { Node } from "./node.ts";

export class ListaVinculadaCircular<T> {
    private head: Node<T> | undefined;
    private size: number;
    constructor() {
        this.head = undefined;
        this.size = 0;
    }
    clear(): void {
        this.head = undefined;
        this.size = 0;
    }
    getSize(): number {
        return this.size;
    }
    getHead(): Node<T> | undefined {
        return this.head;
    }
    toArray(): T[] {
        const result: T[] = [];
        if (!this.size) return result;
        let current = this.head!;
        for (let i = 0; i < this.size; i++) {
            result.push(current.data);
            current = current.next!;
        }
        return result;
    }
    forEach(funcao: (item: T) => void): void {
        if (!this.size) return;
        let current = this.head!;
        for (let i = 0; i < this.size; i++) {
            funcao(current.data);
            current = current.next!;
        }
    }
    next(): boolean {
        if (!this.head || this.size === 1) {
            return false;
        } else {
            this.head = this.head.next!;
            return true;
        }
    }
    prev(): boolean {
        if (!this.head || this.size === 1) {
            return false;
        } else {
            this.head = this.head.prev!;
            return true;
        }
    }
    alterarHead(node: Node<T>): boolean {
        if (!this.head) {
            return this.insert(node.data);
        } else {
            this.head = node;
            return true;
        }
    }
    print(): void {
        if (this.size === 0) {
            console.log("Lista vazia");
            return;
        }
        let result = "Head -> ";
        let current = this.head!;
        for (let i = 0; i < this.size; i++) {
            if (typeof current.data === "object" && current.data) {
                if ("nome" in current.data) {
                    result += (current.data as any).nome;
                } else if ("id" in current.data) {
                    result += (current.data as any).id.substring(0, 4);
                }
            } else {
                result += current.data;
            }
            result += " <-> ";
            current = current.next!;
        }
        result += " (Circular para "
        if (typeof this.head!.data === 'object' && this.head!.data) {
            if ('nome' in this.head!.data) {
                result += (this.head!.data as any).nome;
            } else if ('id' in this.head!.data) {
                result += (this.head!.data as any).id.substring(0, 4);
            }
        } else {
            result += this.head!.data;
        }
        result += ")"
        console.log(result);
    }
    getAt(index: number): T | undefined {
        if (index >= this.size || index < 0 || this.size === 0) {
            return undefined;
        }
        let current = this.head!;
        for (let i = 0; i < index; i++) {
            current = current.next!;
        }
        return current.data;
    }
    insert(data: T, index: number = this.size): boolean {
        if (index > this.size || index < 0) {
            return false;
        }
        const newNode = new Node(data);
        if (this.size === 0) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
            this.size++;
            return true;
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
        return true;
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
    removeBy(data: T): boolean {
        if (!this.size) return false;
        let current = this.head!;
        for (let i = 0; i < this.size; i++) {
            if (current.data === data) {
                this.removeAt(i);
                return true;
            }
            current = current.next!;
        }
        return false;
    }
}