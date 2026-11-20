export class vStore {
    constructor() {
        this.inCodigo = document.getElementById("inCodigo");
        this.inMarca = document.getElementById("inMarca");
        this.inCosto = document.getElementById("inCosto");
        this.selTipo = document.getElementById("selTipo");
        this.secSneaker = document.getElementById("secSneaker");
        this.inTallaUs = document.getElementById("inTallaUs");
        this.chkAltaDemanda = document.getElementById("chkAltaDemanda");
        this.secHoodie = document.getElementById("secHoodie");
        this.chkEstampado = document.getElementById("chkEstampado");
        this.chkColeccionPasada = document.getElementById("chkColeccionPasada");
        this.btnProcesar = document.getElementById("btnProcesar");
        this.btnCargarCasos = document.getElementById("btnCargarCasos");
        this.btnLimpiar = document.getElementById("btnLimpiar");
        this.tblReporteCuerpo = document.getElementById("tblReporteCuerpo");
        this.txtConsolaSalida = document.getElementById("txtConsolaSalida");
        this.lblGananciaTotal = document.getElementById("lblGananciaTotal");
        this.lblCodMayorGanancia = document.getElementById("lblCodMayorGanancia");
        this.lblMayorGanancia = document.getElementById("lblMayorGanancia");
        this.lblMenorTallaSneaker = document.getElementById("lblMenorTallaSneaker");
        this.lblTotalPrendas = document.getElementById("lblTotalPrendas");
        this.divMensaje = document.getElementById("divMensaje");
        this.actualizarCamposEspecificos(this.tipo);
        this.selTipo.addEventListener("change", () => {
            this.actualizarCamposEspecificos(this.tipo);
        });
    }
    get codigo() {
        return this.inCodigo.value.trim();
    }
    get marca() {
        return this.inMarca.value.trim();
    }
    get costo() {
        return +this.inCosto.value;
    }
    get tipo() {
        return this.selTipo.value.toLowerCase();
    }
    get tallaUs() {
        return +this.inTallaUs.value;
    }
    get esAltaDemanda() {
        return this.chkAltaDemanda.checked;
    }
    get conEstampado() {
        return this.chkEstampado.checked;
    }
    get esColeccionPasada() {
        return this.chkColeccionPasada.checked;
    }
    onProcesar(callback) {
        this.btnProcesar.onclick = callback;
    }
    onCargarCasosPrueba(callback) {
        this.btnCargarCasos.onclick = callback;
    }
    onLimpiar(callback) {
        this.btnLimpiar.onclick = callback;
    }
    onCambioTipo(callback) {
        this.selTipo.onchange = () => {
            this.actualizarCamposEspecificos(this.tipo);
            callback(this.tipo);
        };
    }
    actualizarCamposEspecificos(tipo) {
        if (tipo === "sneaker") {
            this.secSneaker.style.display = "block";
            this.secHoodie.style.display = "none";
        }
        else {
            this.secSneaker.style.display = "none";
            this.secHoodie.style.display = "block";
        }
    }
    reportarPrenda(codigo, marca, tipo, precio, ganancia) {
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
    reportarResumen(gananciaTotal, codigoMayorGanancia, mayorGanancia, menorTallaSneaker, totalPrendas) {
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
    mostrarMensaje(mensaje, tipo) {
        if (this.divMensaje) {
            this.divMensaje.textContent = mensaje;
            this.divMensaje.style.display = "block";
            setTimeout(() => {
                if (this.divMensaje)
                    this.divMensaje.style.display = "none";
            }, 3000);
        }
    }
    limpiarFormulario() {
        this.inCodigo.value = "";
        this.inMarca.value = "";
        this.inCosto.value = "";
        this.inTallaUs.value = "";
        this.chkAltaDemanda.checked = false;
        this.chkEstampado.checked = false;
        this.chkColeccionPasada.checked = false;
        this.inCodigo.focus();
    }
    reiniciarVista() {
        this.limpiarFormulario();
        if (this.tblReporteCuerpo)
            this.tblReporteCuerpo.innerHTML = "";
        if (this.txtConsolaSalida)
            this.txtConsolaSalida.textContent = "";
        if (this.lblGananciaTotal)
            this.lblGananciaTotal.textContent = "$0.00";
        if (this.lblCodMayorGanancia)
            this.lblCodMayorGanancia.textContent = "---";
        if (this.lblMayorGanancia)
            this.lblMayorGanancia.textContent = "";
        if (this.lblMenorTallaSneaker)
            this.lblMenorTallaSneaker.textContent = "---";
        if (this.lblTotalPrendas)
            this.lblTotalPrendas.textContent = "0";
        if (this.divMensaje)
            this.divMensaje.style.display = "none";
        console.clear();
    }
}
