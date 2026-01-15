package ufpa.icen.pvz.model;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ZumbiTest {
    
    private Zumbi zumbi;
    private static final double POSICAO_INICIAL_X = 9.0;
    private static final int POSICAO_INICIAL_Y = 0;

    @BeforeEach
    public void setUp() {
        zumbi = new Zumbi(Config.VIDA_ZUMBI, Config.DANO_ZUMBI, Config.VELOCIDADE_ZUMBI, POSICAO_INICIAL_X, POSICAO_INICIAL_Y);
    }

    @Test
    public void testMovimento() {
        zumbi.mover();
        double posicaoEsperada = POSICAO_INICIAL_X - Config.VELOCIDADE_ZUMBI;
        assertEquals(posicaoEsperada, zumbi.getPosicaoX(), 0.01, "A posição X do zumbi após o movimento está incorreta.");
        assertEquals(POSICAO_INICIAL_Y, zumbi.getPosicaoY(), 0.01, "A posição Y do zumbi deve permanecer inalterada.");
    }

    @Test
    public void testReceberDano() {
        int dano = 20;
        int vidaEsperada = Config.VIDA_ZUMBI - dano;
        zumbi.receberDano(dano);
        assertEquals(vidaEsperada, zumbi.getVida(), "A vida do zumbi após receber dano está incorreta.");
    }
}
