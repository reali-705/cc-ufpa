package ufpa.icen.pvz.model;

/**
 * Representa um zumbi inimigo no jogo.
 * <p>
 * Zumbis se movem em direção à casa e atacam plantas que encontrarem no caminho.
 * </p>
 */
public class Zumbi extends EntidadeViva implements Movivel, Atacante, Impactante {
    /** Velocidade de movimento do zumbi. */
    private double velocidade;

    /** Dano causado pelo zumbi ao atacar. */
    private int dano;

    /** Tempo entre ataques do zumbi. */
    private int tempoAtaque;

    /** Timestamp do último ataque realizado. */
    private long ultimoAtaque = 0;
    
    /**
     * Cria um novo Zumbi com configurações padrão (vida, dano e velocidade definidos em Config).
     * 
     * @param posicaoX A posição horizontal inicial no tabuleiro.
     * @param posicaoY A linha (Y) onde o zumbi irá surgir.
     */
    public Zumbi(double posicaoX, int posicaoY) {
        super(posicaoX, posicaoY, Config.ZUMBI_PADRAO.vida());
        this.velocidade = Config.ZUMBI_PADRAO.velocidade();
        this.dano = Config.ZUMBI_PADRAO.dano();
        this.tempoAtaque = Config.ZUMBI_PADRAO.tempoAtaque();
    }

    /**
     * Cria um novo Zumbi com configurações personalizadas.
     * <p>
     * Utilizado principalmente para testes ou variações de zumbis.
     * </p>
     * 
     * @param posicaoX A posição horizontal inicial.
     * @param posicaoY A linha (Y) inicial.
     * @param status Record contendo os atributos base (vida, dano, velocidade, etc).
     */
    public Zumbi(double posicaoX, int posicaoY, Config.StatusBasicoZumbi status) {
        super(posicaoX, posicaoY, status.vida());
        this.velocidade = status.velocidade();
        this.dano = status.dano();
        this.tempoAtaque = status.tempoAtaque();
    }
    
    /**
     * Move o zumbi em direção à casa do jogador (esquerda).
     * <p>
     * A movimentação reduz a coordenada X baseada na velocidade atual.
     * </p>
     */
    @Override
    public void mover() {
        this.posicaoX -= this.velocidade;
    }
    
    /**
     * Verifica se o zumbi está apto a atacar no momento.
     * <p>
     * Critérios:
     * 1. O zumbi deve estar vivo.
     * 2. O tempo decorrido desde o último ataque deve ser maior que o tempo de recarga.
     * </p>
     * 
     * @return true se o ataque está disponível, false caso contrário.
     */
    @Override
    public boolean podeAtacar() {
        if (!this.estaViva()) { return false; }
        return (System.currentTimeMillis() - ultimoAtaque) >= tempoAtaque;
    }

    /**
     * Executa o ataque contra outra entidade viva (como uma planta).
     * <p>
     * Se o ataque for bem-sucedido, o dano é aplicado e o cooldown é reiniciado.
     * </p>
     * 
     * @param outra A entidade alvo que receberá o dano.
     */
    @Override
    public void atingir(EntidadeViva outra) {
        if (!podeAtacar()) { return; }
        outra.receberDano(dano);
        this.ultimoAtaque = System.currentTimeMillis();
    }

    public double getVelocidade() { return velocidade; }
    public int getDano() { return dano; }
    public int getTempoAtaque() { return tempoAtaque; }
}