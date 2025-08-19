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
}

export interface dataInventario {
    slots: [Item, number][];
    capacidadeMaxima: number;
    capacidadeAtual: number;
}

export interface dataJogador {
    readonly nome: string;
    vida: number;
    readonly vidaMaxima: number;
    escudo: number;
    readonly escudoMaximo: number;
    historico: string[];
    inventario: dataInventario;
    moedas: number;
}

export interface dataGameMaster {
    jogador: dataJogador;
    planeta: string;
}