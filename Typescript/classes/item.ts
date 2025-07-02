export interface Itens {
    item: Item;
    quantidade: number;
}

export class Item {
    public readonly id: string;
    public readonly nome: string;
    public readonly descricao: string;
    public readonly tamanho: number;
    public readonly raridade: string;
    constructor(
        nome: string,
        descricao: string,
        tamanho: number = 1,
        raridade: string = "Comum",
        id?: string
    ) {
        this.id = id || this.gerarIdUnico();
        this.nome = nome;
        this.descricao = descricao;
        this.raridade = raridade;
        this.tamanho = tamanho;
    }
    // método temporário para gerar ID aleatório
    private gerarIdUnico(): string {
        return (this.constructor as any).name + Math.random().toString(36).substring(2, 4);
    }
    public salvarObjeto(): any {
        return {
            tipo: (this.constructor as any).name,
            id: this.id,
            nome: this.nome,
            descricao: this.descricao,
            tamanho: this.tamanho,
            raridade: this.raridade
        };
    }
    public static carregarObjeto(data: any): Item {
        return new this(data.nome, data.descricao, data.tamanho, data.raridade, data.id); 
    }
    public print(): void {
        console.log(this.id + " - " + this.nome);
        console.log("Raridade: " + this.raridade);
        console.log("Tamanho: " + this.tamanho);
        console.log(this.descricao);
    }
}