export class Item {
    public readonly id: string;
    public nome: string;
    public descricao: string;
    public quantidade: number;
    public pilhaMax: number;
    constructor(
        nome: string,
        descricao: string,
        quantidade: number = 1,
        pilhaMax: number = 64,
        id?: string
    ) {
        if (quantidade > pilhaMax) {
            console.warn(`Quantidade inicial (${quantidade}) maior que pilhaMax (${pilhaMax}).\nAjuste para o limite.`);
            this.quantidade = pilhaMax;
        } else {
            this.quantidade = quantidade;
        }
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        this.descricao = descricao;
        this.pilhaMax = pilhaMax;
    }
    // método temporário para gerar ID aleatório
    private gerarIdUnico(): string {
        return Math.random().toString(36).substring(2, 9);
    }
    public cheia(): boolean {
        return this.quantidade >= this.pilhaMax;
    }
    public disponivel(): number {
        return this.pilhaMax - this.quantidade;
    }
    public salvarObjeto(): any {
        return {
            tipo: (this.constructor as any).name,
            id: this.id,
            nome: this.nome,
            descricao: this.descricao,
            quantidade: this.quantidade,
            pilhaMax: this.pilhaMax
        };
    }
    public static carregarObjeto(data: any): Item {
        return new this(data.nome, data.descricao, data.quantidade, data.pilhaMax, data.id); 
    }
}