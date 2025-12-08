import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DashboardTotalesDto } from '../dtos/dashboard-totales.dto';
import { ProfesorTotalesDto } from '../dtos/profesor-totales.dto';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  public getTotales(): Observable<DashboardTotalesDto> {
    return this.http.get<DashboardTotalesDto>(`${environment.apiUrl}/dashboard/totales`);
  }

  public getProfesorTotales(profesorId: string): Observable<ProfesorTotalesDto> {
    return this.http.get<ProfesorTotalesDto>(`${environment.apiUrl}/dashboard/profesor/${profesorId}/totales`);
  }
}
