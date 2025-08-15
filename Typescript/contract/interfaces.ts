import { Raridade, TamanhoUniverso } from "./enums.ts";

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

export interface dataSistemaSolar {
    readonly id: string;
    nome: string;
    planetas: dataPlaneta[];
}

export interface dataUniverso {
    readonly id: string;
    nome: string;
    tamanho: TamanhoUniverso;
    sistemas: dataSistemaSolar[];
}

export interface Posicao {
    sistemaID: string;
    planetaID: string | null;
    biomaID: string | null;
}

export interface dataInventario {
    slots: [Item, number][];
    capacidadeMaxima: number;
    capacidadeAtual: number;
}

export interface dataNave {
    readonly id: string;
    nome: string;
    posicao: Posicao;
}

export interface dataJogador {
    readonly id: string;
    nome: string;
    vida: number;
    vidaMaxima: number;
    escudo: number;
    escudoMaximo: number;
    historico: Posicao[];
    inventario: dataInventario;
    moedas: number;
}

export interface dataGameMaster {
    jogador: dataJogador;
    universo: dataUniverso;
    naves: dataNave[];
}