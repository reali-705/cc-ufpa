import { Conjunto } from "../elements/set.ts";
import { Item } from "./item.ts";

export class AreaExploravel {
    public readonly id: string;
    public nome: string;
    public descricao: string;
    public recursos: Conjunto<Item>;
    public explorada: boolean;
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
        return Math.random().toString(36).substring(2, 4);
    }
    public explorar(): void {
        if (!this.explorada) this.explorada = true;
    }
    public addRecursos(item: Item): boolean {
        return this.recursos.add(item);
    }
    public removerRecursos(item: Item): boolean {
        return this.recursos.remove(item);
    }
    public salvarObjeto(): any {
        return {
            tipo: (this.constructor as any).name,
            id: this.id,
            nome: this.nome,
            descricao: this.descricao,
            recursos: this.recursos.values().map((item) => item.salvarObjeto()),
            explorada: this.explorada
        };
    }
    public static carregarObjeto(data: any): AreaExploravel {
        const recursos = new Conjunto<Item>();
        if (data.recursos) {
            data.recursos.forEach((itemData: any) => {
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
        console.log(this.id + " - " + this.nome);
        console.log(this.descricao);
        console.log("Recursos:");
        this.recursos.print();
    }
}