import { IStoreView } from "../interfaces/IStoreView.js";

export class vStore implements IStoreView {
  private inCodigo: HTMLInputElement;
  private inMarca: HTMLInputElement;
  private inCosto: HTMLInputElement;
  private selTipo: HTMLSelectElement;

  private secSneaker: HTMLElement;
  private inTallaUs: HTMLInputElement;
  private chkAltaDemanda: HTMLInputElement;

  private secHoodie: HTMLElement;
  private chkEstampado: HTMLInputElement;
  private chkColeccionPasada: HTMLInputElement;

  private btnProcesar: HTMLButtonElement;
  private btnCargarCasos: HTMLButtonElement;
  private btnLimpiar: HTMLButtonElement;

  private tblReporteCuerpo: HTMLElement;
  private txtConsolaSalida: HTMLElement;
  private lblGananciaTotal: HTMLElement;
  private lblCodMayorGanancia: HTMLElement;
  private lblMayorGanancia: HTMLElement;
  private lblMenorTallaSneaker: HTMLElement;
  private lblTotalPrendas: HTMLElement;
  private divMensaje: HTMLElement;

  constructor() {
    this.inCodigo = document.getElementById("inCodigo") as HTMLInputElement;
    this.inMarca = document.getElementById("inMarca") as HTMLInputElement;
    this.inCosto = document.getElementById("inCosto") as HTMLInputElement;
    this.selTipo = document.getElementById("selTipo") as HTMLSelectElement;

    this.secSneaker = document.getElementById("secSneaker") as HTMLElement;
    this.inTallaUs = document.getElementById("inTallaUs") as HTMLInputElement;
    this.chkAltaDemanda = document.getElementById("chkAltaDemanda") as HTMLInputElement;

    this.secHoodie = document.getElementById("secHoodie") as HTMLElement;
    this.chkEstampado = document.getElementById("chkEstampado") as HTMLInputElement;
    this.chkColeccionPasada = document.getElementById("chkColeccionPasada") as HTMLInputElement;

    this.btnProcesar = document.getElementById("btnProcesar") as HTMLButtonElement;
    this.btnCargarCasos = document.getElementById("btnCargarCasos") as HTMLButtonElement;
    this.btnLimpiar = document.getElementById("btnLimpiar") as HTMLButtonElement;

    this.tblReporteCuerpo = document.getElementById("tblReporteCuerpo") as HTMLElement;
    this.txtConsolaSalida = document.getElementById("txtConsolaSalida") as HTMLElement;
    this.lblGananciaTotal = document.getElementById("lblGananciaTotal") as HTMLElement;
    this.lblCodMayorGanancia = document.getElementById("lblCodMayorGanancia") as HTMLElement;
    this.lblMayorGanancia = document.getElementById("lblMayorGanancia") as HTMLElement;
    this.lblMenorTallaSneaker = document.getElementById("lblMenorTallaSneaker") as HTMLElement;
    this.lblTotalPrendas = document.getElementById("lblTotalPrendas") as HTMLElement;
    this.divMensaje = document.getElementById("divMensaje") as HTMLElement;

    this.actualizarCamposEspecificos(this.tipo);
    this.selTipo.addEventListener("change", () => {
      this.actualizarCamposEspecificos(this.tipo);
    });
  }

  get codigo(): string {
    return this.inCodigo.value.trim();
  }

  get marca(): string {
    return this.inMarca.value.trim();
  }

  get costo(): number {
    return +this.inCosto.value;
  }

  get tipo(): string {
    return this.selTipo.value.toLowerCase();
  }

  get tallaUs(): number {
    return +this.inTallaUs.value;
  }

  get esAltaDemanda(): boolean {
    return this.chkAltaDemanda.checked;
  }

  get conEstampado(): boolean {
    return this.chkEstampado.checked;
  }

  get esColeccionPasada(): boolean {
    return this.chkColeccionPasada.checked;
  }

  onProcesar(callback: () => void): void {
    this.btnProcesar.onclick = callback;
  }

  onCargarCasosPrueba(callback: () => void): void {
    this.btnCargarCasos.onclick = callback;
  }

  onLimpiar(callback: () => void): void {
    this.btnLimpiar.onclick = callback;
  }

  onCambioTipo(callback: (tipo: string) => void): void {
    this.selTipo.onchange = () => {
      this.actualizarCamposEspecificos(this.tipo);
      callback(this.tipo);
    };
  }

  actualizarCamposEspecificos(tipo: string): void {
    if (tipo === "sneaker") {
      this.secSneaker.style.display = "block";
      this.secHoodie.style.display = "none";
    } else {
      this.secSneaker.style.display = "none";
      this.secHoodie.style.display = "block";
    }
  }

  reportarPrenda(
    codigo: string,
    marca: string,
    tipo: string,
    precio: number,
    ganancia: number
  ): void {
    const lineaConsola = `${codigo} (${marca}) -> Precio: $${precio.toFixed(2)} | Ganancia: $${ganancia.toFixed(2)}`;
    console.log(lineaConsola);

    if (this.txtConsolaSalida) {
      this.txtConsolaSalida.textContent += `${lineaConsola}\n`;
    }

    if (this.tblReporteCuerpo) {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${codigo}</td>
        <td>${marca}</td>
        <td>${tipo}</td>
        <td>$${precio.toFixed(2)}</td>
        <td>$${ganancia.toFixed(2)}</td>
      `;
      this.tblReporteCuerpo.appendChild(fila);
    }
  }

  reportarResumen(
    gananciaTotal: number,
    codigoMayorGanancia: string,
    mayorGanancia: number,
    menorTallaSneaker: number,
    totalPrendas: number
  ): void {
    const resumenConsola = [
      "",
      `Ganancia total de la tienda: $${gananciaTotal.toFixed(2)}`,
      `Producto con mayor ganancia neta: ${codigoMayorGanancia || "N/A"}`
    ];

    if (menorTallaSneaker > 0) {
      resumenConsola.push(`Menor talla de sneaker registrada: ${menorTallaSneaker}`);
    }

    resumenConsola.forEach((linea) => {
      console.log(linea);
      if (this.txtConsolaSalida && linea !== "") {
        this.txtConsolaSalida.textContent += `${linea}\n`;
      }
    });

    if (this.lblGananciaTotal) {
      this.lblGananciaTotal.textContent = `$${gananciaTotal.toFixed(2)}`;
    }
    if (this.lblCodMayorGanancia) {
      this.lblCodMayorGanancia.textContent = codigoMayorGanancia || "---";
    }
    if (this.lblMayorGanancia) {
      this.lblMayorGanancia.textContent = mayorGanancia > 0 ? `($${mayorGanancia.toFixed(2)})` : "";
    }
    if (this.lblMenorTallaSneaker) {
      this.lblMenorTallaSneaker.textContent = menorTallaSneaker > 0 ? `${menorTallaSneaker} US` : "---";
    }
    if (this.lblTotalPrendas) {
      this.lblTotalPrendas.textContent = `${totalPrendas}`;
    }
  }

  mostrarMensaje(mensaje: string, tipo: "success" | "danger" | "info" | "warning"): void {
    if (this.divMensaje) {
      this.divMensaje.textContent = mensaje;
      this.divMensaje.style.display = "block";
      setTimeout(() => {
        if (this.divMensaje) this.divMensaje.style.display = "none";
      }, 3000);
    }
  }

  limpiarFormulario(): void {
    this.inCodigo.value = "";
    this.inMarca.value = "";
    this.inCosto.value = "";
    this.inTallaUs.value = "";
    this.chkAltaDemanda.checked = false;
    this.chkEstampado.checked = false;
    this.chkColeccionPasada.checked = false;
    this.inCodigo.focus();
  }

  reiniciarVista(): void {
    this.limpiarFormulario();
    if (this.tblReporteCuerpo) this.tblReporteCuerpo.innerHTML = "";
    if (this.txtConsolaSalida) this.txtConsolaSalida.textContent = "";
    if (this.lblGananciaTotal) this.lblGananciaTotal.textContent = "$0.00";
    if (this.lblCodMayorGanancia) this.lblCodMayorGanancia.textContent = "---";
    if (this.lblMayorGanancia) this.lblMayorGanancia.textContent = "";
    if (this.lblMenorTallaSneaker) this.lblMenorTallaSneaker.textContent = "---";
    if (this.lblTotalPrendas) this.lblTotalPrendas.textContent = "0";
    if (this.divMensaje) this.divMensaje.style.display = "none";
    console.clear();
  }
}
