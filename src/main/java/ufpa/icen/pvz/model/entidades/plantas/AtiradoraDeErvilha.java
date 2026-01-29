package ufpa.icen.pvz.model.entidades.plantas;

import ufpa.icen.pvz.config.Config;
import ufpa.icen.pvz.model.entidades.Projetil;
import ufpa.icen.pvz.model.enums.TipoPlanta;
import ufpa.icen.pvz.model.interfaces.Atacante;
import ufpa.icen.pvz.model.interfaces.Atirador;

/**
 * Representa a planta "Atiradora de Ervilha" (Peashooter).
 * <p>
 * É a principal unidade ofensiva básica do jogo, capaz de disparar projéteis
 * em linha reta contra os zumbis que se aproximam pela mesma linha.
 * </p>
 */
public class AtiradoraDeErvilha extends Planta implements Atirador, Atacante {
    /** Dano causado por cada projétil disparado. */
    private int dano;

    /** Velocidade dos projéteis disparados. */
    private double velocidadeProjetil;

    /** Tempo entre ataques da atiradora de ervilha. */
    private int tempoAtaque;

    /** Timestamp do último ataque realizado. */
    private long ultimoAtaque = 0;

     /**
     * Construtor da Atiradora de Ervilha com configurações padrão.
     * <p>
     * Utiliza as constantes definidas em {@link Config} para definir vida, custo e dano.
     * </p>
     * 
     * @param posicaoX posição horizontal (double para movimento contínuo)
     * @param posicaoY posição vertical (linha do tabuleiro)
     */
    public AtiradoraDeErvilha(double posicaoX, int posicaoY) {
        super(posicaoX, posicaoY, TipoPlanta.ATIRADORA_DE_ERVILHA);
        TipoPlanta.StatusAtaque statusAtaque = TipoPlanta.ATIRADORA_DE_ERVILHA.getStatusAtaque();
        if (statusAtaque == null) {
            throw new IllegalStateException("Status de ataque não definido para Atiradora de Ervilha.");
        }
        this.dano = statusAtaque.dano();
        this.velocidadeProjetil = statusAtaque.velocidadeProjetil();
        this.tempoAtaque = statusAtaque.tempoAtaque();
    }

    /**
     * Verifica se a planta está apta a disparar.
     * <p>
     * Critérios:
     * 1. A planta deve estar viva.
     * 2. O tempo desde o último disparo deve ser maior que o tempo de recarga.
     * </p>
     * 
     * @return true se pode atirar, false caso contrário.
     */
    @Override
    public boolean podeAtacar() {
        if (!this.estaViva()) { return false; }
        return (System.currentTimeMillis() - ultimoAtaque) >= tempoAtaque;
    }

    /**
     * Executa o disparo de um novo projétil.
     * <p>
     * Se possível atacar, atualiza o timestamp do último ataque e gera o projétil.
     * </p>
     * 
     * @return Novo objeto {@link Projetil} se o disparo ocorrer, ou null caso contrário.
     */
    @Override
    public Projetil atirar() {
        if (!podeAtacar()) { return null; }
        this.ultimoAtaque = System.currentTimeMillis();
        return new Projetil(this.posicaoX, this.posicaoY, this.dano, this.velocidadeProjetil);
    }

    /**
     * Obtém o dano causado pelos projéteis desta planta.
     * @return valor do dano.
     */
    public int getDano() { return dano; }
    
    /**
     * Obtém o intervalo de tempo necessário entre ataques.
     * @return tempo em milissegundos.
     */
    public int getTempoAtaque() { return tempoAtaque; }
}
