import { UiLogger } from "./classes/uiLogger";
import { Jogador } from "./classes/jogador";
import { Planeta } from "./classes/planeta";
import { Elementos, TipoAreas } from "./enums";
import { AreaExploravel } from "./classes/areaExplorravel";

const logger = new UiLogger();
let jogador: Jogador;
let planetaAtual: Planeta;
let historicoNavegacao: string[] = [];

function iniciarNovoJogo(): void {
    logger.clear();
    planetaAtual = new Planeta("01", "Terra", [{
        id: "01a",
        tipo: TipoAreas.Planicie,
        porcentagemElementos: {
            [Elementos.Hidrogenio]: 75,
            [Elementos.Carbono]: 40,
            [Elementos.Oxigenio]: 55,
            [Elementos.Silicio]: 20
        }
    }]);
    jogador = new Jogador("Reali", planetaAtual);
    historicoNavegacao = [`Você chegou ao planeta ${planetaAtual.getNome()}`];
    logger.log("=== Novo jogo iniciado ===");
    mostrarInformacoesJogo();
}

function mover(direcao: "Leste" | "Oeste"): void {
    let novaLocalizacao = "";
    logger.log(`Você se moveu para ${direcao}.`);
    historicoNavegacao.push(`Vocé está em ${jogador.getAreaAtual().getArea()}.`);
    mostrarInformacoesJogo();
}

function minerar(): void {
    jogador.minerar();
    mostrarInformacoesJogo();
}

function mostrarInformacoesJogo(): void {
    logger.log(`\n=== Informações Atuais ===`);
    logger.log(`Planeta: ${jogador.getPlanetaAtual().getNome()}`);
    logger.log(`Área: ${jogador.getAreaAtual().getArea()}`);
    logger.log(`Jogador: ${jogador.getNome()}`);
    logger.log(`Inventário:`);
    jogador.inventario.getItems().forEach((elemento, quantidade) => logger.log(`${elemento}: ${quantidade};`));
    logger.log("=============================\n");
}

function salvarJogo(): void {
    try {
        const estadoJogo = {
            jogador: jogador.salvarObjeto();
            planetaAtual: planetaAtual.salvarObjeto();
            historicoNavegacao: historicoNavegacao
        }
        localStorage.setItem("NoManSkySave", JSON.stringify(estadoJogo));
        logger.log("Jogo salvo com sucesso!");
    } catch (error) {
        logger.log("Erro ao salvar o jogo: " + error);
        console.error("Erro ao salvar o jogo:", error);
    };
}

function carregarJogo(): void {
    try {
        const saveData = localStorage.getItem("NoManSkySave");
        if (saveData) {
            const estadoJogo = JSON.parse(saveData);
            jogador = Jogador.carregarObjeto(estadoJogo.jogador);
            planetaAtual = Planeta.carregarObjeto(estadoJogo.planetaAtual);
            historicoNavegacao = estadoJogo.historicoNavegacao;
            logger.clear();
            logger.log("Jogo carregado com sucesso!");
            mostrarInformacoesJogo();
        } else {
            logger.log("Nenhum jogo salvo encontrado.");
        }
    } catch (error) {
        logger.log("Erro ao carregar o jogo: " + error);
        console.error("Erro ao carregar o jogo:", error);
    };
}

function initGame(): void {
    const BotaoIrLeste = document.getElementById("irLeste") as HTMLButtonElement;
    const BotaoIrOeste = document.getElementById("irOeste") as HTMLButtonElement;
    const BotaoMinerar = document.getElementById("minerar") as HTMLButtonElement;
    const BotaoMostrarInfo = document.getElementById("mostrarInfo") as HTMLButtonElement;
    const BotaoSalvar = document.getElementById("salvar") as HTMLButtonElement;
    const BotaoCarregar = document.getElementById("carregar") as HTMLButtonElement;
    const BotaoNovoJogo = document.getElementById("novoJogo") as HTMLButtonElement;

    BotaoIrLeste.addEventListener("click", () => mover("Leste"));
    BotaoIrOeste.addEventListener("click", () => mover("Oeste"));
    BotaoMinerar.addEventListener("click", minerar);
    BotaoMostrarInfo.addEventListener("click", mostrarInformacoesJogo);
    BotaoSalvar.addEventListener("click", salvarJogo);
    BotaoCarregar.addEventListener("click", carregarJogo);
    BotaoNovoJogo.addEventListener("click", iniciarNovoJogo);

    iniciarNovoJogo();
}

document.addEventListener("DOMContentLoaded", initGame);