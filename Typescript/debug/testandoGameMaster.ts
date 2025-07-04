import { GameMaster } from "../classes/gameMaster.ts";
import { Jogador } from "../classes/jogador.ts";
import { Nave } from "../classes/nave.ts";
import { SistemaSolar } from "../classes/sistemaSolar.ts";
import { dataNave } from "../contract/interfaces.ts";
import { carregarDados } from "../functions/salvarCarregar.ts";

function extrairGM(): GameMaster {
    const dados = carregarDados("gameMaster.json");
    try {
        const gameMaster = GameMaster.carregarJogo(dados);
        if (!gameMaster) process.exit(1);
        return gameMaster;
    } catch (error) {
        console.error("Erro ao carregar o gameMaster:", error, "\n");
    }
    process.exit(1);
}

function extrair(): GameMaster {
    const dadosSistemaSolar = carregarDados("sistemaSolar.json");
    const dadosJogador = carregarDados("jogador.json");
    const dadosNaves = carregarDados("Naves.json");
    if (dadosSistemaSolar && dadosJogador && dadosNaves) {
        const sistemaSolar = SistemaSolar.carregarObjeto(dadosSistemaSolar);
        const jogador = Jogador.carregarObjeto(dadosJogador, sistemaSolar);
        const naves = dadosNaves.map((naveData: dataNave) => Nave.carregarObjeto(naveData, sistemaSolar));
        return new GameMaster("gameMaster-001", sistemaSolar, jogador, naves);
    }
    return extrairGM();
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