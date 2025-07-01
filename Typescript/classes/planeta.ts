import { AreaExploravel } from "./areaExploravel.ts";
import { ListaVinculadaCircular } from "../elements/circularLinkedList.ts";
import { Conjunto } from "../elements/set.ts";
import { Item } from "./item.ts";

export class Planeta {
    public readonly id: string;
    public nome: string;
    public areas: ListaVinculadaCircular<AreaExploravel>;
    constructor(
        nome: string,
        areas: AreaExploravel[] | ListaVinculadaCircular<AreaExploravel> = new ListaVinculadaCircular<AreaExploravel>(),
        id?: string
    ) {
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        if (Array.isArray(areas)) {
            this.areas = new ListaVinculadaCircular<AreaExploravel>();
            areas.forEach((area) => this.areas.insert(area));
        } else {
            this.areas = areas;
        }
    }
    private gerarIdUnico(): string {
        return Math.random().toString(36).substring(2, 4);
    }
    public addArea(area: AreaExploravel): boolean {
        return this.areas.insert(area);
    }
    public removeArea(area: AreaExploravel): boolean {
        return this.areas.removeAt(this.areas.toArray().indexOf(area));
    }
    public getArea(id: string): AreaExploravel | null {
        let current = this.areas["head"];
        for (let i = 0; i < this.areas.getSize(); i++) {
            if (current && current.data.id === id) return current.data;
            current = current!.next;
        }
        return null;
    }
    public recurosDoMundo(): Conjunto<Item> {
        let recursos = new Conjunto<Item>();
        this.areas.toArray().forEach((area) => recursos = recursos.union(area.recursos));
        return recursos;
    }
    public print(): void {
        console.log(`\n=== Planeta: ${this.nome} (ID: ${this.id}) ===`);
        console.log(`Número de áreas: ${this.areas.getSize()}`);
        console.log("--- Áreas ---");
        this.areas.print();
        console.log("---------------------------------------");
    }
    public salvarObjeto(): any {
        return {
            tipo: (this.constructor as any).name,
            id: this.id,
            nome: this.nome,
            areas: this.areas.toArray().map((area) => area.salvarObjeto()),
        }
    }
    public static carregarObjeto(data: any): Planeta {
        const areas = new ListaVinculadaCircular<AreaExploravel>();
        if (data.areas) {
            data.areas.forEach((areaData: any) => {
                try {
                    const area = AreaExploravel.carregarObjeto(areaData);
                    areas.insert(area);
                } catch (error) {
                    console.warn(error);
                }
            });
        }
        return new this(data.nome, areas, data.id);
    }
}