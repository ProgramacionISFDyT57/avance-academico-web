import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private apiUrl = 'https://avance-academico-backend.herokuapp.com';

  constructor(
    private http: HttpClient,
  ) { }

  get(ruta: string): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': sessionStorage.getItem('token') });
    return this.http.get<any>(this.apiUrl + ruta, { headers });
  }

  post(ruta: string, body): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': sessionStorage.getItem('token') });
    return this.http.post<any>(this.apiUrl + ruta, body, { headers });
  }

  put(ruta: string, body): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': sessionStorage.getItem('token') });
    return this.http.put<any>(this.apiUrl + ruta, body, { headers });
  }

  delete(ruta: string): Observable<any> {
    const headers = new HttpHeaders({ 'x-access-token': sessionStorage.getItem('token') });
    return this.http.delete<any>(this.apiUrl + ruta, { headers });
  }

}
