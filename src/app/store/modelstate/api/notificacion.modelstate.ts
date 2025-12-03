import { Notificacion } from '../../../entities/notificacion';

export interface NotificacionModelState {
  notificaciones: Notificacion[];
  noLeidas: Notificacion[];
  noLeidasCount: number;
  loading: boolean;
  error: boolean;
  errorMessage: string;
}
