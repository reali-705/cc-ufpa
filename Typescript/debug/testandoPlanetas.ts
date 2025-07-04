import { Planeta } from "../classes/planeta.ts";
import { carregarDados } from "../functions/salvarCarregar.ts";

const arquivo = "planeta.json";
const dados = carregarDados(arquivo);
let planeta: Planeta;
if (dados) {
    try {
        planeta = Planeta.carregarObjeto(dados);
    } catch (error) {
        console.error("Erro ao carregar o planeta:", error);
        process.exit(1);
    }
} else {
    console.warn("Arquivo de planeta nao encontrado. Criando novo planeta...");
    planeta = new Planeta("Terra");
}

planeta.print();