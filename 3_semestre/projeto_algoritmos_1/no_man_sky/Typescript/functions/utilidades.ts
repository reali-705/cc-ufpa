export function sortearLista<T>(lista: T[]): T {
    return lista[Math.floor(Math.random() * lista.length)];
}

export function sortearEnum<T extends Record<string, any>>(enumeracao: T): T[keyof T] {
    return sortearLista(Object.values(enumeracao));
}

