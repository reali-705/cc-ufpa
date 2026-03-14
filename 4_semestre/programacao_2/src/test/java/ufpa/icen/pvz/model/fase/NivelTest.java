package ufpa.icen.pvz.model.fase;

import java.util.List;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import ufpa.icen.pvz.model.entidades.inimigos.Zumbi;
import ufpa.icen.pvz.model.enums.DificuldadeNivel;
import ufpa.icen.pvz.model.enums.TipoPlanta;

public class NivelTest {
    private Nivel nivel;

    @BeforeEach
    public void setUp() {
        nivel = new Nivel(0); // Dificuldade tutorial
    }

    @Test
    public void testCriarNivel() {
        Assertions.assertNotNull(nivel, "O nível não deve ser nulo após a criação.");

        DificuldadeNivel dificuldade = nivel.getDificuldade();
        Assertions.assertNotNull(dificuldade, "A dificuldade do nível não deve ser nula.");
        Assertions.assertEquals(
                DificuldadeNivel.TUTORIAL, dificuldade,
                "A dificuldade do nível deve ser TUTORIAL para o índice 0.");
    }

    @Test
    public void testTentarPlantar() {
        Assertions.assertTrue(
                nivel.tentarPlantar(0, 2.0, TipoPlanta.ATIRADORA_DE_ERVILHA),
                "Deve ser possível plantar na posição válida.");

        Assertions.assertFalse(
                nivel.tentarPlantar(0, 0.0, TipoPlanta.ATIRADORA_DE_ERVILHA),
                "Não deve ser possível plantar com recursos insuficientes.");

        Assertions.assertFalse(
                nivel.tentarPlantar(0, 2.0, TipoPlanta.ATIRADORA_DE_ERVILHA),
                "Não deve ser possível plantar na posição já ocupada.");

        Assertions.assertFalse(
                nivel.tentarPlantar(-1, 2.0, TipoPlanta.ATIRADORA_DE_ERVILHA),
                "Não deve ser possível plantar em linha inválida.");

        Assertions.assertFalse(
                nivel.tentarPlantar(0, nivel.getGrid().getTamanhoLinha(), TipoPlanta.ATIRADORA_DE_ERVILHA),
                "Não deve ser possível plantar em linha inválida.");
    }

    @Test
    public void testAtualizarNivelPerder() {
        while (nivel.getGrid().getZumbis().isEmpty()) {
            Assertions.assertFalse(
                    nivel.atualizar(),
                    "O nível não deve terminar imediatamente após a atualização inicial.");
        }

        Zumbi zumbi = nivel.getGrid().getZumbis().get(0);
        Assertions.assertNotNull(zumbi, "Deve haver um zumbi no nível após várias atualizações.");
        double posicaoAntes = zumbi.getPosicaoX();
        double velocidade = zumbi.getVelocidade();

        while (nivel.atualizar() == false) {
            Assertions.assertEquals(
                    posicaoAntes - velocidade, zumbi.getPosicaoX(),
                    "O zumbi deve se mover para a esquerda a cada atualização.");
            posicaoAntes = zumbi.getPosicaoX();
        }

        Assertions.assertEquals(
                "Um zumbi alcançou sua casa! Fim de jogo!", nivel.getGameOver(),
                "O jogo deve terminar quando um zumbi alcança a casa.");
    }

    @Test
    public void testAtualizarNivelVencer() {
        while (nivel.atualizar() == false) {
            List<Zumbi> zumbis = nivel.getGrid().getZumbis();
            for (Zumbi zumbi : zumbis) {
                zumbi.receberDano(zumbi.getVida()); // Causa dano suficiente para matar o zumbi
            }
        }
        Assertions.assertEquals(
                "Todos os zumbis foram derrotados! Você venceu!", nivel.getGameOver(),
                "O jogo deve terminar com vitória quando todos os zumbis forem derrotados.");
    }

    @Test
    public void testRecursosJogador() {
        DificuldadeNivel.ConfigRecursos configRecursos = nivel.getDificuldade().getConfigRecursos();

        int recursosEsperados = configRecursos.recursosIniciais();
        Assertions.assertEquals(
                recursosEsperados, nivel.getRecursosJogador(),
                "Os recursos iniciais do jogador devem estar corretos.");

        int cooldownRecursos = configRecursos.cooldownRecursos();
        for (int i = 1; i < cooldownRecursos; i++) {
            nivel.atualizar();
            Assertions.assertEquals(
                    recursosEsperados, nivel.getRecursosJogador(),
                    "Os recursos do jogador não devem aumentar antes do cooldown.");
        }

        nivel.atualizar(); // Atualização que deve aumentar os recursos
        recursosEsperados += configRecursos.recursosPorCiclo();
        Assertions.assertEquals(
                recursosEsperados, nivel.getRecursosJogador(),
                "Os recursos do jogador devem aumentar após o cooldown.");
    }

    @Test
    public void testGirassolGeradora() {
        nivel.tentarPlantar(0, 0.0, TipoPlanta.GIRASSOL);
        int cooldownGeracao = TipoPlanta.GIRASSOL.getStatusGeracao().cooldownGeracao();

        // Ajusta o contador para que o cooldown do girassol seja testado corretamente
        int cooldownRecursos = nivel.getDificuldade().getConfigRecursos().cooldownRecursos();
        while (cooldownGeracao > cooldownRecursos) {
            nivel.atualizar();
            cooldownGeracao -= 1;
        }

        int recursosIniciais = nivel.getRecursosJogador();
        for (int i = 1; i < cooldownGeracao; i++) {
            nivel.atualizar();
            Assertions.assertEquals(
                    recursosIniciais, nivel.getRecursosJogador(),
                    "Os recursos do jogador não devem aumentar antes do cooldown do girassol.");
        }
    }

    @Test
    public void testGeradorZumbis() {
        DificuldadeNivel.ConfigZumbis configZumbis = nivel.getDificuldade().getConfigZumbis();

        int hordaEsperada = configZumbis.tamanhoHorda();
        int zumbisGerados = 0;
        Assertions.assertEquals(
                zumbisGerados, nivel.getGrid().getZumbis().size(),
                "Nenhum zumbi deve estar presente no início do nível.");

        int cooldownSpawnZumbi = configZumbis.cooldownSpawnZumbi();
        for (int i = 0; i < cooldownSpawnZumbi; i++) {
            if (i < cooldownSpawnZumbi) {
                Assertions.assertEquals(
                        zumbisGerados, nivel.getGrid().getZumbis().size(),
                        "Nenhum zumbi deve ser gerado antes do cooldown.");
            } else {
                zumbisGerados += hordaEsperada;
                Assertions.assertEquals(
                        zumbisGerados, nivel.getGrid().getZumbis().size(),
                        "Uma horda de zumbis deve ser gerada após o cooldown.");
            }
            nivel.atualizar();
        }
    }

    @Test
    public void testPartidaNormal() {
        int custo = TipoPlanta.ATIRADORA_DE_ERVILHA.getCusto();
        nivel.tentarPlantar(0, 0.0, TipoPlanta.ATIRADORA_DE_ERVILHA);

        while (nivel.atualizar() == false) {
            int recursos = nivel.getRecursosJogador();

            if (recursos >= custo) {
                double i = (double) nivel.getGrid().getPlantas().size();
                nivel.tentarPlantar(0, i, TipoPlanta.ATIRADORA_DE_ERVILHA);
            }
        }
        Assertions.assertEquals(
                "Todos os zumbis foram derrotados! Você venceu!", nivel.getGameOver(),
                "O jogo deve terminar com vitória quando todos os zumbis forem derrotados.");
    }
}
