export class mPrenda {
  protected _codigo: string = "";
  protected _marca: string = "";
  protected _costo: number = 0;

  constructor(codigo: string, marca: string, costo: number) {
    this.codigo = codigo;
    this.marca = marca;
    this.costo = costo;
  }

  set codigo(valor: string) {
    this._codigo = valor.trim();
  }

  get codigo(): string {
    return this._codigo;
  }

  set marca(valor: string) {
    this._marca = valor.trim();
  }

  get marca(): string {
    return this._marca;
  }

  set costo(valor: number) {
    this._costo = +valor; // Coerción numérica estricta
  }

  get costo(): number {
    return this._costo;
  }

  // Margen base del 30% sobre el costo de adquisición
  precioInicial(): number {
    return this.costo * 1.30;
  }

  // Método base que puede ser sobreescrito por las subclases especializadas
  calcularPrecioFinal(): number {
    return this.precioInicial();
  }

  // Ganancia neta: precioFinal - costo
  calcularGananciaNeta(): number {
    return this.calcularPrecioFinal() - this.costo;
  }

  obtenerTipo(): string {
    return "Prenda";
  }
}
