import { mSneaker } from "./mSneaker.js";
export class mStore {
    constructor() {
        // Variables de control C-A-M-P-P (Contadores, Acumuladores, Menor/Mayor)
        this.acGananciaTotal = 0;
        this.cntPrendas = 0;
        this.mayorGanancia = 0;
        this.codMayorGanancia = "";
        this.minTallaSneaker = 0;
        this.cntSneakers = 0;
    }
    // Acepta mPrenda y cualquier subclase (mSneaker, mHoodie) por la regla "Es-un"
    procesarPrenda(prenda) {
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
    gananciaTotal() {
        return this.acGananciaTotal;
    }
    codigoMayorGanancia() {
        return this.codMayorGanancia;
    }
    montoMayorGanancia() {
        return this.mayorGanancia;
    }
    menorTallaSneaker() {
        return this.minTallaSneaker;
    }
    cantidadPrendas() {
        return this.cntPrendas;
    }
    cantidadSneakers() {
        return this.cntSneakers;
    }
    reiniciar() {
        this.acGananciaTotal = 0;
        this.cntPrendas = 0;
        this.mayorGanancia = 0;
        this.codMayorGanancia = "";
        this.minTallaSneaker = 0;
        this.cntSneakers = 0;
    }
}
