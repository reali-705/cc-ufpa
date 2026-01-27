package ufpa.icen.pvz.view;

import javax.swing.JFrame;
import javax.swing.SwingUtilities;

public class GameView {
    private JFrame telajogo;

    public GameView() {
        // Cria a janela principal
        telajogo = new JFrame("Plants vs Zombies");
        telajogo.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        telajogo.setSize(800, 600);
        telajogo.setLocationRelativeTo(null);
        telajogo.setResizable(false);

        // Adiciona o MenuCenario
        MenuCenario menuCenario = new MenuCenario();
        telajogo.getContentPane().add(menuCenario);

        telajogo.setVisible(true);
    }

   
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new GameView());
    }
}
