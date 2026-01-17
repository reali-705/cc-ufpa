package ufpa.icen.pvz.model;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ProjetilTest {
    
    private Projetil projetil;

    @BeforeEach
    public void setUp() {
        projetil = new Projetil(1.0, 1, 10, 2.0);
    }

    @Test
    public void testMovimento() {
        projetil.mover();
        double posicaoEsperada = 1.0 + projetil.getVelocidade();
        assertTrue(projetil.getPosicaoX() > 1.0, "A posição X do projetil deve ter aumentado após o movimento.");
        assertEquals(posicaoEsperada, projetil.getPosicaoX(), 0.01, "A posição X do projetil após o movimento está incorreta.");
        assertEquals(1, projetil.getPosicaoY(), "A posição Y do projetil deve permanecer inalterada.");
    }

    @Test
    public void testAtingir() {
        int vidaAlvo = 50;
        EntidadeViva alvo = new EntidadeViva(5.0, 1, vidaAlvo) {};
        
        projetil.atingir(alvo);
        assertEquals(vidaAlvo - projetil.getDano(), alvo.getVida(), "O alvo deve ter recebido dano do projetil.");
    }
}
