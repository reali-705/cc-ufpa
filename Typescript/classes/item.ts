import { dataItem, IDClass } from "../contract/interfaces.ts";

export class Item implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly tamanho: number;
    public readonly raridade: string;
    constructor(
        id: string,
        nome: string,
        tamanho: number = 1,
        raridade: string = "Comum"
    ) {
        this.id = id;
        this.nome = nome;
        this.raridade = raridade;
        this.tamanho = tamanho;
    }
    public salvarObjeto(): dataItem {
        return {
            id: this.id,
            nome: this.nome,
            tamanho: this.tamanho,
            raridade: this.raridade
        };
    }
    public static carregarObjeto(data: dataItem): Item {
        return new this(
            data.id,
            data.nome,
            data.tamanho,
            data.raridade
        ); 
    }
    public print(): void {
        console.log(`${this.id} - ${this.nome}\nRaridade: ${this.raridade}\nTamanho: ${this.tamanho}`);
    }
}