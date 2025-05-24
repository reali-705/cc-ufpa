export class Personagem {
    // Atributos gerais
    public tamanho: string;
    public raio: number;
    public posicao: {x: number, y: number};
    public vivo: boolean =  true;

    constructor(tamanho: string = 'pequeno', posicao_x: number, posicao_y: number) {
        tamanho = tamanho.toLowerCase()
        if (!['pequeno', 'medio', 'grande'].includes(tamanho)) {
            tamanho = 'pequeno';
        }
        this.tamanho = tamanho;
        if (tamanho === 'pequeno') {
            this.raio = 5;
        } else if (tamanho === 'medio') {
            this.raio = 10;
        } else {
            this.raio = 20;
        }
        this.posicao = {x: posicao_x, y: posicao_y};
    }

    public verificarColisao(objeto: Personagem): boolean {
        if (!this.vivo || !objeto.vivo) {
            return false;
        }
        return this.raio + objeto.raio >= Math.hypot(
            this.posicao.x - objeto.posicao.x,
            this.posicao.y - objeto.posicao.y
        );
    }
}

