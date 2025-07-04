import { dataGameMaster, dataJogador, dataNave, dataSistemaSolar } from "../contract/interfaces.ts";
import { Jogador } from "./jogador.ts";
import { Nave } from "./nave.ts";
import { SistemaSolar } from "./sistemaSolar.ts";

export class GameMaster {
    public readonly id: string;
    public readonly sistemaSolar: SistemaSolar;
    public readonly jogador: Jogador;
    public readonly naves: Nave[];
    constructor(id: string, sistemaSolar: SistemaSolar, jogador: Jogador, naves: Nave[]) {
        this.id = id;
        this.sistemaSolar = sistemaSolar;
        this.jogador = jogador;
        this.naves = naves;
    }
    public static async carregarJogo(dados: dataGameMaster): Promise<GameMaster | null> {
        try {
            const sistemaSolarCarregado = SistemaSolar.carregarObjeto(dados.sistemaSolar);
            const navesCarregadas = dados.naves.map((naveData: dataNave) =>
                Nave.carregarObjeto(naveData, sistemaSolarCarregado)
            );
            const naveDoJogador = navesCarregadas.find(nave => nave.id === dados.jogador.idNave);
            const jogadorCarregado = Jogador.carregarObjeto(dados.jogador, sistemaSolarCarregado, naveDoJogador);
            return new this(dados.id, sistemaSolarCarregado, jogadorCarregado, navesCarregadas);
        } catch (error) {
            console.error("Erro ao carregar o jogo:", error, "\n");
            return null;
        }
    }
    public salvarJogo(): dataGameMaster {
        return {
            id: this.id,
            sistemaSolar: this.sistemaSolar.salvarObjeto(),
            jogador: this.jogador.salvarObjeto(),
            naves: this.naves.map((nave) => nave.salvarObjeto()),
        }
    }
}