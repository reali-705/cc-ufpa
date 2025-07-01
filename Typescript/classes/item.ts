export class Item {
    public readonly id: string;
    public nome: string;
    public descricao: string;
    public tamanho: number;
    constructor(
        nome: string,
        descricao: string,
        tamanho: number = 1,
        id?: string
    ) {
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        this.descricao = descricao;
        this.tamanho = tamanho;
    }
    // método temporário para gerar ID aleatório
    private gerarIdUnico(): string {
        return Math.random().toString(36).substring(2, 4);
    }
    public salvarObjeto(): any {
        return {
            tipo: (this.constructor as any).name,
            id: this.id,
            nome: this.nome,
            descricao: this.descricao,
            tamanho: this.tamanho
        };
    }
    public static carregarObjeto(data: any): Item {
        return new this(data.nome, data.descricao, data.tamanho, data.id); 
    }
}