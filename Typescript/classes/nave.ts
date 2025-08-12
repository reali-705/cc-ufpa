import { dataNave, IDClass, Posicao } from "../contract/interfaces.ts";

export class Nave implements IDClass {
    readonly id: string;
    public nome: string;
    public posicaoAtual: Posicao; // A posição da nave pode ser definida mais tarde

    constructor(data: dataNave) {
        this.id = data.id;
        this.nome = data.nome;
        this.posicaoAtual = data.posicao;
    }

    public salvarObjeto(): dataNave {
        return {
            id: this.id,
            nome: this.nome,
            posicao: this.posicaoAtual
        };
    }
    public static carregarObjeto(data: dataNave): Nave {
        return new Nave(data);
    }
    public print(): void {
        console.log(`Nave: ${this.nome} (ID: ${this.id})`);
    }
}