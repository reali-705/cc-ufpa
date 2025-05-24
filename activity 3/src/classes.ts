// Classes que serão exportadas para o arrquivo principal

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

export class Porco extends Personagem {
    // Atributos especificos do Porco
    public vida: number;
    public pontos: number;

    constructor(tamanho: string = 'pequeno', posicao_x: number, posicao_y: number) {
        super(tamanho, posicao_x, posicao_y);
        this.vida = 5 * this.raio;
        this.pontos = 10 * this.raio;
        console.log(`Porco ${this.tamanho} criado na posicao (${this.posicao.x}, ${this.posicao.y})`);
    }

    public receberDano(dano: number) {
        this.vida -= dano;
        if (this.vida <= 0) {
            this.vivo = false;
        } else {
            console.log(`Porco ${this.tamanho} ainda vivo...`);
        }
    }
}

export class Passaro extends Personagem {
    // Atributos especificos do Passaro
    public dano: number;
    public GRAVIDADE: number = 10;
    public velocidade: {x: number, y: number} = {x: 0, y: 0};
    public voando: boolean = false;

    constructor(tamanho: string = 'pequeno', posicao_x: number, posicao_y: number) {
        super(tamanho, posicao_x, posicao_y);
        this.dano = 10 * this.raio;
    }

    public lancar(angulo: number, velocidade: number) {
        angulo = (angulo * Math.PI) / 180;
        this.velocidade = {x: velocidade * Math.cos(angulo), y: - velocidade * Math.sin(angulo)};
        this.voando = true;
    }

    public voar(tempo: number) {
        this.posicao.x += this.velocidade.x * tempo;
        this.velocidade.y += this.GRAVIDADE * tempo;
        this.posicao.y += this.velocidade.y * tempo;
    }

    public acertar(alvo: Porco) {
        if (!this.voando || !alvo.vivo) {
            return;
        }
        alvo.receberDano(this.dano)
        if (alvo.vivo) {
            this.vivo = false;
            this.voando = false;
        } else {
            this.dano -= alvo.vida;
        }
    }
}