import { Level } from "../classes/level.js";
import { mergeSort, compararTamanho } from "../funcoes/ordenacao.js";
import { importarDados } from "./importarDados.js";
function testandoOrdenacao() {
    const niveis = importarDados('testes.json');
    console.log("Iniciando testes de busca...");
    for (let i = 0; i < niveis.length; i++) {
        const level = new Level(niveis[i]);
        console.log(`Nivel ${level.dificuldade}`);
        console.log(`Array Passaros Original: ${level.passaros.map(passaro => passaro.tamanho)}`);
        console.log(`Array Porcos Original: ${level.porcos.map(porco => porco.tamanho)}`);
        level.passaros = mergeSort(level.passaros, compararTamanho);
        level.porcos = mergeSort(level.porcos, compararTamanho);
        console.log(`Array Passaros Ordenada: ${level.passaros.map(passaro => passaro.tamanho)}`);
        console.log(`Array Porcos Ordenada: ${level.porcos.map(porco => porco.tamanho)}\n`);
    }
}
testandoOrdenacao();
