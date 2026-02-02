package ufpa.icen.pvz.controller;

import ufpa.icen.pvz.view.personagem.PersonagemFrontEnd;
import ufpa.icen.pvz.view.personagem.PlantaFrontEnd;
import ufpa.icen.pvz.view.personagem.ZumbiFrontend;
import ufpa.icen.pvz.view.personagem.ProjetilFrontend;

import java.util.List;

public class EntityManagerFrontend {

    private final List<PlantaFrontEnd> plantas;
    private final List<ZumbiFrontend> zumbis;
    private final List<ProjetilFrontend> projeteis;

    public EntityManagerFrontend(List<PlantaFrontEnd> plantas,
                                 List<ZumbiFrontend> zumbis,
                                 List<ProjetilFrontend> projeteis) {
        this.plantas = plantas;
        this.zumbis = zumbis;
        this.projeteis = projeteis;
    }

    // busca por pixel (plantas e zumbis continuam selecionáveis)
    public PersonagemFrontEnd findByPixel(int x, int y) {
        for (int i = plantas.size() - 1; i >= 0; i--) {
            if (plantas.get(i).contain(x, y)) return plantas.get(i);
        }
        for (int i = zumbis.size() - 1; i >= 0; i--) {
            if (zumbis.get(i).contain(x, y)) return zumbis.get(i);
        }
        return null;
    }

    // adição
    public void addPlanta(PlantaFrontEnd p) { plantas.add(p); }
    public void addZumbi(ZumbiFrontend z) { zumbis.add(z); }
    public void addProjetil(ProjetilFrontend p) { projeteis.add(p); }

    // remoção por célula
    public void removePlantaAt(int row, int col) {
        plantas.removeIf(p -> p.getLinha() == row && p.getColuna() == col);
    }

    public void removeZumbiAt(int row, int col) {
        zumbis.removeIf(z -> z.getLinha() == row && z.getColuna() == col);
    }

    public void removeProjetilAt(int row, int col) {
        projeteis.removeIf(p -> p.getRow() == row && p.getCol() == col);
    }

    // getters
    public List<PlantaFrontEnd> getPlantas() { return plantas; }
    public List<ZumbiFrontend> getZumbis() { return zumbis; }
    public List<ProjetilFrontend> getProjeteis() { return projeteis; }
}
