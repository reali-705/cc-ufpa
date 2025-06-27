import { ListaVinculadaCircular } from "../elements/circularLinkedList";
import { AreaExploravel } from "./areaExplorravel";
import { Areas } from "../interfaces";
import { Conjunto } from "../elements/set";
import { Elementos, TipoAreas } from "../enums";

export class Planeta {
    private id: string;
    private nome: string;
    private areas: ListaVinculadaCircular<AreaExploravel>;
    private indiceAreaAtual: number;
    private areaAtual: AreaExploravel | null;
    constructor(id: string, nome: string, areas: Areas[]) {
        this.id = id;
        this.nome = nome;
        this.areas = new ListaVinculadaCircular<AreaExploravel>();
        for (const area of areas) {
            this.areas.insert(new AreaExploravel(area.id, area.tipo, area.porcentagemElementos));
        }
        this.indiceAreaAtual = this.areas.getSize() > 0 ? 0 : -1;
        this.areaAtual = this.areas.getAt(this.indiceAreaAtual);
    }
    public getNome(): string {
        return this.id + " - " + this.nome;
    }
    public getAreaAtual(): AreaExploravel | null {
        return this.areaAtual;
    }
    public getSizeAreas(): number {
        return this.areas.getSize();
    }
    public getAreas(): Conjunto<TipoAreas> | null {
        if (this.getSizeAreas() === 0) return null;
        const AREAS = new Conjunto<TipoAreas>();
        for (let i = 0; i < this.areas.getSize(); i++) {
            const area = this.areas.getAt(i);
            if (area) AREAS.add(area.getTipo());
        }
        return AREAS;
    }
    public getElementos(): Conjunto<Elementos> | null {
        if (this.getSizeAreas() === 0) return null;
        let elementos = new Conjunto<Elementos>();
        for (let i = 0; i < this.areas.getSize(); i++) {
            const area = this.areas.getAt(i);
            if (area) elementos = elementos.union(area.getElementos());
        }
        return elementos;
    }
    public irLeste(): void {
        if (this.areas.getSize() === 0) {
            console.log("Planeta sem areas");
            return;
        }
        this.indiceAreaAtual = (this.indiceAreaAtual + 1) % this.areas.getSize();
        this.areaAtual = this.areas.getAt(this.indiceAreaAtual);
    }
    public irOeste(): void {
        if (this.areas.getSize() === 0) {
            console.log("Planeta sem areas");
            return;
        }
        this.indiceAreaAtual = (this.indiceAreaAtual - 1 + this.areas.getSize()) % this.areas.getSize();
        this.areaAtual = this.areas.getAt(this.indiceAreaAtual);
    }
}