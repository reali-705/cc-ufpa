import { Raridade } from "./enums.ts";

export interface Item {
    id: string;
    nome: string;
    tamanho: number;
    raridade: Raridade;
}

export interface dataBioma {
    id: string;
    tipo: string;
    recursos: Item[];
}

export interface dataPlaneta {
    id: string;
    tipo: string;
    biomas: string[];
    inimigos: string[];
}

export interface dataInventario {
    slots: [Item, number][];
    capacidadeMaxima: number;
    capacidadeAtual: number;
}

export interface dataPersonagem {
    nome: string;
    vida: number | undefined;
    vidaMaxima: number;
    escudo: number | undefined;
    escudoMaximo: number;    
}

export interface dataJogador extends dataPersonagem {
    historico: string[];
    inventario: dataInventario;
    moedas: number;
}

export interface dataInimigo extends dataPersonagem {
    dano: number;
    resistencia: number;
}

export interface dataGameMaster {
    jogador: dataJogador;
    planeta: string;
}

export interface UI {
    nome: string;
    vida: string;
    escudo: string;
    posicao: string;
    recursos: string;
}