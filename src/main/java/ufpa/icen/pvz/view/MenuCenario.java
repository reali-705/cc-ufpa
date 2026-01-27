package ufpa.icen.pvz.view;
import javax.swing.JButton;
import ufpa.icen.pvz.assets.Assets;

public class MenuCenario extends Cenario {

    private JButton btnStart;
    private JButton btnSair;

    @Override
    protected void configurar() {
        setLayout(null);
    }

    @Override
    protected void criarComponentes() {
        btnStart = new JButton("Start");
        btnSair = new JButton("Sair");

        btnStart.setBounds(150, 120, 100, 40);
        btnSair.setBounds(150, 180, 100, 40);

        add(btnStart);
        add(btnSair);

        setImagemFundo(Assets.get("/assets/fundo_menu.png"));
    }

    @Override
    protected void adicionarEventos() {
        btnSair.addActionListener(e -> System.exit(0));
    }
}
