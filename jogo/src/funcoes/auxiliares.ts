import { LevelConfig } from "../interfaces.js";

export function enumAleatorio<T extends object>(enumObj: T): T[keyof T] {
    const chaves = Object.keys(enumObj).filter(chave => isNaN(Number(chave)));
    if (chaves.length === 0) {
        throw new Error("Objeto não possui chaves válidadas");
    }
    const chaveAleatoria = chaves[Math.floor(Math.random() * chaves.length)];
    return enumObj[chaveAleatoria as keyof T];
}

export function getRandomInt(max: number, min: number = 0): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function carregarNiveis(): Promise<LevelConfig[]> {
    try {
        const response = await fetch('niveis.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar os niveis');
        }
        const niveis = await response.json();
        return niveis;
    } catch (error) {
        console.error('Erro ao carregar os niveis:', error);
        return [];
    }
}
