import { Tamanho } from "../classes/enums.ts";
import { Level } from "../classes/level.ts";
import	{ LevelConfig } from "../interfaces.ts";
import { mergeSort, pesquisaBinaria, compararTamanho, buscarTamanho } from "../funcoes/ordenacao.ts";
import { enumAleatorio } from "../funcoes/auxiliares.ts";
import { importarDados } from "./importarDados.ts";



function testandoOrdenacaoBusca() {
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

        const tamanhoBuscado = enumAleatorio(Tamanho);
        console.log(`Tamanho buscado: ${tamanhoBuscado}`)

        const passaroBuscado = pesquisaBinaria(level.passaros, tamanhoBuscado, buscarTamanho);
        const porcoBuscado = pesquisaBinaria(level.porcos, tamanhoBuscado, buscarTamanho);

        console.log(`Passaro buscado: ${passaroBuscado ? level.passaros.indexOf(passaroBuscado) : "Nao encontrado"}`)
        console.log(`Porco buscado: ${porcoBuscado ? level.porcos.indexOf(porcoBuscado) : "Nao encontrado"}\n`)
    }
}

testandoOrdenacaoBusca();