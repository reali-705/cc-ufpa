import { Bioma } from "./bioma.ts";
import { ListaVinculadaCircular } from "../components/circularLinkedList.ts";
import { Conjunto } from "../components/set.ts";
import { dataBioma, dataPlaneta, IDClass, Item } from "../contract/interfaces.ts";
import { Raridade } from "../contract/enums.ts";

export class Planeta implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly biomas: ListaVinculadaCircular<Bioma>;
    constructor(data: dataPlaneta) {
        this.id = data.id;
        this.nome = data.nome;
        this.biomas = new ListaVinculadaCircular<Bioma>();
        data.biomas.forEach((areaData: dataBioma) => {
            try {
                const area = Bioma.carregarObjeto(areaData);
                this.biomas.inserir(area);
            } catch (error) {
                console.warn(error);
            }
        });
    }
    public recursosDoMundo(): Conjunto<Item> {
        let recursos = new Conjunto<Item>();
        this.biomas.forEach((area) => recursos = recursos.union(area.recursos));
        return recursos;
    }
    public salvarObjeto(): dataPlaneta {
        const biomas = new Array<dataBioma>();
        this.biomas.forEach((area) => biomas.push(area.salvarObjeto()));
        return {
            id: this.id,
            nome: this.nome,
            biomas: biomas
        }
    }
    public static carregarObjeto(data: dataPlaneta): Planeta {
        return new this(data);
    }
    public print(): void {
        console.log(`\n======= Planeta: ${this.nome} (ID: ${this.id}) =======`);
            console.log(`Recursos do Mundo:`);
            const recursos = this.recursosDoMundo();
            if (recursos.isEmpty()) {
                console.log("Nenhum recurso");
            } else {
                recursos.toVetor().sort((itemA, itemB) => itemA.raridade - itemB.raridade).forEach((item) => {
                    console.log(`${item.id} - ${item.nome} (${Raridade[item.raridade]})`)
                });
            }
            console.log(`Número de biomas: ${this.biomas.getSize()}\n`);
            console.log("------ Biomas ------");
            this.biomas.forEach((area) => area.print());
        console.log("=================================================");
    }
}