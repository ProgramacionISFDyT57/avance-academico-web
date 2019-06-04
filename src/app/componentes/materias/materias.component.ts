import { Component, OnInit } from '@angular/core';
import { Materia } from '../../modelos/materia';
import { MateriasService } from '../../servicios/materias.service';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.component.html',
  styleUrls: ['./materias.component.scss']
})
export class MateriasComponent implements OnInit {

  materias: Materia[] = [];


  constructor(    private materiasService: MateriasService,
    ) { }

  public ListarMaterias(){
    this.materiasService.traerMaterias().subscribe(
      (res) => {
        this.materias= res;
        console.log(res);
      },
      (error) => {
        console.log(error);
      });
  }


  ngOnInit() {
    this.ListarMaterias();

  }

}
