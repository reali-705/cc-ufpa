import { Elementos } from "../enums";
import { AreaExploravel } from "./areaExplorravel";
import { Inventario } from "./inventario";
import { Planeta } from "./planeta";

export class Jogador {
    private id: string;
    private nome: string;
    public inventario: Inventario;
    private planetaAtual: Planeta;
    private areaAtual: AreaExploravel;

    constructor(nome: string,planeta: Planeta, area: AreaExploravel | null = null) {
        this.id = Math.random().toString();
        this.nome = nome;    
        this.inventario = new Inventario(10);
        this.planetaAtual = planeta;
        if (!area) area = planeta.getAreaAtual();
        this.areaAtual = area;
    }
    public print(): void {
        console.log(this.getNome());
        this.areaAtual.print();
        this.inventario.print();
    }
    public getNome(): string {
        return this.id + " - " + this.nome;
    }
    public getPlanetaAtual(): Planeta {
        return this.planetaAtual;
    }
    public getAreaAtual(): AreaExploravel {
        return this.areaAtual;
    }
    private novaArea(): void {
        this.areaAtual = this.planetaAtual.getAreaAtual();
    }
    public irLeste(): void {
        this.planetaAtual.irLeste();
        this.novaArea();
    }
    public irOeste(): void {
        this.planetaAtual.irOeste();
        this.novaArea();
    }
    public minerar(): boolean {
        if (!this.areaAtual) return false;
        const elementosPorcentagem = this.areaAtual.getElementosPorcentagem();
        if (!elementosPorcentagem) return false;
        let elementosMinerados = 0;
        for (const [elemento, porcentagem] of elementosPorcentagem.entries()) {
            const quantidade = Math.floor(porcentagem / 10);
            if (quantidade <= 0) continue;
            if (this.inventario.addItem(elemento, quantidade)) elementosMinerados += quantidade;
        }
        if (elementosMinerados > 0) return true;
        return false;
    }
}