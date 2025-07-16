import { Node } from "../components/node.ts";
import { dataNave, IDClass } from "../contract/interfaces.ts";
import { AreaExploravel } from "./bioma.ts";
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