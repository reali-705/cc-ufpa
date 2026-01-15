package ufpa.icen.pvz.model;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class PlantaTest {
    
    private Planta planta;

    @BeforeEach
    public void setUp() {
        planta = new Planta(Config.VIDA_ATIRADOR, Config.DANO_ATIRADOR, 1.0, 0);
    }

    @Test
    public void testReceberDano() {
        int dano = 15;
        int vidaEsperada = Config.VIDA_ATIRADOR - dano;
        planta.receberDano(dano);
        assertEquals(vidaEsperada, planta.getVida(), "A vida da planta após receber dano está incorreta.");
    }
}
