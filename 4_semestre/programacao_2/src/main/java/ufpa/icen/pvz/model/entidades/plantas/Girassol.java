package ufpa.icen.pvz.model.entidades.plantas;

import ufpa.icen.pvz.model.enums.EstadoEntidade;
import ufpa.icen.pvz.model.enums.TipoPlanta;
import ufpa.icen.pvz.model.interfaces.Geradora;

public class Girassol extends Planta implements Geradora {
    private final int solGerado;
    private final int cooldownGeracao;

    /**
     * Construtor do Girassol com configurações padrão.
     * <p>
     * Utiliza as constantes definidas em {@link TipoPlanta} para definir vida,
     * custo e geração de sol.
     * </p>
     * 
     * @param posicaoX posição horizontal (double para movimento contínuo)
     * @param posicaoY posição vertical (linha do tabuleiro)
     */
    public Girassol(double posicaoX, int posicaoY) {
        super(posicaoX, posicaoY, TipoPlanta.GIRASSOL);
        TipoPlanta.StatusGeracao statusGeracao = TipoPlanta.GIRASSOL.getStatusGeracao();
        if (statusGeracao == null) {
            throw new IllegalStateException("Status de geração não definido para Girassol.");
        }
        this.solGerado = statusGeracao.solGerado();
        this.cooldownGeracao = statusGeracao.cooldownGeracao();
    }

    @Override
    public void atualizar() {
        switch (estado) {
            case PRONTA:
                // Pronta para gerar sol
                break;
            case ESPERANDO:
                contador += 1;
                if (contador >= cooldownGeracao) {
                    setEstado(EstadoEntidade.PRONTA);
                    contador = 0; // Resetar contador para próxima geração
                }
                break;
            default:
                setEstado(EstadoEntidade.INATIVA);
        }
    }

    public int gerarSol() {
        if (this.estado == EstadoEntidade.PRONTA) {
            setEstado(EstadoEntidade.ESPERANDO);
            contador = 0; // Iniciar contagem para próxima geração
            return solGerado;
        }
        return 0; // Não gera sol se não estiver pronta
    }

    public int getSolGerado() {
        return solGerado;
    }

    public int getCooldownGeracao() {
        return cooldownGeracao;
    }
}
