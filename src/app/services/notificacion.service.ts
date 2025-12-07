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
    return this.http.get<Notificacion[]>(`${this.apiUrl}/docente/${docenteId}`);
  }

  marcarComoLeida(notificacionId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${notificacionId}/marcar-leida`, {});
  }

  getNoLeidas(docenteId: string): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/docente/${docenteId}/no-leidas`);
  }

  getNoLeidasCount(docenteId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/docente/${docenteId}/no-leidas/count`);
  }

  getByAlumno(alumnoId: string): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/alumno/${alumnoId}`);
  }

  getNoLeidasAlumno(alumnoId: string): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(`${this.apiUrl}/alumno/${alumnoId}/no-leidas`);
  }

  getNoLeidasCountAlumno(alumnoId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/alumno/${alumnoId}/no-leidas/count`);
  }


}
