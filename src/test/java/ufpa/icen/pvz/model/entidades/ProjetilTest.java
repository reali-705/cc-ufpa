package ufpa.icen.pvz.model.entidades;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import ufpa.icen.pvz.model.enums.EstadoEntidade;

public class ProjetilTest {
    private Projetil projetil;
    private final double POSICAO_X_INICIAL = 1.0;
    private final int POSICAO_Y_INICIAL = 1;
    private final int DANO = 10;
    private final double VELOCIDADE = 2.0;
    private final int VIDA_ALVO = 50;

    @BeforeEach
    public void setUp() {
        projetil = new Projetil(POSICAO_X_INICIAL, POSICAO_Y_INICIAL, DANO, VELOCIDADE);
    }

    // Cria uma entidade viva "burra" para testes
    private EntidadeViva criarAlvoTeste() {
        return new EntidadeViva(POSICAO_X_INICIAL, POSICAO_Y_INICIAL, VIDA_ALVO) {
            @Override
            public void atualizar() {
                // Não faz nada para o teste
            }
        };
    }

    @Test
    public void testMovimentoViaAtualizar() {
        // O estado inicial no construtor é MOVENDO
        projetil.atualizar(); 
        
        double posicaoEsperada = POSICAO_X_INICIAL + VELOCIDADE;
        Assertions.assertEquals(posicaoEsperada, projetil.getPosicaoX(), 0.01, 
            "O atualizar() deve mover o projétil quando o estado for MOVENDO.");
    }

    @Test
    public void testDanoViaAtualizar() {
        EntidadeViva alvo = criarAlvoTeste();
        
        // setAlvo muda o estado para PRONTA (ou ATACANDO)
        projetil.setAlvo(alvo); 
        
        // O atualizar() agora deve executar o atingir()
        projetil.atualizar(); 
        
        Assertions.assertEquals(
            VIDA_ALVO - DANO, alvo.getVida(),
            "O alvo deve receber dano após o atualizar() no estado de ataque.");
        Assertions.assertTrue(
            !projetil.estaAtiva(POSICAO_X_INICIAL),
            "O projétil deve ficar INATIVO após atingir o alvo.");
    }

    @Test
    public void testSaidaDoTabuleiro() {
        // Testa a lógica de limite de tela que você criou
        Assertions.assertFalse(
            projetil.estaAtiva(POSICAO_X_INICIAL - 1),
            "O projétil deve estar inativo se ultrapassar o limite X.");
    }

    @Test
    public void testSetAlvoNulo() {
        projetil.setAlvo(null);
        Assertions.assertEquals(
            EstadoEntidade.MOVENDO, projetil.getEstado(), 
            "O estado do projétil deve ser MOVENDO ao definir alvo nulo.");
    }
}