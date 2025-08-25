import { GameMaster } from "../classes/gameMaster.ts";
import { UI } from "../contract/interfaces.ts";
import { salvarJogo } from "./chamados.ts";

function errorGameMaster(saida: HTMLPreElement): boolean {
    saida.textContent += 'Game Master nao inicializado.\n';
    return false;
}

export function atualizarUI(gameMaster: GameMaster | null): UI {
    if (!gameMaster) {
        return {
            nome: 'Nome: ',
            vida: 'Vida: ',
            escudo: 'Escudo: ',
            posicao: 'Planeta: ',
            recursos: 'Recursos: ',
        };
    }
    const jogador = gameMaster.verJogador();
    const planeta = gameMaster.verPlaneta();
    const nomesRecursos = planeta.recursosDoMundo().values().map(recurso => recurso.nome).join('\n');
    return {
        nome: `Nome: ${jogador.nome}`,
        vida: `Vida: ${jogador.vida}/${jogador.vidaMaxima}`,
        escudo: `Escudo: ${jogador.escudo}/${jogador.escudoMaximo}`,
        posicao: jogador.verPosicaoAtual(),
        recursos: `Recursos:\n${nomesRecursos}`,
    };
}

export function irPara(gameMaster: GameMaster | null, saida: HTMLPreElement, sentido: string): boolean {
    if (!gameMaster) {
        return errorGameMaster(saida);
    }
    saida.textContent += `Movendo para o ${sentido}...\n`;
    let resposta = sentido === 'Leste' ? gameMaster.irLeste() : gameMaster.irOeste();
    if (resposta) {
        saida.textContent += 'Movimento realizado com sucesso!\n';
        saida.textContent += `Nova posicao do jogador: ${gameMaster.verPosicaoAtual()}\n`;
        return true;
    } else {
        saida.textContent += 'Movimento falhou.\n';
        return false;
    }
}

export function minerar(gameMaster: GameMaster | null, saida: HTMLPreElement): boolean {
    if (!gameMaster) {
        return errorGameMaster(saida);
    }
    saida.textContent += 'Minerando...\n';
    let resposta = gameMaster.minerar();
    if (resposta) {
        saida.textContent += 'Mineracao realizada com sucesso!\n';
        return true;
    } else {
        saida.textContent += 'Mineracao falhou.\n';
        return false;
    }
}

export function inventario(gameMaster: GameMaster | null, saida: HTMLPreElement): boolean {
    if (!gameMaster) {
        return errorGameMaster(saida);
    }
    saida.textContent += 'Abrindo inventario...\n';
    gameMaster.abrirInventario().forEach((item, quantidade) => {
        saida.textContent += `Item: ${item.nome} (x${quantidade})\n`;
    });
    return true;
}