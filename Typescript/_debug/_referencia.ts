import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Variáveis 'globais' para um ambiente de Módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cria a aplicação Express
const app = express();
const PORT = 3000;

// Middleware para analisar o corpo das requisições POST em formato JSON
app.use(express.json()); 

// Rota para servir os arquivos estáticos do cliente.
// O __dirname aponta para o diretório do arquivo compilado (Javascript/server/).
// Usamos '..' para subir de nível e acessar a raiz do projeto (onde está o index.html).
app.use(express.static(path.join(__dirname, '..', '..')));
app.use(express.static(path.join(__dirname, '..')));

// Endpoint para SALVAR os dados do jogo (requisição POST)
app.post('/salvar', async (req, res) => {
    try {
        const dadosDoJogo = req.body;
        // Caminho para o arquivo JSON na pasta 'Jsons'
        const filePath = path.join(__dirname, '..', '..', 'Jsons', 'gameMaster_teste.json');
        
        // Escreve os dados no arquivo JSON
        await fs.writeFile(filePath, JSON.stringify(dadosDoJogo, null, 2));
        
        // Envia uma resposta de sucesso para o cliente
        res.status(200).json({ mensagem: "Jogo salvo com sucesso!" });
    } catch (error) {
        console.error("Erro ao salvar o jogo:", error);
        res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
});

// Endpoint para CARREGAR os dados do jogo (requisição GET)
app.get('/carregar', async (req, res) => {
    try {
        // Caminho para o arquivo JSON na pasta 'Jsons'
        const filePath = path.join(__dirname, '..', '..', 'Jsons', 'gameMaster_teste.json');
        
        // Lê os dados do arquivo
        const dadosSalvos = await fs.readFile(filePath, 'utf8');
        
        // Envia os dados como JSON para o cliente
        res.status(200).json(JSON.parse(dadosSalvos));
    } catch (error) {
        // Se o arquivo não for encontrado, envia uma mensagem de erro apropriada
        if (typeof error === 'object' && error !== null && 'code' in error) {
          if (error.code === 'ENOENT') {
              return res.status(404).json({ mensagem: "Nenhum arquivo de salvamento encontrado." });
          }
      }
        console.error("Erro ao carregar o jogo:", error);
        res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
});

// Inicia o servidor para "escutar" requisições na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});