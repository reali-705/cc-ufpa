import { GameMaster } from "./classes/gameMaster.ts";
import { Tamanho } from "./contract/enums.ts";
import * as Acoes from "./functions/acoes_html.ts";
import { carregarJogo, salvarJogo } from "./functions/chamados.ts";

// --- ELEMENTOS GLOBAIS DA UI ---
// Telas
const telaCadastro = document.getElementById('tela-cadastro') as HTMLDivElement;
const telaExploracao = document.getElementById('tela-exploracao') as HTMLDivElement;
const telaCombate = document.getElementById('tela-combate') as HTMLDivElement;

// Entradas de Login
const inputNomeJogador = document.getElementById('inputNomeJogador') as HTMLInputElement;
const inputSenhaJogador = document.getElementById('inputSenhaJogador') as HTMLInputElement;
const mensagemLogin = document.getElementById('mensagemLogin') as HTMLParagraphElement;

// Coluna Esquerda (Exploração e Combate)
const planetaNome = document.getElementById('planeta-nome') as HTMLHeadingElement;
const planetaRecursosLista = document.getElementById('planeta-recursos-lista') as HTMLUListElement;
const biomaNome = document.getElementById('bioma-nome') as HTMLHeadingElement;
const biomaRecursosLista = document.getElementById('bioma-recursos-lista') as HTMLUListElement;
const inimigoNome = document.getElementById('inimigo-nome') as HTMLHeadingElement;
const inimigoVida = document.getElementById('inimigo-vida') as HTMLHeadingElement;
const inimigoEscudo = document.getElementById('inimigo-escudo') as HTMLHeadingElement;
const inimigoPoder = document.getElementById('inimigo-poder') as HTMLHeadingElement;

// Coluna Meio (Logs)
const saidaExploracao = document.getElementById('saida-exploracao') as HTMLPreElement;
const saidaCombate = document.getElementById('saida-combate') as HTMLPreElement;

// Coluna Direita (Jogador - ambas as telas)
const nomePersonagem = document.getElementById('nomePersonagem') as HTMLHeadingElement;
const vidaPersonagem = document.getElementById('vidaPersonagem') as HTMLHeadingElement;
const escudoPersonagem = document.getElementById('escudoPersonagem') as HTMLHeadingElement;
const inventarioLista = document.getElementById('inventario-lista') as HTMLUListElement;
const nomePersonagemCombate = document.getElementById('nomePersonagem-combate') as HTMLHeadingElement;
const vidaPersonagemCombate = document.getElementById('vidaPersonagem-combate') as HTMLHeadingElement;
const escudoPersonagemCombate = document.getElementById('escudoPersonagem-combate') as HTMLHeadingElement;
const inventarioListaCombate = document.getElementById('inventario-lista-combate') as HTMLUListElement;


// --- FUNÇÕES DE RENDERIZAÇÃO E GERENCIAMENTO DE TELA ---

function renderizarLista(elementoUL: HTMLElement, itens: string[]) {
    elementoUL.innerHTML = ''; // Limpa a lista
    if (itens.length === 0) {
        elementoUL.innerHTML = '<li>Vazio</li>';
        return;
    }
    itens.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        elementoUL.appendChild(li);
    });
}

function renderizarTudo(gameMaster: GameMaster | null) {
    // Jogador
    const dadosJogador = Acoes.getUIDadosJogador(gameMaster);
    nomePersonagem.textContent = dadosJogador.nome;
    vidaPersonagem.textContent = dadosJogador.vida;
    escudoPersonagem.textContent = dadosJogador.escudo;
    renderizarLista(inventarioLista, dadosJogador.inventario);
    // Sincroniza painel de combate
    nomePersonagemCombate.textContent = dadosJogador.nome;
    vidaPersonagemCombate.textContent = dadosJogador.vida;
    escudoPersonagemCombate.textContent = dadosJogador.escudo;
    renderizarLista(inventarioListaCombate, dadosJogador.inventario);

    // Planeta/Bioma
    const dadosPlaneta = Acoes.getUIDadosPlaneta(gameMaster);
    planetaNome.textContent = dadosPlaneta.nomePlaneta;
    renderizarLista(planetaRecursosLista, dadosPlaneta.recursosPlaneta);
    biomaNome.textContent = dadosPlaneta.nomeBioma;
    renderizarLista(biomaRecursosLista, dadosPlaneta.recursosBioma);

    // Inimigo
    const dadosInimigo = Acoes.getUIDadosInimigo(gameMaster);
    inimigoNome.textContent = dadosInimigo.nome;
    inimigoVida.textContent = dadosInimigo.vida;
    inimigoEscudo.textContent = dadosInimigo.escudo;
    inimigoPoder.textContent = dadosInimigo.poder;
}

function gerenciarTelas(gameMaster: GameMaster | null) {
    const estado = gameMaster?.getEstado() ?? 'explorando'; // Default para exploração
    telaCadastro.classList.add('hidden');
    telaExploracao.classList.add('hidden');
    telaCombate.classList.add('hidden');

    switch (estado) {
        case 'combate':
            telaCombate.classList.remove('hidden');
            break;
        case 'explorando':
        default:
            telaExploracao.classList.remove('hidden');
            break;
    }
}


// --- FUNÇÃO PRINCIPAL ---
async function main() {
    let gameMaster: GameMaster | null = null;

    // --- BOTÕES ---
    const botaoIniciar = document.getElementById('iniciarJogo') as HTMLButtonElement;
    const botaoSalvar = document.getElementById('botao-salvar') as HTMLButtonElement;
    const botaoSalvarESair = document.getElementById('botao-salvar-e-sair') as HTMLButtonElement;
    const botaoLeste = document.getElementById('irLeste') as HTMLButtonElement;
    const botaoOeste = document.getElementById('irOeste') as HTMLButtonElement;
    const botaoMinerar = document.getElementById('minerar') as HTMLButtonElement;
    const botaoAtacar = document.getElementById('botao-atacar') as HTMLButtonElement;
    const botaoFugir = document.getElementById('botao-fugir') as HTMLButtonElement;
    const botaoRecuperar = document.getElementById('botao-recuperar') as HTMLButtonElement;

    // --- FUNÇÃO DE SALVAMENTO REUTILIZÁVEL ---
    async function executarSalvamento() {
        if (!gameMaster) {
            saidaExploracao.textContent += 'Não há jogo para salvar.\n';
            throw new Error("Jogo não iniciado.");
        }
        const nome = inputNomeJogador.value.trim();
        const senha = inputSenhaJogador.value;

        saidaExploracao.textContent += 'Salvando jogo...\n';
        try {
            await salvarJogo(nome, senha, gameMaster.salvarObjeto());
            saidaExploracao.textContent += 'Jogo salvo com sucesso!\n';
        } catch (error) {
            saidaExploracao.textContent += `Erro ao salvar o jogo: ${error}\n`;
            throw error;
        }
    }

    // --- EVENT LISTENERS ---
    
    botaoIniciar.addEventListener('click', async () => {
        const nome = inputNomeJogador.value.trim();
        const senha = inputSenhaJogador.value;
        if (!nome || !senha) {
            mensagemLogin.textContent = 'Nome e senha são obrigatórios.';
            return;
        }
        
        const logAtual = gameMaster?.getEstado() === 'combate' ? saidaCombate : saidaExploracao;
        logAtual.textContent = `Bem-vindo, ${nome}!\nTentando carregar o jogo...\n`;

        try {
            const dados = await carregarJogo(nome, senha);
            gameMaster = GameMaster.carregarObjeto(dados);
            logAtual.textContent += 'Jogo carregado com sucesso!\n';
        } catch (error) {
            const msgErro = (error instanceof Error) ? error.message : String(error);
            logAtual.textContent += `Falha ao carregar: ${msgErro}\nCriando um novo jogo...\n`;
            gameMaster = GameMaster.criarNovoObjeto(nome, Tamanho.Pequeno);
            logAtual.textContent += 'Novo Jogo Criado com Sucesso!\n';
        } finally {
            renderizarTudo(gameMaster);
            gerenciarTelas(gameMaster);
        }
    });

    botaoLeste.addEventListener('click', () => {
        const msgEncontro = Acoes.mover(gameMaster, saidaExploracao, 'Leste');
        if (msgEncontro) {
            saidaCombate.textContent = msgEncontro + '\n';
        }
        renderizarTudo(gameMaster);
        gerenciarTelas(gameMaster);
    });

    botaoOeste.addEventListener('click', () => {
        const msgEncontro = Acoes.mover(gameMaster, saidaExploracao, 'Oeste');
        if (msgEncontro) {
            saidaCombate.textContent = msgEncontro + '\n';
        }
        renderizarTudo(gameMaster);
        gerenciarTelas(gameMaster);
    });
    
    botaoMinerar.addEventListener('click', () => {
        Acoes.minerar(gameMaster, saidaExploracao);
        renderizarTudo(gameMaster);
    });

    botaoSalvar.addEventListener('click', () => {
        executarSalvamento().catch(() => {}); // O erro já é logado na função
    });

    botaoSalvarESair.addEventListener('click', async () => {
        try {
            await executarSalvamento();
            saidaExploracao.textContent += 'Saindo para o menu principal...';
            window.location.reload();
        } catch (error) {
            saidaExploracao.textContent += 'O salvamento falhou. Não foi possível sair.\n';
        }
    });

    // --- LISTENERS DE COMBATE ---
    botaoAtacar.addEventListener('click', () => {
        Acoes.atacar(gameMaster, saidaCombate);
        renderizarTudo(gameMaster);
        gerenciarTelas(gameMaster);
    });

    botaoFugir.addEventListener('click', () => {
        Acoes.fugir(gameMaster, saidaCombate);
        renderizarTudo(gameMaster);
        gerenciarTelas(gameMaster);
    });

    botaoRecuperar.addEventListener('click', () => {
        Acoes.recuperarEscudo(gameMaster, saidaCombate);
        renderizarTudo(gameMaster);
        // Não chama gerenciarTelas pois a ação não encerra o combate
    });
}

window.addEventListener('load', main);