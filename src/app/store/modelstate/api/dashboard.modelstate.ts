export interface DashboardModelState {
  alumnosTotalRegistrados: number;
  profesoresTotalActivos: number;
  cursosCicloActual: number;
  inscripcionesProcesadasEsteMes: number;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
