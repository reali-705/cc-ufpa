import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs/promises';
import * as path from 'path';
import { TabelaHashEncadeamentoSeparado } from '../components/hashTable.ts';

const MIME_TYPES: { [key: string]: string } = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.ico': 'image/x-icon',
};
const PORTA = 3000;
const __diretorio = path.dirname(url.fileURLToPath(import.meta.url));
const __diretorioJson = path.join(__diretorio, '..', '..', 'Jsons');

const nomeRegistro = '_registro.json';
const registro = new TabelaHashEncadeamentoSeparado<string, string>();

async function carregarRegistro(): Promise<void> {
    try {
        const dados = await fs.readFile(path.join(__diretorioJson, nomeRegistro), 'utf8');
        const pares: [string, string][] = JSON.parse(dados);
        pares.forEach(([chave, valor]) => {
            registro.inserir(chave, valor);
        });
    } catch (error) {
        console.error('Erro ao carregar o registro:', error);
    }
}

async function salvarRegistro(): Promise<void> {
    try {
        const pares: [string, string][] = [];
        const tabela = registro.getTabela();
        for (const hash in tabela) {
            let current = tabela[hash].getHead();
            while (current !== null) {
                pares.push([current.data.chave, current.data.valor]);
                current = current.next;
            }
        }
        await fs.writeFile(path.join(__diretorioJson, nomeRegistro), JSON.stringify(pares, null, 4));
    } catch (error) {
        if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
            console.log('INFO: Nenhum arquivo de registro encontrado. Um novo será criado no primeiro save.');
        } else {
            console.error('Ocorreu um erro inesperado ao carregar o registro:', error);
        }
    }
}

const servidor = http.createServer(async (requisicao, resposta) => {
    const urlParseada = url.parse(requisicao.url!, true);
    const caminho = urlParseada.pathname === '/' ? '/index.html' : urlParseada.pathname!;

    resposta.setHeader('Content-Type', 'application/json');

    if (caminho === '/carregar' && requisicao.method === 'GET') {
        try {
            const { nome, senha } = urlParseada.query;

            if (!nome || !senha) {
                resposta.writeHead(400);
                return resposta.end(JSON.stringify({ mensagem: "Nome ou senha ausentes." }));
            }

            const chave = `${nome}:${senha}`;
            const nomeArquivo = registro.buscar(chave);

            if (!nomeArquivo) {
                resposta.writeHead(404);
                return resposta.end(JSON.stringify({ mensagem: "Nenhum arquivo de salvamento encontrado." }));
            }

            const arquivoSeguro = path.join(__diretorioJson, path.basename(nomeArquivo));
            const dadosSalvos = await fs.readFile(arquivoSeguro, 'utf8');
            
            resposta.writeHead(200, { 'Content-Type': 'application/json' });
            return resposta.end(dadosSalvos);
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT') {
                resposta.writeHead(404);
                return resposta.end(JSON.stringify({ mensagem: "Nenhum arquivo de salvamento encontrado. Mas há registro." }));
            }
            console.error("Erro ao carregar o jogo:", error);
            resposta.writeHead(500);
            return resposta.end(JSON.stringify({ mensagem: "Erro interno do servidor." }));
        }
    } else if (caminho === '/salvar' && requisicao.method === 'POST') {
        try {
            let corpoDados = '';
            requisicao.on('data', (pedaco) => { corpoDados += pedaco });

            await new Promise<void>((resolve, reject) => {
                requisicao.on('end', async () => {
                    try {
                        const { nome, senha, dados } = JSON.parse(corpoDados);

                        if (!nome || !senha || !dados) {
                            resposta.writeHead(400);
                            resposta.end(JSON.stringify({ mensagem: "Dados de nome, senha ou jogo ausentes." }));
                            return resolve();
                        }

                        const chave = `${nome}:${senha}`;
                        let nomeArquivo = registro.buscar(chave);
                        if (!nomeArquivo) {
                            nomeArquivo = `${Date.now()}-${nome.toLowerCase().replace(/[^a-z0-9]/g, '')}.json`;
                            registro.inserir(chave, nomeArquivo);
                            await salvarRegistro();
                        }

                        const arquivoSeguro = path.join(__diretorioJson, path.basename(nomeArquivo));
                        await fs.writeFile(arquivoSeguro, JSON.stringify(dados, null, 4));
                        
                        resposta.writeHead(200);
                        resposta.end(JSON.stringify({ mensagem: "Jogo salvo com sucesso!" }));
                        resolve();
                    } catch (error) {
                        reject(error);
                    }
                });
                requisicao.on('error', (e) => reject(e));
            });
        } catch (error) {
            console.error("Erro ao salvar o jogo:", error);
            resposta.writeHead(500);
            resposta.end(JSON.stringify({ mensagem: "Erro interno do servidor." }));
        }
    } else if (requisicao.method === 'GET') {
      try {
        const caminhoArquivo = path.join(__diretorio, '..', '..', caminho);
        const status = await fs.stat(caminhoArquivo);
        if (!status.isFile()) {
          resposta.writeHead(404);
          return resposta.end(JSON.stringify({ mensagem: "Arquivo não encontrado." }));
        }
        
        const conteudo = await fs.readFile(caminhoArquivo);
        const conteudoTipo = MIME_TYPES[path.extname(caminhoArquivo)] || 'application/octet-stream';

        resposta.writeHead(200, { 'Content-Type': conteudoTipo });
        return resposta.end(conteudo);
      } catch (error) {
        if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT') {
            resposta.writeHead(404);
            return resposta.end(JSON.stringify({ mensagem: "Arquivo não encontrado." }));
        }
        console.error("Erro ao carregar o arquivo:", error);
        resposta.writeHead(500);
        return resposta.end(JSON.stringify({ mensagem: "Erro interno do servidor." }));
      }
    } else {
        resposta.writeHead(404);
        resposta.end(JSON.stringify({ mensagem: "Rota não encontrada." }));
    }
});

carregarRegistro().then(() => {
    servidor.listen(PORTA, () => {
        console.log(`Servidor rodando em http://localhost:${PORTA}`);
    });
});