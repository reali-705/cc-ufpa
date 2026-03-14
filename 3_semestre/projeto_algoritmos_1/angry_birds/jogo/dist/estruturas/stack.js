import { Node } from "./node.js";
export class Stack {
    constructor() {
        this.top = null;
        this.size = 0;
    }
    push(data) {
        const newNode = new Node(data);
        this.top = newNode;
        this.size++;
    }
    pop() {
        if (this.top === null) {
            console.log("A pilha esta vazia.");
            return null;
        }
        const data = this.top.data;
        this.top = this.top.next;
        this.size--;
        return data;
    }
    peek() {
        if (this.top === null) {
            console.log("A pilha esta vazia.");
            return null;
        }
        return this.top.data;
    }
    getSize() {
        return this.size;
    }
    isEmpty() {
        return this.size === 0;
    }
    clear() {
        this.top = null;
        this.size = 0;
    }
    print() {
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
