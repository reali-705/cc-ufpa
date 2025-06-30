import { Node } from "./node.ts";

export class Pilha<T> {
    private top: Node<T> | null = null;
    private size: number = 0;
    push(data: T): void {
        const newNode = new Node(data);
        this.top = newNode;
        this.size++;
    }
    pop(): T | null {
        if (this.top === null) {
            console.log("A pilha esta vazia.");
            return null;
        }
        const data = this.top.data;
        this.top = this.top.next;
        this.size--;
        return data;
    }
    peek(): T | null {
        if (this.top === null) {
            console.log("A pilha esta vazia.");
            return null;
        }
        return this.top.data;
    }
    getSize(): number {
        return this.size;
    }
    isEmpty(): boolean {
        return this.size === 0;
    }
    clear(): void {
        this.top = null;
        this.size = 0;
    }
    print(): void {
        let current = this.top;
        let result = "Top ";
        while (current !== null) {
            result += current.data + " -> ";
            current = current.next;
        }
        result += "End";
        console.log(result);
    }
}