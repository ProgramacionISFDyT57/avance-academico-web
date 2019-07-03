import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  usuario: string;

  constructor() { }

  ngOnInit() {
    this.usuario = sessionStorage.getItem('apellido') + ', ' + sessionStorage.getItem('nombre');
  }

}
