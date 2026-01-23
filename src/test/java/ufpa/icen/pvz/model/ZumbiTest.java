package ufpa.icen.pvz.model;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import ufpa.icen.pvz.config.Config;
import ufpa.icen.pvz.model.entidades.EntidadeViva;
import ufpa.icen.pvz.model.entidades.inimigos.Zumbi;
import ufpa.icen.pvz.model.enums.EstadoEntidade;

public class ZumbiTest {
    
    private Zumbi zumbi;

    @BeforeEach
    public void setUp() {
        // Cria um zumbi na posição inicial (9.0, 0) antes de cada teste
        zumbi = new Zumbi(9.0, 0);
    }

    @Test
    public void testReceberDano() {
        // Verifica se o dano é descontado corretamente da vida
        int dano = 20;
        int vidaEsperada = zumbi.getVida() - dano;
        zumbi.receberDano(dano);
        assertEquals(vidaEsperada, zumbi.getVida(), "A vida do zumbi após receber dano está incorreta.");
        assertFalse(zumbi.getVida() == zumbi.getVidaMaxima(), "A vida do zumbi deve ter diminuído após receber dano.");
    }

    @Test
    public void testMorrer() {
        // Aplica dano letal e verifica estado de morte
        zumbi.receberDano(zumbi.getVida());
        assertEquals(0, zumbi.getVida(), "A vida do zumbi deve ser zero após receber dano letal.");
        assertEquals(EstadoEntidade.MORTA, zumbi.getEstado(), "O estado do zumbi deve ser MORTA após morrer.");
        assertFalse(zumbi.podeAtacar(), "Zumbi morto não deve poder atacar.");
    }

    @Test
    public void testMovimento() {
        // Verifica se o zumbi anda para a esquerda (x diminui)
        zumbi.mover();
        double posicaoEsperada = 9.0 - zumbi.getVelocidade();
        assertTrue(zumbi.getPosicaoX() < 9.0, "A posição X do zumbi deve ter diminuído após o movimento.");
        assertEquals(posicaoEsperada, zumbi.getPosicaoX(), 0.01, "A posição X do zumbi após o movimento está incorreta.");
        assertEquals(0, zumbi.getPosicaoY(), "A posição Y do zumbi deve permanecer inalterada.");
    }
    
    @Test
    public void testAtaque() throws InterruptedException {
        // Configura Zumbi com cooldown rápido (10ms) para teste
        Config.StatusBasicoZumbi status = new Config.StatusBasicoZumbi(10, 10, 10, 0.5);
        Zumbi zumbiRapido = new Zumbi(9.0, 0, status);
        assertTrue(zumbiRapido.podeAtacar(), "Deve poder atacar no início.");
        
        // Alvo dummy (anônimo) para isolar o teste
        int vidaAlvo = 100;
        EntidadeViva alvo = new EntidadeViva(9.0, 0, vidaAlvo) {};
        
        // Realiza ataque e verifica dano + cooldown
        zumbiRapido.atingir(alvo);
        assertEquals(vidaAlvo - status.dano(), alvo.getVida(), "O alvo deve ter recebido dano.");
        assertFalse(zumbiRapido.podeAtacar(), "Não deve atacar antes do cooldown.");

        // Aguarda recarga (margem de segurança 5x maior que cooldown)
        Thread.sleep(50);
        assertTrue(zumbiRapido.podeAtacar(), "Deve poder atacar após o tempo de ataque.");
    }
}
