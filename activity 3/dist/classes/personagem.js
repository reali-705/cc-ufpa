export class Personagem {
    constructor(tamanho = 'pequeno', posicao_x, posicao_y) {
        this.vivo = true;
        tamanho = tamanho.toLowerCase();
        if (!['pequeno', 'medio', 'grande'].includes(tamanho)) {
            tamanho = 'pequeno';
        }
        this.tamanho = tamanho;
        if (tamanho === 'pequeno') {
            this.raio = 5;
        }
        else if (tamanho === 'medio') {
            this.raio = 10;
        }
        else {
            this.raio = 20;
        }
        this.posicao = { x: posicao_x, y: posicao_y };
    }
    verificarColisao(objeto) {
        if (!this.vivo || !objeto.vivo) {
            return false;
        }
        return this.raio + objeto.raio >= Math.hypot(this.posicao.x - objeto.posicao.x, this.posicao.y - objeto.posicao.y);
    }
}
