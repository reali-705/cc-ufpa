import { Vetor } from "../components/array.ts";
import { Dicionario } from "../components/maps.ts";
import { dataGameMaster, dataJogador, dataUniverso, Posicao } from "../contract/interfaces.ts";
import { Jogador } from "./jogador.ts";
import { Nave } from "./nave.ts";
import { Universo } from "./universo.ts";

export class GameMaster {
    public universo: Universo;
    public jogador: Jogador;
    // public naves: Dicionario<Posicao, Nave>;
    constructor(universo: dataUniverso, jogador: dataJogador) {
        this.universo = Universo.carregarObjeto(universo);
        this.jogador = Jogador.carregarObjeto(jogador);
    }
}