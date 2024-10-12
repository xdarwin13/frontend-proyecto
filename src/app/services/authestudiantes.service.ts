import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthestudiantesService {

  private apiUrl = 'http://192.168.101.86:4000/estudiantes'; // Cambia esta URL a la de tu backend

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        // Almacena el token y el userId en el localStorage
        localStorage.setItem('authToken1', response.token1); // Almacena el token
        localStorage.setItem('userId1', response.student.id); // Almacena el userId
      })
    );
  }

  getUserId(): number | null {
    // Recupera el userId del localStorage
    const userId = localStorage.getItem('userId1');
    return userId ? parseInt(userId, 10) : null;
  }

  getToken(): string | null {
    // Recupera el token del localStorage
    return localStorage.getItem('authToken1');
  }

  logout(): void {
    // Elimina el token y el userId del localStorage
    localStorage.removeItem('authToken1');
    localStorage.removeItem('userId1');
  }

}