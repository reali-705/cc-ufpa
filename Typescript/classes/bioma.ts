import { Conjunto } from "../components/set.ts";
import { dataBioma, dataItem, IDClass } from "../contract/interfaces.ts";
import { Item } from "./item.ts";

export class Bioma implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly recursos: Conjunto<Item>;
    constructor(data: dataBioma) {
        this.id = data.id;
        this.nome = data.nome;
        this.recursos = new Conjunto<Item>();
        data.recursos.forEach((itemData: dataItem) => {
            try {
                const item = Item.carregarObjeto(itemData);
                this.recursos.add(item);
            } catch (error) {
                console.warn(error);
            }
        });
    }
    public salvarObjeto(): dataBioma {
        return {
            id: this.id,
            nome: this.nome,
            recursos: this.recursos.toVetor().map((item) => item.salvarObjeto()),
        };
    }
    public static carregarObjeto(data: dataBioma): Bioma {
        return new this(data);
    }
    public print(): void {
        console.log(`------- Bioma: ${this.nome} (ID: ${this.id}) -------`);
        console.log("Recursos:");
        const recursos = this.recursos.toVetor().sort((itemA, itemB) => itemA.raridade - itemB.raridade);
        if (recursos.isEmpty()) {
            console.log("Bioma sem recursos.");
        } else {
            recursos.forEach((item) => console.log(`${item.id} - ${item.nome} (${item.raridade})`));
        }
        console.log("------------------------------------------");
    }
}