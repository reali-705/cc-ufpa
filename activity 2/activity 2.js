// Variaveis do jogo
let angulo;
let velocidade;
let posicao;
let porcos = [];
let pontuacao = 0;
const gravidade = -10;
const variacao_tempo = 0.1;


// classe porco
class Porco {
    constructor(tamanho) {
        // Garante que o tamanho do porco seja pequeno, medio ou grande, sendop pequeno o padrão
        if (tamanho in ['pequeno', 'medio', 'grande']) {
            this.tamanho = tamanho;
        } else {
            this.tamanho = 'pequeno';
        }
        // Gera uma posição aleatoria
        this.posicao = {x: getRandomInt(100, 10), y: getRandomInt(50)};
        this.vivo = true;
        console.log(`Porco criado com tamanho ${this.tamanho} na posicao (${this.posicao.x}, ${this.posicao.y})`);    
    }
}

// Função para gerar um inteiro aleatório dentro de um intervalo
function getRandomInt(max, min = 0) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Funções do jogo
function calcular_componentes_velocidade(angulo, velocidade) {
    // Converte o ângulo de graus para radianos
    angulo = (angulo * Math.PI) / 180;
    // Verifica se o ângulo e a velocidade são válidos
    if (velocidade <= 0 || angulo <= 0 || angulo >= Math.PI / 2) {
        return {x: 0, y: 0};
    }
    // Calcula o componente x e y da velocidade
    return {x: velocidade * Math.cos(angulo), y: velocidade * Math.sin(angulo)};
}    

function verificar_colisao(velocidade, porcos) {
    posicao = {x: 0, y: 0};
    // Calcula a trajetoria do pássaro
    while (posicao.y >= 0) {
        posicao.x += velocidade.x * variacao_tempo;
        posicao.y += velocidade.y * variacao_tempo + 0.5 * gravidade * variacao_tempo ** 2;
        // Verifica se o porco foi atingido
        for (let i=0; i < porcos.length; i++) {
            if (!porcos[i].vivo && Math.abs(posicao.x - porcos[i].posicao.x) < 5 && Math.abs(posicao.y - porcos[i].posicao.y) < 5) {
                porcos[i].vivo = false;
                return porcos[i];
            }
        }
        // Quebra o loop se o pássaro sair da tela
        if (posicao.x > 200) {
            break;
        }
    }
    return null; // Nenhum porco atingido
}    

function pontuacao_porco(porco) {
    const tamanho = porco.tamanho;
    // Retorna a pontuação correspondente ao tamanho do porco
    if (tamanho === 'pequeno') {
        return getRandomInt(50, 25);
    } else if (tamanho === 'medio') {
        return getRandomInt(100, 75);
    } else if (tamanho === 'grande') {
        return getRandomInt(200, 150);
    } else {
        return 0;
    }    
}    


// Execução do jogo
// Cria os porcos
porcos.push(new Porco('pequeno'));
porcos.push(new Porco('medio'));
porcos.push(new Porco('grande'));
// Iniciando o jogo - teste tem apenas 10 lançamentos
let lancamentos = 0
while (lancamentos < 10) {
    lancamentos++;
    // Gera um angulo e uma velocidade aleatoria
    angulo = getRandomInt(89, 1);
    velocidade = getRandomInt(100);
    console.log(`Novo lançamento: angulo = ${angulo}, velocidade = ${velocidade}`);
    // Calcula as componentes da velocidade
    velocidade = calcular_componentes_velocidade(angulo, velocidade);
    console.log(`Vetor da velocidade no eixo x: ${velocidade.x.toFixed(2)}`);
    console.log(`Vetor da velocidade no eixo y: ${velocidade.y.toFixed(2)}`);
    // Verifica se o porco foi atingido
    const porco_atingido = verificar_colisao(velocidade, porcos);
    if (porco_atingido) {
        console.log(`Porco ${porco_atingido.tamanho} atingido na posicao (${porco_atingido.posicao.x}, ${porco_atingido.posicao.y})`); // Imprime o porco atingido
        pontuacao += pontuacao_porco(porco_atingido); // Aumenta a pontuação
        console.log(`Pontuação atual: ${pontuacao}`); // Imprime a pontuação atual
    } else {
        console.log('Nenhum porco atingido...');
    }
    if (porcos.every(porco => !porco.vivo)) {
        console.log('\nTodos os porcos foram atingidos!');
        console.log(`Pontuação final: ${pontuacao}`);
        break;
    }
}