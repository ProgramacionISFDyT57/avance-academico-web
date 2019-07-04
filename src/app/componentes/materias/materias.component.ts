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
  displayedColumns = ['id', 'nombre', 'carrera', 'anio', 'tipo_materia'];

  constructor(
    private materiasService: MateriasService,
  ) { }

  public ListarMaterias() {
    this.materiasService.traerMaterias().subscribe(
      (res) => {
        this.materias = res;
        console.log(res);
      },
      (error) => {
        console.log(error);
      });
  }

  public eliminarMateria(id: number) {
    const eliminar = confirm('¿Desea eliminar la materia?');
    if (eliminar) {
      this.materiasService.eliminarMateria(id).subscribe(
        (res) => {
          this.ListarMaterias();
          console.log(res);
        },
        (error) => {
          console.log(error);
        });
    }
  }

  ngOnInit() {
    this.ListarMaterias();

  }

}
