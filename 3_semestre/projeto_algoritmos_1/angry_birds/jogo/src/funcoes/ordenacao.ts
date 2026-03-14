import { Tamanho, ordemTamanho } from "../classes/enums.js";
import { Personagem } from "../classes/personagem.js";

// algoritmo de ordenação
export function merge<T>(esquerda: T[], direita: T[], comparador: (a: T, b: T) => number): T[]{
    let resultado: T[] = [];
    let i: number = 0;
    let j: number = 0;
    while (i < esquerda.length && j < direita.length) {
        const comparacao = comparador(esquerda[i], direita[j]);
        if (comparacao < 0) {
            resultado.push(esquerda[i]);
            i++;
        } else {
            resultado.push(direita[j]);
            j++;
        }
    }
    while (i < esquerda.length) {
        resultado.push(esquerda[i]);
        i++;
    }
    while (j < direita.length) {
        resultado.push(direita[j]);
        j++;
    }
    return resultado;
}

export function mergeSort<T>(lista: T[], comparador: (a: T, b: T) => number): T[] {
    if (lista.length < 2) {
        return lista;
    };
    const meio: number = Math.floor(lista.length / 2);
    const esquerda: T[] = lista.slice(0, meio);
    const direita: T[] = lista.slice(meio, lista.length);
    return merge(mergeSort(esquerda, comparador), mergeSort(direita, comparador), comparador);
}

// funcao auxilizar de comparacao
export function compararTamanho(personagem1: Personagem, personagem2: Personagem): number {
    const tamanho1 = ordemTamanho[personagem1.tamanho];
    const tamanho2 = ordemTamanho[personagem2.tamanho];
    return tamanho1 - tamanho2;
}

// algoritmo de pesquisa
export function pesquisaBinaria<T, K>(
    lista: T[],
    elementoBuscado: K,
    comparador: (a: T, b: K) => number
): T | null {
    let inicio: number = 0;
    let fim: number = lista.length - 1;
    while (inicio <= fim) {
        const meio: number = Math.floor((inicio + fim) / 2);
        const elementoAtual: T = lista[meio];
        const comparacao = comparador(elementoAtual, elementoBuscado);
        if (comparacao < 0) {
            inicio = meio + 1;
        } else if (comparacao > 0) {
            fim = meio - 1;
        } else {
            return elementoAtual;
        }
    }
    return null;
}
// funcao auxiliar de pesquisa
export function buscarTamanho(personagem: Personagem, tamanho: Tamanho): number {
    const tamanhoPersonagem = ordemTamanho[personagem.tamanho];
    const tamanhoBuscado = ordemTamanho[tamanho];
    return tamanhoPersonagem - tamanhoBuscado;
}