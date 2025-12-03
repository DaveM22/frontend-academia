export interface Notificacion {
  _id: string;
  docenteId: string;
  tipo: 'ALUMNO_INSCRITO' | 'INSCRIPCION_CANCELADA' | 'CAMBIO_CALIFICACION';
  titulo: string;
  mensaje: string;
  leida: boolean;
  fechaCreacion: Date;
  fechaLectura?: Date;
}

export interface NotificacionDTO {
  docenteId: string;
  tipo: string;
  titulo: string;
  mensaje: string;
}
