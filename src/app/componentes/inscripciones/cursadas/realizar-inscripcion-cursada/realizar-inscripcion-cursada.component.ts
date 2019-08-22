import { Component, OnInit, Inject } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MateriasService } from 'src/app/servicios/materias.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-realizar-inscripcion-cursada',
  templateUrl: './realizar-inscripcion-cursada.component.html',
  styleUrls: ['./realizar-inscripcion-cursada.component.scss']
})
export class RealizarInscripcionCursadaComponent implements OnInit {

  formulario: FormGroup;
  materia: string;
  cursa = true;
  libre = false;
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private notif: NotificationsService,
    private materiasService: MateriasService,
    public dialogRef: MatDialogRef<RealizarInscripcionCursadaComponent>,
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
    const idCursada = this.data.idCursada;
    const cursa = this.formulario.value.cursa;
    const equivalencia = this.formulario.value.equivalencia;
    this.materiasService.realizarInscripcionCursada(idCursada, cursa, equivalencia).subscribe(
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
  }

}
