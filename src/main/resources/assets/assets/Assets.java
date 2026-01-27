package assets;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.imageio.ImageIO;

public class Assets {

    private static final Map<String, BufferedImage> cache = new HashMap<>();

    private Assets() {}

    public static BufferedImage get(String path) {
        return cache.computeIfAbsent(path, p -> {
            try {
                return ImageIO.read(
                    Assets.class.getResourceAsStream(p)
                );
            } catch (IOException | NullPointerException e) {
                throw new RuntimeException("Erro ao carregar asset: " + p, e);
            }
        });
    }
}
