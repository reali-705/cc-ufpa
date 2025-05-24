export function getRandomInt(max: number, min: number = 0): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function gerarTamanho(): string {
    let tamanho: number = getRandomInt(2);
    let tamanhos: string[] = ['pequeno', 'medio', 'grande'];
    return tamanhos[tamanho];
}