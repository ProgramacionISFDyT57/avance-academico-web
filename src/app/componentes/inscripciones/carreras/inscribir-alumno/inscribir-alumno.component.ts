import { Component, OnInit, Inject } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { Alumno } from 'src/app/modelos/alumno';

@Component({
  selector: 'app-inscribir-alumno',
  templateUrl: './inscribir-alumno.component.html',
  styleUrls: ['./inscribir-alumno.component.scss']
})
export class InscribirAlumnoComponent implements OnInit {

  showSpinner = true;
  alumnos: Alumno[];
  idAlumno: number;
  carrera: string;
  idCarreraAbierta: number;

  constructor(
    private notif: NotificationsService,
    private alumnosService: AlumnosService,
    private carrerasService: CarrerasService,
    public dialogRef: MatDialogRef<InscribirAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  public cerrar() {
    this.dialogRef.close();
  }

  enviar() {
    this.showSpinner = true;
    this.carrerasService.inscribirAlumnoACarrera(this.idCarreraAbierta, this.idAlumno).subscribe(
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
    this.alumnos = await this.alumnosService.listarAlumnosInscripcion();
    console.log(this.alumnos);
    this.showSpinner = false;
  }

  ngOnInit() {
    this.idCarreraAbierta = this.data.idCarreraAbierta;
    this.carrera = this.data.carrera;
    this.listarAlumnos();
  }

}
