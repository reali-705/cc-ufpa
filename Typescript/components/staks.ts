import { Node } from "./node.ts";

export class Pilha<T> {
    private top: Node<T> | null = null;
    private size: number = 0;
    inserir(data: T): void {
        const newNode = new Node(data);
        newNode.next = this.top
        this.top = newNode;
        this.size++;
    }
    retirar(): T | undefined {
        if (this.top === null) {
            return undefined;
        }
        const data = this.top.data;
        this.top = this.top.next;
        this.size--;
        return data;
    }
    verTopo(): T | undefined {
        if (this.top === null) {
            return undefined;
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
        let result = "Top -> ";
        while (current !== null) {
            result += current.data
            current = current.next;
            if (current !== null) {
                result += " -> ";
            }
        }
        result += " <- End";
        console.log(result);
    }
}