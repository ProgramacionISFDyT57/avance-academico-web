import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MateriasService } from 'src/app/servicios/materias.service';
import { Materia } from 'src/app/modelos/materia';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-info-carrera',
  templateUrl: './info-carrera.component.html',
  styleUrls: ['./info-carrera.component.scss']
})
export class InfoCarreraComponent implements OnInit {

  showSpinner = true;
  materias: Materia[] = [];
  duracion = 5;
  carrera: string;
  materiaSeleccionada;
  correlativas = [];

  constructor(
    public dialogRef: MatDialogRef<InfoCarreraComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private materiasService: MateriasService,
    private notif: NotificationsService,
  ) { }

  public cerrar() {
    this.dialogRef.close();
  }

  materiasPorCarrera(idCarrera: number) {
    this.materiasService.materias_por_carrera(idCarrera).subscribe(
      (res) => {
        this.materias = res;
        this.showSpinner = false;
        console.log(res);
      },
      (error) => {
        this.showSpinner = false;
        this.notif.error(error.error.mensaje);
        console.error(error);
      }
    );
  }

  seleccionarMateria(materia: Materia) {
    if (materia.nombre === this.materiaSeleccionada) {
      this.materiaSeleccionada = null;
      this.correlativas = [];
    } else {
      this.materiaSeleccionada = materia.nombre;
      this.correlativas = [];
      for (const correlativa of materia.correlativas) {
        this.correlativas.push(correlativa);
      }
    }

  }

  ngOnInit() {
    this.duracion = this.data.duracion;
    this.carrera = this.data.carrera;
    this.materiasPorCarrera(this.data.idCarrera);
  }

}
