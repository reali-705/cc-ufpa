package ufpa.icen.pvz.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import ufpa.icen.pvz.model.entidades.EntidadeViva;
import ufpa.icen.pvz.model.entidades.Projetil;

public class ProjetilTest {
    
    private Projetil projetil;
    private final double POSICAO_X_INICIAL = 1.0;
    private final int POSICAO_Y_INICIAL = 1;
    private final int DANO = 10;
    private final double VELOCIDADE = 2.0;
    private final double DELTA = 0.01;

    @BeforeEach
    public void setUp() {
        // Inicializa um novo projétil antes de cada teste com dano 10 e velocidade 2.0
        projetil = new Projetil(POSICAO_X_INICIAL, POSICAO_Y_INICIAL, DANO, VELOCIDADE);
    }

    @Test
    public void testMovimento() {
        // Verifica se o projétil se move para a direita (X aumenta)
        projetil.mover();
        double posicaoEsperada = POSICAO_X_INICIAL + VELOCIDADE;
        
        Assertions.assertTrue(
            projetil.getPosicaoX() > POSICAO_X_INICIAL,
            "A posição X do projétil deve ter aumentado após o movimento."
        );
        Assertions.assertEquals(
            posicaoEsperada, projetil.getPosicaoX(), DELTA,
            "A posição X do projétil após o movimento está incorreta."
        );
        Assertions.assertEquals(
            POSICAO_Y_INICIAL, projetil.getPosicaoY(),
            "A posição Y do projétil deve permanecer inalterada."
        );
    }

    @Test
    public void testAtingir() {
        // Verifica se causa dano ao atingir um alvo próximo
        int vidaAlvo = 50;
        // Alvo na mesma posição para garantir impacto
        EntidadeViva alvo = new EntidadeViva(POSICAO_X_INICIAL, POSICAO_Y_INICIAL, vidaAlvo) {};
        
        projetil.atingir(alvo);
        Assertions.assertEquals(
            vidaAlvo - DANO, alvo.getVida(),
            "O alvo deve ter recebido dano do projétil."
        );
    }

    @Test
    public void testAtingirForaDoAlcance() {
        // Verifica se ignora alvos distantes (segurança do método atingir)
        int vidaAlvo = 50;
        // Posiciona alvo longe (distância > 1.0)
        EntidadeViva alvo = new EntidadeViva(POSICAO_X_INICIAL + 5.0, POSICAO_Y_INICIAL, vidaAlvo) {};
        
        projetil.atingir(alvo);
        Assertions.assertEquals(
            vidaAlvo, alvo.getVida(),
            "O alvo NÃO deve receber dano se estiver longe."
        );
    }
}
