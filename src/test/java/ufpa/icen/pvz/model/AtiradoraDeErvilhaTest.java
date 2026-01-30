package ufpa.icen.pvz.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import ufpa.icen.pvz.model.entidades.Projetil;
import ufpa.icen.pvz.model.entidades.plantas.AtiradoraDeErvilha;
import ufpa.icen.pvz.model.enums.TipoPlanta;

public class AtiradoraDeErvilhaTest {

    private AtiradoraDeErvilha atiradora;
    private final double POSICAO_X_INICIAL = 2.0;
    private final int POSICAO_Y_INICIAL = 1;
    private final TipoPlanta TIPO_PLANTA = TipoPlanta.ATIRADORA_DE_ERVILHA;
    private final double DELTA = 0.01;

    @BeforeEach
    public void setUp() {
        // Inicializa uma nova atiradora antes de cada teste
        atiradora = new AtiradoraDeErvilha(POSICAO_X_INICIAL, POSICAO_Y_INICIAL);
    }

    @Test
    public void testCriacaoAtiradora() {
        // Verifica se os atributos iniciais correspondem ao TipoPlanta
        Assertions.assertEquals(
            POSICAO_X_INICIAL, atiradora.getPosicaoX(), DELTA,
            "Posição X inicial incorreta."
        );
        Assertions.assertEquals(
            POSICAO_Y_INICIAL, atiradora.getPosicaoY(),
            "Posição Y inicial incorreta."
        );
        Assertions.assertEquals(
            TIPO_PLANTA.getVida(), atiradora.getVida(),
            "Vida inicial da atiradora deve ser " + TIPO_PLANTA.getVida() + "."
        );
        Assertions.assertEquals(
            TIPO_PLANTA.getStatusAtaque().dano(), atiradora.getDano(),
            "Dano inicial incorreto."
        );
        Assertions.assertEquals(
            TIPO_PLANTA.getStatusAtaque().tempoAtaque(), atiradora.getTempoAtaque(),
            "Tempo de ataque inicial incorreto."
        );
        Assertions.assertTrue(
            atiradora.estaViva(),
            "Atiradora deve estar viva ao ser criada."
        );
    }

    @Test
    public void testReceberDano() {
        // Verifica redução de vida e estado de morte
        int dano = 15;
        int danoFatal = TIPO_PLANTA.getVida();

        atiradora.receberDano(dano);
        Assertions.assertEquals(
            TIPO_PLANTA.getVida() - dano, atiradora.getVida(),
            "Vida da atiradora após receber dano está incorreta."
        );

        // Testa dano negativo
        atiradora.receberDano(-dano);
        Assertions.assertEquals(
            Math.max(0, TIPO_PLANTA.getVida() - 2 * dano), atiradora.getVida(),
            "Vida não deve aumentar com dano negativo."
        );

        atiradora.receberDano(danoFatal);
        Assertions.assertEquals(
            0, atiradora.getVida(),
            "Vida da atiradora deve ser zero após dano fatal."
        );
        Assertions.assertFalse(
            atiradora.estaViva(),
            "Atiradora deve estar morta após dano fatal."
        );
    }

    @Test
    public void testAtirar() {
        // Verifica disparo e cooldown
        Assertions.assertTrue(
            atiradora.podeAtacar(),
            "Atiradora deve poder atacar inicialmente."
        );

        Projetil projetil = atiradora.atirar();
        Assertions.assertNotNull(projetil, "Deveria ter gerado um projétil.");
        Assertions.assertEquals(
            TIPO_PLANTA.getStatusAtaque().velocidadeProjetil(), projetil.getVelocidade(), DELTA,
            "Velocidade do projétil incorreta."
        );
        Assertions.assertEquals(
            atiradora.getDano(), projetil.getDano(),
            "Dano do projétil incorreto."
        );

        // Verifica cooldown
        Assertions.assertFalse(
            atiradora.podeAtacar(),
            "Atiradora não deve atacar imediatamente após disparo."
        );
        Assertions.assertNull(
            atiradora.atirar(),
            "Não deve gerar projétil durante recarga."
        );

        // Simula passagem de tempo
        try {
            Thread.sleep(atiradora.getTempoAtaque() + 50);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Assertions.assertTrue(
            atiradora.podeAtacar(),
            "Atiradora deve poder atacar após recarga."
        );
    }

    @Test
    public void testMortaPlanta() {
        // Verifica comportamento pós-morte
        atiradora.receberDano(TIPO_PLANTA.getVida()); // Mata a planta
        
        Assertions.assertFalse(
            atiradora.estaViva(), 
            "Planta deve estar morta."
        );
        Assertions.assertFalse(
            atiradora.podeAtacar(),
            "Planta morta não pode ter status de ataque ativo."
        );
        Assertions.assertNull(
            atiradora.atirar(),
            "Planta morta não deve gerar projétil."
        );
    }
}
