import { Component, OnInit, Inject } from '@angular/core';
import { Alumno } from 'src/app/modelos/alumno';
import { NotificationsService } from 'angular2-notifications';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MateriasService } from 'src/app/servicios/materias.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscribir-alumno-cursada',
  templateUrl: './inscribir-alumno-cursada.component.html',
  styleUrls: ['./inscribir-alumno-cursada.component.scss']
})
export class InscribirAlumnoCursadaComponent implements OnInit {

  showSpinner = true;
  formulario: FormGroup;
  alumnos: Alumno[];
  materia: string;
  cursa = true;
  libre = false;
  idCursada: number;
  idCarrera: number;

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
      idAlumno: [null, Validators.required],
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
    const idAlumno = this.formulario.value.idAlumno;
    this.materiasService.inscribirAlumnoCursada(idAlumno, this.idCursada, cursa, equivalencia).subscribe(
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
    this.idCursada = this.data.idCursada;
    this.materia = this.data.materia;
    this.listarAlumnos();
    this.crearFormulario();
  }

}
