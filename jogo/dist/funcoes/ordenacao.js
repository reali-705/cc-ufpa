import { ordemTamanho } from "../classes/enums.js";
// algoritmo de ordenação
export function merge(esquerda, direita, comparador) {
    let resultado = [];
    let i = 0;
    let j = 0;
    while (i < esquerda.length && j < direita.length) {
        const comparacao = comparador(esquerda[i], direita[j]);
        if (comparacao < 0) {
            resultado.push(esquerda[i]);
            i++;
        }
        else {
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
export function mergeSort(lista, comparador) {
    if (lista.length < 2) {
        return lista;
    }
    ;
    const meio = Math.floor(lista.length / 2);
    const esquerda = lista.slice(0, meio);
    const direita = lista.slice(meio, lista.length);
    return merge(mergeSort(esquerda, comparador), mergeSort(direita, comparador), comparador);
}
// funcao auxilizar de comparacao
export function compararTamanho(personagem1, personagem2) {
    const tamanho1 = ordemTamanho[personagem1.tamanho];
    const tamanho2 = ordemTamanho[personagem2.tamanho];
    return tamanho1 - tamanho2;
}
// algoritmo de pesquisa
export function pesquisaBinaria(lista, elementoBuscado, comparador) {
    let inicio = 0;
    let fim = lista.length - 1;
    while (inicio <= fim) {
        const meio = Math.floor((inicio + fim) / 2);
        const elementoAtual = lista[meio];
        const comparacao = comparador(elementoAtual, elementoBuscado);
        if (comparacao < 0) {
            inicio = meio + 1;
        }
        else if (comparacao > 0) {
            fim = meio - 1;
        }
        else {
            return elementoAtual;
        }
    }
    return null;
}
// funcao auxiliar de pesquisa
export function buscarTamanho(personagem, tamanho) {
    const tamanhoPersonagem = ordemTamanho[personagem.tamanho];
    const tamanhoBuscado = ordemTamanho[tamanho];
    return tamanhoPersonagem - tamanhoBuscado;
}
