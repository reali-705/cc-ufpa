import { ListaVinculadaCircular } from "../components/circularLinkedList.ts";
import { Node } from "../components/node.ts";
import { Conjunto } from "../components/set.ts";
import { dataPlaneta, dataSistemaSolar, IDClass } from "../contract/interfaces.ts";
import { Item } from "./item.ts";
import { Planeta } from "./planeta.ts";

export class SistemaSolar implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly planetas: ListaVinculadaCircular<Planeta>;
    private explorado: boolean;
    constructor(
        nome: string,
        planetas: Planeta[] | ListaVinculadaCircular<Planeta> = new ListaVinculadaCircular<Planeta>(),
        explorado: boolean = false,
        id?: string
    ) {
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        this.explorado = explorado;
        if (Array.isArray(planetas)) {
            if (!planetas.length) throw new Error("Lista de planetas vazia");
            this.planetas = new ListaVinculadaCircular<Planeta>();
            planetas.forEach((planeta) => this.planetas.insert(planeta));
        } else {
            if (!planetas.getSize()) throw new Error("Lista de planetas vazia");
            this.planetas = planetas;
        }
    }
    private gerarIdUnico(): string {
        return (this.constructor as any).name + Math.random().toString(36).substring(2, 4);
    }
    public explorar(): void {
        if (!this.explorado) this.explorado = true;
    }
    public getNodePlaneta(id?: string): Node<Planeta> {
        if (!id) return this.planetas.getHead()!;
        const node = this.planetas.getID(id);
        if (!node) return this.planetas.getHead()!;
        else return node;
    }
    public recurosDoSistema(): Conjunto<Item> {
        let recursos = new Conjunto<Item>();
        this.planetas.forEach((planeta) => recursos = recursos.union(planeta.recurosDoMundo()));
        return recursos;
    }
    public print(): void {
        console.log(`\n########### Sistema Solar: ${this.nome} (ID: ${this.id}) ###########`);
        if (!this.explorado) console.log("Desconhecido");
        else {
            console.log("Recursos do Sistema:");
            // TODO add ordenação dos itens...
            const recursos = this.recurosDoSistema();
            if (recursos.isEmpty()) console.log("Nenhum recurso");
            else recursos.values().forEach((item) => console.log(`${item.id} - ${item.nome} (${item.raridade})`));
            console.log(`Numero de planetas: ${this.planetas.getSize()}`);
            console.log("------ Planetas ------");
            this.planetas.forEach((planeta) => planeta.print());
        }
        console.log("##################################################");
    }
    public salvarObjeto(): dataSistemaSolar {
        return {
            id: this.id,
            nome: this.nome,
            explorado: this.explorado,
            planetas: this.planetas.toArray().map((planeta) => planeta.salvarObjeto()),
        }
    }
    public static carregarObjeto(data: dataSistemaSolar): SistemaSolar {
        const planetas = new ListaVinculadaCircular<Planeta>();
        if (data.planetas) {
            data.planetas.forEach((planetaData: dataPlaneta) => {
                try {
                    const planeta = Planeta.carregarObjeto(planetaData);
                    planetas.insert(planeta);
                } catch (error) {
                    console.warn(error);
                }
            });
        }
        return new this(data.nome, planetas, data.explorado, data.id);
    }
}