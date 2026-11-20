import { mPrenda } from "./mPrenda.js";

export class mSneaker extends mPrenda {
  private _esAltaDemanda: boolean = false;
  private _tallaUs: number = 0;

  constructor(
    codigo: string,
    marca: string,
    costo: number,
    esAltaDemanda: boolean,
    tallaUs: number
  ) {
    super(codigo, marca, costo); // Obligatorio como primera sentencia antes de 'this'
    this.esAltaDemanda = esAltaDemanda;
    this.tallaUs = tallaUs;
  }

  set esAltaDemanda(valor: boolean) {
    this._esAltaDemanda = Boolean(valor);
  }

  get esAltaDemanda(): boolean {
    return this._esAltaDemanda;
  }

  set tallaUs(valor: number) {
    this._tallaUs = +valor; // Coerción numérica para talla real
  }

  get tallaUs(): number {
    return this._tallaUs;
  }

  // Sobreescritura: suma $15 de tasa de importación al precio inicial.
  // Si es talla de alta demanda, incrementa un 10% adicional sobre ese subtotal.
  override calcularPrecioFinal(): number {
    const subtotal = super.precioInicial() + 15;
    if (this.esAltaDemanda) {
      return subtotal * 1.10;
    }
    return subtotal;
  }

  override obtenerTipo(): string {
    return "Sneaker";
  }
}
