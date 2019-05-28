import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  private backend= 'https://avance-academico-backend.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  public traerCarreras(){
    return this.http.get(this.backend +'/carreras');
  }

}
