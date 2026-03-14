package ufpa.icen.pvz.model.entidades.plantas;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import ufpa.icen.pvz.model.entidades.Projetil;
import ufpa.icen.pvz.model.enums.EstadoEntidade;
import ufpa.icen.pvz.model.enums.TipoPlanta;

public class AtiradoraDeErvilhaTest {

    private AtiradoraDeErvilha atiradora;
    private final double POSICAO_X_INICIAL = 2.0;
    private final int POSICAO_Y_INICIAL = 1;
    private final TipoPlanta TIPO_PLANTA = TipoPlanta.ATIRADORA_DE_ERVILHA;
    private final double DELTA = 0.01;

    @BeforeEach
    public void setUp() {
        // Inicializa uma nova atiradora antes de cada teste
        atiradora = new AtiradoraDeErvilha(POSICAO_X_INICIAL, POSICAO_Y_INICIAL);
    }

    @Test
    public void testCriacaoAtiradora() {
        // Verifica se os atributos iniciais correspondem ao TipoPlanta
        Assertions.assertEquals(
            POSICAO_X_INICIAL, atiradora.getPosicaoX(), DELTA,
            "Posição X inicial incorreta."
        );
        Assertions.assertEquals(
            POSICAO_Y_INICIAL, atiradora.getPosicaoY(),
            "Posição Y inicial incorreta."
        );
        Assertions.assertEquals(
            TIPO_PLANTA.getVida(), atiradora.getVida(),
            "Vida inicial da atiradora deve ser " + TIPO_PLANTA.getVida() + "."
        );
        Assertions.assertEquals(
            TIPO_PLANTA.getStatusAtaque().dano(), atiradora.getDano(),
            "Dano inicial incorreto."
        );
        Assertions.assertEquals(
            TIPO_PLANTA.getStatusAtaque().cooldownAtaque(), atiradora.getCooldownAtaque(),
            "Tempo de ataque inicial incorreto."
        );
        Assertions.assertTrue(
            atiradora.estaViva(),
            "Atiradora deve estar viva ao ser criada."
        );
        Assertions.assertEquals(
            EstadoEntidade.PRONTA, atiradora.getEstado(),
            "Estado inicial da atiradora deve ser PRONTA."
        );
    }

    @Test
    public void testAtirar() {
        Projetil porjetil = atiradora.atirar();
        Assertions.assertNotNull(
            porjetil,
            "O método atirar() deve retornar um projétil quando a atiradora está PRONTA."
        );
        Assertions.assertEquals(
            EstadoEntidade.ESPERANDO, atiradora.getEstado(),
            "Após atirar, o estado da atiradora deve ser ESPERANDO."
        );

        atiradora.atualizar(); // Deve permanecer ESPERANDO
        Assertions.assertEquals(
            EstadoEntidade.ESPERANDO, atiradora.getEstado(),
            "A atiradora deve permanecer em ESPERANDO após atualizar() se o tempo de ataque não passou."
        );

        int deltaContagem = TIPO_PLANTA.getStatusAtaque().cooldownAtaque() - atiradora.getContador();
        for (int i = 0; i < deltaContagem; i++) {
            atiradora.atualizar();
        }

        Assertions.assertEquals(
            EstadoEntidade.PRONTA, atiradora.getEstado(),
            "Após o tempo de ataque, a atiradora deve voltar ao estado PRONTA."
        );
    }

    @Test
    public void testReceberDano() {        
        int dano = 20;

        atiradora.receberDano(dano);
        Assertions.assertEquals(
            TIPO_PLANTA.getVida() - dano, atiradora.getVida(),
            "A atiradora deve ter sua vida reduzida corretamente ao receber dano."
        );

        atiradora.receberDano(-dano);
        Assertions.assertEquals(
            TIPO_PLANTA.getVida() - 2*dano, atiradora.getVida(),
            "A atiradora deve ter sua vida reduzida corretamente ao receber dano com valor negativo."
        );
    }

    @Test
    public void testMorteDaAtiradora() {
        atiradora.receberDano(TIPO_PLANTA.getVida() + 10); // Dano maior que a vida
        Assertions.assertEquals(
            0, atiradora.getVida(),
            "A vida da atiradora deve ser zero após receber dano fatal."
        );
        Assertions.assertFalse(
            atiradora.estaViva(),
            "A atiradora deve estar morta após receber dano fatal."
        );
        Assertions.assertEquals(
            EstadoEntidade.INATIVA, atiradora.getEstado(),
            "O estado da atiradora deve ser INATIVA após morrer."
        );

        atiradora.atualizar(); // Deve permanecer INATIVA
        Assertions.assertEquals(
            EstadoEntidade.INATIVA, atiradora.getEstado(),
            "A atiradora deve permanecer INATIVA após atualizar() se estiver morta."
        );

        Projetil projétil = atiradora.atirar();
        Assertions.assertNull(
            projétil,
            "O método atirar() deve retornar null quando a atiradora está morta."
        );
    }
}
