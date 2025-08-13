export class Dicionario<X, T> {
    private funcaoString: (parametro: X) => string;
    private tabela: { [chave: string]: {chave: X, valor: T } };
    constructor(funcaoString: ((parametro: X) => string) | StringConstructor = String) {
        if (typeof funcaoString === "function") {
            this.funcaoString = funcaoString;
        } else {
            this.funcaoString = (parametro: X) => String(parametro);
        }
        this.tabela = {};
    }
    private validarChave(chave: X): string {
        if (chave === null || chave === undefined) {
            throw new Error("Chave não pode ser nula ou indefinida");
        }
        return this.funcaoString(chave);
    }
    private chavesValores(): { chave: X, valor: T }[] {
        return Object.values(this.tabela);
    }
    public valores(): T[] {
        return this.chavesValores().map((item) => item.valor);
    }
    public chaves(): X[] {
        return this.chavesValores().map((item) => item.chave);
    }
    public tamanho(): number {
        return this.chavesValores().length;
    }
    public inserir(chave: X, valor: T): void {
        const chaveString = this.validarChave(chave);
        if (valor === null || valor === undefined) {
            throw new Error("Valor não pode ser nulo ou indefinido");
        }
        this.tabela[chaveString] = { chave, valor };
    }
    public remover(chave: X): void {
        delete this.tabela[this.validarChave(chave)];
    }
    public limpar(): void {
        this.tabela = {};
    }
    public existeChave(chave: X): boolean {
        const valor = this.tabela[this.validarChave(chave)];
        return valor !== undefined && valor !== null;
    }
    public obterChave(chave: X): X | undefined {
        if (!this.existeChave(chave)) {
            return undefined;
        }
        const chaveString = this.funcaoString(chave);
        return this.tabela[chaveString].chave;
    }
    public obterValor(chave: X): T | undefined {
        if (!this.existeChave(chave)) {
            return undefined;
        }
        const chaveString = this.funcaoString(chave);
        return this.tabela[chaveString].valor;
    }
    public forEach(funcao: (chave: X, valor: T) => void): void {
        for (let i = 0; i < this.chavesValores().length; i++) {
            const { chave, valor } = this.chavesValores()[i];
            funcao(chave, valor);
        }
    }
    public isEmpty(): boolean {
        return this.tamanho() === 0;
    }
    public toString(separador: string = ", "): string {
        if (this.isEmpty()) {
            return "";
        }
        return this.chavesValores().map((item) => `${item.chave} => ${item.valor}`).join(separador);
    }
    public [Symbol.iterator](): Iterator<{ chave: X, valor: T }> {
        let index = 0;
        const items = this.chavesValores();
        return {
            next(): IteratorResult<{ chave: X, valor: T }> {
                if (index < items.length) {
                    return { value: items[index++], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
    }
    public print(): void {
        console.log(this.toString(";\n"));
    }
}