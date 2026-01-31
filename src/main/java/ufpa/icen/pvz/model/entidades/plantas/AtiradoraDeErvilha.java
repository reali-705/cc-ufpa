package ufpa.icen.pvz.model.entidades.plantas;

import ufpa.icen.pvz.model.entidades.Projetil;
import ufpa.icen.pvz.model.enums.EstadoEntidade;
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
    private final int dano;

    /** Velocidade dos projéteis disparados. */
    private final double velocidadeProjetil;

    /** Tempo entre ataques da atiradora de ervilha. */
    private final int cooldownAtaque;

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
        this.cooldownAtaque = statusAtaque.cooldownAtaque();
        this.contador = statusAtaque.cooldownAtaque(); // Pronta para atacar imediatamente
    }

    private void recarregar() {
        contador += 1;
        if (contador >= cooldownAtaque) {
            setEstado(EstadoEntidade.PRONTA);
        }
    }

    @Override
    public void atualizar() {
        switch (estado) {
            case PRONTA:
                // Pronta para atirar
                break;
            case ESPERANDO:
                recarregar();
                break;
            default:
                setEstado(EstadoEntidade.INATIVA);
        }
    }

    public Projetil atirar() {
        if (this.estado == EstadoEntidade.PRONTA) {
            setEstado(EstadoEntidade.ESPERANDO);
            this.contador = 0;
            return new Projetil(this.posicaoX, this.posicaoY, this.dano, this.velocidadeProjetil);
        }
        return null;
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
    public int getCooldownAtaque() { return cooldownAtaque; }
}
