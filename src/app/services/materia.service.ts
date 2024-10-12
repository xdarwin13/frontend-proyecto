import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MateriaService {
  private apiUrl = 'https://backend-proyecto-vhbm.onrender.com/materias'; // Cambia esta URL a la de tu backend

  constructor(private http: HttpClient) { }

  // Obtener materias por carrera
  getMateriasPorCarrera(carrera: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/carreras`, { carrera });
  }
}
