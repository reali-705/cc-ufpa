import { Bioma } from "../classes/bioma.ts";
import { Jogador } from "../classes/jogador.ts";
import { Planeta } from "../classes/planeta.ts";
import { Node } from "../components/node.ts";
import { carregarDados, salvarDados } from "../functions/salvarCarregar.ts";

function carregarJogador(): Jogador | undefined {
    const arquivoNome = "jogador_teste.json";
    console.log("\nIniciando teste de carregamento do Jogador...");
    try {
        const jogadorData = carregarDados(arquivoNome, "./Jsons/");
        if (!jogadorData) {
            throw new Error("Dados do jogador não encontrados.");
        }
        const jogador = Jogador.carregarObjeto(jogadorData);
        console.log("Jogador carregado com sucesso!");
        return jogador;
    } catch (error) {
        console.error("Erro ao carregar dados do jogador:", error, "\n");
    }
}

function main() {
    const jogador = carregarJogador();
    if (!jogador) {
        console.log("\nFalha ao carregar o objeto Jogador.");
    } else {
        console.log("\nAmbos os objetos carregados com sucesso!\n");
        jogador.print();
        console.log("\nTestando salvamento do jogador...");
        if (salvarDados(jogador.salvarObjeto(), "jogador_teste.json", "./Jsons/")) {
            console.log("Jogador salvo com sucesso!");
        } else {
            console.log("Erro ao salvar jogador.");
        }
        console.log("Encerrando testes.");
    }
}

main();