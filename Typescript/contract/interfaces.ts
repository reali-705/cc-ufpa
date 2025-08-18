import { Raridade } from "./enums.ts";

export interface IDClass {
    readonly id: string;
    nome: string;
    salvarObjeto(): any;
    print(): void;
}

export interface Item {
    readonly id: string;
    nome: string;
    tamanho: number;
    raridade: Raridade;
}

export interface dataBioma {
    readonly id: string;
    nome: string;
    recursos: Item[];
}

export interface dataPlaneta {
    readonly id: string;
    nome: string;
    biomas: dataBioma[];
}

export interface dataInventario {
    slots: [Item, number][];
    capacidadeMaxima: number;
    capacidadeAtual: number;
}

export interface dataNave {
    readonly id: string;
    nome: string;
    posicao: string;
}

export interface dataJogador {
    readonly id: string;
    nome: string;
    vida: number;
    vidaMaxima: number;
    escudo: number;
    escudoMaximo: number;
    historico: string[];
    inventario: dataInventario;
    moedas: number;
}

export interface dataGameMaster {
    jogador: dataJogador;
    planeta: dataPlaneta;
}