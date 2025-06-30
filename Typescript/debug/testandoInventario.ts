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
console.log("\n--- Realizando Edições no Inventário ---");

console.log("\nAdicionando 80 Madeiras (deve preencher e criar nova pilha):");
inventario.addItem(new Item("Madeira", "Um tronco de árvore, fundamental para craftar.", 80, 64));
inventario.print();

console.log("\nRemovendo 30 Pedra (deve consumir da segunda pilha):");
inventario.removeItem("Pedra", 30);
inventario.print();

console.log("\nAdicionando uma nova Poção Forte (pilhaMax 10):");
inventario.addItem(new Item("Poção Forte", "Cura muito da vida.", 1, 10));
inventario.print();

console.log("\nTentando adicionar 100 Carvões (inventário provavelmente cheio):");
inventario.addItem(new Item("Carvão", "Pedacinho de carvão", 100, 64));
inventario.print();

console.log("\nSalvando Edição do Inventário... (deve salvar com sucesso):");
const salvouEdicao = salvarDados(inventario.salvarObjeto(), arquivo);
if (salvouEdicao) {
    console.log("Inventário editado salvo com sucesso!");
} else {
    console.error("Falha ao salvar o inventário editado.");
}
