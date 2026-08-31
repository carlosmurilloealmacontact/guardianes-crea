import StroopGame from "./StroopGame";
import SemaforoPregunta from "./SemaforoPregunta";
import LlamadaSimulada from "./LlamadaSimulada";
import EsperaSilenciosa from "./EsperaSilenciosa";
import AsociacionForzada from "./AsociacionForzada";
import MemoriaCadena from "./MemoriaCadena";
import Clasificador from "./Clasificador";
import MapaEmpatia from "./MapaEmpatia";
import DibujoCiegas from "./DibujoCiegas";
import LecturaInterrupciones from "./LecturaInterrupciones";
import BuscarDato from "./BuscarDato";
import OrdenarPasos from "./OrdenarPasos";
import RespuestaCronometrada from "./RespuestaCronometrada";

export const ACTIVIDADES_INTERACTIVAS = {
  stroop: StroopGame,
  semaforo: SemaforoPregunta,
  llamada_simulada: LlamadaSimulada,
  espera: EsperaSilenciosa,
  asociacion: AsociacionForzada,
  memoria_cadena: MemoriaCadena,
  clasificador: Clasificador,
  mapa_empatia: MapaEmpatia,
  dibujo_ciegas: DibujoCiegas,
  lectura_interrupciones: LecturaInterrupciones,
  buscar_dato: BuscarDato,
  ordenar_pasos: OrdenarPasos,
  respuesta_cronometrada: RespuestaCronometrada,
};
