import { Elemento, Raridade, TipoBioma, TipoPlaneta } from "./enums.ts";
import { dataJogador, Item } from "./interfaces.ts";

export const ELEMENTOS: { [key in Elemento]: Item[] } = {
    [Elemento.Minerais]: [
        { id: "1", nome: "Minério de Ferro", raridade: Raridade.Comum, tamanho: 1 },
        { id: "2", nome: "Minério de Cobre", raridade: Raridade.Comum, tamanho: 1 },
        { id: "3", nome: "Titânio", raridade: Raridade.Incomum, tamanho: 2 },
        { id: "4", nome: "Nióbio", raridade: Raridade.MuitoRaro, tamanho: 2 }
    ],
    [Elemento.Gases]: [
        { id: "5", nome: "Gás Hidrogênio", raridade: Raridade.Comum, tamanho: 1 },
        { id: "6", nome: "Gás Oxigênio", raridade: Raridade.Incomum, tamanho: 1 },
        { id: "7", nome: "Gás de Hélio", raridade: Raridade.Raro, tamanho: 2 },
        { id: "8", nome: "Gás Radônio", raridade: Raridade.MuitoRaro, tamanho: 1 }
    ],
    [Elemento.Organicos]: [
        { id: "9", nome: "Folha de Alga", raridade: Raridade.Incomum, tamanho: 1 },
        { id: "10", nome: "Resina Estelar", raridade: Raridade.Incomum, tamanho: 2 },
        { id: "11", nome: "Planta Luminosa", raridade: Raridade.Raro, tamanho: 1 }
    ],
    [Elemento.Cristais]: [
        { id: "12", nome: "Cristal de Quartzo", raridade: Raridade.Comum, tamanho: 1 },
        { id: "13", nome: "Célula de Vácuo", raridade: Raridade.Raro, tamanho: 2 },
        { id: "14", nome: "Fragmento de Estrela", raridade: Raridade.MuitoRaro, tamanho: 3 }
    ],
    [Elemento.Liquidos]: [
        { id: "15", nome: "Água Purificada", raridade: Raridade.Comum, tamanho: 1 },
        { id: "16", nome: "Óleo Bruto", raridade: Raridade.MuitoRaro, tamanho: 2 },
        { id: "17", nome: "Lágrimas de Titã", raridade: Raridade.Lendario, tamanho: 3 }
    ]
}

export const BIOMAS_ELEMENTOS: { [key in TipoBioma]: Elemento[] } = {
    [TipoBioma.Floresta]: [
        Elemento.Minerais,
        Elemento.Gases,
        Elemento.Organicos,
        Elemento.Liquidos
    ],
    [TipoBioma.Deserto]: [
        Elemento.Minerais,
        Elemento.Gases,
        Elemento.Cristais
    ],
    [TipoBioma.Gelido]: [
        Elemento.Minerais,
        Elemento.Liquidos,
        Elemento.Cristais
    ],
    [TipoBioma.Pantano]: [
        Elemento.Gases,
        Elemento.Organicos,
        Elemento.Liquidos
    ],
    [TipoBioma.Planicie]: [
        Elemento.Minerais,
        Elemento.Gases,
        Elemento.Organicos,
        Elemento.Cristais
    ]
}

export const PLANETAS_BIOMAS: { [key in TipoPlaneta]: TipoBioma[] } = {
    [TipoPlaneta.Terrestre]: [
        TipoBioma.Floresta,
        TipoBioma.Deserto,
        TipoBioma.Pantano,
        TipoBioma.Planicie
    ],
    [TipoPlaneta.Aquatico]: [
        TipoBioma.Pantano,
        TipoBioma.Planicie
    ],
    [TipoPlaneta.Gasoso]: [
        TipoBioma.Deserto,
        TipoBioma.Gelido
    ],
    [TipoPlaneta.Rochoso]: [
        TipoBioma.Deserto,
        TipoBioma.Gelido,
        TipoBioma.Planicie
    ],
    [TipoPlaneta.Congelado]: [
        TipoBioma.Floresta,
        TipoBioma.Gelido,
        TipoBioma.Planicie
    ]
}