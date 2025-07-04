# Typescript/
## classes/
### gameMaster.ts
```
import { dataGameMaster, dataJogador, dataNave, dataSistemaSolar } from "../contract/interfaces.ts";
import { Jogador } from "./jogador.ts";
import { Nave } from "./nave.ts";
import { SistemaSolar } from "./sistemaSolar.ts";

export class GameMaster {
    public readonly id: string;
    public readonly sistemaSolar: SistemaSolar;
    public readonly jogador: Jogador;
    public readonly naves: Nave[];
    constructor(id: string, sistemaSolar: SistemaSolar, jogador: Jogador, naves: Nave[]) {
        this.id = id;
        this.sistemaSolar = sistemaSolar;
        this.jogador = jogador;
        this.naves = naves;
    }
    public static carregarJogo(dados: dataGameMaster): GameMaster | null {
        try {
            const sistemaSolarCarregado = SistemaSolar.carregarObjeto(dados.sistemaSolar);
            const navesCarregadas = dados.naves.map((naveData: dataNave) =>
                Nave.carregarObjeto(naveData, sistemaSolarCarregado)
            );
            const naveDoJogador = navesCarregadas.find(nave => nave.id === dados.jogador.idNave);
            const jogadorCarregado = Jogador.carregarObjeto(dados.jogador, sistemaSolarCarregado, naveDoJogador);
            return new this(dados.id, sistemaSolarCarregado, jogadorCarregado, navesCarregadas);
        } catch (error) {
            console.error("Erro ao carregar o jogo:", error, "\n");
            return null;
        }
    }
    public salvarJogo(): dataGameMaster {
        return {
            id: this.id,
            sistemaSolar: this.sistemaSolar.salvarObjeto(),
            jogador: this.jogador.salvarObjeto(),
            naves: this.naves.map((nave) => nave.salvarObjeto()),
        }
    }
}
```
---

### item.ts
```
import { dataItem, IDClass } from "../contract/interfaces.ts";

export class Item implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly descricao: string;
    public readonly tamanho: number;
    public readonly raridade: string;
    constructor(
        nome: string,
        descricao: string,
        tamanho: number = 1,
        raridade: string = "Comum",
        id?: string
    ) {
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        this.descricao = descricao;
        this.raridade = raridade;
        this.tamanho = tamanho;
    }
    private gerarIdUnico(): string {
        return (this.constructor as any).name + Math.random().toString(36).substring(2, 4);
    }
    public salvarObjeto(): dataItem {
        return {
            id: this.id,
            nome: this.nome,
            descricao: this.descricao,
            tamanho: this.tamanho,
            raridade: this.raridade
        };
    }
    public static carregarObjeto(data: dataItem): Item {
        return new this(data.nome, data.descricao, data.tamanho, data.raridade, data.id); 
    }
    public print(): void {
        console.log(`${this.id} - ${this.nome}\nRaridade: ${this.raridade}\nTamanho: ${this.tamanho}\n${this.descricao}`);
    }
}
```
---

### areaExploravel
```
import { Conjunto } from "../components/set.ts";
import { dataAreaExploravel, dataItem, IDClass } from "../contract/interfaces.ts";
import { Item } from "./item.ts";

export class AreaExploravel implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly descricao: string;
    public readonly recursos: Conjunto<Item>;
    private explorada: boolean;
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
        return (this.constructor as any).name + Math.random().toString(36).substring(2, 4);
    }
    public explorar(): void {
        if (!this.explorada) this.explorada = true;
    }
    public salvarObjeto(): dataAreaExploravel {
        return {
            id: this.id,
            nome: this.nome,
            descricao: this.descricao,
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
        return new this(data.nome, data.descricao, recursos, data.explorada, data.id); 
    }
    public print(): void {
        console.log(`------- Area: ${this.nome} (ID: ${this.id}) -------`);
        if (!this.explorada) console.log("Desconhecida");
        else {
            console.log(this.descricao);
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
---

### planeta.ts
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
```
---

### sistemaSolar.ts
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
```
---

### inventario.ts
```
import { Pilha } from "../components/staks.ts";
import { dataInventario, IDClass, Itens } from "../contract/interfaces.ts";
import { Item } from "./item.ts";

export class Inventario {
    private maxItensPorPilha: number;
    private maxPilhas: number;
    private pilhas: Pilha<Item>[];
    constructor(maxItensPorPilha: number = 64, maxPilhas: number = 10, itens: Itens[] = []) {
        this.maxItensPorPilha = maxItensPorPilha;
        this.maxPilhas = maxPilhas;
        this.pilhas = new Array<Pilha<Item>>(maxPilhas);
        for (let i = 0; i < maxPilhas; i++) {
            this.pilhas[i] = new Pilha<Item>();
        }
        for (let i = 0; i < itens.length; i++) {
            this.addItem(itens[i]);
        }
    }
    public addItem(itens: Itens): Itens {
        const maxItensNessaPilha = Math.floor(this.maxItensPorPilha / itens.item.tamanho);
        const pilhasOcupadas = this.pilhas.filter((pilha) => pilha.getData());
        for (let i = 0; i < pilhasOcupadas.length; i++) {
            const pilha = pilhasOcupadas[i];
            if (pilha.getData()!.id === itens.item.id && pilha.getSize() < maxItensNessaPilha) {
                const quantidadeAdd = Math.min(itens.quantidade, maxItensNessaPilha - pilha.getSize());
                for (let j = 0; j < quantidadeAdd; j++) pilha.push(itens.item);
                itens.quantidade -= quantidadeAdd;
                if (!itens.quantidade) return itens;
            }
        }
        const pilhasVazias = this.pilhas.filter((pilha) => pilha.isEmpty());
        for (let i = 0; i < pilhasVazias.length; i++) {
            const pilha = pilhasVazias[i];
            if (pilha.getSize() < maxItensNessaPilha) {
                const quantidadeAdd = Math.min(itens.quantidade, maxItensNessaPilha - pilha.getSize());
                for (let j = 0; j < quantidadeAdd; j++) pilha.push(itens.item);
                itens.quantidade -= quantidadeAdd;
                if (!itens.quantidade) return itens;
            }
        }
        return itens;
    }
    public removeItem(itens: Itens): boolean {
        if (!this.pilhas.filter((pilha) => pilha.getData())) return false;
        let quantidadeRestante = itens.quantidade;
        const pilhasComItem = this.pilhas.filter((pilha) => {
            return pilha.getData()!.id === itens.item.id;
        });
        if (pilhasComItem.reduce((total, pilha) => total + pilha.getSize(), 0) < quantidadeRestante) return false;
        for (let i = pilhasComItem.length - 1; i >= 0; i--) {
            const pilha = pilhasComItem[i];
            const quantidadeRemove = Math.min(quantidadeRestante, pilha.getSize());
            for (let j = 0; j < quantidadeRemove; j++) {
                pilha.pop();
            }
            quantidadeRestante -= quantidadeRemove;
            if (pilha.isEmpty()) pilha.clear();
            if (!quantidadeRestante) return true;
        }
        return false;
    }
    public isFull(): boolean {
        return this.maxPilhas === this.pilhas.filter((pilha) => pilha.getData()).length;
    }
    public getItens(): Itens[] {
        return this.pilhas.map((pilha) => ({ item: pilha.getData()!, quantidade: pilha.getSize() }));
    }
    public salvarObjeto(): dataInventario {
        return {
            maxItensPorPilha: this.maxItensPorPilha,
            maxPilhas: this.maxPilhas,
            itens: this.pilhas.filter((pilha) => !pilha.isEmpty()).map((pilha) => {
                return {
                    item: pilha.getData()!.salvarObjeto(),
                    quantidade: pilha.getSize()
                };
            })
        };
    }
    public static carregarObjeto(data: dataInventario): Inventario {
        const itens: Itens[] = [];
        if (data.itens) {
            data.itens.forEach((itemData: any) => {
                try {
                    const item = Item.carregarObjeto(itemData.item);
                    itens.push({ item: item, quantidade: itemData.quantidade });
                } catch (error) {
                    console.warn(error);
                }
            });
        }
        return new this(data.maxItensPorPilha, data.maxPilhas, itens);
    }
    public print(): void {
        console.log("------ Inventário ------");
        const pilhasOcupadas = this.pilhas.filter((pilha) => pilha.getData());
        console.log(`Pilhas Ocupadas: ${pilhasOcupadas.length}/${this.maxPilhas}`);
        pilhasOcupadas.forEach((pilha) => {
            const item = pilha.getData()!;
            console.log(`Item: ${item.id} - ${item.nome} (${item.raridade})\nQuantidade: ${pilha.getSize()}`);
        });
        console.log("------------------------");
    }
}
```
---

### jogador.ts
```
import { Node } from "../components/node.ts";
import { dataJogador, IDClass } from "../contract/interfaces.ts";
import { AreaExploravel } from "./areaExploravel.ts";
import { Inventario } from "./inventario.ts";
import { Nave } from "./nave.ts";
import { Planeta } from "./planeta.ts";
import { SistemaSolar } from "./sistemaSolar.ts";

export class Jogador implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly inventario: Inventario;
    public nave: Nave | null;
    public emNave: boolean;
    public sistemaAtual: SistemaSolar;
    public nodePlaneta: Node<Planeta>;
    public nodeArea: Node<AreaExploravel>;
    constructor(
        nome: string,
        inventario: Inventario = new Inventario(),
        sistema: SistemaSolar,
        id?: string,
        idArea?: string,
        idPlaneta?: string,
        nave?: Nave
    ) {
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        this.inventario = inventario;
        this.sistemaAtual = sistema;
        this.sistemaAtual.explorar();
        this.nodePlaneta = this.sistemaAtual.getNodePlaneta(idPlaneta);
        this.nodePlaneta.data.explorar();
        this.nodeArea = this.nodePlaneta.data.getNodeArea(idArea);
        this.nodeArea.data.explorar();
        this.nave = nave || null;
        this.emNave = !!nave;
    }
    private gerarIdUnico(): string {
        return (this.constructor as any).name + Math.random().toString(36).substring(2, 4);
    }
    public print(): void {
        console.log(`Jogador: ${this.nome} (ID: ${this.id})`);
        this.inventario.print();
        if (this.emNave) this.nave!.print();
        else {
            console.log("Area atual:");
            this.nodeArea.data.print();
        }
    }
    public irOeste(): void {
        if (this.nave) return console.log("Você está na nave. Use os controles da nave para se mover.");
        this.nodeArea = this.nodeArea.prev!;
        this.nodeArea.data.explorar();
    }
    public irLeste(): void {
        if (this.nave) return console.log("Você está na nave. Use os controles da nave para se mover.");
        this.nodeArea = this.nodeArea.next!;
        this.nodeArea.data.explorar();
    }
    public minerar(): void {
        if (this.emNave) return console.log("Voce está numa Nave. Saia da nave para minerar.");
        const minerios = this.nodeArea.data.recursos.values();
        if (!minerios.length) return console.log("Não há recursos nessa área.");
        const itens = {
            item: minerios[Math.floor(Math.random() * minerios.length)],
            quantidade: Math.floor(Math.random() * 10) + 1
        };
        const itemRestante = this.inventario.addItem(itens);
        console.log(`Você minerou ${itens.quantidade} quantidades de ${itens.item.nome}.`);
        if (itemRestante.quantidade) console.log(`Não há espaço suficiente no seu inventário para armazenar ${itemRestante.quantidade} quantidades de ${itemRestante.item.nome}.`);
    }
    public entrarNave(nave: Nave): void {
        if (this.emNave) return console.log("Voce ja esta em uma nave!");
        if (this.nodeArea.data.id !== nave.nodeArea.data.id ||
            this.nodePlaneta.data.id !== nave.nodePlaneta.data.id ||
            this.sistemaAtual.id !== nave.sistemaAtual.id
        ) return console.log("Voce nao esta no mesmo local da nave!");
        this.nave = nave;
        this.emNave = true;
        console.log("Entrou na nave!");
    }
    public sairNave(): void {
        if (!this.emNave) return console.log("Voce nao esta em uma nave!");
        this.sistemaAtual = this.nave!.sistemaAtual;
        this.sistemaAtual.explorar();
        this.nodePlaneta = this.nave!.nodePlaneta;
        this.nodePlaneta.data.explorar();
        this.nodeArea = this.nave!.nodeArea;
        this.nodeArea.data.explorar();
        this.nave = null;
        this.emNave = false;
        console.log("Saiu da nave!");
    }
    public salvarObjeto(): dataJogador {
        return {
            id: this.id,
            nome: this.nome,
            inventario: this.inventario.salvarObjeto(),
            idArea: this.nodeArea.data.id,
            idPlaneta: this.nodePlaneta.data.id,
            idSistema: this.sistemaAtual.id,
            idNave: this.nave ? this.nave.id : undefined
        };
    }
    public static carregarObjeto(data: dataJogador, sistema: SistemaSolar, nave?: Nave): Jogador {
        return new this(
            data.nome,
            Inventario.carregarObjeto(data.inventario),
            sistema,
            data.id,
            data.idArea,
            data.idPlaneta,
            nave
        );
    }
}
```
---

### nave.ts
```
import { Node } from "../components/node.ts";
import { dataNave, IDClass } from "../contract/interfaces.ts";
import { AreaExploravel } from "./areaExploravel.ts";
import { Inventario } from "./inventario.ts";
import { Planeta } from "./planeta.ts";
import { SistemaSolar } from "./sistemaSolar.ts";

export class Nave implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly inventario: Inventario;
    public sistemaAtual: SistemaSolar;
    public nodePlaneta: Node<Planeta>;
    public nodeArea: Node<AreaExploravel>;
    constructor(
        nome: string,
        inventario: Inventario = new Inventario(),
        sistema: SistemaSolar,
        id?: string,
        idArea?: string,
        idPlaneta?: string
    ) {
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        this.inventario = inventario;
        this.sistemaAtual = sistema;
        this.nodePlaneta = this.sistemaAtual.getNodePlaneta(idPlaneta);
        this.nodeArea = this.nodePlaneta.data.getNodeArea(idArea);
    }
    private gerarIdUnico(): string {
        return (this.constructor as any).name + Math.random().toString(36).substring(2, 4);
    }
    public print(): void {
        console.log(`Nome: ${this.nome} (ID: ${this.id})`);
        this.inventario.print();
    }
    public proximoPlaneta(): void {
        this.nodePlaneta = this.nodePlaneta.next!;
        this.nodeArea = this.nodePlaneta.data.getNodeArea();
    }
    public voltarPlaneta(): void {
        this.nodePlaneta = this.nodePlaneta.prev!;
        this.nodeArea = this.nodePlaneta.data.getNodeArea();
    }
    public proximaArea(): void {
        this.nodeArea = this.nodeArea.next!;
    }
    public voltarArea(): void {
        this.nodeArea = this.nodeArea.prev!;
    }
    public salvarObjeto(): dataNave {
        return {
            id: this.id,
            nome: this.nome,
            inventario: this.inventario.salvarObjeto(),
            idSistema: this.sistemaAtual.id,
            idPlaneta: this.nodePlaneta.data.id,
            idArea: this.nodeArea.data.id
        };
    }
    public static carregarObjeto(data: dataNave, sistema: SistemaSolar): Nave {
        return new this(
            data.nome,
            Inventario.carregarObjeto(data.inventario),
            sistema,
            data.id,
            data.idArea,
            data.idPlaneta
        );
    }
}
```
---
## contract/
### interfaces.ts
```
import { Item } from "../classes/item.ts";

export interface IDClass {
    id: string;
    nome: string;
    salvarObjeto(): any;
}

export interface Itens {
    item: Item;
    quantidade: number;
}

interface dataItens {
    item: dataItem;
    quantidade: number;
}

export interface dataItem {
    id: string;
    nome: string;
    descricao: string;
    tamanho: number;
    raridade: string;
}

export interface dataAreaExploravel {
    id: string;
    nome: string;
    descricao: string;
    recursos: dataItem[];
    explorada: boolean;
}

export interface dataPlaneta {
    id: string;
    nome: string;
    explorado: boolean;
    areas: dataAreaExploravel[];
}

export interface dataSistemaSolar {
    id: string;
    nome: string;
    planetas: dataPlaneta[];
    explorado: boolean;
}

export interface dataInventario {
    maxItensPorPilha: number;
    maxPilhas: number;
    itens: dataItens[];
}

export interface dataNave {
    id: string;
    nome: string;
    inventario: dataInventario;
    idSistema: string;
    idPlaneta: string;
    idArea: string;
}

export interface dataJogador {
    id: string;
    nome: string;
    inventario: dataInventario;
    idSistema: string;
    idPlaneta: string;
    idArea: string;
    idNave?: string;
}
```