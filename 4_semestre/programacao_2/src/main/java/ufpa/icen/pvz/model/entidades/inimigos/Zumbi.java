package ufpa.icen.pvz.model.entidades.inimigos;

import ufpa.icen.pvz.model.entidades.EntidadeViva;
import ufpa.icen.pvz.model.enums.EstadoEntidade;
import ufpa.icen.pvz.model.enums.TipoZumbi;
import ufpa.icen.pvz.model.interfaces.Atacante;
import ufpa.icen.pvz.model.interfaces.Impactante;
import ufpa.icen.pvz.model.interfaces.Movel;

/**
 * Representa um zumbi inimigo no jogo.
 * <p>
 * Zumbis se movem em direção à casa e atacam plantas que encontrarem no caminho.
 * </p>
 */
public class Zumbi extends EntidadeViva implements Movel, Atacante, Impactante {
    /** Velocidade de movimento do zumbi. */
    private double velocidade;

    /** Dano causado pelo zumbi ao atacar. */
    private int dano;

    /** Tempo entre ataques do zumbi. */
    private int cooldownAtaque;

    private EntidadeViva alvo;
    
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
        this.cooldownAtaque = tipoZumbi.getCooldownAtaque();
        this.contador = tipoZumbi.getCooldownAtaque();  // Pronto para atacar imediatamente
        this.estado = EstadoEntidade.MOVENDO;
    }

    private void mover() {
        contador += 1;
        this.posicaoX -= this.velocidade;
    }

    private void prepararAtaque() {
        contador += 1;
        if (contador >= cooldownAtaque) {
            setEstado(EstadoEntidade.PRONTA);
            return;
        }
        setEstado(EstadoEntidade.ESPERANDO);
    }
    
    private void atingir() {
        this.alvo.receberDano(dano);
        setEstado(EstadoEntidade.ESPERANDO);
        contador = 0;
    }

    @Override
    public void atualizar() {
        switch (estado) {
            case MOVENDO:
                mover();
                break;
            case ESPERANDO:
                prepararAtaque();
                break;
            case PRONTA:
                atingir();
                break;
            default:
                setEstado(EstadoEntidade.INATIVA);
        }
    }

    public void setAlvo(EntidadeViva alvo) {
        if (!estaViva()) {
            this.alvo = null;
            return;
        }
        if (alvo == null || !alvo.estaViva()) {
            this.alvo = null;
            setEstado(EstadoEntidade.MOVENDO);
            return;
        }
        this.alvo = alvo;
        prepararAtaque();
    }

    public double getVelocidade() { return velocidade; }
    public int getDano() { return dano; }
    public int getCooldownAtaque() { return cooldownAtaque; }
    public EntidadeViva getAlvo() { return alvo; }
}