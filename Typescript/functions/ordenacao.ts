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

export function bubbleSort<T>(lista: T[], funcaoDeComparacao: (a: T, b: T) => number): T[] {
    for (let i = 0; i < lista.length; i++) {
        for (let j = 0; j < lista.length - 1 - i; j++) {
            if (funcaoDeComparacao(lista[j], lista[j + 1]) > 0) {
                const aux: T = lista[j];
                lista[j] = lista[j + 1];
                lista[j + 1] = aux;
            }
        }
    }
    return lista;
}

export function selectionSort<T>(lista: T[], funcaoDeComparacao: (a: T, b: T) => number): T[] {
    for (let i = 0; i < lista.length; i++) {
        let menor: number = i;
        for (let j = i + 1; j < lista.length; j++) {
            if (funcaoDeComparacao(lista[j], lista[menor]) < 0) {
                menor = j;
            }
        }
        const aux: T = lista[i];
        lista[i] = lista[menor];
        lista[menor] = aux;
    }
    return lista;
}

export function insertionSort<T>(lista: T[], funcaoDeComparacao: (a: T, b: T) => number): T[] {
    for (let i = 1; i < lista.length; i++) {
        let j: number = i;
        while (j > 0 && funcaoDeComparacao(lista[j], lista[j - 1]) < 0) {
            const aux: T = lista[j];
            lista[j] = lista[j - 1];
            lista[j - 1] = aux;
            j--;
        }
    }
    return lista;
}

export function quickSort<T>(lista: T[], funcaoDeComparacao: (a: T, b: T) => number): T[] {
    if (lista.length < 2) {
        return lista;
    }
    const pivo: T = lista[0];
    const menores: T[] = [];
    const maiores: T[] = [];
    for (let i = 1; i < lista.length; i++) {
        if (funcaoDeComparacao(lista[i], pivo) < 0) {
            menores.push(lista[i]);
        } else {
            maiores.push(lista[i]);
        }
    }
    return [...quickSort(menores, funcaoDeComparacao), pivo, ...quickSort(maiores, funcaoDeComparacao)];
}