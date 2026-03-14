package ufpa.icen.pvz.model.fase;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import ufpa.icen.pvz.model.entidades.inimigos.Zumbi;
import ufpa.icen.pvz.model.enums.TipoPlanta;
import ufpa.icen.pvz.model.enums.TipoZumbi;

public class LinhaTest {
    private final int INDICE = 1;
    private final double TAMANHO = 5.0;
    private final double DELTA = 0.01;
    private Linha linha;

    @BeforeEach
    public void setUp() {
        linha = new Linha(TAMANHO, INDICE);
    }

    @Test
    public void testCriacaoLinha() {
        Assertions.assertEquals(
                INDICE, linha.getIndice(),
                "O índice da linha deve ser " + INDICE + ".");
        Assertions.assertEquals(
                TAMANHO, linha.getTamanho(),
                "O tamanho da linha deve ser " + TAMANHO + ".");
        Assertions.assertTrue(
                linha.getZumbis().isEmpty(),
                "A lista de zumbis deve estar vazia ao criar a linha.");
        Assertions.assertTrue(
                linha.getProjetis().isEmpty(),
                "A lista de projéteis deve estar vazia ao criar a linha.");
        Assertions.assertEquals(
                0, linha.getPlantas()
                        .stream()
                        .filter(p -> p != null && p.estaViva())
                        .count(),
                "A lista de plantas deve estar vazia ao criar a linha.");
    }

    @Test
    public void testAdicionarEntidades() {
        linha.adicionarZumbi(TipoZumbi.COMUM);
        Assertions.assertEquals(
                1, linha.getZumbis().size(),
                "Deve haver 1 zumbi na linha após a adição.");

        Assertions.assertTrue(
                linha.adicionarPlanta(2.0, TipoPlanta.ATIRADORA_DE_ERVILHA),
                "Deve ser possível adicionar uma planta na posição 2.0.");
        Assertions.assertEquals(
                1, linha.getPlantas()
                        .stream()
                        .filter(p -> p != null && p.estaViva())
                        .count(),
                "Deve haver 1 planta viva na linha após a adição.");

        Assertions.assertFalse(
                linha.adicionarPlanta(2.0, TipoPlanta.ATIRADORA_DE_ERVILHA),
                "Não deve ser possível adicionar uma planta na posição 2.0 novamente.");
    }

    @Test
    public void testAtualizarLinha() {
        Assertions.assertFalse(
                linha.atualizar() == -1,
                "Deve retornar false ao atualizar uma linha sem zumbis.");

        linha.adicionarZumbi(TipoZumbi.COMUM);
        Zumbi zumbi = linha.getZumbis().get(0);
        Assertions.assertEquals(
                TAMANHO, zumbi.getPosicaoX(), DELTA,
                "O zumbi deve começar na posição X igual ao tamanho da linha.");
        Assertions.assertFalse(
                linha.atualizar() == -1,
                "Deve retornar false ao atualizar uma linha com zumbis vivos.");
        Assertions.assertTrue(
                zumbi.getPosicaoX() < TAMANHO,
                "O zumbi deve ter se movido para a esquerda após a atualização.");

        linha.adicionarPlanta(0.0, TipoPlanta.ATIRADORA_DE_ERVILHA);
        linha.atualizar();
        Assertions.assertTrue(
                linha.getProjetis().size() > 0,
                "Deve haver projéteis na linha após a atualização com planta atiradora.");
    }

    @Test
    public void testAtualizarLinhaZumbiVence() {
        linha.adicionarZumbi(TipoZumbi.COMUM);
        Zumbi zumbi = linha.getZumbis().get(0);
        double posicaoAntes = zumbi.getPosicaoX();
        double velocidade = zumbi.getVelocidade();

        // Move o zumbi para a posição 0 para simular vitória
        while (linha.atualizar() == -1) {
            Assertions.assertEquals(
                    posicaoAntes - velocidade, zumbi.getPosicaoX(), DELTA,
                    "O zumbi deve se mover corretamente para a esquerda.");
            posicaoAntes = zumbi.getPosicaoX();
        }
    }

    @Test
    public void testAtualizarLinhaPlantaVence() {
        linha.adicionarZumbi(TipoZumbi.COMUM);
        linha.adicionarPlanta(0.0, TipoPlanta.ATIRADORA_DE_ERVILHA);

        // Atualiza até que o zumbi morra
        while (linha.getZumbis().size() > 0) {
            if (linha.atualizar() == -1) {
                Assertions.fail("O zumbi não deveria vencer quando há uma planta atiradora.");
            }
        }

        Assertions.assertTrue(
                linha.getZumbis().isEmpty(),
                "A lista de zumbis deve estar vazia após o zumbi ser derrotado.");

    }
}
