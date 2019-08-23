import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from 'src/app/servicios/materias.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notif: NotificationsService,
    private materiasService: MateriasService,
    private usuariosService: UsuariosService,
    public dialogRef: MatDialogRef<AbrirInscripcionFinalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  private crearFormulario() {
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaLimite.getMonth() + 1);
    this.formulario = this.fb.group({
      fecha_inicio: [fechaActual, Validators.required],
      fecha_limite: [fechaLimite, Validators.required],
      fecha_examen: [null, Validators.required],
      id_profesor: [null],
      id_vocal1: [null],
      id_vocal2: [null],
    });
  }

  public cerrar() {
    this.dialogRef.close();
  }

  private cargarProfesores() {
    this.usuariosService.traerProfesores().subscribe(
      (res) => {
        this.showSpinner = false;
        console.log(res);
        this.profesores = res;
      },
      (error) => {
        this.showSpinner = false;
        this.notif.error(error.error.mensaje);
        console.error(error);
      }
    );
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
