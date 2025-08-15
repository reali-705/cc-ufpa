export class TabelaHash<X , T> {
    private codigoHash: (chave: X) => number;
    private funcaoString: (parametro: X) => string;
    private tabela: { [chave: string]: {chave: X, valor:T } };
    constructor(funcaoHash?: (chave: X) => number, funcaoString?: (parametro: X) => string) {
        this.codigoHash = funcaoHash || this.funcaoHashNativa;
        this.funcaoString = funcaoString || String;
        this.tabela = {};
    }
    private funcaoHashNativa(chave: X): number {
        if (typeof chave === "number") {
            return chave;
        }
        const chaveString = this.funcaoString(chave);
        let hash = 0;
        for (let i = 0; i < chaveString.length; i++) {
            hash += chaveString.charCodeAt(i);
        }
        return hash % 37;
    }
    public inserir(chave: X, valor: T): boolean {
        if (chave !== null && valor !== null) {
            const chaveString = this.codigoHash(chave);
            this.tabela[chaveString] = { chave, valor };
            return true;
        }
        return false;
    }
    public buscar(chave: X): T | undefined {
        const chaveValor = this.tabela[this.codigoHash(chave)];
        return chaveValor === null ? undefined : chaveValor.valor;
    }
    public remover(chave: X): boolean {
        const hash = this.codigoHash(chave);
        const chaveValor = this.tabela[hash];
        if (chaveValor !== null && chaveValor !== undefined) {
            delete this.tabela[hash];
            return true;
        }
        return false;
    }
    public getTabela(): { [chave: string]: { chave: X, valor: T } } {
        return this.tabela;
    }
    public getSize(): number {
        return Object.keys(this.tabela).length;
    }
    public isEmpty(): boolean {
        return this.getSize() === 0;
    }
    public clear(): void {
        this.tabela = {};
    }
    public toString(): string {
        if (this.isEmpty()) {
            return "Tabela Hash Vazia";
        }
        const hash = Object.keys(this.tabela);
        return hash.map(hash => `Hash: ${hash} => Chave: ${this.tabela[hash].chave} - Valor: ${this.tabela[hash].valor}`).join("\n");
    }
}
