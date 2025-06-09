import { Level } from "../classes/level.ts";
import { LevelConfig } from "../interfaces.ts";
import { mergeSort, pesquisaBinaria, compararTamanho, buscarTamanho } from "../funcoes/ordenacao.ts";
import { importarDados } from "./importarDados.ts";


function testandoOrdenacao() {
    const niveis = importarDados<LevelConfig[]>('testes.json')!;

    console.log("Iniciando testes de busca...")
    for (let i = 0; i < niveis.length; i++) {
        const level = new Level(niveis[i]);
        
        console.log(`Nivel ${level.dificuldade}`)

        console.log(`Array Passaros Original: ${level.passaros.map(passaro => passaro.tamanho)}`)
        console.log(`Array Porcos Original: ${level.porcos.map(porco => porco.tamanho)}`)
        
        level.passaros = mergeSort(level.passaros, compararTamanho)!;
        level.porcos = mergeSort(level.porcos, compararTamanho)!;
        
        console.log(`Array Passaros Ordenada: ${level.passaros.map(passaro => passaro.tamanho)}`)
        console.log(`Array Porcos Ordenada: ${level.porcos.map(porco => porco.tamanho)}\n`)
    }
}

testandoOrdenacao();