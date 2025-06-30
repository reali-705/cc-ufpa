import { Elementos, TipoAreas } from "../enums.ts";
import { Conjunto } from "../elements/set.ts";

export class AreaExploravel {
    private id: string;
    private tipo: TipoAreas;
    private porcentagemElementos: Map<Elementos, number>;
    private elementos: Conjunto<Elementos>;
    constructor(id: string, tipo: TipoAreas, porcentagemElementos: { [key in Elementos]?: number}) {
        this.id = id;
        this.tipo = tipo;
        this.porcentagemElementos = new Map<Elementos, number>(
            Object.entries(porcentagemElementos).map(
                ([elemento, porcentagem]) => [elemento as Elementos, porcentagem as number]
            )
        );
        this.elementos = new Conjunto<Elementos>();
        for (const elemento of this.porcentagemElementos.keys()) {
            this.elementos.add(elemento);
        }
    };
    public print(): void {
        console.log(this.getArea());
        console.log("Elementos: ");
        this.elementos.print();
    }
    public getArea(): string {
        return this.id + " - " + this.tipo;
    }
    public getTipo(): TipoAreas {
        return this.tipo;
    }
    public getElementos(): Conjunto<Elementos> {
        return this.elementos;
    }
    public getElementosPorcentagem(): Map<Elementos, number> {
        return this.porcentagemElementos;
    }
}