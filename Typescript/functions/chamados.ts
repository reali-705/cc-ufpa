import { dataGameMaster } from "../contract/interfaces.ts";

const host = "http://localhost:3000/";

export async function carregarJogo(arquivo: string): Promise<dataGameMaster> {
    try {
        const resposta = await fetch(host + `carregar?arquivo=${encodeURIComponent(arquivo)}`);
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.mensagem);
        }
        const dados: dataGameMaster = await resposta.json();
        if (!dados || !dados.jogador || !dados.planeta) {
            throw new Error("Dados do jogo inválidos.");
        }
        return dados;
    } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        throw error;
    }
}

export async function salvarJogo(dados: dataGameMaster, arquivo: string): Promise<boolean> {
    try {
        const resposta = await fetch(host + "salvar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({arquivo: arquivo, dados: dados})
        });
        if (!resposta.ok) {
            const erro = await resposta.json();
            throw new Error(erro.mensagem);
        }
        return true;
    } catch (error) {
        console.error("Erro ao salvar os dados:", error);
        return false;
    }
}