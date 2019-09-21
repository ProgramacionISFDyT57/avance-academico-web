import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Profesor } from 'src/app/modelos/profesor';
import { NotificationsService } from 'angular2-notifications';
import { MateriasService } from 'src/app/servicios/materias.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FinalAbierto } from 'src/app/modelos/final-abierto';

@Component({
  selector: 'app-editar-mesa',
  templateUrl: './editar-mesa.component.html',
  styleUrls: ['./editar-mesa.component.scss']
})
export class EditarMesaComponent implements OnInit {

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
    public dialogRef: MatDialogRef<EditarMesaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FinalAbierto,
  ) { }

  private crearFormulario() {
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);
    this.formulario = this.fb.group({
      id_mesa: [this.data.id],
      fecha_inicio: [this.data.fecha_inicio, Validators.required],
      fecha_limite: [this.data.fecha_limite, Validators.required],
      fecha_examen: [this.data.fecha_examen, Validators.required],
      id_profesor: [this.data.id_profesor],
      id_vocal1: [this.data.id_vocal1],
      id_vocal2: [this.data.id_vocal2],
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
    const mesa = {
      id_mesa: this.formulario.value.id_mesa,
      fecha_inicio: this.formulario.value.fecha_inicio,
      fecha_limite: this.formulario.value.fecha_limite,
      fecha_examen: this.formulario.value.fecha_examen,
      id_profesor: this.formulario.value.id_profesor,
      id_vocal1: this.formulario.value.id_vocal1,
      id_vocal2: this.formulario.value.id_vocal2,
    };
    this.materiasService.editarMesa(mesa).subscribe(
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
    this.crearFormulario();
    this.cargarProfesores();
  }

}
