import { Component, OnInit } from '@angular/core';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { Router } from '@angular/router';
import { Carrera } from 'src/app/modelos/carrera';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {

  carreras: Carrera[] = [];
  displayedColumns = ['id', 'nombre', 'duracion', 'cantidad_materias'];


  constructor(
    private carrerasService: CarrerasService,
  ) { }

  public ListarCarreras() {
    this.carrerasService.traerCarreras().subscribe(
      (res) => {
        this.carreras = res;
        console.log(this.carreras);
      },
      (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.ListarCarreras();
  }

}
