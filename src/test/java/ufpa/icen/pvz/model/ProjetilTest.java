package ufpa.icen.pvz.model;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import ufpa.icen.pvz.model.entidades.EntidadeViva;
import ufpa.icen.pvz.model.entidades.Projetil;

public class ProjetilTest {
    
    private Projetil projetil;

    @BeforeEach
    public void setUp() {
        // Cria um projétil para testes (dano=10, vel=2.0)
        projetil = new Projetil(1.0, 1, 10, 2.0);
    }

    @Test
    public void testMovimento() {
        // Move e verifica nova posição
        projetil.mover();
        double posicaoEsperada = 1.0 + projetil.getVelocidade();
        assertTrue(projetil.getPosicaoX() > 1.0, "A posição X do projetil deve ter aumentado após o movimento.");
        assertEquals(posicaoEsperada, projetil.getPosicaoX(), 0.01, "A posição X do projetil após o movimento está incorreta.");
        assertEquals(1, projetil.getPosicaoY(), "A posição Y do projetil deve permanecer inalterada.");
    }

    @Test
    public void testAtingir() {
        // Cria alvo dummy
        int vidaAlvo = 50;
        EntidadeViva alvo = new EntidadeViva(5.0, 1, vidaAlvo) {};
        
        // Impacta e verifica dano
        projetil.atingir(alvo);
        assertEquals(vidaAlvo - projetil.getDano(), alvo.getVida(), "O alvo deve ter recebido dano do projetil.");
    }
}
