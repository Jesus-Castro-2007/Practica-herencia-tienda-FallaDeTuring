import { mPrenda } from "./mPrenda.js";

export class mHoodie extends mPrenda {
  private _conEstampado: boolean = false;
  private _esColeccionPasada: boolean = false;

  constructor(
    codigo: string,
    marca: string,
    costo: number,
    conEstampado: boolean,
    esColeccionPasada: boolean
  ) {
    super(codigo, marca, costo); // Obligatorio como primera sentencia antes de 'this'
    this.conEstampado = conEstampado;
    this.esColeccionPasada = esColeccionPasada;
  }

  set conEstampado(valor: boolean) {
    this._conEstampado = Boolean(valor);
  }

  get conEstampado(): boolean {
    return this._conEstampado;
  }

  set esColeccionPasada(valor: boolean) {
    this._esColeccionPasada = Boolean(valor);
  }

  get esColeccionPasada(): boolean {
    return this._esColeccionPasada;
  }

  // Sobreescritura: suma $8 si incluye estampado personalizado;
  // si pertenece a una colección pasada, aplica un descuento de $6 sobre el monto resultante.
  override calcularPrecioFinal(): number {
    let precio = super.precioInicial();
    if (this.conEstampado) {
      precio += 8;
    }
    if (this.esColeccionPasada) {
      precio -= 6;
    }
    return precio;
  }

  override obtenerTipo(): string {
    return "Hoodie";
  }
}
