package ufpa.icen.pvz.model.entidades.inimigos;

import ufpa.icen.pvz.model.entidades.EntidadeViva;
import ufpa.icen.pvz.model.enums.TipoZumbi;
import ufpa.icen.pvz.model.interfaces.Atacante;
import ufpa.icen.pvz.model.interfaces.Impactante;
import ufpa.icen.pvz.model.interfaces.Movivel;

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
        this(posicaoX, posicaoY, TipoZumbi.COMUM);
    }
    
    /**
     * Cria um novo Zumbi com base no tipo especificado.
     * 
     * @param posicaoX A posição horizontal inicial no tabuleiro.
     * @param posicaoY A linha (Y) onde o zumbi irá surgir.
     * @param tipoZumbi O tipo de zumbi a ser criado, definindo suas características.
     */
    public Zumbi(double posicaoX, int posicaoY, TipoZumbi tipoZumbi) {
        super(posicaoX, posicaoY, tipoZumbi.getVida());
        this.velocidade = tipoZumbi.getVelocidade();
        this.dano = tipoZumbi.getDano();
        this.tempoAtaque = tipoZumbi.getTempoAtaque();
    }
    
    /**
     * Move o zumbi em direção à casa do jogador (esquerda).
     * <p>
     * A movimentação reduz a coordenada X baseada na velocidade atual.
     * </p>
     */
    @Override
    public void mover() {
        if (!this.estaViva()) { return; }
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
        if (Math.abs(outra.getPosicaoX() - this.getPosicaoX()) > 1.0) { return; } // Verifica alcance de ataque
        outra.receberDano(dano);
        this.ultimoAtaque = System.currentTimeMillis();
    }

    public double getVelocidade() { return velocidade; }
    public int getDano() { return dano; }
    public int getTempoAtaque() { return tempoAtaque; }
}