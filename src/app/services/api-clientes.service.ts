import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiClientesService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  // método get para obtener usuarios
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // metodo post para agregar nuevo usuario
  addUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }


}