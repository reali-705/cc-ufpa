import { Bioma } from "./bioma.ts";
import { ListaVinculadaCircular } from "../components/circularLinkedList.ts";
import { Conjunto } from "../components/set.ts";
import { dataPlaneta, Item } from "../contract/interfaces.ts";
import { Raridade, Tamanho, TipoPlaneta } from "../contract/enums.ts";
import { sortearEnum, sortearLista } from "../functions/utilidades.ts";
import { Inimigo } from "./inimigo.ts";
import { Heap } from "../components/heap.ts";

export class Planeta {
    public readonly id: string;
    public readonly tipo: string;
    public readonly biomas: ListaVinculadaCircular<Bioma>;
    public inimigos: Heap<Inimigo>;
    constructor(data: dataPlaneta) {
        this.id = data.id;
        this.tipo = data.tipo;
        this.biomas = new ListaVinculadaCircular<Bioma>();
        data.biomas.forEach((biomaData: string) => {
            try {
                const bioma = Bioma.carregarObjeto(biomaData);
                this.biomas.inserir(bioma);
            } catch (error) {
                console.warn(error);
            }
        });
        this.inimigos = new Heap<Inimigo>((a, b) => a.poder - b.poder);
        data.inimigos.forEach((inimigoData: string) => this.inimigos.inserir(Inimigo.carregarObjeto(inimigoData)));
    }
    public recursosDoMundo(): Conjunto<Item> {
        let recursos = new Conjunto<Item>();
        this.biomas.forEach((area) => recursos = recursos.union(area.recursos));
        return recursos;
    }
    public salvarObjeto(): string {
        const biomas = new Array<string>();
        this.biomas.forEach((area) => biomas.push(area.salvarObjeto()));
        return JSON.stringify({
            id: this.id,
            tipo: this.tipo,
            biomas: biomas,
            inimigos: this.inimigos.toArray().map((inimigo) => inimigo.salvarObjeto()),
        });
    }
    public static carregarObjeto(data: string): Planeta {
        return new this(JSON.parse(data) as dataPlaneta);
    }
    public static criarNovoObjeto(tamanho: Tamanho): string {
        const tipo = sortearEnum(TipoPlaneta);
        const id = `Planeta: ${tipo} (0)`;
        const biomas = new Array<string>();
        const inimigos = new Array<string>();

        while (biomas.length < (tamanho * 5 + 5)) {
            const numeroElementos = Math.floor(Math.random() * 6);
            const bioma = Bioma.criarNovoObjeto(biomas.length, numeroElementos, tipo, id);
            biomas.push(bioma);
            inimigos.push(Inimigo.criarNovoObjeto())
        }
        return JSON.stringify({id, tipo, biomas, inimigos});
    }
    public print(): void {
        console.log(`\n======= ${this.id} =======`);
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