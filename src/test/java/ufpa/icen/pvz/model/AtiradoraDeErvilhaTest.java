package ufpa.icen.pvz.model;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import ufpa.icen.pvz.config.Config;
import ufpa.icen.pvz.model.entidades.Projetil;
import ufpa.icen.pvz.model.entidades.plantas.AtiradoraDeErvilha;
import ufpa.icen.pvz.model.enums.EstadoEntidade;

public class AtiradoraDeErvilhaTest {
    
    private AtiradoraDeErvilha planta;

    @BeforeEach
    public void setUp() {
        // Inicializa uma planta padrão antes de cada teste
        planta = new AtiradoraDeErvilha(2.0, 1);
    }

    @Test
    public void testReceberDano() {
        // Verifica redução de vida
        int dano = 30;
        int vidaEsperada = planta.getVida() - dano;
        planta.receberDano(dano);
        assertEquals(vidaEsperada, planta.getVida(), "A vida da planta após receber dano está incorreta.");
        assertFalse(planta.getVida() == planta.getVidaMaxima(), "A vida da planta deve ter diminuído após receber dano.");
    }
    
    @Test
    public void testMorrer() {
        // Verifica comportamento ao morrer
        planta.receberDano(planta.getVida());
        assertEquals(0, planta.getVida(), "A vida da planta deve ser zero após receber dano letal.");
        assertEquals(EstadoEntidade.MORTA, planta.getEstado(), "O estado da planta deve ser MORTA após morrer.");
        assertFalse(planta.podeAtacar(), "Planta morta não deve poder atacar.");
    }

    @Test
    public void testAtirar() throws InterruptedException {
        // Planta customizada com cooldown rápido (10ms)
        Config.StatusBasicoPlanta status = new Config.StatusBasicoPlanta(100, 50, 2000);
        Config.StatusAtaquePlanta statusAtaque = new Config.StatusAtaquePlanta(10, 10, 1.0);
        AtiradoraDeErvilha plantaRapida = new AtiradoraDeErvilha(2.0, 1, status, statusAtaque);
        
        assertTrue(plantaRapida.podeAtacar(), "Deve poder atacar no início.");
        
        // Verifica criação do projétil
        Projetil projetil = plantaRapida.atirar();

        assertNotNull(projetil, "O projétil não deve ser nulo ao atacar.");
        assertEquals(statusAtaque.dano(), projetil.getDano(), "O dano do projétil está incorreto.");

        // Verifica bloqueio de cooldown
        assertFalse(plantaRapida.podeAtacar(), "Não deve atacar antes do cooldown.");
        assertNull(plantaRapida.atirar(), "Deve retornar null se tentar atacar antes do cooldown.");
        
        // Aguarda recarga com margem segura
        Thread.sleep(50);
        assertTrue(plantaRapida.podeAtacar(), "Deve poder atacar após o tempo de ataque.");
    }
}
