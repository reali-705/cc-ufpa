import { Level } from "../classes/level.js";
import { Tamanho } from "../classes/enums.js";
import { mergeSort, pesquisaBinaria, compararTamanho, buscarTamanho } from "../funcoes/ordenacao.js";
import { importarDados } from "./importarDados.js";
function testandoOrdenacao() {
    const niveis = importarDados('testes.json');
    if (!niveis)
        return console.error("Nenhum nivel carregado");
    console.log("Iniciando testes de ordenação e busca...\n");
    for (let i = 0; i < niveis.length; i++) {
        const level = new Level(niveis[i]);
        const BuscandoPequeno = Tamanho.PEQUENO;
        const BuscandoMedio = Tamanho.MEDIO;
        const BuscandoGrande = Tamanho.GRANDE;
        let passaroBuscado;
        let porcoBuscado;
        let start;
        let end;
        console.log(`Nivel ${level.dificuldade}`);
        // array passaros
        console.log(`Array Passaros Original - Tamanho: ${level.passaros.length}`);
        // medindo desempenho da ordenacao
        start = performance.now();
        level.passaros = mergeSort(level.passaros, compararTamanho);
        end = performance.now();
        console.log(`Tempo de execução para ordenar os passaros: ${(end - start).toFixed(4)} ms`);
        // medindo desempenho da busca pelo tamanho pequeno
        console.log(`Tamanho buscado: ${BuscandoPequeno}`);
        start = performance.now();
        passaroBuscado = pesquisaBinaria(level.passaros, BuscandoPequeno, buscarTamanho);
        end = performance.now();
        console.log(`Tempo de execução para buscar o passaro: ${(end - start).toFixed(4)} ms`);
        console.log(`Passaro buscado no índice: ${level.passaros.indexOf(passaroBuscado)}\n`);
        // medindo desempenho da busca pelo tamanho medio
        console.log(`Tamanho buscado: ${BuscandoMedio}`);
        start = performance.now();
        passaroBuscado = pesquisaBinaria(level.passaros, BuscandoMedio, buscarTamanho);
        end = performance.now();
        console.log(`Tempo de execução para buscar o passaro: ${(end - start).toFixed(4)} ms`);
        console.log(`Passaro buscado no índice: ${level.passaros.indexOf(passaroBuscado)}\n`);
        // medindo desempenho da busca pelo tamanho grande
        console.log(`Tamanho buscado: ${BuscandoGrande}`);
        start = performance.now();
        passaroBuscado = pesquisaBinaria(level.passaros, BuscandoGrande, buscarTamanho);
        end = performance.now();
        console.log(`Tempo de execução para buscar o passaro: ${(end - start).toFixed(4)} ms`);
        console.log(`Passaro buscado no índice: ${level.passaros.indexOf(passaroBuscado)}\n`);
        // array porcos
        console.log(`Array Porcos Original - Tamanho: ${level.porcos.length}`);
        // medindo desempenho da ordenacao dos porcos
        start = performance.now();
        level.porcos = mergeSort(level.porcos, compararTamanho);
        end = performance.now();
        console.log(`Tempo de execução para ordenar os porcos: ${(end - start).toFixed(4)} ms`);
        // medindo desempenho da busca pelo tamanho pequeno
        console.log(`Tamanho buscado: ${BuscandoPequeno}`);
        start = performance.now();
        porcoBuscado = pesquisaBinaria(level.porcos, BuscandoPequeno, buscarTamanho);
        end = performance.now();
        console.log(`Tempo de execução para buscar o porco: ${(end - start).toFixed(4)} ms`);
        console.log(`Porco buscado no índice: ${level.porcos.indexOf(porcoBuscado)}\n`);
        // medindo desempenho da busca pelo tamanho medio
        console.log(`Tamanho buscado: ${BuscandoMedio}`);
        start = performance.now();
        porcoBuscado = pesquisaBinaria(level.porcos, BuscandoMedio, buscarTamanho);
        end = performance.now();
        console.log(`Tempo de execução para buscar o porco: ${(end - start).toFixed(4)} ms`);
        console.log(`Porco buscado no índice: ${level.porcos.indexOf(porcoBuscado)}\n`);
        // medindo desempenho da busca pelo tamanho grande
        console.log(`Tamanho buscado: ${BuscandoGrande}`);
        start = performance.now();
        porcoBuscado = pesquisaBinaria(level.porcos, BuscandoGrande, buscarTamanho);
        end = performance.now();
        console.log(`Tempo de execução para buscar o porco: ${(end - start).toFixed(4)} ms`);
        console.log(`Porco buscado no índice: ${level.porcos.indexOf(porcoBuscado)}\n`);
    }
    console.log("Testes de ordenação e busca concluidos");
}
testandoOrdenacao();
