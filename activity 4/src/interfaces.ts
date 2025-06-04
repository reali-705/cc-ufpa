import { Dificuldade } from "./classes/enums";

export interface LevelConfig {
    dificuldade: Dificuldade;
    porcos: number | null;
    passaros: number | null;
}

export interface Posicao {
    x: number;
    y: number;
}

export interface Pontuacao {
    Dificuldade.ALEATORIA: number[];
    Dificuldade.FACIL: number[];
    Dificuldade.MEDIO: number[];
    Dificuldade.DIFICIL: number[];
}