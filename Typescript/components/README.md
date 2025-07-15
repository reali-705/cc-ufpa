# components/
## array.ts
```
export class Vetor<T> {
    private itens: Array<T>;
    private contador: number;
    private capacidade: number;
    private multiplicador: number = 1.5;
    constructor(contador = 0){
        if (contador < 0) {
            contador = 0;
        }
        this.contador = contador;
        this.capacidade = Math.floor(this.contador * this.multiplicador) || 1;
        this.itens = new Array(this.capacidade);
        for (let i = 0; i < contador; i++) {
            this.itens[i] = undefined as T;
        }
    }
    print(): void {
        for (let i = 0; i < this.contador; i++) {
            console.log(`(${i}): ${this.itens[i]}`);
        }
    }
    inserir(item: T): void  {
        if (this.capacidade === this.contador) {
            let novaCapacidade = Math.floor(this.capacidade * this.multiplicador);
            if (novaCapacidade == this.capacidade) {
                novaCapacidade++;
            }
            const novosItens = new Array(novaCapacidade);
            this.itens.forEach((item, indice) => { novosItens[indice] = item });
            this.itens = novosItens;
            this.capacidade = novaCapacidade;
        }
        this.itens[this.contador++] = item;
    }
    retirar(indice: number): T | undefined {
        if (!this.veirificarIndice(indice)) {
            return undefined;
        }
        const data = this.itens[indice];
        for (let i = indice; i < this.contador - 1; i++) {
            this.itens[i] = this.itens[i + 1];
        }
        this.contador--;
        this.itens[this.contador] = undefined as T;
        return data;
    }
    ver(indice: number): T | undefined {
        if (this.veirificarIndice(indice)) {
            return this.itens[indice];
        } else {
            return undefined;
        }
    }
    veirificarIndice(indice: number): boolean {
        if (indice < 0 || indice >= this.contador) {
            return false;
        } else {
            return true;
        }
    }
    substituir(indice: number, item: T): boolean{
        if (!this.veirificarIndice(indice)) {
            return false;
        } else {
            this.itens[indice] = item;
            return true;
        }
    }
    removerIndice(indice: number): boolean {
        if (!this.veirificarIndice(indice)) {
            return false;
        } else {
            for (let i = indice; i < this.contador - 1; i++) {
                this.itens[i] = this.itens[i + 1];
            }
            this.contador--;
            this.itens[this.contador] = undefined as T;
            return true;
        }
    }
    indiceDe(item: T): number {
        for (let i = 0; i < this.contador; i++) {
            if (this.itens[i] === item) return i;
        }
        return -1;
    }
    forEach(funcao: (item: T) => void): void {
        for (let i = 0; i < this.contador; i++) {
            funcao(this.itens[i]!);
        }
    }
    filter(funcao: (item: T) => boolean): T[] {
        const itensFiltrados: T[] = [];
        for (let i = 0; i < this.contador; i++) {
            if (funcao(this.itens[i]!)) {
                itensFiltrados.push(this.itens[i]!);
            }
        }
        return itensFiltrados;
    }
    every(funcao: (item: T) => boolean): boolean {
        for (let i = 0; i < this.contador; i++) {
            if (!funcao(this.itens[i]!)) {
                return false;
            }
        }
        return true;
    }
    any(funcao: (item: T) => boolean): boolean {
        for (let i = 0; i < this.contador; i++) {
            if (funcao(this.itens[i]!)) {
                return true;
            }
        }
        return false;
    }
    getSize(): number {
        return this.contador;
    }
    isEmpty(): boolean {
        return this.contador === 0;
    }
    clear(): void {
        this.contador = 0;
        for (let i = 0; i < this.capacidade; i++) {
            this.itens[i] = undefined as T;
        }
    }
    copiar(): Vetor<T> {
        const copia = new Vetor<T>(this.contador);
        for (let i = 0; i < this.contador; i++) {
            copia.inserir(this.itens[i]!);
        }
        return copia;
    }
}
```

## circularLinkedList.ts
```
import { Vetor } from "./array.ts";
import { Node } from "./node.ts";

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
    isEmpty(): boolean {
        return this.size === 0;
    }
    getHead(): Node<T> | null {
        return this.head;
    }
    paraVetor(): Vetor<T> {
        const result = new Vetor<T>();
        if (!this.head) return result;
        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            result.inserir(current.data);
            current = current.next!;
        }
        return result;
    }
    forEach(funcao: (item: T) => void): void {
        if (!this.head) return;
        let current = this.head;
        for (let i = 0; i < this.size; i++) {
            funcao(current.data);
            current = current.next!;
        }
    }
    print(): void {
        let current = this.head;
        if (!current) return console.log("Lista vazia");
        let result = "Head -> ";
        for (let i = 0; i < this.size; i++) {
            result += current.data;
            if (i !== this.size - 1) result += " <-> ";
            current = current.next!;
        }
        result += " (Circular para Head)";
        console.log(result);
    }
    pegarPorIndice(index: number): T | undefined {
        if (index >= this.size || index < 0 || !this.head) {
            return undefined;
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next!;
        }
        return current.data;
    }
    tem(data: T): boolean {
        let current = this.head;
        if (!current) return false;
        for (let i = 0; i < this.size; i++) {
            if (current.data === data) return true;
            current = current.next!;
        }
        return false;
    }
    inserir(data: T, index: number = this.size): void {
        if (index > this.size || index < 0) return;
        const newNode = new Node(data);
        if (!this.head) {
            this.head = newNode;
            newNode.next = newNode;
            newNode.prev = newNode;
            this.size++;
            return;
        }
        let nextNode = this.head;
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
    retirarPorIndice(index: number): T | undefined {
        if (index >= this.size || index < 0 || !this.head) return undefined;
        if (this.size === 1) {
            const data = this.head.data;
            this.clear();
            return data;
        }
        let removeNode = this.head;
        for (let i = 0; i < index; i++) {
            removeNode = removeNode.next!;
        }
        const prevNode = removeNode.prev!;
        const nextNode = removeNode.next!;
        prevNode.next = nextNode;
        nextNode.prev = prevNode;
        if (index === 0) this.head = nextNode;
        this.size--;
        return removeNode.data;
    }
    apagarPorDado(data: T): boolean {
        if (!this.head) return false;
        let removeNode = this.head;
        for (let i = 0; i < this.size; i++) {
            if (removeNode.data === data) {
                const prevNode = removeNode.prev!;
                const nextNode = removeNode.next!;
                prevNode.next = nextNode;
                nextNode.prev = prevNode;
                if (i === 0) this.head = nextNode;
                this.size--;
                return true;
            }
            removeNode = removeNode.next!;
        }
        return false;
    }
}
```

## deque.ts
```
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
    retirarHead(): T | undefined {
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
    retirarTail(): T | undefined {
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
```

## linkedList.ts
```
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
```

## node.ts
```
export class Node<T> {
    public data: T;
    public next: Node<T> | null;
    public prev: Node<T> | null;
    constructor(data: T) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
```

## queue.ts
```
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
    retirar(): T | undefined {
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
```

## set.ts
```
export class Conjunto<T> {
    private items: Map<T, T>;
    constructor() {
        this.items = new Map<T, T>();
    }
    has(element: T): boolean {
        return this.items.has(element);
    }
    clear(): void {
        this.items.clear();
    }
    values(): T[] {
        return Array.from(this.items.values());
    }
    size(): number {
        return this.items.size;
    }
    isEmpty(): boolean {
        return this.size() === 0;
    }
    print(): void {
        if (this.isEmpty()) {
            console.log("Conjunto vazio");
            return;
        }
        console.log("Elementos do Conjunto:\n", this.values().join("\n"));
    }
    add(element: T): boolean {
        if (this.has(element)) return false;
        this.items.set(element, element);
        return true;
    }
    remove(element: T): boolean {
        return this.items.delete(element);
    }
    get(element: T): T | undefined {
        if (!this.has(element)) return undefined;
        const value = this.items.get(element);
        this.items.delete(element);
        return value;
    }
    union(otherSet: Conjunto<T>): Conjunto<T> {
        const unionSet = new Conjunto<T>();
        this.values().forEach(item => unionSet.add(item));
        otherSet.values().forEach(item => unionSet.add(item));
        return unionSet;
    }
    intersection(otherSet: Conjunto<T>): Conjunto<T> {
        const intersectionSet = new Conjunto<T>();
        this.values().forEach(item => {
            if (otherSet.has(item)) {
                intersectionSet.add(item);
            }
        });
        return intersectionSet;
    }
    difference(otherSet: Conjunto<T>): Conjunto<T> {
        const differenceSet = new Conjunto<T>();
        this.values().forEach(item => {
            if (!otherSet.has(item)) {
                differenceSet.add(item);
            }
        });
        return differenceSet;
    }
    isSubsetOf(otherSet: Conjunto<T>): boolean {
        if (this.size() > otherSet.size()) return false;
        return this.values().every(item => otherSet.has(item));
    }
    isSupersetOf(otherSet: Conjunto<T>): boolean {
        if (this.size() < otherSet.size()) return false;
        return otherSet.values().every(item => this.has(item));
    }
}
```

## staks.ts
```
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
```

## staksArray.ts
```
import { Vetor } from "./array.ts";

export class PilhaVetor<T> {
    private itens: Vetor<T>;
    constructor() {
        this.itens = new Vetor<T>();
    }
    inserir(data: T): void {
        this.itens.inserir(data);
    }
    retirar(): T | undefined {
        if (this.itens.isEmpty()) {
            console.log("A pilha esta vazia.");
            return undefined;
        }
        return this.itens.retirar(this.itens.getSize() - 1);
    }
    verTopo(): T | undefined {
        if (this.itens.isEmpty()) {
            console.log("A pilha esta vazia.");
            return undefined;
        }
        return this.itens.ver(this.itens.getSize() - 1);
    }
    getSize(): number {
        return this.itens.getSize();
    }
    isEmpty(): boolean {
        return this.itens.isEmpty();
    }
    clear(): void {
        this.itens.clear();
    }
    print(): void {
        let result = "Topo -> ";
        for (let i = this.itens.getSize() - 1; i >= 0; i--) {
            result += this.itens.ver(i) + " -> ";
        }
        result += "Fim";
        console.log(result);
    }
}
```