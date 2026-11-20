import { mStore } from "./models/mStore.js";
import { vStore } from "./views/vStore.js";
import { cStore } from "./controllers/cStore.js";
// Ensamblaje de Dependencias (Punto de Entrada del Proyecto)
const modelo = new mStore();
const vista = new vStore();
const controlador = new cStore(modelo, vista);
controlador.iniciar();
