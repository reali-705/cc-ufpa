import { Node } from "./node.js";
export class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    offer(data) {
        const newNode = new Node(data);
        if (this.tail === null) {
            this.head = newNode;
            this.tail = newNode;
        }
        else {
            newNode.next = this.tail;
            this.tail.prev = newNode;
            this.tail = newNode;
        }
        this.size++;
    }
    poll() {
        if (this.head === null) {
            console.log("A fila esta vazia.");
            return null;
        }
        const data = this.head.data;
        this.head = this.head.prev;
        if (this.head !== null) {
            this.head.next = null;
        }
        else {
            this.tail = null;
        }
        this.size--;
        return data;
    }
    peek() {
        if (this.head === null) {
            console.log("A fila esta vazia.");
            return null;
        }
        return this.head.data;
    }
    getSize() {
        return this.size;
    }
    isEmpty() {
        return this.size === 0;
    }
    clear() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    print() {
        let result = "Head ";
        let current = this.head;
        while (current !== null) {
            result += current.data;
            if (current.prev !== null) {
                result += " <- ";
            }
            current = current.prev;
        }
        result += " Tail";
        console.log(result);
    }
}
