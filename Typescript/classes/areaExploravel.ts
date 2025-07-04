import { Conjunto } from "../components/set.ts";
import { dataAreaExploravel, dataItem, IDClass } from "../contract/interfaces.ts";
import { Item } from "./item.ts";

export class AreaExploravel implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly descricao: string;
    public readonly recursos: Conjunto<Item>;
    private explorada: boolean;
    constructor(
        nome: string,
        descricao: string,
        recursos: Item[] | Conjunto<Item> = new Conjunto<Item>(),
        explorada: boolean = false,
        id?: string,
    ) {
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        this.descricao = descricao;
        this.explorada = explorada;
        if (Array.isArray(recursos)) {
            this.recursos = new Conjunto<Item>();
            recursos.forEach((item) => this.recursos.add(item));
        } else {
            this.recursos = recursos;
        }
    };
    private gerarIdUnico(): string {
        return (this.constructor as any).name + Math.random().toString(36).substring(2, 4);
    }
    public explorar(): void {
        if (!this.explorada) this.explorada = true;
    }
    public salvarObjeto(): dataAreaExploravel {
        return {
            id: this.id,
            nome: this.nome,
            descricao: this.descricao,
            recursos: this.recursos.values().map((item) => item.salvarObjeto()),
            explorada: this.explorada
        };
    }
    public static carregarObjeto(data: dataAreaExploravel): AreaExploravel {
        const recursos = new Conjunto<Item>();
        if (data.recursos) {
            data.recursos.forEach((itemData: dataItem) => {
                try {
                    const item = Item.carregarObjeto(itemData);
                    recursos.add(item);
                } catch (error) {
                    console.warn(error);
                }
            })
        }
        return new this(data.nome, data.descricao, recursos, data.explorada, data.id); 
    }
    public print(): void {
        console.log(`------- Area: ${this.nome} (ID: ${this.id}) -------`);
        if (!this.explorada) console.log("Desconhecida");
        else {
            console.log(this.descricao);
            console.log("Recursos:");
            // TODO add ordenação dos itens...
            const recursos = this.recursos.values();
            if (!recursos) console.log("Area sem recursos.");
            else recursos.forEach((item) => console.log(`${item.id} - ${item.nome} (${item.raridade})`));
        }
        console.log("---------------------------------------");
    }
}