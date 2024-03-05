import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap, of, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  //devolver el objeto
  get currentUser(): User | undefined {
    if(!this.user) return undefined;

    //clonar para que el objeto no sea modificado
    return structuredClone( this.user );

  }

  login(email: string, password: string): Observable<User>{

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
    .pipe(
      //es recomendable que los operadores solo hagan un proceso a la vez
      tap(user => this.user = user),
      tap(user => localStorage.setItem('token', user.id.toString()))
    )
  }

  //mantener la sesion del usuario
  checkAuthentication(): Observable<boolean> {
    if(!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap(user => this.user = user),
        //si el usuario existe = true
        map(user => !!user),
        catchError(() => of(false))
      );
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
