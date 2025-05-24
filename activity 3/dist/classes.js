// Classes que serão exportadas para o arrquivo principal
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
export class Porco extends Personagem {
    constructor(tamanho = 'pequeno', posicao_x, posicao_y) {
        super(tamanho, posicao_x, posicao_y);
        this.vida = 5 * this.raio;
        this.pontos = 10 * this.raio;
        console.log(`Porco ${this.tamanho} criado na posicao (${this.posicao.x}, ${this.posicao.y})`);
    }
    receberDano(dano) {
        this.vida -= dano;
        if (this.vida <= 0) {
            this.vivo = false;
        }
        else {
            console.log(`Porco ${this.tamanho} ainda vivo...`);
        }
    }
}
export class Passaro extends Personagem {
    constructor(tamanho = 'pequeno', posicao_x, posicao_y) {
        super(tamanho, posicao_x, posicao_y);
        this.GRAVIDADE = 10;
        this.velocidade = { x: 0, y: 0 };
        this.voando = false;
        this.dano = 10 * this.raio;
    }
    lancar(angulo, velocidade) {
        angulo = (angulo * Math.PI) / 180;
        this.velocidade = { x: velocidade * Math.cos(angulo), y: -velocidade * Math.sin(angulo) };
        this.voando = true;
    }
    voar(tempo) {
        this.posicao.x += this.velocidade.x * tempo;
        this.velocidade.y += this.GRAVIDADE * tempo;
        this.posicao.y += this.velocidade.y * tempo;
    }
    acertar(alvo) {
        if (!this.voando || !alvo.vivo) {
            return;
        }
        alvo.receberDano(this.dano);
        if (alvo.vivo) {
            this.vivo = false;
            this.voando = false;
        }
        else {
            this.dano -= alvo.vida;
        }
    }
}
