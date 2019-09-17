import { Component, OnInit, Inject } from '@angular/core';
import { Alumno } from 'src/app/modelos/alumno';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { MateriasService } from 'src/app/servicios/materias.service';

@Component({
  selector: 'app-inscribir-alumno-final',
  templateUrl: './inscribir-alumno-final.component.html',
  styleUrls: ['./inscribir-alumno-final.component.scss']
})
export class InscribirAlumnoFinalComponent implements OnInit {

  showSpinner = true;
  idCarrera: number;
  alumnos: Alumno[];
  idAlumno: number;
  materia: string;
  idMesa: number;
  fecha: string;

  constructor(
    private notif: NotificationsService,
    private alumnosService: AlumnosService,
    private materiasService: MateriasService,
    public dialogRef: MatDialogRef<InscribirAlumnoFinalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  public cerrar() {
    this.dialogRef.close();
  }

  enviar() {
    this.showSpinner = true;
    this.materiasService.inscribirAlumnoFinal(this.idAlumno, this.idMesa).subscribe(
      (resp) => {
        this.showSpinner = false;
        this.notif.success(resp.mensaje);
        console.log(resp);
        this.dialogRef.close(true);
      },
      (error) => {
        this.showSpinner = false;
        this.notif.error(error.error.mensaje);
        console.error(error);
      }
    );
  }

  async listarAlumnos() {
    this.alumnosService.listarAlumnosPorCarrera(this.idCarrera).subscribe(
      (alumnos) => {
        this.alumnos = alumnos;
        console.log(this.alumnos);
        this.showSpinner = false;
      },
      (error) => {
        console.error(error);
        this.showSpinner = false;
      }
    );
  }

  ngOnInit() {
    this.idCarrera = this.data.idCarrera;
    this.idMesa = this.data.idMesa;
    this.materia = this.data.materia;
    this.fecha = this.data.fechaExamen;
    this.listarAlumnos();
  }

}
