import { Universo } from "../classes/universo.ts";
import { carregarDados } from "../functions/salvarCarregar.ts";

async function testandoUniverso() {
    const arquivoNome = "universo_teste.json";
    console.log("\nInicidando teste de carregamento do Universo...\n");
    try {
        const dataUniverso = carregarDados(arquivoNome, "./Jsons/");
        if (!dataUniverso) {
            console.error("Não foi possível carregar os dados do Universo.");
            return;
        }
        const universo = Universo.carregarObjeto(dataUniverso);
        universo.print();
        console.log("\nTeste concluido com sucesso!\n");
    } catch (error) {
        console.error("Erro ao carregar os dados do Universo:", error, "\n");
    }
}

testandoUniverso();