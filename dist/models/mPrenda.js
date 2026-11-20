export class mPrenda {
    constructor(codigo, marca, costo) {
        this._codigo = "";
        this._marca = "";
        this._costo = 0;
        this.codigo = codigo;
        this.marca = marca;
        this.costo = costo;
    }
    set codigo(valor) {
        this._codigo = valor.trim();
    }
    get codigo() {
        return this._codigo;
    }
    set marca(valor) {
        this._marca = valor.trim();
    }
    get marca() {
        return this._marca;
    }
    set costo(valor) {
        this._costo = +valor; // Coerción numérica estricta
    }
    get costo() {
        return this._costo;
    }
    // Margen base del 30% sobre el costo de adquisición
    precioInicial() {
        return this.costo * 1.30;
    }
    // Método base que puede ser sobreescrito por las subclases especializadas
    calcularPrecioFinal() {
        return this.precioInicial();
    }
    // Ganancia neta: precioFinal - costo
    calcularGananciaNeta() {
        return this.calcularPrecioFinal() - this.costo;
    }
    obtenerTipo() {
        return "Prenda";
    }
}
