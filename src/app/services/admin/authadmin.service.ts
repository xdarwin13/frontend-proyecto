import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthadminService {

  private apiUrl = 'https://backend-proyecto-vhbm.onrender.com/administradores';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        // Almacena el token y el userId en el localStorage
        localStorage.setItem('authToken2', response.token2); // Almacena el token
        localStorage.setItem('userId2', response.admin.id); // Almacena el userId

      })
    );
  }

  getUserId(): number | null {
    // Recupera el userId del localStorage
    const userId = localStorage.getItem('userId2');
    return userId ? parseInt(userId, 10) : null;
  }
  
  getToken(): string | null {
    // Recupera el token del localStorage
    return localStorage.getItem('authToken2');
  }

  logout(): void {
    // Elimina el token y el userId del localStorage
    localStorage.removeItem('authToken2');
    localStorage.removeItem('userId2');

  }
}
