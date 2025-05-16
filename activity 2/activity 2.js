// classe porco
class Porco {
    constructor(tamanho) {
        if (tamanho in ['pequeno', 'medio', 'grande']) {
            this.tamanho = tamanho;
        } else {
            this.tamanho = 'pequeno';
        }
        this.posicao_x = Math.floor(Math.random() * 100);
        this.posicao_y = Math.floor(Math.random() * 50);
        console.log(`Porco criado com tamanho ${this.tamanho} na posicao (${this.posicao_x}, ${this.posicao_y})`);    
    }
}

// Funções do jogo
function calcular_trajetoria(angulo, velocidade) {
    if (velocidade <= 0 || angulo <= 0 || angulo >= 90) {
        return [0, 0];
    }    
    var componente_x = velocidade * Math.cos(angulo);
    var componente_y = velocidade * Math.sin(angulo);
    return [componente_x, componente_y];
}    

function verificar_acerto(componente_x, componente_y, porcos) {
    if (componente_x >= 0 && componente_x <= 100 && componente_y >= 0 && componente_y <= 100) {
        return true;
    } else {
        return false;
    }    
}    

function pontuacao_porco(tamanho) {
    if (tamanho === 'pequeno') {
        return 5;
    } else if (tamanho === 'medio') {
        return 10;
    } else if (tamanho === 'grande') {
        return 20;
    } else {
        return 0;
    }    
}    

// Variaveis
let angulo = 0;
let velocidade = 0;
let porcos = [];
porcos.push(new Porco('pequeno'));
porcos.push(new Porco('medio'));
porcos.push(new Porco('grande'));