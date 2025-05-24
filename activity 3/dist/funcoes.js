export function getRandomInt(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function gerarTamanho() {
    let tamanho = getRandomInt(2);
    let tamanhos = ['pequeno', 'medio', 'grande'];
    return tamanhos[tamanho];
}
