import { GameMaster } from "../classes/gameMaster.ts";

// --- AÇÕES DE EXPLORAÇÃO ---

export function mover(gameMaster: GameMaster | null, saida: HTMLPreElement, direcao: 'Leste' | 'Oeste'): string | null {
    if (!gameMaster) return "Jogo não iniciado.";
    const mensagemEncontro = direcao === 'Leste' ? gameMaster.irLeste() : gameMaster.irOeste();
    saida.textContent += `Movendo para o ${direcao}...\n`;
    if (gameMaster.getEstado() !== 'combate') { // Só mostra o resultado se não entrou em combate
        saida.textContent += "Movimento realizado com sucesso.\n";
    }
    return mensagemEncontro;
}

export function minerar(gameMaster: GameMaster | null, saida: HTMLPreElement) {
    if (!gameMaster) return;
    if (gameMaster.minerar()) {
        saida.textContent += 'Mineração realizada com sucesso!\n';
    } else {
        saida.textContent += 'Mineração falhou. Nenhum recurso encontrado.\n';
    }
}

// --- AÇÕES DE COMBATE ---

export function atacar(gameMaster: GameMaster | null, saida: HTMLPreElement) {
    if (!gameMaster) return;
    const mensagens = gameMaster.atacarInimigo(); // Corrigindo para o nome do seu método
    mensagens.forEach(msg => { saida.textContent += msg + '\n'; });
}

export function fugir(gameMaster: GameMaster | null, saida: HTMLPreElement) {
    if (!gameMaster) return;
    saida.textContent += gameMaster.fugirCombate() + '\n';
}

export function recuperarEscudo(gameMaster: GameMaster | null, saida: HTMLPreElement) {
    if (!gameMaster) return;
    if (gameMaster.verJogador().recuperarEscudo()) {
        // Retornou 'true' -> sucesso total
        saida.textContent += "Sorte grande! Você focou sua energia e recuperou o escudo completamente!\n";
    } else {
        // Retornou 'false' -> sucesso parcial
        saida.textContent += "Você tentou canalizar energia, recuperando 25% do escudo máximo.\n";
    }
}

// --- FUNÇÕES DE ATUALIZAÇÃO DA UI ---

export function getUIDadosJogador(gameMaster: GameMaster | null) {
    const jogador = gameMaster?.verJogador();
    if (!jogador) return { nome: 'Nome: ...', vida: 'Vida: ...', escudo: 'Escudo: ...', inventario: [] };
    
    const inventarioItens: string[] = [];
    jogador.inventario.slots.forEach((item, quantidade) => {
        inventarioItens.push(`${item.nome} (x${quantidade})`);
    });

    return {
        nome: `Nome: ${jogador.nome}`,
        vida: `Vida: ${jogador.vida}/${jogador.vidaMaxima}`,
        escudo: `Escudo: ${jogador.escudo}/${jogador.escudoMaximo}`,
        inventario: inventarioItens,
    };
}

export function getUIDadosPlaneta(gameMaster: GameMaster | null) {
    const planeta = gameMaster?.verPlaneta();
    const biomaAtual = gameMaster?.procurarPosicao()?.data;
    if (!planeta || !biomaAtual) return { nomePlaneta: 'Planeta: ...', recursosPlaneta: [], nomeBioma: 'Bioma: ...', recursosBioma: [] };

    return {
        nomePlaneta: `Planeta: ${planeta.tipo}`,
        recursosPlaneta: planeta.recursosDoMundo().values().map(r => r.nome),
        nomeBioma: `Bioma: ${biomaAtual.tipo}`,
        recursosBioma: biomaAtual.recursos.values().map(r => r.nome),
    };
}

export function getUIDadosInimigo(gameMaster: GameMaster | null) {
    const inimigo = gameMaster?.inimigoAtual;
    if (!inimigo) return { nome: 'Inimigo: --', vida: 'Vida: --', escudo: 'Escudo: --', poder: 'Poder: --' };
    
    return {
        nome: `Inimigo: ${inimigo.nome}`,
        vida: `Vida: ${inimigo.vida}/${inimigo.vidaMaxima}`,
        escudo: `Escudo: ${inimigo.escudo}/${inimigo.escudoMaximo}`,
        poder: `Poder: ${inimigo.poder}`,
    };
}