# contract/
## interfaces.ts
```
import { Vetor } from "../components/array.ts";
import { Raridade, TamanhoUniverso } from "./enums.ts";

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

export interface dataUniverso {
    id: string;
    nome: string;
    tamanho: TamanhoUniverso;
    sistemas: Vetor<dataSistemaSolar>;
}

```

## enums.ts
```
export enum Raridade {
    Comum,
    Incomum,
    Raro,
    Epico,
    Lendario,
    Exotico,
}

export enum TipoBioma {
    FLORESTA,
    PLANÍCIE,
    MONTANHA,
    LAGO,
    MAR,
    DESERTO,
    TUNDRA,
    GELIDO,
    PANTANO,
    // ...
}

export enum TipoPlaneta {
    Rochoso,
    Gasoso,
    Aquatico,
    Florestal,
    Desertico,
    Gelado,
}

export enum TamanhoUniverso {
    Pequeno,
    Medio,
    Grande,
    Enorme,
}
```