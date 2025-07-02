import { AreaExploravel } from "./areaExploravel.ts";
import { Inventario } from "./inventario.ts";
import { Planeta } from "./planeta.ts";

export class Jogador {
    public readonly id: string;
    public readonly nome: string;
    public inventario: Inventario;
    public planetaAtual: Planeta;
    public areaAtual: AreaExploravel;
    constructor(
        nome: string,
        planeta: Planeta,
        inventario: Inventario = new Inventario(),
        id?: string
    ) {
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        this.inventario = inventario;
        this.planetaAtual = planeta;
        this.areaAtual = this.planetaAtual.areaAtual?.data;
        this.areaAtual.explorar();
    }
    private gerarIdUnico(): string {
        return (this.constructor as any).name + Math.random().toString(36).substring(2, 4);
    }
    public print(): void {
        console.log(this.id + " - " + this.nome);
        this.inventario.print();
    }
    private atualizarAreaAtual(): void {
        this.areaAtual = this.planetaAtual.areaAtual?.data;
    }
    public irOeste(): void {
        if (this.planetaAtual.areas.prev()) {
            this.planetaAtual.areaAtual = this.planetaAtual.areas.getHead()!;
            this.areaAtual = this.planetaAtual.areaAtual?.data;
            this.areaAtual.explorar();
        }
    }
    public irLeste(): void {
        if (this.planetaAtual.areas.next()) {
            this.planetaAtual.areaAtual = this.planetaAtual.areas.getHead()!;
            this.areaAtual = this.planetaAtual.areaAtual?.data;
            this.areaAtual.explorar();
        }
    }
    public minerar(): boolean {
        const minerio = this.areaAtual?.extrairMinerio();
        if (minerio) return this.inventario.addItem(minerio);
        else return false;
    }
    public salvarObjeto(): any {
        return {
            tipo: (this.constructor as any).name,
            id: this.id,
            nome: this.nome,
            inventario: this.inventario.salvarObjeto(),
            planeta: this.planetaAtual?.salvarObjeto()
        };
    }
    public static carregarObjeto(data: any): Jogador {
        return new this(
            data.nome,
            Planeta.carregarObjeto(data.planeta),
            Inventario.carregarObjeto(data.inventario),
            data.id
        );
    }
}