import { GameMaster } from "./classes/gameMaster.ts";
import { Tamanho } from "./contract/enums.ts";
import { atualizarUI, inventario, irPara, minerar } from "./functions/acoes_html.ts";
import { carregarJogo, salvarJogo } from "./functions/chamados.ts";

const tamanhoPlaneta = 0 as Tamanho;

const nome = document.getElementById('nomePersonagem') as HTMLHeadingElement;
const vida = document.getElementById('vidaPersonagem') as HTMLHeadingElement;
const escudo = document.getElementById('escudoPersonagem') as HTMLHeadingElement;
const posicao = document.getElementById('posicao') as HTMLHeadingElement;
const recursos = document.getElementById('recursos') as HTMLHeadingElement;

function renderizarUI(gameMaster: GameMaster | null) {
    const ui = atualizarUI(gameMaster);
    nome.textContent = ui.nome;
    vida.textContent = ui.vida;
    escudo.textContent = ui.escudo;
    posicao.textContent = ui.posicao;
    recursos.textContent = ui.recursos;
}

async function main() {
    let gameMaster: GameMaster | null = null;
    const saida = document.getElementById('saida') as HTMLPreElement;
    const nomeJogador = (document.getElementById('inputNomeJogador') as HTMLInputElement);
    const senhaJogador = (document.getElementById('inputSenhaJogador') as HTMLInputElement);
    const botaoLeste = document.getElementById('irLeste') as HTMLButtonElement;
    const botaoOeste = document.getElementById('irOeste') as HTMLButtonElement;
    const botaoMinerar = document.getElementById('minerar') as HTMLButtonElement;
    const botaoInventario = document.getElementById('mostrarInventario') as HTMLButtonElement;
    const botaoSalvar = document.getElementById('salvar') as HTMLButtonElement;
    const botaoCarregar = document.getElementById('carregar') as HTMLButtonElement;
    const botaoNovoJogo = document.getElementById('novoJogo') as HTMLButtonElement;
    const botaoIniciar = document.getElementById('iniciarJogo') as HTMLButtonElement;
    const loginScreen = document.getElementById('login-screen') as HTMLDivElement;
    const gameContainer = document.getElementById('game-container') as HTMLDivElement;

    botaoIniciar.addEventListener('click', async () => {
        const nome = nomeJogador.value.trim();
        const senha = senhaJogador.value;

        if (!nome || !senha) {
            document.getElementById('mensagemLogin')!.textContent = 'Por favor, insira um nome de jogador e uma senha.\n';
            return;
        }

        loginScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        saida.textContent = `Bem-vindo, ${nome}!\nTentando carregar o jogo...\n`;

        try {
            const dados = await carregarJogo(nome, senha);
            gameMaster = GameMaster.carregarObjeto(dados);
            saida.textContent += 'Jogo carregado com sucesso!\n';
        } catch (error) {
            const mensagemErro = (error instanceof Error) ? error.message : String(error);
            saida.textContent += `Erro ao carregar o jogo: ${mensagemErro}\nCriando um novo jogo...\n`;
            gameMaster = GameMaster.criarNovoObjeto(nome, tamanhoPlaneta);
            saida.textContent += 'Jogo criado com sucesso!\n';
        } finally {
            renderizarUI(gameMaster);
        }
    })
    
    botaoSalvar.addEventListener('click', () => {
        if (!gameMaster) {
            saida.textContent += 'Nao ha jogo para salvar.\n';
            return;
        }
        const nome = nomeJogador.value.trim();
        const senha = senhaJogador.value;

        if (!nome || !senha) {
            saida.textContent += 'Por favor, insira um nome de jogador e uma senha.\n';
            return;
        };

        saida.textContent += 'Salvando jogo...\n';
        salvarJogo(nome, senha, gameMaster.salvarObjeto()).then(() => {
            saida.textContent += 'Jogo salvo com sucesso!\n';
        }).catch(error => {
            saida.textContent += `Erro ao salvar o jogo: ${error}\n`;
        })
    });
    
    botaoLeste.addEventListener('click', () => {
        if (irPara(gameMaster, saida, 'Leste')) {
            renderizarUI(gameMaster);
        };
    });

    botaoOeste.addEventListener('click', () => {
        if (irPara(gameMaster, saida, 'Oeste')) {
            renderizarUI(gameMaster);
        };
    });

    botaoMinerar.addEventListener('click', () => {
        if (minerar(gameMaster, saida)) {
            renderizarUI(gameMaster);
        }
    });

    botaoInventario.addEventListener('click', () => inventario(gameMaster, saida));
}

window.addEventListener('load', main);
