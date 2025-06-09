import { Dificuldade } from "./classes/enums";

export interface LevelConfig {
    dificuldade: Dificuldade;
    porcos: number | null;
    passaros: number | null;
    pontuacao: number[];
}

export interface Posicao {
    x: number;
    y: number;
}

export interface Pontuacoes {
    aleatoria: number[];
    facil: number[];
    medio: number[];
    dificil: number[];
}