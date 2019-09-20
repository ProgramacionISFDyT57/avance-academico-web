import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriasService } from 'src/app/servicios/materias.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE } from '@angular/material';
import { Profesor } from 'src/app/modelos/profesor';

@Component({
  selector: 'app-abrir-inscripcion-cursada',
  templateUrl: './abrir-inscripcion-cursada.component.html',
  styleUrls: ['./abrir-inscripcion-cursada.component.scss']
})
export class AbrirInscripcionCursadaComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = true;
  materia: string;
  profesores: Profesor[] = [];
  public idMateria: number;

  constructor(
    private fb: FormBuilder,
    private notif: NotificationsService,
    private materiasService: MateriasService,
    private usuariosService: UsuariosService,
    public dialogRef: MatDialogRef<AbrirInscripcionCursadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  private crearFormulario() {
    const añoActual = new Date().getFullYear();
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);
    this.formulario = this.fb.group({
      año: [añoActual, [Validators.required, Validators.min(añoActual - 6)]],
      fecha_inicio: [fechaActual, Validators.required],
      fecha_limite: [fechaLimite, Validators.required],
      id_profesor: [null],
    });
  }

  public cerrar() {
    this.dialogRef.close();
  }

  private async cargarProfesores() {
    try {
      const profesores = await this.usuariosService.traerProfesores();
      console.log(profesores);
      this.profesores = profesores;
      this.showSpinner = false;
    } catch (error) {
      console.error(error);
      this.notif.error(error.error.mensaje);
      this.showSpinner = false;
    }
  }

  enviar() {
    this.showSpinner = true;
    const idMateria = this.idMateria;
    const cursada = {
      id_profesor: this.formulario.value.id_profesor,
      año: this.formulario.value.año,
      id_materia: idMateria,
      fecha_inicio: this.formulario.value.fecha_inicio,
      fecha_limite: this.formulario.value.fecha_limite,
    };
    this.materiasService.abrirInscripcionCursada(cursada).subscribe(
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

  ngOnInit() {
    this.idMateria = this.data.idMateria;
    this.materia = this.data.materia;
    this.crearFormulario();
    this.cargarProfesores();
  }
}

