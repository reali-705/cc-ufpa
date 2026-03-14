export enum Tamanho {
    PEQUENO = 'pequeno',
    MEDIO = 'medio',
    GRANDE = 'grande'
}

export const ordemTamanho: { [chave: string]: number } = {
    [Tamanho.PEQUENO]: 0,
    [Tamanho.MEDIO]: 1,
    [Tamanho.GRANDE]: 3,
};

export enum Dificuldade {
    FACIL = 'facil',
    MEDIO = 'medio',
    DIFICIL = 'dificil',
    ALEATORIA = 'aleatoria'
}