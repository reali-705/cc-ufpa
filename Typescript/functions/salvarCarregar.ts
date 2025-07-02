import * as fs from 'fs';
import * as path from 'path';

// seção para leitura e escrita utilizando JSON ao rodar pelo NODE
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

// seção para leitura e escrita utilizando IndexedDB ao rodar pelo HTML/Navegador
const DB_NAME = "NoManSkyDB";
const DB_VERSION = 1;
const DB_STORE = "NoManSkyStore";
let bd: IDBDatabase | null = null;

function abrirBD(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        if (bd) {
            resolve(bd);
            return;
        }
        console.log(`Abrindo DB: ${DB_NAME}, versão: ${DB_VERSION}...`);
        const requisicao = indexedDB.open(DB_NAME, DB_VERSION);
        requisicao.onupgradeneeded = (evento) => {
            console.log("Evento onupgradeneeded disparado. Criando/atualizando object stores...");
            const bancoDados = (evento.target as IDBOpenDBRequest).result;
            if (!bancoDados.objectStoreNames.contains(DB_STORE)) {
                bancoDados.createObjectStore(DB_STORE, { keyPath: "id" });
                console.log(`Object store '${DB_STORE}' criado com sucesso!`);
            }
        };
        requisicao.onsuccess = (evento) => {
            bd = (evento.target as IDBOpenDBRequest).result;
            console.log("DB aberta com sucesso!");
            resolve(bd);
        };
        requisicao.onerror = (evento) => {
            console.error("Erro ao abrir o DB:", (evento.target as IDBOpenDBRequest).error, "\n");
            reject((evento.target as IDBOpenDBRequest).error);
        };
    });
}

export async function carregarBD(chave: string): Promise<any | null> {
    try {
        const bancoDados = await abrirBD();
        const transacao = bancoDados.transaction([DB_STORE], "readonly");
        const objectStore = transacao.objectStore(DB_STORE);
        console.log(`Carregando dados da chave ${chave} do object store '${DB_STORE}'...`);
        const requisicao = objectStore.get(chave);
        return new Promise((resolve, reject) => {
            requisicao.onsuccess = () => {
                const dados = requisicao.result;
                if (dados) {
                    console.log("Dados carregados com sucesso!");
                    resolve(dados);
                } else {
                    console.warn("Dados nao encontrados para a chave esspecificada.\n");
                    resolve(null);
                }
            };
            requisicao.onerror = () => {
                console.error("Erro ao carregar os dados:", requisicao.error, "\n");
                reject(requisicao.error);
            };
        });
    } catch (error) {
        console.error("Erro ao carregar os dados:", error, "\n");
        return null;
    }
}

export async function salvarBD(dados: any): Promise<boolean> {
    try {
        if (!dados || typeof dados.id === "undefined") {
            console.error("Erro: O objeto de dados nao possui uma chave 'id'.");
            return false;
        }
        const bancoDados = await abrirBD();
        const transacao = bancoDados.transaction([DB_STORE], "readwrite");
        const objectStore = transacao.objectStore(DB_STORE);
        console.log(`Salvando dados (ID: ${dados.id}) no object store '${DB_STORE}'...`);
        const requisicao = objectStore.put(dados);
        return new Promise((resolve, reject) => {
            requisicao.onsuccess = () => {
                console.log("Dados salvos com sucesso!\n");
                resolve(true);
            };
            requisicao.onerror = () => {
                console.error("Erro ao salvar os dados:", requisicao.error, "\n");
                reject(requisicao.error);
            };
            transacao.oncomplete = () => {
                console.log("Transação concluida com sucesso!");
            }
            transacao.onerror = () => {
                console.error("Transação de salvar dados falhou.", transacao.error, "\n");
            }
        });
    } catch (error) {
        console.error("Erro ao salvar os dados:", error, "\n");
        return false;
    }
}