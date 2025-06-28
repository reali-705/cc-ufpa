import { Planeta } from "../classes/planeta";
import { Elementos, TipoAreas } from "../enums";

export const planeta = new Planeta(
    "01",
    "Terra",
    [ {
        id: "01a",
        tipo: TipoAreas.Planicie,
        porcentagemElementos: {
            [Elementos.Hidrogenio]: 75,
            [Elementos.Carbono]: 40,
            [Elementos.Oxigenio]: 55,
            [Elementos.Silicio]: 20
        }
    }, {
        id: "01b",
        tipo: TipoAreas.Montanha,
        porcentagemElementos: {
            [Elementos.Hidrogenio]: 50,
            [Elementos.Carbono]: 25,
            [Elementos.Oxigenio]: 30,
            [Elementos.Ferro]: 25,
            [Elementos.Silicio]: 15
        }
    }, {
        id: "01c",
        tipo: TipoAreas.Floresta,
        porcentagemElementos: {
            [Elementos.Hidrogenio]: 75,
            [Elementos.Carbono]: 75,
            [Elementos.Oxigenio]: 75,
        }
    } ]
);

planeta.print();

console.log("\nIndo para Oeste...")
planeta.irOeste();
planeta.getAreaAtual()?.print();
console.log("\nIndo para Oeste...")
planeta.irOeste();
planeta.getAreaAtual()?.print();
console.log("\nIndo para Leste...")
planeta.irLeste();
planeta.getAreaAtual()?.print();