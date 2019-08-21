import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { MateriasService } from 'src/app/servicios/materias.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AvanceAcademico } from 'src/app/modelos/avance-academico';

@Component({
  selector: 'app-cargar-notas-cursada',
  templateUrl: './cargar-notas-cursada.component.html',
  styleUrls: ['./cargar-notas-cursada.component.scss']
})
export class CargarNotasCursadaComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = true;
  idInscripcionCursada: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notif: NotificationsService,
    private materiasService: MateriasService,
    public dialogRef: MatDialogRef<CargarNotasCursadaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      id_inscripcion_cursada: [this.idInscripcionCursada],
      nota_cuat_1: [null, [Validators.required, Validators.min(1), Validators.max(10)]],
      nota_cuat_2: [null, [Validators.min(1), Validators.max(10)]],
      nota_recuperatorio: [null, [Validators.min(1), Validators.max(10)]],
      asistencia: [null, [Validators.min(0), Validators.max(100)]],
    });
  }

  public cerrar() {
    this.dialogRef.close();
  }

  enviar() {
    this.showSpinner = true;
    const avanceAcademico: AvanceAcademico = {
      id_inscripcion_cursada: this.formulario.value.id_inscripcion_cursada,
      nota_cuat_1: this.formulario.value.nota_cuat_1,
      nota_cuat_2: this.formulario.value.nota_cuat_2,
      nota_recuperatorio: this.formulario.value.nota_recuperatorio,
      asistencia: this.formulario.value.asistencia,
    };
    this.materiasService.cargarNotasCursada(avanceAcademico).subscribe(
      (resp) => {
        this.showSpinner = false;
        this.notif.success('Se cargaron las notas correctamente');
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
    this.idInscripcionCursada = this.data.idInscripcionCursada;
    this.crearFormulario();
  }

}
