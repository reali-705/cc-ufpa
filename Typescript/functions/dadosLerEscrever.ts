import * as fs from 'fs';
import * as path from 'path';

export function carregarDados(arquivo: string, caminho: string = "./Jsons/"): any | null {
    console.log(`\nCarregando dados do arquivo ${arquivo}...`);
    try {
        const dados = JSON.parse(fs.readFileSync(path.join(caminho, arquivo), 'utf-8'));
        console.log("Dados carregados com sucesso!\n");
        return dados;
    } catch (error) {
        console.error("Erro ao carregar os dados:", error, "\n");
        return null;
    }
}

export function salvarDados(dados: any, arquivo: string, caminho: string = "./Jsons/"): boolean {
    console.log(`\nSalvando dados no arquivo ${arquivo}...`);
    try {
        fs.writeFileSync(path.join(caminho, arquivo), JSON.stringify(dados, null, 2), "utf-8");
        console.log("Dados salvos com sucesso!\n");
        return true;
    } catch (error) {
        console.error("Erro ao salvar os dados:", error, "\n");
        return false;
    }
}