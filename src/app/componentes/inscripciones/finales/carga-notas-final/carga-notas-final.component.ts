import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { MateriasService } from 'src/app/servicios/materias.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Final } from 'src/app/modelos/final';

@Component({
  selector: 'app-carga-notas-final',
  templateUrl: './carga-notas-final.component.html',
  styleUrls: ['./carga-notas-final.component.scss']
})
export class CargaNotasFinalComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private notif: NotificationsService,
    private materiasService: MateriasService,
    public dialogRef: MatDialogRef<CargaNotasFinalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Final,
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      id_inscripcion_mesa: [this.data.id_inscripcion_mesa],
      nota: [this.data.nota, [Validators.required, Validators.min(1), Validators.max(10)]],
      libro: [this.data.libro],
      folio: [this.data.folio],
    });
  }

  public cerrar() {
    this.dialogRef.close();
  }

  enviar() {
    this.showSpinner = true;
    const final: Final = {
      id_inscripcion_mesa: this.formulario.value.id_inscripcion_mesa,
      nota: this.formulario.value.nota,
      libro: this.formulario.value.libro,
      folio: this.formulario.value.folio,
    };
    this.materiasService.cargarNotasFinal(final).subscribe(
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
    this.crearFormulario();
  }

}
