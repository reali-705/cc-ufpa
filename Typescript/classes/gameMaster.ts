import { Vetor } from "../components/array.ts";
import { Dicionario } from "../components/maps.ts";
import { dataGameMaster, Posicao } from "../contract/interfaces.ts";
import { Jogador } from "./jogador.ts";
import { Nave } from "./nave.ts";
import { Universo } from "./universo.ts";

export class GameMaster {
    public universo: Universo;
    public jogador: Jogador;
    public naves: Dicionario<Posicao, Nave>;
    constructor(data: dataGameMaster) {
        this.universo = Universo.carregarObjeto(data.universo);
        this.jogador = Jogador.carregarObjeto(data.jogador);
        this.naves = new Dicionario<Posicao, Nave>((posicao: Posicao) => {
            const vetor = new Vetor<string>();
            vetor.inserir(posicao.sistemaID);
            if (posicao.planetaID) {
                vetor.inserir(posicao.planetaID);
            }
            if (posicao.biomaID) {
                vetor.inserir(posicao.biomaID);
            }
            return vetor;
        });
        data.naves.forEach(naveData => {
            this.naves.inserir(Nave.carregarObjeto(naveData));
        });
    }
}