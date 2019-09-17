import { Component, OnInit, Inject } from '@angular/core';
import { Alumno } from 'src/app/modelos/alumno';
import { NotificationsService } from 'angular2-notifications';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-inscribir-alumno-cursada',
  templateUrl: './inscribir-alumno-cursada.component.html',
  styleUrls: ['./inscribir-alumno-cursada.component.scss']
})
export class InscribirAlumnoCursadaComponent implements OnInit {

  showSpinner = true;
  alumnos: Alumno[];
  idAlumno: number;
  materia: string;
  cursa = true;
  libre = false;
  idCursada: number;

  constructor(
    private notif: NotificationsService,
    private alumnosService: AlumnosService,
    public dialogRef: MatDialogRef<InscribirAlumnoCursadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }


  public cerrar() {
    this.dialogRef.close();
  }

  enviar() {
    // this.showSpinner = true;
    // this.carrerasService.inscribirAlumnoACarrera(this.idCarreraAbierta, this.idAlumno).subscribe(
    //   (resp) => {
    //     this.showSpinner = false;
    //     this.notif.success(resp.mensaje);
    //     console.log(resp);
    //     this.dialogRef.close(true);
    //   },
    //   (error) => {
    //     this.showSpinner = false;
    //     this.notif.error(error.error.mensaje);
    //     console.error(error);
    //   }
    // );
  }

  async listarAlumnos() {
    this.alumnos = await this.alumnosService.traerAlumnos();
    console.log(this.alumnos);
    this.showSpinner = false;
  }

  ngOnInit() {
    this.idCursada = this.data.idCursada;
    this.materia = this.data.materia;
    this.listarAlumnos();
  }

}
