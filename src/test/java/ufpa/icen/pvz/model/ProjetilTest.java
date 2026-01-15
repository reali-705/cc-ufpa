package ufpa.icen.pvz.model;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ProjetilTest {
    
    private Projetil projetil;
    private static final double POSICAO_INICIAL_X = 9.0;
    private static final int POSICAO_INICIAL_Y = 0;

    @BeforeEach
    public void setUp() {
        projetil = new Projetil(Config.DANO_ATIRADOR, Config.VELOCIDADE_PROJETIL, POSICAO_INICIAL_X, POSICAO_INICIAL_Y);
    }

    @Test
    public void testMovimento() {
        projetil.mover();
        double posicaoEsperada = POSICAO_INICIAL_X + Config.VELOCIDADE_PROJETIL;
        assertEquals(posicaoEsperada, projetil.getPosicaoX(), 0.01, "A posição X do projetil após o movimento está incorreta.");
        assertEquals(POSICAO_INICIAL_Y, projetil.getPosicaoY(), "A posição Y do projetil deve permanecer inalterada.");
    }
}
