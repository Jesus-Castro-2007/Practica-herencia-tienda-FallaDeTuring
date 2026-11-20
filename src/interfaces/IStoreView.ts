export interface IStoreView {
  // Getters para extracción y lectura de datos del formulario
  get codigo(): string;
  get marca(): string;
  get costo(): number;
  get tipo(): string;
  get esAltaDemanda(): boolean;
  get tallaUs(): number;
  get conEstampado(): boolean;
  get esColeccionPasada(): boolean;

  // Suscripción de eventos de interfaz de usuario
  onProcesar(callback: () => void): void;
  onCargarCasosPrueba(callback: () => void): void;
  onLimpiar(callback: () => void): void;
  onCambioTipo(callback: (tipo: string) => void): void;

  // Métodos de renderizado y visualización de resultados
  reportarPrenda(codigo: string, marca: string, tipo: string, precio: number, ganancia: number): void;
  reportarResumen(gananciaTotal: number, codigoMayorGanancia: string, mayorGanancia: number, menorTallaSneaker: number, totalPrendas: number): void;
  mostrarMensaje(mensaje: string, tipo: "success" | "danger" | "info" | "warning"): void;
  actualizarCamposEspecificos(tipo: string): void;
  limpiarFormulario(): void;
  reiniciarVista(): void;
}
