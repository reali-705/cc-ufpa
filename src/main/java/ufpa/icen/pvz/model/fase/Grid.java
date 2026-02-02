package ufpa.icen.pvz.model.fase;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import ufpa.icen.pvz.model.entidades.Projetil;
import ufpa.icen.pvz.model.entidades.inimigos.Zumbi;
import ufpa.icen.pvz.model.entidades.plantas.Planta;
import ufpa.icen.pvz.model.enums.TipoPlanta;
import ufpa.icen.pvz.model.enums.TipoZumbi;

public class Grid {
    private final Linha[] linhas;
    private final double tamanhoLinha;
    private final int quantidadeLinhas;

    public Grid(int quantidadeLinhas, double tamanhoLinha) {
        this.quantidadeLinhas = quantidadeLinhas;
        this.tamanhoLinha = tamanhoLinha;
        linhas = new Linha[quantidadeLinhas];
        for (int i = 0; i < quantidadeLinhas; i++) {
            linhas[i] = new Linha(tamanhoLinha, i);
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
        if (indiceLinha < 0 || indiceLinha >= quantidadeLinhas) {
            return false;
        }
        return linhas[indiceLinha].adicionarPlanta(posicaoX, tipoPlanta);
    }

    public void adicionarZumbi(int indiceLinha, TipoZumbi tipoZumbi) {
        if (indiceLinha < 0 || indiceLinha >= quantidadeLinhas) {
            return;
        }
        linhas[indiceLinha].adicionarZumbi(tipoZumbi);
    }

    public List<Linha> getLinhas() {
        return Arrays.asList(linhas);
    }

    public List<Zumbi> getZumbis() {
        List<Zumbi> zumbis = new ArrayList<>();
        for (Linha linha : linhas) {
            for (Zumbi zumbi : linha.getZumbis()) {
                if (zumbi.estaViva()) {
                    zumbis.add(zumbi);
                }
            }
        }
        return zumbis;
    }

    public List<Projetil> getProjetis() {
        List<Projetil> projetis = new ArrayList<>();
        for (Linha linha : linhas) {
            for (Projetil projetil : linha.getProjetis()) {
                if (projetil.estaAtiva(linha.getTamanho())) {
                    projetis.add(projetil);
                }
            }
        }
        return projetis;
    }

    public List<Planta> getPlantas() {
        List<Planta> plantas = new ArrayList<>();
        for (Linha linha : linhas) {
            for (Planta planta : linha.getPlantas()) {
                if (planta != null && planta.estaViva()) {
                    plantas.add(planta);
                }
            }
        }
        return plantas;
    }

    public int getQuantidadeLinhas() { return quantidadeLinhas; }
    public double getTamanhoLinha() { return tamanhoLinha; }
}
