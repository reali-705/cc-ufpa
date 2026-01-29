package ufpa.icen.pvz.model.fase;

import java.util.ArrayList;
import java.util.List;

import ufpa.icen.pvz.model.entidades.inimigos.Zumbi;
import ufpa.icen.pvz.model.entidades.plantas.Planta;
import ufpa.icen.pvz.model.enums.TipoPlanta;

public class Grid {
    private final List<Linha> linhas;

    public Grid(int quantidadeLinhas, double tamanhoLinha) {
        linhas = new ArrayList<>();
        for (int i = 0; i < quantidadeLinhas; i++) {
            linhas.add(new Linha(tamanhoLinha, i));
        }
    }

    public boolean atualizar() {
        for (Linha linha : linhas) {
            // Se algum zumbi alcançar a casa, o jogo acaba
            if (linha.atualizar()) {
                return true;
            }
        }
        // Nenhum zumbi alcançou a casa
        return false;
    }

    public boolean adicionarPlanta(int indiceLinha, double posicaoX, TipoPlanta tipoPlanta) {
        if (indiceLinha < 0 || indiceLinha >= linhas.size()) {
            return false;
        }
        return linhas.get(indiceLinha).adicionarPlanta(posicaoX, tipoPlanta);
    }

    public void adicionarZumbi(int indiceLinha, Class<? extends Zumbi> tipoZumbi) {
        if (indiceLinha < 0 || indiceLinha >= linhas.size()) {
            return;
        }
        linhas.get(indiceLinha).adicionarZumbi(tipoZumbi);
    }

    public List<Linha> getLinhas() {
        return linhas;
    }
}
