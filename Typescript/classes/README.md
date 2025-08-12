# Classes/
## item.ts

```
import { Raridade } from "../contract/enums.ts";
import { dataItem, IDClass } from "../contract/interfaces.ts";

export class Item implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly tamanho: number;
    public readonly raridade: Raridade;
    constructor(data: dataItem) {
        this.id = data.id;
        this.nome = data.nome;
        this.raridade = data.raridade;
        this.tamanho = data.tamanho;
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
        return new this(data);
    }
    public print(): void {
        console.log(`${this.id} - ${this.nome}\nRaridade: ${Raridade[this.raridade]}\nTamanho: ${this.tamanho}`);
    }
}
```

## bioma.ts

```
import { Conjunto } from "../components/set.ts";
import { dataBioma, dataItem, IDClass } from "../contract/interfaces.ts";
import { Item } from "./item.ts";

export class Bioma implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly recursos: Conjunto<Item>;
    constructor(data: dataBioma) {
        this.id = data.id;
        this.nome = data.nome;
        this.recursos = new Conjunto<Item>();
        data.recursos.forEach((itemData: dataItem) => {
            try {
                const item = Item.carregarObjeto(itemData);
                this.recursos.add(item);
            } catch (error) {
                console.warn(error);
            }
        });
    }
    public salvarObjeto(): dataBioma {
        return {
            id: this.id,
            nome: this.nome,
            recursos: this.recursos.toVetor().map((item) => item.salvarObjeto()),
        };
    }
    public static carregarObjeto(data: dataBioma): Bioma {
        return new this(data);
    }
    public print(): void {
        console.log(`------- Bioma: ${this.nome} (ID: ${this.id}) -------`);
        console.log("Recursos:");
        const recursos = this.recursos.toVetor().sort((itemA, itemB) => itemA.raridade - itemB.raridade);
        if (recursos.isEmpty()) {
            console.log("Bioma sem recursos.");
        } else {
            recursos.forEach((item) => console.log(`${item.id} - ${item.nome} (${Raridade[item.raridade]})`));
        }
        console.log("------------------------------------------");
    }
}
```

## planeta.ts

```
import { Bioma } from "./bioma.ts";
import { Item } from "./item.ts";
import { ListaVinculadaCircular } from "../components/circularLinkedList.ts";
import { Conjunto } from "../components/set.ts";
import { dataBioma, dataPlaneta, IDClass } from "../contract/interfaces.ts";
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
    public recurosDoMundo(): Conjunto<Item> {
        let recursos = new Conjunto<Item>();
        this.biomas.forEach((area) => recursos = recursos.union(area.recursos));
        return recursos;
    }
    public salvarObjeto(): dataPlaneta {
        return {
            id: this.id,
            nome: this.nome,
            biomas: this.biomas.paraVetor().map((area) => area.salvarObjeto())
        }
    }
    public static carregarObjeto(data: dataPlaneta): Planeta {
        return new this(data);
    }
    public print(): void {
        console.log(`\n======= Planeta: ${this.nome} (ID: ${this.id}) =======`);
            console.log(`Recursos do Mundo:`);
            const recursos = this.recurosDoMundo();
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
```

## sistemaSolar.ts

```
import { ListaVinculadaCircular } from "../components/circularLinkedList.ts";
import { Conjunto } from "../components/set.ts";
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
```

## universo.ts
```
import { FilaDupla } from "../components/deque.ts";
import { TamanhoUniverso } from "../contract/enums.ts";
import { dataSistemaSolar, dataUniverso, IDClass } from "../contract/interfaces.ts";
import { SistemaSolar } from "./sistemaSolar.ts";

export class Universo implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly tamanho: TamanhoUniverso;
    public readonly sistemas: FilaDupla<SistemaSolar>;
    constructor(data: dataUniverso) {
        this.id = data.id;
        this.nome = data.nome;
        this.tamanho = data.tamanho;
        this.sistemas = new FilaDupla<SistemaSolar>();
        data.sistemas.forEach((sistemaData: dataSistemaSolar) => {
            try {
                const sistema = SistemaSolar.carregarObjeto(sistemaData);
                this.sistemas.inserirTail(sistema);
            } catch (error) {
                console.warn(error);
            }
        })
    }
    public addSistemaHead(sistema: SistemaSolar): void {
        if (this.sistemas.getSize() >= (3 + 2 * this.tamanho)) {
            this.sistemas.removerTail();
        }
        this.sistemas.inserirHead(sistema);
    }
    public addSistemaTail(sistema: SistemaSolar): void {
        if (this.sistemas.getSize() >= (3 + 2 * this.tamanho)) {
            this.sistemas.removerHead();
        }
        this.sistemas.inserirTail(sistema);
    }
    public salvarObjeto(): dataUniverso {
        return {
            id: this.id,
            nome: this.nome,
            tamanho: this.tamanho,
            sistemas: this.sistemas.paraVetor().map((sistema) => sistema.salvarObjeto())
        }
    }
    public static carregarObjeto(data: dataUniverso): Universo {
        return new this(data);
    }
    public print(): void {
        console.log(`@@@@@@@@ Universo: ${this.nome} (ID: ${this.id}) @@@@@@@@`);
        this.sistemas.forEach((sistema) => sistema.print());
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    }
}
```
