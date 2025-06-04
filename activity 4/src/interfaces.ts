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
    Dificuldade.Aleatorio
}