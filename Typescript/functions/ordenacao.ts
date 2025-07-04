export function merge<T>(esquerda: T[], direita: T[], funcaoDeComparacao: (a: T, b: T) => number): T[]{
    let resultado: T[] = [];
    let i: number = 0;
    let j: number = 0;
    while (i < esquerda.length && j < direita.length) {
        const comparacao = funcaoDeComparacao(esquerda[i], direita[j]);
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

export function mergeSort<T>(lista: T[], funcaoDeComparacao: (a: T, b: T) => number): T[] {
    if (lista.length < 2) {
        return lista;
    };
    const meio: number = Math.floor(lista.length / 2);
    const esquerda: T[] = lista.slice(0, meio);
    const direita: T[] = lista.slice(meio, lista.length);
    return merge(mergeSort(esquerda, funcaoDeComparacao), mergeSort(direita, funcaoDeComparacao), funcaoDeComparacao);
}