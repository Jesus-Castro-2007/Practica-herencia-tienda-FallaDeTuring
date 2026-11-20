import { mPrenda } from "./mPrenda.js";
import { mSneaker } from "./mSneaker.js";

export class mStore {
  // Variables de control C-A-M-P-P (Contadores, Acumuladores, Menor/Mayor)
  private acGananciaTotal: number = 0;
  private cntPrendas: number = 0;
  private mayorGanancia: number = 0;
  private codMayorGanancia: string = "";
  private minTallaSneaker: number = 0;
  private cntSneakers: number = 0;

  // Acepta mPrenda y cualquier subclase (mSneaker, mHoodie) por la regla "Es-un"
  procesarPrenda(prenda: mPrenda): void {
    const ganancia = prenda.calcularGananciaNeta();

    // 1. Acumular ganancia total y contar prendas
    this.acGananciaTotal += ganancia;
    this.cntPrendas++;

    // 2. Determinar producto con mayor ganancia neta
    if (this.cntPrendas === 1 || ganancia > this.mayorGanancia) {
      this.mayorGanancia = ganancia;
      this.codMayorGanancia = prenda.codigo;
    }

    // 3. Nuevo Requerimiento: determinar la menor talla registrada entre los sneakers vendidos
    if (prenda instanceof mSneaker) {
      this.cntSneakers++;
      if (this.cntSneakers === 1 || prenda.tallaUs < this.minTallaSneaker) {
        this.minTallaSneaker = prenda.tallaUs;
      }
    }
  }

  gananciaTotal(): number {
    return this.acGananciaTotal;
  }

  codigoMayorGanancia(): string {
    return this.codMayorGanancia;
  }

  montoMayorGanancia(): number {
    return this.mayorGanancia;
  }

  menorTallaSneaker(): number {
    return this.minTallaSneaker;
  }

  cantidadPrendas(): number {
    return this.cntPrendas;
  }

  cantidadSneakers(): number {
    return this.cntSneakers;
  }

  reiniciar(): void {
    this.acGananciaTotal = 0;
    this.cntPrendas = 0;
    this.mayorGanancia = 0;
    this.codMayorGanancia = "";
    this.minTallaSneaker = 0;
    this.cntSneakers = 0;
  }
}
