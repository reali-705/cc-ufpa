import { Vetor } from "../components/array.ts";
import { Dicionario } from "../components/maps.ts";
import { Node } from "../components/node.ts";
import { dataGameMaster, dataJogador, dataUniverso, Posicao } from "../contract/interfaces.ts";
import { Bioma } from "./bioma.ts";
import { Jogador } from "./jogador.ts";
import { Nave } from "./nave.ts";
import { Planeta } from "./planeta.ts";
import { SistemaSolar } from "./sistemaSolar.ts";
import { Universo } from "./universo.ts";

export class GameMaster {
    public universo: Universo;
    public jogador: Jogador;
    // public naves: Dicionario<Posicao, Nave>;
    constructor(universo: dataUniverso, jogador: dataJogador) {
        this.universo = Universo.carregarObjeto(universo);
        this.jogador = Jogador.carregarObjeto(jogador);
    }
    public procurarPosicao(): Node<Bioma> {
        const posicao = this.jogador.verPosicaoAtual();
        const sistemas = this.universo.sistemas;
        let sistema = sistemas.getHead()!;
        for (let i = 0; i < sistemas.getSize(); i++) {
            if (sistema.data.id === posicao?.sistemaID) {
                break;
            }
            sistema = sistema.next!;
        }
        const planetas = sistema.data.planetas;
        let planeta = planetas.getHead()!;
        for (let i = 0; i < planetas.getSize(); i++) {
            if (planeta.data.id === posicao?.planetaID) {
                break;
            }
            planeta = planeta.next!;
        }
        const biomas = planeta.data.biomas;
        let bioma = biomas.getHead()!;
        for (let i = 0; i < biomas.getSize(); i++) {
            if (bioma.data.id === posicao?.biomaID) {
                break;
            }
            bioma = bioma.next!;
        }
        return bioma;
    }
    public static carregarObjeto(data: dataGameMaster): GameMaster {
        return new GameMaster(data.universo, data.jogador);
    }
    public salvarObjeto(): dataGameMaster {
        return {
            universo: this.universo.salvarObjeto(),
            jogador: this.jogador.salvarObjeto(),
        };
    }
}