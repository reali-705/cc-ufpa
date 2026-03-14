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
            if (i == 0 || i == quantidadeLinhas - 1) {
                linhas[i] = null; // Linhas de borda
            } else {
                linhas[i] = new Linha(tamanhoLinha, i);
            }
        }
    }

    public int atualizar() {
        int solGeradoTotal = 0;
        for (Linha linha : linhas) {
            if (linha == null) {
                continue;
            }
            int solGerado = linha.atualizar();
            // Se algum zumbi alcançar a casa, o jogo acaba
            if (solGerado == -1) {
                return -1;
            }
            solGeradoTotal += solGerado;
        }
        // Nenhum zumbi alcançou a casa, retornar o total de sol gerado
        return solGeradoTotal;
    }

    public boolean adicionarPlanta(int indiceLinha, double posicaoX, TipoPlanta tipoPlanta) {
        if (indiceLinha < 0 || indiceLinha >= quantidadeLinhas) {
            return false;
        }
        if (linhas[indiceLinha] == null) {
            System.out.println("Não é possível adicionar planta na linha de borda: " + indiceLinha);
            return false;
        }
        if (posicaoX < 2 || posicaoX >= tamanhoLinha) {
            System.out.println("Posição X inválida para a planta: " + posicaoX);
            return false;
        }
        return linhas[indiceLinha].adicionarPlanta(posicaoX, tipoPlanta);
    }

    public void adicionarZumbi(int indiceLinha, TipoZumbi tipoZumbi) {
        if (indiceLinha < 0 || indiceLinha >= quantidadeLinhas) {
            return;
        }
        if (linhas[indiceLinha] == null) {
            System.out.println("Não é possível adicionar zumbi na linha de borda: " + indiceLinha);
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
            if (linha == null) {
                continue;
            }
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
            if (linha == null) {
                continue;
            }
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
            if (linha == null) {
                continue;
            }
            for (Planta planta : linha.getPlantas()) {
                if (planta != null && planta.estaViva()) {
                    plantas.add(planta);
                }
            }
        }
        return plantas;
    }

    public int getQuantidadeLinhas() {
        return quantidadeLinhas;
    }

    public double getTamanhoLinha() {
        return tamanhoLinha;
    }
}
