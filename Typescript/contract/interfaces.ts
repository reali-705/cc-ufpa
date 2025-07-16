import { Vetor } from "../components/array.ts";
import { Raridade } from "./enums.ts";

export interface IDClass {
    id: string;
    nome: string;
    salvarObjeto(): any;
    print(): void;
}

export interface dataItem {
    id: string;
    nome: string;
    tamanho: number;
    raridade: Raridade;
}

export interface dataBioma {
    id: string;
    nome: string;
    recursos: Vetor<dataItem>;
}

export interface dataPlaneta {
    id: string;
    nome: string;
    biomas: Vetor<dataBioma>;
}

export interface dataSistemaSolar {
    id: string;
    nome: string;
    planetas: Vetor<dataPlaneta>;
}

export interface dataInventario {
    maxItensPorPilha: number;
    maxPilhas: number;
    itens: Vetor<dataItens>;
}

export interface dataNave {
    id: string;
    nome: string;
    inventario: dataInventario;
    idSistema: string;
    idPlaneta: string;
    idArea: string;
}

export interface dataJogador {
    id: string;
    nome: string;
    inventario: dataInventario;
    idSistema: string;
    idPlaneta: string;
    idArea: string;
    idNave?: string;
}

export interface dataGameMaster {
    id: string;
    sistemaSolar: dataSistemaSolar;
    jogador: dataJogador;
    naves: Vetor<dataNave>;
}
