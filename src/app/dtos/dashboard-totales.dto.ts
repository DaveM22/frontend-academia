export interface DashboardTotalesDto {
  alumnos: { totalRegistrados: number };
  profesores: { totalActivos: number };
  cursos: { cicloActual: number };
  inscripciones: { procesadasEsteMes: number };
}
