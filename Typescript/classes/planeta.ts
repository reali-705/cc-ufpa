import { AreaExploravel } from "./areaExploravel.ts";
import { Item } from "./item.ts";
import { ListaVinculadaCircular } from "../components/circularLinkedList.ts";
import { Conjunto } from "../components/set.ts";
import { Node } from "../components/node.ts";
import { dataAreaExploravel, dataPlaneta, IDClass } from "../contract/interfaces.ts";

export class Planeta implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly areas: ListaVinculadaCircular<AreaExploravel>;
    private explorado: boolean;
    constructor(
        nome: string,
        areas: AreaExploravel[] | ListaVinculadaCircular<AreaExploravel> = new ListaVinculadaCircular<AreaExploravel>(),
        explorado: boolean = false,
        id?: string
    ) {
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        this.explorado = explorado;
        if (Array.isArray(areas)) {
            if (!areas.length) throw new Error("Lista de areas vazia");
            this.areas = new ListaVinculadaCircular<AreaExploravel>();
            areas.forEach((area) => this.areas.insert(area));
        } else {
            if (!areas.getSize()) throw new Error("Lista de areas vazia");
            this.areas = areas;
        }
    }
    private gerarIdUnico(): string {
        return (this.constructor as any).name + Math.random().toString(36).substring(2, 4);
    }
    public explorar(): void {
        if (!this.explorado) this.explorado = true;
    }
    public getNodeArea(id?: string): Node<AreaExploravel> {
        if (!id) return this.areas.getHead()!;
        const node = this.areas.getID(id);
        if (!node) return this.areas.getHead()!;
        else return node;
    }
    public recurosDoMundo(): Conjunto<Item> {
        let recursos = new Conjunto<Item>();
        this.areas.forEach((area) => recursos = recursos.union(area.recursos));
        return recursos;
    }
    public print(): void {
        console.log(`\n======= Planeta: ${this.nome} (ID: ${this.id}) =======`);
        if (!this.explorado) console.log("Desconhecido");
        else {
            console.log(`Recursos do Mundo:`);
            // TODO add ordenação dos itens...
            const recursos = this.recurosDoMundo();
            if (recursos.isEmpty()) console.log("Nenhum recurso");
            else recursos.values().forEach((item) => console.log(`${item.id} - ${item.nome} (${item.raridade})`));
            console.log(`Número de áreas: ${this.areas.getSize()}\n`);
            console.log("------ Áreas ------");
            this.areas.forEach((area) => area.print());
        }
        console.log("=================================================");
    }
    public salvarObjeto(): dataPlaneta {
        return {
            id: this.id,
            nome: this.nome,
            explorado: this.explorado,
            areas: this.areas.toArray().map((area) => area.salvarObjeto())
        }
    }
    public static carregarObjeto(data: dataPlaneta): Planeta {
        const areas = new ListaVinculadaCircular<AreaExploravel>();
        if (data.areas) {
            data.areas.forEach((areaData: dataAreaExploravel) => {
                try {
                    const area = AreaExploravel.carregarObjeto(areaData);
                    areas.insert(area);
                } catch (error) {
                    console.warn(error);
                }
            });
        }
        return new this(data.nome, areas, data.explorado, data.id);
    }
}