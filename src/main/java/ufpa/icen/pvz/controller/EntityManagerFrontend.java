package ufpa.icen.pvz.controller;

import ufpa.icen.pvz.view.personagem.PersonagemFrontEnd;
import ufpa.icen.pvz.view.personagem.PlantaFrontEnd;
import ufpa.icen.pvz.view.personagem.ZumbiFrontend;

import java.util.List;

public class EntityManagerFrontend {

    private final List<PlantaFrontEnd> plantas;
    private final List<ZumbiFrontend> zumbis;

    public EntityManagerFrontend(List<PlantaFrontEnd> plantas, List<ZumbiFrontend> zumbis) {
        this.plantas = plantas;
        this.zumbis = zumbis;
    }

    public PersonagemFrontEnd findByPixel(int x, int y) {
        for (int i = plantas.size() - 1; i >= 0; i--) {
            if (plantas.get(i).contain(x, y)) return plantas.get(i);
        }
        for (int i = zumbis.size() - 1; i >= 0; i--) {
            if (zumbis.get(i).contain(x, y)) return zumbis.get(i);
        }
        return null;
    }

    public void addPlanta(PlantaFrontEnd p) { plantas.add(p); }
    public void addZumbi(ZumbiFrontend z) { zumbis.add(z); }

    public void removePlantaAt(int row, int col) {
        plantas.removeIf(p -> p.getLinha() == row && p.getColuna() == col);
    }

    public void removeZumbiAt(int row, int col) {
        zumbis.removeIf(z -> z.getLinha() == row && z.getColuna() == col);
    }

    public List<PlantaFrontEnd> getPlantas() { return plantas; }
    public List<ZumbiFrontend> getZumbis() { return zumbis; }
}

