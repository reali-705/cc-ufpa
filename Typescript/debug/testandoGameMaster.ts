import { GameMaster } from "../classes/gameMaster.ts";
import { carregarDados } from "../functions/salvarCarregar.ts";

function extrair(): GameMaster {
    const arquivo = "gameMaster.json";
    const dados = carregarDados(arquivo);
    if (!dados) process.exit(1);
    try {
        const gameMaster = GameMaster.carregarJogo(dados);
        if (!gameMaster) process.exit(1);
        return gameMaster;
    } catch (error) {
        console.error("Erro ao carregar o gameMaster:", error, "\n");
    }
    process.exit(1);
}

function main(): void {
    const gameMaster = extrair();
    const jogador = gameMaster.jogador;
    const sistema = gameMaster.sistemaSolar;
    const naves = gameMaster.naves;
    console.log("\nComeçando testes...\n");
    sistema.print();
    naves.forEach((nave) => nave.print());
    jogador.print();
}

main();