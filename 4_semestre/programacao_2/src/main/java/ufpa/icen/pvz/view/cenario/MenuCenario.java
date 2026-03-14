package ufpa.icen.pvz.view.cenario;
import javax.swing.KeyStroke;
import javax.swing.AbstractAction;
import java.awt.image.BufferedImage;
import java.awt.Graphics;
import java.awt.event.KeyEvent;
import java.awt.event.ActionEvent;
import ufpa.icen.pvz.assets.Assets;

public class MenuCenario extends Cenario {

    private BufferedImage fundoImage;

    @Override
    protected void configurar() {
        setLayout(null);
        setFocusable(true);
    }

    @Override
    protected void criarComponentes() {
        // Load background image from Assets
        loadBackgroundImage("/assets/fundo.png");
    }

    private void loadBackgroundImage(String path) {
        try {
            fundoImage = Assets.get(path);
            if (fundoImage != null) {
                System.out.println("✓ Imagem carregada com sucesso: " + path);
                repaint();
            } else {
                System.err.println("✗ Imagem retornou null: " + path);
            }
        } catch (Exception e) {
            System.err.println("✗ Erro ao carregar: " + path);
            e.printStackTrace();
        }
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        if (fundoImage != null) {
            g.drawImage(fundoImage, 0, 0, getWidth(), getHeight(), this);
        }
    }

    @Override
    protected void adicionarEventos() {
        // ENTER para iniciar
        getInputMap().put(KeyStroke.getKeyStroke(KeyEvent.VK_ENTER, 0), "start");
        getActionMap().put("start", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("✓ Iniciando jogo...");
                
            }
        });

        // ESC para sair
        getInputMap().put(KeyStroke.getKeyStroke(KeyEvent.VK_ESCAPE, 0), "exit");
        getActionMap().put("exit", new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                System.out.println("✓ Saindo do jogo...");
                System.exit(0);
            }
        });
    }
}
