import { Jogador } from "../classes/jogador.ts";
import { carregarDados } from "../functions/salvarCarregar.ts";

function testarJogador() {
    const arquivoNome = "jogador_teste.json";
    console.log("\nIniciando teste de carregamento do Jogador...\n");
    try {
        const jogadorData = carregarDados(arquivoNome, "./Jsons/");
        if (!jogadorData) {
            throw new Error("Dados do jogador não encontrados.");
        }
        const jogador = Jogador.carregarObjeto(jogadorData);
        jogador.print();
        console.log("\nTeste concluido com sucesso!\n");
    } catch (error) {
        console.error("Erro ao carregar dados do jogador:", error, "\n");
    }
}

testarJogador();
