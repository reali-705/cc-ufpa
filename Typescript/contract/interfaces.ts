import { Item } from "../classes/item.ts";

export interface IDClass {
    id: string;
    nome: string;
    salvarObjeto(): any;
    print(): void;
}

export interface Itens {
    item: Item;
    quantidade: number;
}

interface dataItens {
    item: dataItem;
    quantidade: number;
}

export interface dataItem {
    id: string;
    nome: string;
    tamanho: number;
    raridade: string;
}

export interface dataAreaExploravel {
    id: string;
    nome: string;
    recursos: dataItem[];
    explorada: boolean;
}

export interface dataPlaneta {
    id: string;
    nome: string;
    explorado: boolean;
    areas: dataAreaExploravel[];
}

export interface dataSistemaSolar {
    id: string;
    nome: string;
    planetas: dataPlaneta[];
    explorado: boolean;
}

export interface dataInventario {
    maxItensPorPilha: number;
    maxPilhas: number;
    itens: dataItens[];
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
    naves: dataNave[];
}
