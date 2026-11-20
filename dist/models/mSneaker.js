import { mPrenda } from "./mPrenda.js";
export class mSneaker extends mPrenda {
    constructor(codigo, marca, costo, esAltaDemanda, tallaUs) {
        super(codigo, marca, costo); // Obligatorio como primera sentencia antes de 'this'
        this._esAltaDemanda = false;
        this._tallaUs = 0;
        this.esAltaDemanda = esAltaDemanda;
        this.tallaUs = tallaUs;
    }
    set esAltaDemanda(valor) {
        this._esAltaDemanda = Boolean(valor);
    }
    get esAltaDemanda() {
        return this._esAltaDemanda;
    }
    set tallaUs(valor) {
        this._tallaUs = +valor; // Coerción numérica para talla real
    }
    get tallaUs() {
        return this._tallaUs;
    }
    // Sobreescritura: suma $15 de tasa de importación al precio inicial.
    // Si es talla de alta demanda, incrementa un 10% adicional sobre ese subtotal.
    calcularPrecioFinal() {
        const subtotal = super.precioInicial() + 15;
        if (this.esAltaDemanda) {
            return subtotal * 1.10;
        }
        return subtotal;
    }
    obtenerTipo() {
        return "Sneaker";
    }
}
