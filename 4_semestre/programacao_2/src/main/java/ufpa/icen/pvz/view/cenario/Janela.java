package ufpa.icen.pvz.view.cenario;

import javax.swing.*;
import java.awt.*;

public class Janela extends JFrame {

    public Janela(String titulo, int largura, int altura, JPanel conteudo) {
        super(titulo);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);

        // Adiciona o conteúdo (GameCenario + painel lateral)
        setContentPane(conteudo);

        setPreferredSize(new Dimension(largura, altura));
        pack(); // ajusta ao tamanho do conteúdo
        setLocationRelativeTo(null);
        setVisible(true);
    }
}
