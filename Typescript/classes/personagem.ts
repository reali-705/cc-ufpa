import { Elementos } from "../enums";
import { MyArray } from "../elements/array";
import { Materiais } from "../interfaces";
import { AreaExploravel } from "./areaExplorravel";
import { Inventario } from "./inventario";
import { Planeta } from "./planeta";

export class Personagem {
    public vida: number;
    public defesa: number;
    public inventario: Inventario;
    private planeta: Planeta;
    private areaAtual: AreaExploravel | null;

    constructor(planeta: Planeta, area: AreaExploravel | null = null) {
        this.vida = 100;
        this.defesa = 10;
        this.inventario = new Inventario(10);
        this.planeta = planeta;
        if (!area) area = planeta.getAreaAtual();
        this.areaAtual = area;
    }
    // minerar(elemento: Elementos) {
    //     const elementosPorcentagem = this.areaAtual?.getElementosPorcentagem()!;
    //     const quantidade = Math.floor(elementosPorcentagem.get(elemento)! / 10);
    //     this.inventario.addItem(elemento, quantidade);
    //     console.log(`Você minerou ${quantidade} ${elemento}!`);
        
    // }
    // usar(item: Item) {
        // TODO usar item
    // }
}