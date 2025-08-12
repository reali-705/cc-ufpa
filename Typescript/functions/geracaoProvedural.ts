import seedrandom from "seedrandom";

export class GeradorProcedural {
    private rng: seedrandom.PRNG;
    constructor(semente: string | number) {
        this.rng = seedrandom(String(semente));
    }
    public proximoNumero(): number {
        return this.rng();
    }
    public proximoInteiro(min: number, max: number): number {
        return Math.floor(this.rng() * (max - min)) + min;
    }
    public proximoBooleano(): boolean {
        return this.rng() < 0.5;
    }
    public escolherElemento<T>(vetor: T[]): T {
        if (vetor.length === 0) {
            throw new Error("O vetor está vazio.");
        }
        return vetor[this.proximoInteiro(0, vetor.length)];
    }
    public gerarNome(prefixo: string[], sufixo: string[]): string {
        return this.escolherElemento(prefixo) + this.escolherElemento(sufixo);
    }
}