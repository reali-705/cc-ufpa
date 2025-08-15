import { GameMaster } from "../classes/gameMaster.ts";
import { Jogador } from "../classes/jogador.ts";
import { Planeta } from "../classes/planeta.ts";
import { carregarDados, salvarDados } from "../functions/salvarCarregar.ts";

function carregar(arquivo: string): Jogador | Planeta | undefined {
    console.log(`\nIniciando teste de carregamento de ${arquivo}...`);
    try {
        const dados = carregarDados(arquivo, "./Jsons/");
        if (!dados) {
            throw new Error(`Dados de ${arquivo} não encontrados.`);
        }
        let objeto;
        if (arquivo.includes("jogador")) {
            objeto = Jogador.carregarObjeto(dados);
        } else if (arquivo.includes("planeta")) {
            objeto = Planeta.carregarObjeto(dados);
        }
        console.log(`${arquivo} carregado com sucesso!`);
        return objeto;
    } catch (error) {
        console.error(`Erro ao carregar dados de ${arquivo}:`, error, "\n");
    }
}

function Oeste(gm: GameMaster): void {
    console.log("\nMovendo para o Oeste...");
    if (gm.irOeste()) {
        console.log("Movimento realizado com sucesso!");
        console.log("Nova posição do jogador:", gm.jogador.verPosicaoAtual());
    } else {
        console.log("Movimento falhou.");
    }
}

function Leste(gm: GameMaster): void {
    console.log("\nMovendo para o Leste...");
    if (gm.irLeste()) {
        console.log("Movimento realizado com sucesso!");
        console.log("Nova posição do jogador:", gm.jogador.verPosicaoAtual());
    } else {
        console.log("Movimento falhou.");
    }
}

function minerar(gm: GameMaster): void {
    console.log("\nIniciando mineração...");
    if (gm.minerar()) {
        console.log("Mineração realizada com sucesso!");
        console.log("Inventario atualizado:");
        gm.jogador.inventario.print();
    } else {
        console.log("Mineração falhou.");
    }
}

function main(): void {
    const jogador = carregar("jogador_teste.json") as Jogador;
    const planeta = carregar("planeta_teste.json") as Planeta;

    if (!jogador || !planeta) {
        console.log("\nFalha ao carregar os objetos.");
        return;
    }
    const gameMaster = new GameMaster(planeta, jogador);
    console.log("\nAmbos os objetos carregados com sucesso!\n");
    jogador.print();
    planeta.print();
    console.log("\nIniciando testes de GameMaster...");
    console.log("\nTestando movimentação do jogador:");
    Oeste(gameMaster);
    Oeste(gameMaster);
    Leste(gameMaster);
    Oeste(gameMaster);
     console.log("\nTestando mineração no bioma atual:");
    minerar(gameMaster);
    gameMaster.irLeste(); // Move para o próximo bioma
    minerar(gameMaster);
    console.log("\nTestando salvamento do jogador...");
    if (salvarDados(jogador.salvarObjeto(), "jogador_teste.json", "./Jsons/")) {
        console.log("Jogador salvo com sucesso!");
    } else {
        console.log("Erro ao salvar jogador.");
    }
    console.log("\nEncerrando testes.");
}

main();