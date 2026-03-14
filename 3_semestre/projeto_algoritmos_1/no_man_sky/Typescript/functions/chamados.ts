import { dataGameMaster } from "../contract/interfaces.ts";

const host = "http://localhost:3000/";

export async function carregarJogo(nome: string, senha: string): Promise<dataGameMaster> {
    try {
        const resposta = await fetch(host + `carregar?nome=${encodeURIComponent(nome)}&senha=${encodeURIComponent(senha)}`);
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.mensagem);
        }
        const dados: dataGameMaster = await resposta.json();
        if (!dados || !dados.jogador || !dados.planeta) {
            throw new Error("Dados do jogo recebidos estão inválidos.");
        }
        return dados;
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        throw error;
    }
}

export async function salvarJogo(nome: string, senha: string, dados: dataGameMaster): Promise<void> {
    try {
        const resposta = await fetch(host + "salvar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({nome, senha, dados})
        });
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.mensagem);
        }
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        throw error;
    }
}