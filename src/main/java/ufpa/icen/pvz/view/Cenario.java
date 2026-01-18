package ufpa.icen.pvz.view;

import javax.swing.JPanel;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import java.io.IOException;

public class Cenario extends JPanel{
    BufferedImage imagemFundo;
    public Cenario() {
        try {
            imagemFundo = ImageIO.read(
                getClass().getResourceAsStream("/assets/fundo.png")
            );
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
