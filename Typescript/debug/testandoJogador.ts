import { Jogador } from "../classes/jogador";
import { planeta } from "./testandoPlanetas";

export const jogador = new Jogador("teste", planeta);

planeta.print();
console.log("\nTESTANDO JOGADOR");
jogador.print();

console.log("\nMovendo para Leste...");
jogador.irLeste();
console.log("Minerando...");
jogador.minerar();
jogador.print();

console.log("\nMovendo para Leste...");
jogador.irLeste();
console.log("Minerando...");
jogador.minerar();
jogador.print();

console.log("\nMovendo para Oeste...");
jogador.irOeste();
console.log("Minerando...");
jogador.minerar();
jogador.print();