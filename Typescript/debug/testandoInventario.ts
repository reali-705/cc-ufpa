import { Inventario } from "../classes/inventario.ts";
import { Item } from "../classes/item.ts";
import { carregarDados, salvarDados } from "../functions/dadosLerEscrever.ts";

const arquivo = "inventario.json";
const dados = carregarDados(arquivo);
let inventario: Inventario;
if (dados) {
    try {
        inventario = Inventario.carregarObjeto(dados);
    } catch (error) {
        console.error("Erro ao carregar o inventário:", error);
        process.exit(1);
    }
} else {
    console.warn("Arquivo de inventário nao encontrado. Criando novo inventário...");
    inventario = new Inventario(5);
}
inventario.print();