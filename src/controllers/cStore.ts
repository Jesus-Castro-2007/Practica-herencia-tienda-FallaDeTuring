import { mStore } from "../models/mStore.js";
import { mPrenda } from "../models/mPrenda.js";
import { mSneaker } from "../models/mSneaker.js";
import { mHoodie } from "../models/mHoodie.js";
import { IStoreView } from "../interfaces/IStoreView.js";

export class cStore {
  private modelo: mStore;
  private vista: IStoreView;

  // Inyección de dependencias en el constructor
  constructor(modeloIny: mStore, vistaIny: IStoreView) {
    this.modelo = modeloIny;
    this.vista = vistaIny;
  }

  iniciar(): void {
    // 1. Suscripción de eventos desde la Vista
    this.vista.onProcesar(() => this.procesarProducto());
    this.vista.onCargarCasosPrueba(() => this.cargarCasosPrueba());
    this.vista.onLimpiar(() => this.reiniciar());

    // 2. Ejecución automática de los datos de prueba oficiales al cargar
    this.cargarCasosPrueba();
  }

  private procesarProducto(): void {
    const codigo = this.vista.codigo;
    const marca = this.vista.marca;
    const costo = this.vista.costo;
    const tipo = this.vista.tipo;

    // Validaciones básicas de entrada
    if (!codigo || !marca) {
      this.vista.mostrarMensaje("Por favor, ingrese el código y la marca del producto.", "warning");
      return;
    }

    if (isNaN(costo) || costo <= 0) {
      this.vista.mostrarMensaje("El costo debe ser un valor numérico positivo mayor a 0.", "danger");
      return;
    }

    let prenda: mPrenda;

    if (tipo === "sneaker") {
      const tallaUs = this.vista.tallaUs;
      if (isNaN(tallaUs) || tallaUs <= 0) {
        this.vista.mostrarMensaje("Por favor ingrese una talla US válida (número real mayor a 0).", "danger");
        return;
      }
      prenda = new mSneaker(
        codigo,
        marca,
        costo,
        this.vista.esAltaDemanda,
        tallaUs
      );
    } else {
      prenda = new mHoodie(
        codigo,
        marca,
        costo,
        this.vista.conEstampado,
        this.vista.esColeccionPasada
      );
    }

    // 1. Procesar en el Modelo Mayor
    this.modelo.procesarPrenda(prenda);

    // 2. Reportar prenda individual en la Vista
    this.vista.reportarPrenda(
      prenda.codigo,
      prenda.marca,
      prenda.obtenerTipo(),
      prenda.calcularPrecioFinal(),
      prenda.calcularGananciaNeta()
    );

    // 3. Reporte gerencial de resumen
    this.vista.reportarResumen(
      this.modelo.gananciaTotal(),
      this.modelo.codigoMayorGanancia(),
      this.modelo.montoMayorGanancia(),
      this.modelo.menorTallaSneaker(),
      this.modelo.cantidadPrendas()
    );

    this.vista.limpiarFormulario();
    this.vista.mostrarMensaje(`Artículo ${prenda.codigo} procesado correctamente.`, "success");
  }

  private cargarCasosPrueba(): void {
    // Limpieza de estados previos
    this.modelo.reiniciar();
    this.vista.reiniciarVista();

    // 1. Instanciamos objetos individuales (estricto: cero arreglos [])
    // S01: Sneaker, Nike, Costo: 50, Alta demanda: Sí, Talla: 9.5
    const prenda1 = new mSneaker("S01", "Nike", 50, true, 9.5);

    // H01: Hoodie, Adidas, Costo: 20, Estampado: Sí, Colección pasada: No
    const prenda2 = new mHoodie("H01", "Adidas", 20, true, false);

    // S02: Sneaker, Puma, Costo: 40, Alta demanda: No, Talla: 8.5
    const prenda3 = new mSneaker("S02", "Puma", 40, false, 8.5);

    // H02: Hoodie, Vans, Costo: 30, Estampado: No, Colección pasada: Sí
    const prenda4 = new mHoodie("H02", "Vans", 30, false, true);

    // 2. Procesamos cada instancia en la Clase Mayor y reportamos en Vista
    this.modelo.procesarPrenda(prenda1);
    this.vista.reportarPrenda(
      prenda1.codigo,
      prenda1.marca,
      prenda1.obtenerTipo(),
      prenda1.calcularPrecioFinal(),
      prenda1.calcularGananciaNeta()
    );

    this.modelo.procesarPrenda(prenda2);
    this.vista.reportarPrenda(
      prenda2.codigo,
      prenda2.marca,
      prenda2.obtenerTipo(),
      prenda2.calcularPrecioFinal(),
      prenda2.calcularGananciaNeta()
    );

    this.modelo.procesarPrenda(prenda3);
    this.vista.reportarPrenda(
      prenda3.codigo,
      prenda3.marca,
      prenda3.obtenerTipo(),
      prenda3.calcularPrecioFinal(),
      prenda3.calcularGananciaNeta()
    );

    this.modelo.procesarPrenda(prenda4);
    this.vista.reportarPrenda(
      prenda4.codigo,
      prenda4.marca,
      prenda4.obtenerTipo(),
      prenda4.calcularPrecioFinal(),
      prenda4.calcularGananciaNeta()
    );

    // 3. Reporte global final desde la Clase Mayor
    this.vista.reportarResumen(
      this.modelo.gananciaTotal(),
      this.modelo.codigoMayorGanancia(),
      this.modelo.montoMayorGanancia(),
      this.modelo.menorTallaSneaker(),
      this.modelo.cantidadPrendas()
    );

    this.vista.mostrarMensaje("Casos de prueba oficiales cargados con éxito.", "info");
  }

  private reiniciar(): void {
    this.modelo.reiniciar();
    this.vista.reiniciarVista();
    this.vista.mostrarMensaje("Inventario reiniciado correctamente.", "info");
  }
}
