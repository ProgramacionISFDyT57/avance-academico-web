import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriasService } from 'src/app/servicios/materias.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DATE_LOCALE } from '@angular/material';
import { Profesor } from 'src/app/modelos/profesor';
import { Horario } from 'src/app/modelos/horario';

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
  añoActual = new Date().getFullYear();
  minDateInicio = new Date(this.añoActual - 100, 0, 1);
  minDateFin = new Date();

  constructor(
    private fb: FormBuilder,
    private notif: NotificationsService,
    private materiasService: MateriasService,
    private usuariosService: UsuariosService,
    public dialogRef: MatDialogRef<AbrirInscripcionCursadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  public cambioFechaInicio() {
    this.formulario.get('fecha_limite').enable();
    this.formulario.get('fecha_inicio').enable();
    this.minDateFin = new Date(this.formulario.value.fecha_inicio);
    const fechaLimite = new Date(this.formulario.value.fecha_inicio);
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);
    this.formulario.patchValue({fecha_limite: fechaLimite});
    // this.formulario.get('fecha_limite').disable();
    // this.formulario.get('fecha_inicio').disable();
  }

  private crearFormulario() {
    const añoActual = new Date().getFullYear();
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);
    this.formulario = this.fb.group({
      año: [añoActual, [Validators.required, Validators.min(añoActual - 6)]],
      fecha_inicio: [fechaActual, Validators.required],
      fecha_limite: [fechaLimite, Validators.required],
      // fecha_inicio: [{value: fechaActual, disabled: true}, Validators.required],
      // fecha_limite: [{value: fechaLimite, disabled: true}, Validators.required],
      id_profesor: [null],
      hora_inicio_lunes: [null],
      hora_inicio_martes: [null],
      hora_inicio_miercoles: [null],
      hora_inicio_jueves: [null],
      hora_inicio_viernes: [null],
      hora_inicio_sabado: [null],
      modulos_lunes: [null],
      modulos_martes: [null],
      modulos_miercoles: [null],
      modulos_jueves: [null],
      modulos_viernes: [null],
      modulos_sabado: [null]
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

  private crearHorarios(): Horario[] {
    const horarios = [];
    if (this.formulario.value.hora_inicio_lunes && this.formulario.value.modulos_lunes) {
      const horario: Horario = {
        dia: 1,
        hora_inicio: this.formulario.value.hora_inicio_lunes,
        modulos: this.formulario.value.modulos_lunes,
      };
      horarios.push(horario);
    }
    if (this.formulario.value.hora_inicio_martes && this.formulario.value.modulos_martes) {
      const horario: Horario = {
        dia: 2,
        hora_inicio: this.formulario.value.hora_inicio_martes,
        modulos: this.formulario.value.modulos_martes,
      };
      horarios.push(horario);
    }
    if (this.formulario.value.hora_inicio_miercoles && this.formulario.value.modulos_miercoles) {
      const horario: Horario = {
        dia: 3,
        hora_inicio: this.formulario.value.hora_inicio_miercoles,
        modulos: this.formulario.value.modulos_miercoles,
      };
      horarios.push(horario);
    }
    if (this.formulario.value.hora_inicio_jueves && this.formulario.value.modulos_jueves) {
      const horario: Horario = {
        dia: 4,
        hora_inicio: this.formulario.value.hora_inicio_jueves,
        modulos: this.formulario.value.modulos_jueves,
      };
      horarios.push(horario);
    }
    if (this.formulario.value.hora_inicio_viernes && this.formulario.value.modulos_viernes) {
      const horario: Horario = {
        dia: 5,
        hora_inicio: this.formulario.value.hora_inicio_viernes,
        modulos: this.formulario.value.modulos_viernes,
      };
      horarios.push(horario);
    }
    if (this.formulario.value.hora_inicio_sabado && this.formulario.value.modulos_sabado) {
      const horario: Horario = {
        dia: 6,
        hora_inicio: this.formulario.value.hora_inicio_sabado,
        modulos: this.formulario.value.modulos_sabado,
      };
      horarios.push(horario);
    }
    return horarios;
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
    const horarios = this.crearHorarios();
    console.log(horarios);
    this.materiasService.abrirInscripcionCursada(cursada, horarios).subscribe(
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

