import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __diretorio = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__diretorio, '..', '..')));

app.get('/carregar', async (requisicao, resposta) => {
  try {
    const arquivo = requisicao.query.arquivo as string;
    if (!arquivo) {
      return resposta.status(400).json({ mensagem: "Nome do arquivo ausente." });
    }
    const arquivoSeguro = path.join(__diretorio, '..', '..', 'Jsons', path.basename(arquivo));
    const dadosSalvos = await fs.readFile(arquivoSeguro, 'utf8');
    resposta.status(200).json(JSON.parse(dadosSalvos));
  } catch (error) {
    console.error("Erro ao carregar o jogo:", error);
    resposta.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});

app.post('/salvar', async (requisicao, resposta) => {
  try {
    const {arquivo, dados } = requisicao.body;
    if (!arquivo) {
      return resposta.status(400).json({ mensagem: "Nome do arquivo ausente." });
    }
    if (!dados) {
      return resposta.status(400).json({ mensagem: "Dados do jogo ausente." });
    }
    const arquivoSeguro = path.join(__diretorio, '..', '..', 'Jsons', path.basename(arquivo));
    await fs.writeFile(arquivoSeguro, JSON.stringify(dados, null, 4));
    resposta.status(200).json({ mensagem: "Jogo salvo com sucesso!" });
  } catch (error) {
      console.error("Erro ao salvar o jogo:", error);
      resposta.status(500).json({ mensagem: "Erro interno do servidor." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});