import { Planeta } from "../classes/planeta.ts";
import { carregarDados, salvarDados } from "../functions/dadosLerEscrever.ts";

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

function irLeste(planeta: Planeta) {
    console.log("\nIndo para o leste...")
    planeta.irLeste();
    planeta.areaAtual?.data.print();
}

function irOeste(planeta: Planeta) {
    console.log("\nIndo para o Oeste...")
    planeta.irOeste();
    planeta.areaAtual?.data.print();
}

function minerar(planeta: Planeta) {
    console.log("\nMinerando...")
    const minerio = planeta.areaAtual?.data.minerar();
    console.log(minerio);
    minerio?.item.print();
}


planeta.print();
irLeste(planeta);
irLeste(planeta);
irLeste(planeta);
minerar(planeta);
minerar(planeta);
irOeste(planeta);
irLeste(planeta);
irLeste(planeta);
minerar(planeta);
minerar(planeta);
minerar(planeta);

salvarDados(planeta.salvarObjeto(), arquivo);