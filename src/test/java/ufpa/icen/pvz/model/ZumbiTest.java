package ufpa.icen.pvz.model;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import ufpa.icen.pvz.model.entidades.EntidadeViva;
import ufpa.icen.pvz.model.entidades.inimigos.Zumbi;
import ufpa.icen.pvz.model.enums.TipoZumbi;

public class ZumbiTest {
    private Zumbi zumbi;
    private final double POSICAO_X_INICIAL = 10.0;
    private final int POSICAO_Y_INICIAL = 2;
    private final TipoZumbi TIPO_ZUMBI = TipoZumbi.COMUM;
    private final double DELTA = 0.01;

    @BeforeEach // Inicializa um novo zumbi antes de cada teste
    public void setUp() {
        zumbi = new Zumbi(POSICAO_X_INICIAL, POSICAO_Y_INICIAL);
    }
    
    // Cria uma entidade viva "burra" para testes
    private EntidadeViva criarAlvoTeste(int vida) {
        return new EntidadeViva(0, 0, vida) {};
    }
    
    @Test // Verifica se os atributos iniciais correspondem ao TipoZumbi
    public void testCriacaoZumbiComum() {
        Assertions.assertEquals(
            POSICAO_X_INICIAL, zumbi.getPosicaoX(), 0.01,
            "Posição X inicial incorreta."
        );
        Assertions.assertEquals(
            POSICAO_Y_INICIAL, zumbi.getPosicaoY(),
            "Posição Y inicial incorreta."
        );
        Assertions.assertEquals(
            TIPO_ZUMBI.getVida(), zumbi.getVida(),
            "Vida inicial do zumbi comum deve ser " + TIPO_ZUMBI.getVida() + "."
        );
        Assertions.assertEquals(
            TIPO_ZUMBI.getDano(), zumbi.getDano(),
            "Dano inicial do zumbi comum deve ser " + TIPO_ZUMBI.getDano() + "."
        );
        Assertions.assertEquals(
            TIPO_ZUMBI.getVelocidade(), zumbi.getVelocidade(), DELTA,
            "Velocidade inicial do zumbi comum deve ser " + TIPO_ZUMBI.getVelocidade() + "."
        );
         Assertions.assertEquals(
            TIPO_ZUMBI.getTempoAtaque(), zumbi.getTempoAtaque(),
            "Tempo de ataque inicial do zumbi comum deve ser " + TIPO_ZUMBI.getTempoAtaque() + "."
        );
        Assertions.assertTrue(
            zumbi.estaViva(),
            "Zumbi deve estar vivo ao ser criado."
        );
    }

    // TODO: corrigir receberDano com valor negativo
    @Test // Verifica redução de vida e estado de morte
    public void testReceberDanoZumbi() {
        int dano = 30;
        int danoFatal = TIPO_ZUMBI.getVida();

        zumbi.receberDano(dano);
        Assertions.assertEquals(
            TIPO_ZUMBI.getVida() - dano, zumbi.getVida(),
            "Vida do zumbi após receber dano está incorreta."
        );
        
        zumbi.receberDano(- dano);
        Assertions.assertEquals(
            TIPO_ZUMBI.getVida() - dano, zumbi.getVida(),
            "Vida do zumbi não deve aumentar ao receber dano negativo."
        );
        
        zumbi.receberDano(danoFatal);
        Assertions.assertEquals(
            0, zumbi.getVida(),
            "Vida do zumbi deve ser zero após receber dano fatal."
        );
        Assertions.assertFalse(
            zumbi.estaViva(),
            "Zumbi deve estar morto após receber dano fatal."
        );

    }

    @Test // Verifica se o zumbi anda para a esquerda corretamente
    public void testMovimentoZumbi() {
        zumbi.mover();
        double posicaoXEsperada = POSICAO_X_INICIAL - TIPO_ZUMBI.getVelocidade();
        Assertions.assertEquals(
            posicaoXEsperada, zumbi.getPosicaoX(), DELTA,
            "Posição X do zumbi após mover está incorreta."
        );
        Assertions.assertEquals(
            POSICAO_Y_INICIAL, zumbi.getPosicaoY(),
            "Posição Y do zumbi não deve mudar ao mover."
        );
    }

    // TODO: tratar posicao do alvo ao atacar
    @Test // Verifica dano no alvo e respeito ao cooldown (tempo de recarga)
    public void testAtacarZumbi() {
        Assertions.assertTrue(
            zumbi.podeAtacar(),
            "Zumbi deve poder atacar inicialmente."
        );
        
        int vidaAlvo = 100;
        EntidadeViva alvo = criarAlvoTeste(vidaAlvo);

        zumbi.atingir(alvo);
        Assertions.assertEquals(
            vidaAlvo - TIPO_ZUMBI.getDano(), alvo.getVida(),
            "Vida do alvo após ataque do zumbi está incorreta."
        );
        
        Assertions.assertFalse(
            zumbi.podeAtacar(),
            "Zumbi não deve poder atacar novamente imediatamente."
        );
        
        try {
            Thread.sleep(TIPO_ZUMBI.getTempoAtaque() + 50);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        
        Assertions.assertTrue(
            zumbi.podeAtacar(),
            "Zumbi deve poder atacar após tempo de recarga."
        );
    }

    // TODO: corrigir mover e atacar zumbi depois de morto
    @Test // Verifica se um zumbi morto para de agir (mover/atacar)
    public void testMortoZumbi() {
        zumbi.receberDano(TIPO_ZUMBI.getVida());
        Assertions.assertFalse(
            zumbi.estaViva(),
            "Zumbi deve estar morto após receber dano fatal."
        );

        zumbi.mover();
        Assertions.assertEquals(
            POSICAO_X_INICIAL, zumbi.getPosicaoX(), DELTA,
            "Zumbi morto não deve se mover."
        );

        int vidaAlvo = 100;
        EntidadeViva alvo = criarAlvoTeste(vidaAlvo);
        zumbi.atingir(alvo);
        Assertions.assertEquals(
            vidaAlvo, alvo.getVida(),
            "Zumbi morto não deve causar dano ao atacar."
        );
    }
}
