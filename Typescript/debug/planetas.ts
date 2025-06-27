import { Planeta } from "../classes/planeta";
import { Elementos, TipoAreas } from "../enums";

const planeta = new Planeta(
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

console.log("Nome Planeta: " + planeta.getNome());
console.log("Elementos do Planeta: " + planeta.getElementos()?.print());
console.log("Areas do Planeta: " + planeta.getAreas()?.print())
console.log("Area Atual: " + planeta.getAreaAtual()?.getArea());
console.log("Elementos da Area Atual: ");
planeta.getAreaAtual()?.getElementos()?.print();
console.log("Indo para Oeste...")
planeta.irOeste();
console.log("Area Atual: " + planeta.getAreaAtual()?.getArea());
console.log("Elementos da Area Atual: ");
planeta.getAreaAtual()?.getElementos()?.print();
console.log("Indo para Oeste...")
planeta.irOeste();
console.log("Area Atual: " + planeta.getAreaAtual()?.getArea());
console.log("Elementos da Area Atual: ");
planeta.getAreaAtual()?.getElementos()?.print();
console.log("Indo para Leste...")
planeta.irLeste();
console.log("Area Atual: " + planeta.getAreaAtual()?.getArea());
console.log("Elementos da Area Atual: ");
planeta.getAreaAtual()?.getElementos()?.print();