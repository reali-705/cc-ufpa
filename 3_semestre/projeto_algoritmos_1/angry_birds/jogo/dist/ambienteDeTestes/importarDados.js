import * as fs from "fs";
import * as path from "path";
export function importarDados(arquivo) {
    try {
        const fullPath = path.join("./jogo/dist/ambienteDeTestes", arquivo);
        const data = fs.readFileSync(fullPath, "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Ocorreu um erro ao ler o arquivo ${arquivo}: ${error.message}`);
            if (error.code === "ENOENT") {
                console.error(`O arquivo ${arquivo} nao foi encontrado.`);
            }
        }
        else {
            console.error(`Erro desconhecido ao carregar o arquivo ${arquivo}: ${error}`);
        }
        return null;
    }
}
