import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profesor } from 'src/app/modelos/profesor';
import { NotificationsService } from 'angular2-notifications';
import { MateriasService } from 'src/app/servicios/materias.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Cursada, Horario } from 'src/app/modelos/cursadas';

@Component({
  selector: 'app-editar-cursada',
  templateUrl: './editar-cursada.component.html',
  styleUrls: ['./editar-cursada.component.scss']
})
export class EditarCursadaComponent implements OnInit {

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
    public dialogRef: MatDialogRef<EditarCursadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cursada,
  ) { }


  private crearFormulario() {
    const añoActual = new Date().getFullYear();
    const horarios = [
      {},
      {hora_inicio: null, modulos: null},
      {hora_inicio: null, modulos: null},
      {hora_inicio: null, modulos: null},
      {hora_inicio: null, modulos: null},
      {hora_inicio: null, modulos: null},
      {hora_inicio: null, modulos: null},
    ];
    for (const horario of this.data.horarios) {
      horarios[horario.dia].hora_inicio = horario.hora_inicio;
      horarios[horario.dia].modulos = horario.modulos;
    }
    this.formulario = this.fb.group({
      año: [this.data.anio_cursada, [Validators.required, Validators.min(añoActual - 6)]],
      fecha_inicio: [this.data.fecha_inicio, Validators.required],
      fecha_limite: [this.data.fecha_limite, Validators.required],
      id_profesor: [this.data.id_profesor],
      hora_inicio_lunes: [horarios[1].hora_inicio],
      hora_inicio_martes: [horarios[2].hora_inicio],
      hora_inicio_miercoles: [horarios[3].hora_inicio],
      hora_inicio_jueves: [horarios[4].hora_inicio],
      hora_inicio_viernes: [horarios[5].hora_inicio],
      hora_inicio_sabado: [horarios[6].hora_inicio],
      modulos_lunes: [horarios[1].modulos],
      modulos_martes: [horarios[2].modulos],
      modulos_miercoles: [horarios[3].modulos],
      modulos_jueves: [horarios[4].modulos],
      modulos_viernes: [horarios[5].modulos],
      modulos_sabado: [horarios[6].modulos]
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
    const cursada = {
      id_cursada: this.data.id,
      id_profesor: this.formulario.value.id_profesor,
      año: this.formulario.value.año,
      fecha_inicio: this.formulario.value.fecha_inicio,
      fecha_limite: this.formulario.value.fecha_limite,
    };
    const horarios = this.crearHorarios();
    this.materiasService.editarCursada(cursada, horarios).subscribe(
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
    this.materia = this.data.materia;
    this.cargarProfesores();
    this.crearFormulario();
  }

}
