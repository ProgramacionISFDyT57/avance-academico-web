import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriasService } from 'src/app/servicios/materias.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Profesor } from 'src/app/modelos/profesor';

@Component({
  selector: 'app-abrir-inscripcion-final',
  templateUrl: './abrir-inscripcion-final.component.html',
  styleUrls: ['./abrir-inscripcion-final.component.scss']
})
export class AbrirInscripcionFinalComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = true;
  materia: string;
  profesores: Profesor[] = [];
  public idMateria: number;
  añoActual = new Date().getFullYear();
  minDateInicio = new Date(this.añoActual - 100, 0, 1);
  minDateFin = new Date();

  constructor(
    private fb: FormBuilder,
    private notif: NotificationsService,
    private materiasService: MateriasService,
    private usuariosService: UsuariosService,
    public dialogRef: MatDialogRef<AbrirInscripcionFinalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  public cambioFechaInicio() {
    this.formulario.get('fecha_limite').enable();
    this.formulario.get('fecha_inicio').enable();
    this.minDateFin = new Date(this.formulario.value.fecha_inicio);
    const fechaLimite = new Date(this.formulario.value.fecha_inicio);
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);
    this.formulario.patchValue({fecha_limite: fechaLimite});
    this.formulario.get('fecha_limite').disable();
    this.formulario.get('fecha_inicio').disable();
  }

  private crearFormulario() {
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);
    this.formulario = this.fb.group({
      // fecha_inicio: [fechaActual, Validators.required],
      // fecha_limite: [fechaLimite, Validators.required],
      // fecha_examen: [null, Validators.required],
      fecha_inicio: [{value: fechaActual, disabled: true}, Validators.required],
      fecha_limite: [{value: fechaLimite, disabled: true}, Validators.required],
      fecha_examen: [{value: null, disabled: true}, Validators.required],
      id_profesor: [null],
      id_vocal1: [null],
      id_vocal2: [null],
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
    const mesa = {
      id_materia: idMateria,
      fecha_inicio: this.formulario.value.fecha_inicio,
      fecha_limite: this.formulario.value.fecha_limite,
      fecha_examen: this.formulario.value.fecha_examen,
      id_profesor: this.formulario.value.id_profesor,
      id_vocal1: this.formulario.value.id_vocal1,
      id_vocal2: this.formulario.value.id_vocal2,
    };
    this.materiasService.abrirInscripcionFinal(mesa).subscribe(
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
