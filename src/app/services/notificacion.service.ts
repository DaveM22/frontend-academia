import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion } from '../entities/notificacion';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private apiUrl = `${environment.apiUrl}/notificaciones`;

  constructor(private http: HttpClient) {}

  getByDocente(docenteId: string): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/${docenteId}`);
  }

  marcarComoLeida(notificacionId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${notificacionId}/marcar-leida`, {});
  }

  getNoLeidas(docenteId: string): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/${docenteId}/no-leidas`);
  }

  getNoLeidasCount(docenteId: string): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(`${this.apiUrl}/${docenteId}`);
  }
}
