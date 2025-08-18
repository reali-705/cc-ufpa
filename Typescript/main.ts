/*
principal:
    botoes para controlar a movimentação (irLeste, irOeste)
        ativa o metodo irLeste ou irOeste do GM
    botao para minerar
        ativa o metodo minerar do GM
    botao para abrir inventário
        muda a tela para o inventario do jogador
            visualizar os itens
            remover itens especificos
    salvar e sair
        transformar game master
        if (!gameMaster) {
            saida.textContent += 'Game Master não inicializado.\n';
            return;
        } em um arquivo json
    carregar jogo salvo
        transformar um arquivo json para um game master
        if (!gameMaster) {
            saida.textContent += 'Game Master não inicializado.\n';
            return;
        } jogavel
    novo jogo
        tela de login para selecionar um jogador e um planeta
            utilizar tabela hash nesse processo

opcional:
    criar gerador aleatorio de planetas
    adicionar sistema de crafting
    adicionar itens de combate (armas, escudos, curativos etc)
    adicionar inimigos com chances de combate ao entrar nos biomas
    criar zonas seguras em determinados biomas
    desenvolver sistema de criação de base
    implementar sistema de missões
    criar NPCs aleatorios no mapa
    criar eventos aleatórios no planeta
    criar naves para alterar entre planetas
    adicionar sistema de combate com naves
*/

import { GameMaster } from "./classes/gameMaster.ts";
import { carregarJogo, salvarJogo } from "./functions/chamados.ts";

let gameMaster: GameMaster | null = null;
const saida = document.getElementById('saida') as HTMLPreElement;
const arquivo = "gameMaster.json"

// Seletores para os elementos do UI
const nomePersonagem = document.getElementById('nomePersonagem') as HTMLHeadingElement;
const vidaPersonagem = document.getElementById('vidaPersonagem') as HTMLHeadingElement;
const escudoPersonagem = document.getElementById('escudoPersonagem') as HTMLHeadingElement;
const planetaUI = document.getElementById('planeta') as HTMLHeadingElement;
const biomaUI = document.getElementById('bioma') as HTMLHeadingElement;
const recursosUI = document.getElementById('recursos') as HTMLHeadingElement;

/**
 * Atualiza todos os elementos da interface do usuário com os dados do GameMaster.
 */
function atualizarUI() {
    if (!gameMaster) {
        nomePersonagem.textContent = 'Nome: ';
        vidaPersonagem.textContent = 'Vida: ';
        escudoPersonagem.textContent = 'Escudo: ';
        planetaUI.textContent = 'Planeta: ';
        biomaUI.textContent = 'Bioma: ';
        recursosUI.textContent = 'Recursos: ';
        return;
    }

    const jogador = gameMaster.verJogador();
    nomePersonagem.textContent = `Nome: ${jogador.nome}`;
    vidaPersonagem.textContent = `Vida: ${jogador.vida}`;
    escudoPersonagem.textContent = `Escudo: ${jogador.escudo}`;

    const planeta = gameMaster.verPlaneta();
    planetaUI.textContent = `Planeta: ${planeta.nome}`;
    biomaUI.textContent = `Bioma: ${gameMaster.verPosicaoAtual()}`;

    // Obtém os recursos e formata para exibição
    const recursosMapa = gameMaster.verPlaneta().recursosDoMundo();
    const recursosArray = [...recursosMapa.values()]; // Converte o iterador para um array
    const nomesRecursos = recursosArray.map(recurso => recurso.nome).join(', ');
    recursosUI.textContent = `Recursos: ${nomesRecursos}`;
}

async function main() {
    const botaoLeste = document.getElementById('irLeste') as HTMLButtonElement;
    const botaoOeste = document.getElementById('irOeste') as HTMLButtonElement;
    const botaoMinerar = document.getElementById('minerar') as HTMLButtonElement;
    const botaoInventario = document.getElementById('mostrarInventario') as HTMLButtonElement;
    const botaoSalvar = document.getElementById('salvar') as HTMLButtonElement;
    const botaoCarregar = document.getElementById('carregar') as HTMLButtonElement;
    const botaoNovoJogo = document.getElementById('novoJogo') as HTMLButtonElement;

    botaoLeste.addEventListener('click', () => {
        if (!gameMaster) {
            saida.textContent += 'Game Master não inicializado.\n';
            return;
        }
        saida.textContent += 'Movendo para o Leste...\n';
        if (gameMaster.irLeste()) {
            saida.textContent += 'Movimento realizado com sucesso!\n';
            saida.textContent += `Nova posição do jogador: ${gameMaster.verPosicaoAtual()}\n`;
            atualizarUI(); // Atualiza a UI após o movimento
        } else {
            saida.textContent += 'Movimento falhou.\n';
        }
    });

    botaoOeste.addEventListener('click', () => {
        if (!gameMaster) {
            saida.textContent += 'Game Master não inicializado.\n';
            return;
        }
        saida.textContent += 'Movendo para o Oeste...\n';
        if (gameMaster.irOeste()) {
            saida.textContent += 'Movimento realizado com sucesso!\n';
            saida.textContent += `Nova posição do jogador: ${gameMaster.verPosicaoAtual()}\n`;
            atualizarUI(); // Atualiza a UI após o movimento
        } else {
            saida.textContent += 'Movimento falhou.\n';
        }
    });

    botaoMinerar.addEventListener('click', () => {
        if (!gameMaster) {
            saida.textContent += 'Game Master não inicializado.\n';
            return;
        }
        saida.textContent += 'Minerando...\n';
        if (gameMaster.minerar()) {
            saida.textContent += 'Mineração realizada com sucesso!\n';
            atualizarUI(); // Atualiza a UI após a mineração
        } else {
            saida.textContent += 'Mineração falhou.\n';
        }
    });

    botaoInventario.addEventListener('click', () => {
        if (!gameMaster) {
            saida.textContent += 'Game Master não inicializado.\n';
            return;
        }
        saida.textContent += 'Abrindo inventário...\n';
        gameMaster.abrirInventario().forEach((item, quantidade) => {
            saida.textContent += `Item: ${item.nome} (x${quantidade})\n`;
        });
    });

    botaoCarregar.addEventListener('click', () => {
        carregarJogo(arquivo).then(dados => {
            gameMaster = GameMaster.carregarObjeto(dados);
            saida.textContent += 'Jogo carregado com sucesso!\n';
            atualizarUI(); // Atualiza a UI após o carregamento
        }).catch(error => {
            saida.textContent += `Erro ao carregar o jogo: ${error}\n`;
        });
    });

    botaoSalvar.addEventListener('click', () => {
        if (!gameMaster) {
            saida.textContent += 'Game Master não inicializado.\n';
            return;
        }
        salvarJogo(gameMaster.salvarObjeto(), arquivo).then(() => {
            saida.textContent += 'Jogo salvo com sucesso!\n';
        }).catch(error => {
            saida.textContent += `Erro ao salvar o jogo: ${error}\n`;
        });
    });
}

window.addEventListener('load', main);
