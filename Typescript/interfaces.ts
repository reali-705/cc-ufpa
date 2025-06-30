import { Elementos, TipoAreas } from "./enums.ts";

export interface Materiais {
    [key: string]: number;
}
export interface Areas {
    id: string,
    tipo: TipoAreas,
    porcentagemElementos: { [key in Elementos]?: number };
}