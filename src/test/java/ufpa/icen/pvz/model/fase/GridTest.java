package ufpa.icen.pvz.model.fase;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import ufpa.icen.pvz.model.enums.TipoPlanta;
import ufpa.icen.pvz.model.enums.TipoZumbi;

public class GridTest {
    private final int QUANTIDADE_LINHAS = 3;
    private final double TAMANHO_LINHA = 5.0;
    private Grid grid;
    private final double DELTA = 0.01;
    private final TipoPlanta tipoPlanta = TipoPlanta.ATIRADORA_DE_ERVILHA;
    private final TipoZumbi tipoZumbi = TipoZumbi.COMUM;

    @BeforeEach
    public void setUp() {
        grid = new Grid(QUANTIDADE_LINHAS, TAMANHO_LINHA);
    }

    @Test
    public void testCriarGrid() {
        Assertions.assertNotNull(grid, "O grid não deve ser nulo após a criação.");
        Assertions.assertEquals(
                QUANTIDADE_LINHAS, grid.getLinhas().size(),
                "O grid deve conter " + QUANTIDADE_LINHAS + " linhas.");
        for (int i = 0; i < QUANTIDADE_LINHAS; i++) {
            Assertions.assertEquals(
                    TAMANHO_LINHA, grid.getLinhas().get(i).getTamanho(),
                    "Cada linha do grid deve ter tamanho " + TAMANHO_LINHA + ".");
        }
    }

    @Test
    public void testAdicionarPlanta() {
        for (int i = 0; i < QUANTIDADE_LINHAS; i++) {
            Assertions.assertTrue(
                    grid.adicionarPlanta(i, 2.0, tipoPlanta),
                    "Deve ser possível adicionar uma planta na linha " + i + ".");
            Assertions.assertEquals(
                    i + 1, grid.getPlantas().size(),
                    "A linha " + i + " deve conter a planta adicionada.");

            Assertions.assertFalse(
                    grid.adicionarPlanta(i, 2.0, tipoPlanta),
                    "Não deve ser possível adicionar uma planta em uma posição já ocupada.");

            Assertions.assertFalse(
                    grid.adicionarPlanta(-i, 2.0, tipoPlanta),
                    "Não deve ser possível adicionar uma planta em linha inválida.");

            Assertions.assertFalse(
                    grid.adicionarPlanta(QUANTIDADE_LINHAS, 2.0, tipoPlanta),
                    "Não deve ser possível adicionar uma planta em linha inválida.");
        }
    }

    @Test
    public void testAdicionarZumbi() {
        for (int i = 0; i < QUANTIDADE_LINHAS; i++) {
            grid.adicionarZumbi(i, tipoZumbi);
            Assertions.assertFalse(
                    grid.getZumbis().isEmpty(),
                    "A linha " + i + " deve conter 1 zumbi após a adição.");
        }
    }

    @Test
    public void testAtualizarGrid() {
        Assertions.assertFalse(
                grid.atualizar() == -1,
                "Não há zumbis no grid, portanto a atualização não deve indicar fim de jogo.");

        for (int i = 0; i < QUANTIDADE_LINHAS; i++) {
            grid.adicionarZumbi(i, tipoZumbi);
        }

        Assertions.assertFalse(
                grid.atualizar() == -1,
                "Nenhum zumbi deve alcançar a casa nesta atualização.");

        double posicaoDesejada = TAMANHO_LINHA - grid.getZumbis().get(0).getVelocidade();
        for (int i = 0; i < grid.getZumbis().size(); i++) {
            Assertions.assertEquals(
                    posicaoDesejada, grid.getZumbis().get(i).getPosicaoX(), DELTA,
                    "O zumbi deve ter se movido corretamente após a atualização.");
        }

        grid.adicionarPlanta(QUANTIDADE_LINHAS - 1, 0.0, tipoPlanta);
        Assertions.assertTrue(
                grid.getProjetis().isEmpty(),
                "Não deve haver projéteis no grid após a adição da planta, antes da atualização.");
        grid.atualizar();
        Assertions.assertFalse(
                grid.getProjetis().isEmpty(),
                "Deve haver projéteis no grid após a atualização com planta atiradora.");
    }

    @Test
    public void testAtualizarGridZumbiVence() {
        for (int i = 0; i < QUANTIDADE_LINHAS; i++) {
            grid.adicionarZumbi(i, tipoZumbi);
            grid.atualizar();
        }
        double posicaoAntes = grid.getZumbis().get(0).getPosicaoX();
        double velocidade = tipoZumbi.getVelocidade();

        while (grid.atualizar() == -1) {
            // Continua atualizando até que um zumbi alcance a casa
            Assertions.assertEquals(
                    posicaoAntes - velocidade, grid.getZumbis().get(0).getPosicaoX(), DELTA,
                    "O zumbi deve se mover corretamente para a esquerda.");
            posicaoAntes = grid.getZumbis().get(0).getPosicaoX();
        }
    }

    @Test
    public void testAtualizarGridPlantaVence() {
        for (int i = 0; i < QUANTIDADE_LINHAS; i++) {
            grid.adicionarZumbi(i, tipoZumbi);
            grid.adicionarPlanta(i, 0.0, tipoPlanta);
        }

        // Atualiza até que todos os zumbis morram
        while (grid.getZumbis().size() > 0) {
            if (grid.atualizar() == -1) {
                Assertions.fail("Os zumbis não deveriam vencer quando há plantas atiradoras.");
            }
        }

        Assertions.assertTrue(
                grid.getZumbis().isEmpty(),
                "Todos os zumbis devem ter sido eliminados pelas plantas.");
    }
}