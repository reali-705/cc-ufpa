import { mergeSort } from "../functions/ordenacao.ts";

export class Vetor<T> {
    private itens: Array<T>;
    private contador: number;
    private capacidade: number;
    private multiplicador: number = 1.5;
    constructor(capacidade = 1){
        if (capacidade < 1) {
            capacidade = 1;
        }
        this.contador = 0;
        this.capacidade = Math.floor(capacidade * this.multiplicador);
        this.itens = new Array(this.capacidade);
        for (let i = 0; i < this.contador; i++) {
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
            if (novaCapacidade === this.capacidade) {
                novaCapacidade++;
            }
            const novosItens = new Array(novaCapacidade);
            this.itens.forEach((item, indice) => { novosItens[indice] = item });
            this.itens = novosItens;
            this.capacidade = novaCapacidade;
        }
        this.itens[this.contador] = item;
        this.contador++;
    }
    remover(indice: number): T | undefined {
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
        return this.remover(indice) !== undefined;
    }
    indiceDe(item: T): number {
        for (let i = 0; i < this.contador; i++) {
            if (this.itens[i] === item) {
                return i;
            }
        }
        return -1;
    }
    sorted(funcao: (a: T, b: T) => number): void {
        const elementosOrdenados = mergeSort(this.itens.slice(0, this.contador), funcao);
        this.clear();
        elementosOrdenados.forEach((item, indice) => {
            this.inserir(item);
        })
    }
    sort(funcao: (a: T, b: T) => number): Vetor<T> {
        const elementosOrdenados = mergeSort(this.itens.slice(0, this.contador), funcao);
        const vetorOrdenado = new Vetor<T>(elementosOrdenados.length);
        elementosOrdenados.forEach((item, indice) => {
            vetorOrdenado.inserir(item);
        })
        return vetorOrdenado;
    }
    map<U>(funcao: (valor: T, indice: number, vetor: Vetor<T>) => U): Vetor<U> {
        const novoVetor = new Vetor<U>(this.contador);
        for (let i = 0; i < this.contador; i++) {
            novoVetor.inserir(funcao(this.itens[i], i, this));
        }
        return novoVetor;
    }
    forEach(funcao: (item: T) => void): void {
        for (let i = 0; i < this.contador; i++) {
            if (!this.itens[i]) {
                continue;
            }
            funcao(this.itens[i]);
        }
    }
    filter(funcao: (item: T) => boolean): Vetor<T> {
        const itensFiltrados: Vetor<T> = new Vetor<T>();
        for (let i = 0; i < this.contador; i++) {
            if (!this.itens[i]) {
                continue;
            }
            if (funcao(this.itens[i])) {
                itensFiltrados.inserir(this.itens[i]);
            }
        }
        return itensFiltrados;
    }
    every(funcao: (item: T) => boolean): boolean {
        for (let i = 0; i < this.contador; i++) {
            if (!this.itens[i]) {
                continue;
            }
            if (!funcao(this.itens[i])) {
                return false;
            }
        }
        return true;
    }
    some(funcao: (item: T) => boolean): boolean {
        for (let i = 0; i < this.contador; i++) {
            if (!this.itens[i]) {
                continue;
            }
            if (funcao(this.itens[i])) {
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