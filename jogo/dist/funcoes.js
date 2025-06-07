var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function enumAleatorio(enumObj) {
    const chaves = Object.keys(enumObj).filter(chave => isNaN(Number(chave)));
    if (chaves.length === 0) {
        throw new Error("Objeto não possui chaves válidadas");
    }
    const chaveAleatoria = chaves[Math.floor(Math.random() * chaves.length)];
    return enumObj[chaveAleatoria];
}
export function getRandomInt(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function CarregarNiveis() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('niveis.json');
            if (!response.ok) {
                throw new Error('Erro ao carregar os niveis');
            }
            const niveis = yield response.json();
            return niveis;
        }
        catch (error) {
            console.error('Erro ao carregar os niveis:', error);
            return [];
        }
    });
}
