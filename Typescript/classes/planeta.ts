import { AreaExploravel } from "./areaExploravel.ts";
import { Item } from "./item.ts";
import { ListaVinculadaCircular } from "../elements/circularLinkedList.ts";
import { Conjunto } from "../elements/set.ts";
import { Node } from "../elements/node.ts";

export class Planeta {
    public readonly id: string;
    public readonly nome: string;
    public areas: ListaVinculadaCircular<AreaExploravel>;
    public areaAtual: Node<AreaExploravel>;
    constructor(
        nome: string,
        areas: AreaExploravel[] | ListaVinculadaCircular<AreaExploravel> = new ListaVinculadaCircular<AreaExploravel>(),
        idAreaAtual: string | undefined = undefined,
        id?: string
    ) {
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        if (Array.isArray(areas)) {
            if (!areas.length) throw new Error("Lista de areas vazia");
            this.areas = new ListaVinculadaCircular<AreaExploravel>();
            areas.forEach((area) => this.areas.insert(area));
        } else {
            if (!areas.getSize()) throw new Error("Lista de areas vazia");
            this.areas = areas;
        }
        if (idAreaAtual && idAreaAtual !== this.areas.getHead()?.data.id) {
            const node = this.getNodeArea(idAreaAtual);
            if (node) this.areas.alterarHead(node);
        }
        this.areaAtual = this.areas.getHead()!;
    }
    private gerarIdUnico(): string {
        return (this.constructor as any).name + Math.random().toString(36).substring(2, 4);
    }
    public irLeste(): void {
        if (this.areas.next()) this.areaAtual = this.areas.getHead()!;
    }
    public irOeste(): void {
        if (this.areas.prev()) this.areaAtual = this.areas.getHead()!;
    }
    public getNodeArea(id: string): Node<AreaExploravel> | undefined {
        let current = this.areas.getHead();
        if (!current) return undefined;
        for (let i = 0; i < this.areas.getSize(); i++) {
            if (current && current.data.id === id) return current;
            current = current.next!;
        }
        return undefined;
    }
    public recurosDoMundo(): Conjunto<Item> {
        let recursos = new Conjunto<Item>();
        this.areas.forEach((area) => recursos = recursos.union(area.recursos));
        return recursos;
    }
    public print(): void {
        console.log(`\n=== Planeta: ${this.nome} (ID: ${this.id}) ===`);
        console.log(`Recursos do Mundo:`);
        const recursos = this.recurosDoMundo();
        if (recursos.isEmpty()) console.log("\tNenhum recurso");
        else recursos.values().forEach((item) => console.log(item.id + " - " + item.nome + " (" + item.raridade + ")"));
        console.log(`\nÁrea atual: ${this.areaAtual?.data.nome}`);
        console.log(`Número de áreas: ${this.areas.getSize()}`);
        console.log("------ Áreas ------");
        this.areas.forEach((area) => area.print());
        console.log("=================================================");
    }
    public salvarObjeto(): any {
        return {
            tipo: (this.constructor as any).name,
            id: this.id,
            nome: this.nome,
            areas: this.areas.toArray().map((area) => area.salvarObjeto()),
            idAreaAtual: this.areaAtual?.data.id
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
        return new this(data.nome, areas, data.idAreaAtual, data.id);
    }
}