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
    public nave: Nave | undefined;
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
        this.nave = nave;
    }
    private gerarIdUnico(): string {
        return (this.constructor as any).name + Math.random().toString(36).substring(2, 4);
    }
    public print(): void {
        console.log(`Jogador: ${this.nome} (ID: ${this.id})`);
        this.inventario.print();
        // if (this.nave) this.nave.print();
        console.log("Area atual:");
        this.nodeArea.data.print();
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
        const minerios = this.nodeArea.data.recursos.values();
        const itens = {
            item: minerios[Math.floor(Math.random() * minerios.length)],
            quantidade: Math.floor(Math.random() * 10)
        };
        const resto = this.inventario.addItem(itens);
        console.log(`Elemento minerado: ${itens.item} (${itens.quantidade})`);
        if (resto.quantidade) console.log(`Não foi possível armazenar: ${resto.item} (${resto.quantidade})`);
    }
    public entrarNave(nave: Nave): void {
        if (this.nave) return console.log("Voce ja esta em uma nave!");
        const posicaoAtual = {
            area: this.nodeArea.data.id,
            planeta: this.nodePlaneta.data.id,
            sistema: this.sistemaAtual.id
        };
        const posicaoNave = {
            area: nave.nodeArea.data.id,
            planeta: nave.nodePlaneta.data.id,
            sistema: nave.sistemaAtual.id
        };
        if (posicaoAtual !== posicaoNave) return console.log("Voce nao esta no mesmo local da nave!");
        this.nave = nave;
        console.log("Entrou na nave!");
    }
    public sairNave(): void {
        if (!this.nave) return console.log("Voce nao esta em uma nave!");
        this.sistemaAtual = this.nave.sistemaAtual;
        this.sistemaAtual.explorar();
        this.nodePlaneta = this.nave.nodePlaneta;
        this.nodePlaneta.data.explorar();
        this.nodeArea = this.nave.nodeArea;
        this.nodeArea.data.explorar();
        this.nave = undefined;
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