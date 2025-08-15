import { Conjunto } from "../components/set.ts";
import { Raridade } from "../contract/enums.ts";
import { dataBioma, Item, IDClass } from "../contract/interfaces.ts";

export class Bioma implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly recursos: Conjunto<Item>;
    constructor(data: dataBioma) {
        this.id = data.id;
        this.nome = data.nome;
        this.recursos = new Conjunto<Item>();
        data.recursos.forEach((item: Item) => this.recursos.add(item));
    }
    public salvarObjeto(): dataBioma {
        const recursos = new Array<Item>(this.recursos.size());
        this.recursos.toVetor().forEach(item => recursos.push(item));
        return {
            id: this.id,
            nome: this.nome,
            recursos: recursos,
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
            recursos.forEach((item) => console.log(`${item.id} - ${item.nome} (${Raridade[item.raridade]})`));
        }
        console.log("------------------------------------------");
    }
}