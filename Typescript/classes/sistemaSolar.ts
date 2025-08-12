import { ListaVinculadaCircular } from "../components/circularLinkedList.ts";
import { Conjunto } from "../components/set.ts";
import { Raridade } from "../contract/enums.ts";
import { dataPlaneta, dataSistemaSolar, IDClass } from "../contract/interfaces.ts";
import { Item } from "./item.ts";
import { Planeta } from "./planeta.ts";

export class SistemaSolar implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly planetas: ListaVinculadaCircular<Planeta>;
    constructor(data: dataSistemaSolar) {
        this.id = data.id;
        this.nome = data.nome;
        this.planetas = new ListaVinculadaCircular<Planeta>();
        data.planetas.forEach((planetaData: dataPlaneta) => {
            try {
                const planeta = Planeta.carregarObjeto(planetaData);
                this.planetas.inserir(planeta);
            } catch (error) {
                console.warn(error);
            }
        });
    }
    public recurosDoSistema(): Conjunto<Item> {
        let recursos = new Conjunto<Item>();
        this.planetas.forEach((planeta) => recursos = recursos.union(planeta.recurosDoMundo()));
        return recursos;
    }
    public salvarObjeto(): dataSistemaSolar {
        return {
            id: this.id,
            nome: this.nome,
            planetas: this.planetas.paraVetor().map((planeta) => planeta.salvarObjeto()),
        }
    }
    public static carregarObjeto(data: dataSistemaSolar): SistemaSolar {
        return new this(data);
    }
    public print(): void {
        console.log(`\n########### Sistema Solar: ${this.nome} (ID: ${this.id}) ###########`);
        console.log("Recursos do Sistema:");
        const recursos = this.recurosDoSistema();
        if (recursos.isEmpty()) {
            console.log("Nenhum recurso");
        } else {
            recursos.toVetor().sort((itemA, itemB) => itemA.raridade - itemB.raridade).forEach((item) => {
                console.log(`${item.id} - ${item.nome} (${Raridade[item.raridade]})`)
            });
        }
        console.log(`Numero de planetas: ${this.planetas.getSize()}`);
        console.log("------ Planetas ------");
        this.planetas.forEach((planeta) => planeta.print());        
        console.log("##################################################");
    }
}