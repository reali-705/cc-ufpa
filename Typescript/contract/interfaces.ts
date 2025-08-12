import { Vetor } from "../components/array.ts";
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
    recursos: Vetor<Item>;
}

export interface dataPlaneta {
    readonly id: string;
    nome: string;
    biomas: Vetor<dataBioma>;
}

export interface dataSistemaSolar {
    readonly id: string;
    nome: string;
    planetas: Vetor<dataPlaneta>;
}

export interface dataUniverso {
    readonly id: string;
    nome: string;
    tamanho: TamanhoUniverso;
    sistemas: Vetor<dataSistemaSolar>;
}

export interface Posicao {
    sistemaID: string;
    planetaID: string | null;
    biomaID: string | null;
}

export interface dataInventario {
    slots: Map<Item, number>;
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
    posicao: Posicao;
    inventario: dataInventario;
    idNave: string | null;
    moedas: number;
}

export interface dataGameMaster {
    jogador: dataJogador;
    universo: dataUniverso;
    naves: Vetor<dataNave>;
}