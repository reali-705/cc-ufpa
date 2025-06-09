export var Tamanho;
(function (Tamanho) {
    Tamanho["PEQUENO"] = "pequeno";
    Tamanho["MEDIO"] = "medio";
    Tamanho["GRANDE"] = "grande";
})(Tamanho || (Tamanho = {}));
export const ordemTamanho = {
    [Tamanho.PEQUENO]: 0,
    [Tamanho.MEDIO]: 1,
    [Tamanho.GRANDE]: 3,
};
export var Dificuldade;
(function (Dificuldade) {
    Dificuldade["FACIL"] = "facil";
    Dificuldade["MEDIO"] = "medio";
    Dificuldade["DIFICIL"] = "dificil";
    Dificuldade["ALEATORIA"] = "aleatoria";
})(Dificuldade || (Dificuldade = {}));
