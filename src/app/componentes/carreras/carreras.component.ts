import { Component, OnInit } from '@angular/core';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {
  carreras=[];
  constructor(
    private carrerasService: CarrerasService,
  ) { }
  public ListarCarreras(){
    this.carrerasService.traerCarreras().subscribe(
      (res) => {
        this.carreras=res.datos;
        console.log(res);
      },
      (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.ListarCarreras();
  }

}
