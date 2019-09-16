import { Component, OnInit, Inject } from '@angular/core';
import { Alumno } from 'src/app/modelos/alumno';
import { NotificationsService } from 'angular2-notifications';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MateriasService } from 'src/app/servicios/materias.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inscribir-alumno-cursada',
  templateUrl: './inscribir-alumno-cursada.component.html',
  styleUrls: ['./inscribir-alumno-cursada.component.scss']
})
export class InscribirAlumnoCursadaComponent implements OnInit {

  showSpinner = true;
  formulario: FormGroup;
  alumnos: Alumno[];
  idAlumno: number;
  materia: string;
  cursa = true;
  libre = false;
  idCursada: number;

  constructor(
    private fb: FormBuilder,
    private notif: NotificationsService,
    private alumnosService: AlumnosService,
    private materiasService: MateriasService,
    public dialogRef: MatDialogRef<InscribirAlumnoCursadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      cursa: [true],
      equivalencia: [false]
    });
  }

  public cerrar() {
    this.dialogRef.close();
  }

  enviar() {
    this.showSpinner = true;
    const cursa = this.formulario.value.cursa;
    const equivalencia = this.formulario.value.equivalencia;
    this.materiasService.inscribirAlumnoCursada(this.idAlumno, this.idCursada, cursa, equivalencia).subscribe(
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
    this.alumnos = await this.alumnosService.traerAlumnos();
    console.log(this.alumnos);
    this.showSpinner = false;
  }

  ngOnInit() {
    this.idCursada = this.data.idCursada;
    this.materia = this.data.materia;
    this.listarAlumnos();
    this.crearFormulario();
  }

}
