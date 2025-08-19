import * as http from 'http';
import * as url from 'url';
import * as fs from 'fs/promises';
import * as path from 'path';

const MIME_TYPES: { [key: string]: string } = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.ico': 'image/x-icon',
};
const __diretorio = path.dirname(url.fileURLToPath(import.meta.url));
const PORTA = 3000;

const servidor = http.createServer(async (requisicao, resposta) => {
    const urlParseada = url.parse(requisicao.url!, true);
    const caminho = urlParseada.pathname === '/' ? '/index.html' : urlParseada.pathname!;

    resposta.setHeader('Content-Type', 'application/json');

    if (caminho === '/carregar' && requisicao.method === 'GET') {
        try {
            const arquivo = urlParseada.query.arquivo as string;

            if (!arquivo) {
                resposta.writeHead(400);
                return resposta.end(JSON.stringify({ mensagem: "Nome do arquivo ausente." }));
            }

            const arquivoSeguro = path.join(__diretorio, '..', '..', 'Jsons', path.basename(arquivo));
            const dadosSalvos = await fs.readFile(arquivoSeguro, 'utf8');
            
            resposta.writeHead(200);
            return resposta.end(dadosSalvos);
        } catch (error) {
            if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'ENOENT') {
                resposta.writeHead(404);
                return resposta.end(JSON.stringify({ mensagem: "Nenhum arquivo de salvamento encontrado." }));
            }
            console.error("Erro ao carregar o jogo:", error);
            resposta.writeHead(500);
            return resposta.end(JSON.stringify({ mensagem: "Erro interno do servidor." }));
        }
    } else if (caminho === '/salvar' && requisicao.method === 'POST') {
        try {
            let corpoDados = '';

            requisicao.on('data', (pedaco) => {
                corpoDados += pedaco;
            });

            await new Promise<void>((resolve, reject) => {
                requisicao.on('end', async () => {
                    try {
                        const { arquivo, dados } = JSON.parse(corpoDados);

                        if (!arquivo) {
                            resposta.writeHead(400);
                            resposta.end(JSON.stringify({ mensagem: "Nome do arquivo ausente." }));
                            return resolve();
                        }
                        if (!dados) {
                            resposta.writeHead(400);
                            resposta.end(JSON.stringify({ mensagem: "Dados do jogo ausente." }));
                            return resolve();
                        }

                        const arquivoSeguro = path.join(__diretorio, '..', '..', 'Jsons', path.basename(arquivo));

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

servidor.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
