# Classes/
## item.ts

```
import { dataItem, IDClass } from "../contract/interfaces.ts";

export class Item implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly tamanho: number;
    public readonly raridade: string;
    constructor(
        id: string,
        nome: string,
        tamanho: number = 1,
        raridade: string = "Comum"
    ) {
        this.id = id;
        this.nome = nome;
        this.raridade = raridade;
        this.tamanho = tamanho;
    }
    public salvarObjeto(): dataItem {
        return {
            id: this.id,
            nome: this.nome,
            tamanho: this.tamanho,
            raridade: this.raridade
        };
    }
    public static carregarObjeto(data: dataItem): Item {
        return new this(
            data.id,
            data.nome,
            data.tamanho,
            data.raridade
        ); 
    }
    public print(): void {
        console.log(`${this.id} - ${this.nome}\nRaridade: ${this.raridade}\nTamanho: ${this.tamanho}`);
    }
}
```

## areaExploravel.ts

```
import { Conjunto } from "../components/set.ts";
import { dataAreaExploravel, dataItem, IDClass } from "../contract/interfaces.ts";
import { Item } from "./item.ts";

export class AreaExploravel implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly recursos: Conjunto<Item>;
    private explorada: boolean;
    constructor(
        id: string,
        nome: string,
        recursos: Item[] | Conjunto<Item> = new Conjunto<Item>(),
        explorada: boolean = false
    ) {
        this.id = id;
        this.nome = nome;
        this.explorada = explorada;
        if (Array.isArray(recursos)) {
            this.recursos = new Conjunto<Item>();
            recursos.forEach((item) => this.recursos.add(item));
        } else {
            this.recursos = recursos;
        }
    };
    public explorar(): void {
        if (!this.explorada) this.explorada = true;
    }
    public salvarObjeto(): dataAreaExploravel {
        return {
            id: this.id,
            nome: this.nome,
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
        return new this(
            data.id,
            data.nome,
            recursos,
            data.explorada,
        ); 
    }
    public print(): void {
        console.log(`------- Area: ${this.nome} (ID: ${this.id}) -------`);
        if (!this.explorada) console.log("Desconhecida");
        else {
            console.log("Recursos:");
            // TODO add ordenação dos itens...
            const recursos = this.recursos.values();
            if (!recursos) console.log("Area sem recursos.");
            else recursos.forEach((item) => console.log(`${item.id} - ${item.nome} (${item.raridade})`));
        }
        console.log("---------------------------------------");
    }
}
```

## planeta.ts

```
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
        id: string,
        nome: string,
        explorado: boolean = false,
        areas: AreaExploravel[] | ListaVinculadaCircular<AreaExploravel>
    ) {
        this.id = id;
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
        return new this(
            data.id,
            data.nome,
            data.explorado,
            areas
        );
    }
}
```

## sistemaSolar.ts

```
import { ListaVinculadaCircular } from "../components/circularLinkedList.ts";
import { Node } from "../components/node.ts";
import { Conjunto } from "../components/set.ts";
import { dataPlaneta, dataSistemaSolar, IDClass } from "../contract/interfaces.ts";
import { Item } from "./item.ts";
import { Planeta } from "./planeta.ts";

export class SistemaSolar implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    private explorado: boolean;
    public readonly planetas: ListaVinculadaCircular<Planeta>;
    constructor(
        id: string,
        nome: string,
        explorado: boolean = false,
        planetas: Planeta[] | ListaVinculadaCircular<Planeta> = new ListaVinculadaCircular<Planeta>()
    ) {
        this.id = id;
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
        return new this(
            data.id,
            data.nome,
            data.explorado,
            planetas
        );
    }
}
```

## iventario.ts

```

```

## jogador.ts

```

```

## nave.ts

```

```

## gameMaster.ts

```

```