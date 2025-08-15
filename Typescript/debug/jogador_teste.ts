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

function carregarPlaneta(): Planeta | undefined {
    const arquivoNome = "planeta_teste.json";
    console.log("\nIniciando teste de carregamento do Planeta...");
    try {
        const planetaData = carregarDados(arquivoNome, "./Jsons/");
        if (!planetaData) {
            throw new Error("Dados do planeta não encontrados.");
        }
        const planeta = Planeta.carregarObjeto(planetaData);
        console.log("Planeta carregado com sucesso!");
        return planeta;
    } catch (error) {
        console.error("Erro ao carregar dados do planeta:", error, "\n");
    }
}

function verificarPosicaoAtual(jogador: Jogador, planeta: Planeta): Node<Bioma> {
    let bioma = planeta.biomas.getHead()!;
    let posicaoAtual = jogador.verPosicaoAtual();
    if (!posicaoAtual) {
        return bioma;
    }
    jogador.mostrarHistorico();
    for (let i = 0; i < planeta.biomas.getSize(); i++) {
        if (bioma.data.id === posicaoAtual?.biomaID) {
            break;
        }
        bioma = bioma.next!;
    }
    return bioma;
}

function main() {
    const jogador = carregarJogador();
    const planeta = carregarPlaneta();
    if (!jogador || !planeta) {
        console.log("\nFalha ao carregar um ou ambos os objetos.");
    } else {
        console.log("\nAmbos os objetos carregados com sucesso!\n");
        jogador.print();
        planeta.print();
        console.log("\nTestando movimentação do jogador...");
        jogador.irLeste(verificarPosicaoAtual(jogador, planeta));
        console.log("Nova posição do jogador: ", jogador.verPosicaoAtual());
        jogador.irLeste(verificarPosicaoAtual(jogador, planeta));
        console.log("Nova posição do jogador: ", jogador.verPosicaoAtual());
        jogador.irOeste(verificarPosicaoAtual(jogador, planeta));
        console.log("Nova posição do jogador: ", jogador.verPosicaoAtual());
        console.log("\nTestando histórico de posições...");
        jogador.mostrarHistorico();
        console.log("\nTestando mineração no bioma atual...");
        jogador.minerar(verificarPosicaoAtual(jogador, planeta).data);
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