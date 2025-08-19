import { ListaVinculada } from "./linkedList";

export class TabelaHashEncadeamentoSeparado<X , T> {
    private codigoHash: (chave: X) => number;
    private funcaoString: (parametro: X) => string;
    private tabela: { [chave: string]: ListaVinculada<{ chave: X, valor: T }> };
    constructor(funcaoHash?: (chave: X) => number, funcaoString?: (parametro: X) => string) {
        this.codigoHash = funcaoHash || this.funcaoHashNativa;
        this.funcaoString = funcaoString || String;
        this.tabela = {};
    }
    private funcaoHashNativa(chave: X): number {
        const chaveTabela = this.funcaoString(chave);
        let hash = 5381;
        for (let i = 0; i < chaveTabela.length; i++) {
            hash = (hash * 33) + chaveTabela.charCodeAt(i);
        }
        return hash % 1013;
    }
    public inserir(chave: X, valor: T): boolean {
        if (chave !== null && valor !== null) {
            const hash = this.codigoHash(chave);
            if (!this.tabela[hash]) {
                this.tabela[hash] = new ListaVinculada<{ chave: X, valor: T }>();
            }
            this.tabela[hash].inserir({ chave, valor });
            return true;
        }
        return false;
    }
    public buscar(chave: X): T | undefined {
        const hash = this.codigoHash(chave);
        const listaLigada = this.tabela[hash];
        if (listaLigada !== null && !listaLigada.isEmpty()) {
            let current = listaLigada.getHead();
            while (current !== null) {
                if (current.data.chave === chave) {
                    return current.data.valor;
                }
                current = current.next;
            }
        }
        return undefined;
    }
    public remover(chave: X): boolean {
        const hash = this.codigoHash(chave);
        const listaLigada = this.tabela[hash];
        if (listaLigada !== null && !listaLigada.isEmpty()) {
            let current = listaLigada.getHead();
            while (current !== null) {
                if (current.data.chave === chave) {
                    listaLigada.remover(current.data);
                    if (listaLigada.isEmpty()) {
                        delete this.tabela[hash];
                    }
                    return true;
                }
                current = current.next;
            }
        }
        return false;
    }
    public getTabela(): { [chave: string]: ListaVinculada<{ chave: X, valor: T }> } {
        return this.tabela;
    }
    public getSize(): number {
        let contador = 0;
        Object.values(this.tabela).forEach(lista => {
            contador += lista.getSize();
        });
        return contador;
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
        let resposta = new Array<string>();
        const hash = Object.keys(this.tabela);
        hash.forEach(hash => {
            const lista = this.tabela[hash];
            if (lista !== null && !lista.isEmpty()) {
                let current = lista.getHead();
                while (current !== null) {
                    resposta.push(`Hash: ${hash} => Chave: ${current.data.chave} - Valor: ${current.data.valor}`);
                    current = current.next;
                }
            }
        });
        return resposta.join("\n");
    }
}
