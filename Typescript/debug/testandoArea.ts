import { AreaExploravel } from "../classes/areaExploravel.ts";
import { carregarDados } from "../functions/dadosLerEscrever.ts";

const arquivo = "areaExploravel.json";
const dados = carregarDados(arquivo);
console.log(dados);
let area: AreaExploravel;
if (dados) {
    try {
        area = AreaExploravel.carregarObjeto(dados);
    } catch (error) {
        console.error("Erro ao carregar o area:", error);
        process.exit(1);
    }
} else {
    console.warn("Arquivo de area nao encontrado. Criando novo area...");
    area = new AreaExploravel("Planicie", "Um lugar sem nada para explorar.");
}

area.print();
