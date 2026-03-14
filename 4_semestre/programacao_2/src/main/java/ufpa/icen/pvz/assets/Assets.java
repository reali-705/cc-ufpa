package ufpa.icen.pvz.assets;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import javax.imageio.ImageIO;

public class Assets {

    private static final Map<String, BufferedImage> cache = new HashMap<>();

    private Assets() {}

    public static BufferedImage get(String path) {
        return cache.computeIfAbsent(path, p -> {
            try {
                InputStream input = Assets.class.getResourceAsStream(p);
                if (input == null) {
                    System.err.println("Arquivo não encontrado: " + p);
                    return null;
                }
                return ImageIO.read(input);
            } catch (IOException e) {
                System.err.println("Erro ao ler imagem: " + p);
                e.printStackTrace();
                return null;
            }
        });
    }
}