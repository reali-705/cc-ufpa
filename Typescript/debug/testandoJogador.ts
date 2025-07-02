import { Jogador } from "../classes/jogador.ts";
import { Planeta } from "../classes/planeta.ts";
import { carregarDados, salvarDados } from "../functions/salvarCarregar.ts";

const arquivo = "jogador.json";
const dados = carregarDados(arquivo);
let jogador: Jogador | null = null;

if (!dados) console.warn("Arquivo de jogador nao encontrado. Criando novo jogador...");
else {
    try {
        jogador = Jogador.carregarObjeto(dados);
    } catch (error) {
        console.error("Erro ao carregar o jogador:", error, "\n");
    }
}
if (!jogador) process.exit(1);
const planeta = jogador.planetaAtual;

function irLeste(jogador: Jogador): void {
    console.log("\nIndo para o leste...");
    jogador.irLeste();
    console.log("Você chegou em:");
    jogador.areaAtual?.print();
}

function irOeste(jogador: Jogador): void {
    console.log("\nIndo para o oeste...");
    jogador.irOeste();
    console.log("Você chegou em:");
    jogador.areaAtual?.print();
}

function minerar(jogador: Jogador): void {
    if (jogador.inventario.isFull()) return console.log("Inventario cheio.");
    console.log("\nMinerando...");
    if (jogador.minerar()) jogador.print();
    else console.log("Nenhum minerio encontrado.");
}

console.log("\nComeçando testes...\n");
planeta.print();
jogador.print();
irLeste(jogador);
irLeste(jogador);
irLeste(jogador);
minerar(jogador);
minerar(jogador);
irOeste(jogador);
irLeste(jogador);
irLeste(jogador);
minerar(jogador);
minerar(jogador);
minerar(jogador);

salvarDados(jogador.salvarObjeto(), arquivo);