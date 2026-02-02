package ufpa.icen.pvz.model.entidades.inimigos;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import ufpa.icen.pvz.model.entidades.EntidadeViva;
import ufpa.icen.pvz.model.enums.EstadoEntidade;
import ufpa.icen.pvz.model.enums.TipoZumbi;

public class ZumbiTest {
    private Zumbi zumbi;
    private final double POSICAO_X_INICIAL = 10.0;
    private final int POSICAO_Y_INICIAL = 2;
    private final TipoZumbi TIPO_ZUMBI = TipoZumbi.COMUM;
    private final double DELTA = 0.01;
    private final int VIDA_ALVO = 100;

    @BeforeEach // Inicializa um novo zumbi antes de cada teste
    public void setUp() {
        zumbi = new Zumbi(POSICAO_X_INICIAL, POSICAO_Y_INICIAL);
    }
    
    // Cria uma entidade viva "burra" para testes
    private EntidadeViva criarAlvoTeste() {
        return new EntidadeViva(POSICAO_X_INICIAL, POSICAO_Y_INICIAL, VIDA_ALVO) {
            @Override
            public void atualizar() {} // Não faz nada para o teste
        };
    }
    
    @Test // Verifica se os atributos iniciais correspondem ao TipoZumbi
    public void testCriacaoZumbiComum() {
        Assertions.assertEquals(
            POSICAO_X_INICIAL, zumbi.getPosicaoX(), DELTA,
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
            TIPO_ZUMBI.getCooldownAtaque(), zumbi.getCooldownAtaque(),
            "Tempo de ataque inicial do zumbi comum deve ser " + TIPO_ZUMBI.getCooldownAtaque() + "."
        );
        Assertions.assertTrue(
            zumbi.estaViva(),
            "Zumbi deve estar vivo ao ser criado."
        );
    }

    @Test 
    public void testReceberDanoZumbi() {
        int dano = 20;
        zumbi.receberDano(dano);
        Assertions.assertEquals(
            TIPO_ZUMBI.getVida() - dano, zumbi.getVida(),
            "Zumbi deve ter vida reduzida corretamente após receber dano."
        );

        zumbi.receberDano(-dano);
        Assertions.assertEquals(
            TIPO_ZUMBI.getVida() - 2*dano, zumbi.getVida(),
            "Zumbi deve ter vida reduzida corretamente ao receber dano negativo."
        );
    }

    @Test 
    public void testMovimentoZumbi() {
        double posicaoEsperada = POSICAO_X_INICIAL - TIPO_ZUMBI.getVelocidade();
        zumbi.atualizar(); // Move o zumbi
        Assertions.assertEquals(
            posicaoEsperada, zumbi.getPosicaoX(), DELTA,
            "Zumbi deve se mover corretamente ao atualizar."
        );
    }

    @Test 
    public void testAtacarZumbi() {
        EntidadeViva alvo = criarAlvoTeste();
        
        zumbi.atualizar();
        Assertions.assertEquals(
            VIDA_ALVO, alvo.getVida(),
            "Alvo não deve receber dano sem que o zumbi tenha alvo marcado."
        );
        
        zumbi.setAlvo(alvo); // Define o alvo para o zumbi
        zumbi.atualizar(); // Zumbi ataca o alvo
        Assertions.assertEquals(
            VIDA_ALVO - TIPO_ZUMBI.getDano(), alvo.getVida(),
            "Alvo deve receber dano corretamente após o zumbi atacar."
        );

        zumbi.atualizar(); // Atualiza novamente sem esperar o cooldown
        Assertions.assertEquals(
            VIDA_ALVO - TIPO_ZUMBI.getDano(), alvo.getVida(),
            "Alvo não deve receber dano novamente antes do cooldown do zumbi."
        );
        Assertions.assertEquals(
            EstadoEntidade.ESPERANDO, zumbi.getEstado(),
            "Zumbi deve estar no estado ESPERANDO após atacar e antes do cooldown."
        );

        int deltaContagem = TIPO_ZUMBI.getCooldownAtaque() - zumbi.getContador();
        for (int i = 0; i < deltaContagem; i++) {
            zumbi.atualizar();
        }
        Assertions.assertEquals(
            EstadoEntidade.PRONTA, zumbi.getEstado(),
            "Zumbi deve estar no estado PRONTA após o cooldown."
        );

        zumbi.atualizar(); // Ataca novamente
        Assertions.assertEquals(
            VIDA_ALVO - 2*TIPO_ZUMBI.getDano(), alvo.getVida(),
            "Alvo deve receber dano corretamente após o zumbi atacar novamente."
        );
    }

    @Test 
    public void testMortoZumbi() {
        zumbi.receberDano(zumbi.getVida() + 10);

        Assertions.assertEquals(
            0, zumbi.getVida(),
            "Vida do zumbi deve ser zero após receber dano fatal."
        );
        Assertions.assertFalse(
            zumbi.estaViva(),
            "Zumbi deve estar morto após receber dano fatal."
        );
        Assertions.assertEquals(
            EstadoEntidade.INATIVA, zumbi.getEstado(),
            "Estado do zumbi deve ser INATIVA após morrer."
        );
        zumbi.atualizar(); // Deve permanecer INATIVA
        Assertions.assertEquals(
            EstadoEntidade.INATIVA, zumbi.getEstado(),
            "Zumbi deve permanecer INATIVA após atualizar() se estiver morto."
        );

        EntidadeViva alvo = criarAlvoTeste();
        zumbi.setAlvo(alvo); // Tenta definir um alvo após a morte
        Assertions.assertNull(
            zumbi.getAlvo(),
            "Zumbi não deve ter alvo após morrer."
        );
        Assertions.assertEquals(
            VIDA_ALVO, alvo.getVida(),
            "Alvo não deve receber dano de um zumbi morto."
        );
    }
}
