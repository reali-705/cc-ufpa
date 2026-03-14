import { Node } from "./node.js";
export class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    insertFist(data) {
        const newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }
    insertLast(data) {
        if (!this.head) {
            this.insertFist(data);
            return;
        }
        const newNode = new Node(data);
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
        this.size++;
    }
    insertAt(data, index) {
        if (index > this.size) {
            return;
        }
        if (index === 0) {
            this.insertFist(data);
            return;
        }
        const newNode = new Node(data);
        let current = this.head.next;
        let previous = this.head;
        for (let i = 1; i < index - 1; i++) {
            previous = current;
            current = current.next;
        }
        newNode.next = current;
        previous.next = newNode;
        this.size++;
    }
    getAt(index) {
        if (index > this.size) {
            return null;
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.data;
    }
    removeAt(index) {
        if (index > this.size) {
            return;
        }
        if (index === 0) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        let current = this.head.next;
        let previous = this.head;
        for (let i = 1; i < index; i++) {
            previous = current;
            current = current.next;
        }
        previous.next = current.next;
        this.size--;
    }
    clear() {
        this.head = null;
        this.size = 0;
    }
    print() {
        let result = "Head ";
        for (let i = 0; i < this.size; i++) {
            result += this.head.data + " -> ";
            this.head = this.head.next;
        }
        result += "End";
        console.log(result);
    }
}
