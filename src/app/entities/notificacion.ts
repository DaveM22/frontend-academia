export interface Notificacion {
  _id: string;
  docenteId?: string;
  alumnoId?: string;
  tipo: 'ALUMNO_INSCRITO' | 'INSCRIPCION_CANCELADA' | 'CAMBIO_CALIFICACION';
  titulo: string;
  mensaje: string;
  leida: boolean;
  cargo: string;
  fechaCreacion: Date;
  fechaLectura?: Date;
}

export interface NotificacionDTO {
  docenteId?: string;
  alumnoId?: string;
  tipo: string;
  titulo: string;
  mensaje: string;
  cargo: string;
}
