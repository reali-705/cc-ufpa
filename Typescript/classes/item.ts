import { Raridade } from "../contract/enums.ts";
import { dataItem, IDClass } from "../contract/interfaces.ts";

export class Item implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly tamanho: number;
    public readonly raridade: Raridade;
    constructor(data: dataItem) {
        this.id = data.id;
        this.nome = data.nome;
        this.raridade = data.raridade;
        this.tamanho = data.tamanho;
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
        return new this(data);
    }
    public print(): void {
        console.log(`${this.id} - ${this.nome}\nRaridade: ${Raridade[this.raridade]}\nTamanho: ${this.tamanho}`);
    }
}