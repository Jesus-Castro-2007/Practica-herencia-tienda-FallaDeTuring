import { mPrenda } from "./mPrenda.js";
export class mHoodie extends mPrenda {
    constructor(codigo, marca, costo, conEstampado, esColeccionPasada) {
        super(codigo, marca, costo); // Obligatorio como primera sentencia antes de 'this'
        this._conEstampado = false;
        this._esColeccionPasada = false;
        this.conEstampado = conEstampado;
        this.esColeccionPasada = esColeccionPasada;
    }
    set conEstampado(valor) {
        this._conEstampado = Boolean(valor);
    }
    get conEstampado() {
        return this._conEstampado;
    }
    set esColeccionPasada(valor) {
        this._esColeccionPasada = Boolean(valor);
    }
    get esColeccionPasada() {
        return this._esColeccionPasada;
    }
    // Sobreescritura: suma $8 si incluye estampado personalizado;
    // si pertenece a una colección pasada, aplica un descuento de $6 sobre el monto resultante.
    calcularPrecioFinal() {
        let precio = super.precioInicial();
        if (this.conEstampado) {
            precio += 8;
        }
        if (this.esColeccionPasada) {
            precio -= 6;
        }
        return precio;
    }
    obtenerTipo() {
        return "Hoodie";
    }
}
