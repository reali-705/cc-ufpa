import { Raridade } from "../contract/enums.ts";
import { dataItem, IDClass } from "../contract/interfaces.ts";
import { GeradorProcedural } from "../functions/geracaoProvedural.ts";

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
    public static gerarAleatorio(semente: string): Item {
        const gerador = new GeradorProcedural(semente);
        const prefixos = ["Minério de ", "Rocha de ", "Pedaço de "];
        const sufixos = ["Ferro", "Prata", "Ouro", "Madeira", "Cristal", "Quartzo"];
        const nome = gerador.gerarNome(prefixos, sufixos);
        const tamanho = gerador.proximoInteiro(1, 10);
        let raridade: Raridade;
        const valorRaridade = gerador.proximoNumero();
        if (valorRaridade < 0.6) {
            raridade = Raridade.Comum;
        } else if (valorRaridade < 0.85) {
            raridade = Raridade.Incomum;
        } else if (valorRaridade < 0.95) {
            raridade = Raridade.Raro;
        } else if (valorRaridade < 0.99) {
            raridade = Raridade.Epico;
        } else {
            raridade = Raridade.Lendario;
        }
        const id = `item-${nome.toLowerCase().replace(" ", "-")}-${semente}`;
        return new this({ id, nome, tamanho, raridade });
    }
    public print(): void {
        console.log(`${this.id} - ${this.nome}\nRaridade: ${Raridade[this.raridade]}\nTamanho: ${this.tamanho}`);
    }
}