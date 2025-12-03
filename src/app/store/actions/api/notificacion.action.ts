import { Notificacion } from '../../../entities/notificacion';

export class GetNotificacionesAction {
  static readonly type = '[Notificacion] Get Notificaciones';
  constructor(public payload: { docenteId: string }) {}
}

export class GetNoLeidasAction {
  static readonly type = '[Notificacion] Get No Leidas';
  constructor(public payload: { docenteId: string }) {}
}

export class GetNoLeidasCountAction {
  static readonly type = '[Notificacion] Get No Leidas Count';
  constructor(public payload: { docenteId: string }) {}
}

export class MarcarComoLeidaAction {
  static readonly type = '[Notificacion] Marcar Como Leida';
  constructor(public payload: { notificacionId: string; docenteId: string }) {}
}

export class ClearNotificacionesAction {
  static readonly type = '[Notificacion] Clear Notificaciones';
}
