import { FilaDupla } from "../components/deque.ts";
import { TamanhoUniverso } from "../contract/enums.ts";
import { dataSistemaSolar, dataUniverso, IDClass } from "../contract/interfaces.ts";
import { SistemaSolar } from "./sistemaSolar.ts";

export class Universo implements IDClass {
    public readonly id: string;
    public readonly nome: string;
    public readonly tamanho: TamanhoUniverso;
    public readonly sistemas: FilaDupla<SistemaSolar>;
    constructor(data: dataUniverso) {
        this.id = data.id;
        this.nome = data.nome;
        this.tamanho = data.tamanho;
        this.sistemas = new FilaDupla<SistemaSolar>();
        data.sistemas.forEach((sistemaData: dataSistemaSolar) => {
            try {
                const sistema = SistemaSolar.carregarObjeto(sistemaData);
                this.sistemas.inserirTail(sistema);
            } catch (error) {
                console.warn(error);
            }
        })
    }
    public addSistemaHead(sistema: SistemaSolar): void {
        if (this.sistemas.getSize() >= (3 + 2 * this.tamanho)) {
            this.sistemas.removerTail();
        }
        this.sistemas.inserirHead(sistema);
    }
    public addSistemaTail(sistema: SistemaSolar): void {
        if (this.sistemas.getSize() >= (3 + 2 * this.tamanho)) {
            this.sistemas.removerHead();
        }
        this.sistemas.inserirTail(sistema);
    }
    public salvarObjeto(): dataUniverso {
        const sistemas = new Array<dataSistemaSolar>(this.sistemas.getSize());
        this.sistemas.forEach((sistema) => sistemas.push(sistema.salvarObjeto()));
        return {
            id: this.id,
            nome: this.nome,
            tamanho: this.tamanho,
            sistemas: sistemas
        }
    }
    public static carregarObjeto(data: dataUniverso): Universo {
        return new this(data);
    }
    public print(): void {
        console.log(`@@@@@@@@ Universo: ${this.nome} (ID: ${this.id}) @@@@@@@@`);
        this.sistemas.forEach((sistema) => sistema.print());
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    }
}