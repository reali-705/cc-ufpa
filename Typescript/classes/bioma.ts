import { Conjunto } from "../components/set.ts";
import { Raridade, Tamanho, TipoBioma, TipoPlaneta } from "../contract/enums.ts";
import { BIOMAS_ELEMENTOS, ELEMENTOS, PLANETAS_BIOMAS } from "../contract/gameData.ts";
import { dataBioma, Item } from "../contract/interfaces.ts";
import { sortearLista } from "../functions/utilidades.ts";

export class Bioma {
    public readonly id: string;
    public readonly tipo: string;
    public readonly recursos: Conjunto<Item>;
    constructor(data: dataBioma) {
        this.id = data.id;
        this.tipo = data.tipo;
        this.recursos = new Conjunto<Item>();
        data.recursos.forEach((item: Item) => this.recursos.add(item));
    }
    public salvarObjeto(): string {
        return JSON.stringify({
            id: this.id,
            tipo: this.tipo,
            recursos: this.recursos.values()
        });
    }
    public static carregarObjeto(data: string): Bioma {
        return new this(JSON.parse(data));
    }
    public static criarNovoObjeto(indice: number, numeroElementos: number, tipoPlaneta: TipoPlaneta, planetaID: string): string {
        const tipo = sortearLista(PLANETAS_BIOMAS[tipoPlaneta]);
        const id = `${planetaID} - Bioma: ${tipo} (${indice})`;
        const recursos: Item[] = [];
        while (recursos.length < numeroElementos) {
            const elemento = sortearLista(ELEMENTOS[sortearLista(BIOMAS_ELEMENTOS[tipo])]);
            if (!recursos.some((item) => item.id === elemento.id)) {
                recursos.push(elemento);
            }
            
        }
        return JSON.stringify({id, tipo, recursos});
    }
    public print(): void {
        console.log(`------- ${this.id} -------`);
        console.log("Recursos:");
        const recursos = this.recursos.toVetor().sort((itemA, itemB) => itemA.raridade - itemB.raridade);
        if (recursos.isEmpty()) {
            console.log("Bioma sem recursos.");
        } else {
            recursos.forEach((item) => console.log(`${item.id} - ${item.nome} (${Raridade[item.raridade]})`));
        }
        console.log("------------------------------------------");
    }
}