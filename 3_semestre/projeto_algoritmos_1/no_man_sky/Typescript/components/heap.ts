export class Heap<T> {
    private funcaoComparacao: (a: T, b: T) => number;
    private heap: T[];
    constructor(funcaoComparacao: (a: T, b: T) => number) {
        this.funcaoComparacao = funcaoComparacao;
        this.heap = [];
    }
    private paiDe(indice: number): number | undefined {
        if (indice === 0) {
            return undefined;
        }
        return Math.floor((indice - 1) / 2);
    }
    private filhoEsquerdoDe(indice: number): number {
        return 2 * indice + 1;
    }
    private filhoDireitoDe(indice: number): number {
        return 2 * indice + 2;
    }
    private subir(indiceFilho: number): void {
        let indicePai = this.paiDe(indiceFilho);
        while (
            indiceFilho > 0 &&
            this.funcaoComparacao(this.heap[indiceFilho], this.heap[indiceFilho]) > 0
        ) {
            [this.heap[indicePai!], this.heap[indiceFilho]] = [this.heap[indiceFilho], this.heap[indicePai!]];
            indiceFilho = indicePai!;
            indicePai = this.paiDe(indiceFilho);
        }
    }
    private descer(indice: number): void {
        let menor = indice;
        const esquerdo = this.filhoEsquerdoDe(indice);
        const direito = this.filhoDireitoDe(indice);
        if (esquerdo < this.getSize() && this.funcaoComparacao(this.heap[esquerdo], this.heap[menor]) < 0) {
            menor = esquerdo;
        }
        if (direito < this.getSize() && this.funcaoComparacao(this.heap[direito], this.heap[menor]) < 0) {
            menor = direito;
        }
        if (menor !== indice) {
            [this.heap[menor], this.heap[indice]] = [this.heap[indice], this.heap[menor]];
            this.descer(menor);
        }
    }
    public inserir(elemento: T): boolean {
        if (elemento == null) {
            return false;
        }
        const indice = this.heap.length;
        this.heap.push(elemento);
        this.subir(indice);
        return true;
    }
    public verRaiz(): T | undefined {
        return this.isEmpty() ? undefined : this.heap[0];
    }
    public remover(): T | undefined {
        if (this.isEmpty()) {
            return undefined;
        }
        const topo = this.heap[0];
        const ultimo = this.heap.pop();
        if (!this.isEmpty()) {
            this.heap[0] = ultimo!;
            this.descer(0);
        }
        return topo;
    }
    public toArray(): T[] {
        return this.heap;
    }
    public getSize(): number {
        return this.heap.length;
    }
    public isEmpty(): boolean {
        return this.getSize() === 0;
    }
    public clear() {
        this.heap = [];
    }
    public forEach(callback: (item: T) => void): void {
        this.heap.forEach(item => callback(item));
    }
}