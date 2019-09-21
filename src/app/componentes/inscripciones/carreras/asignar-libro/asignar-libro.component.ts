import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CarrerasService } from 'src/app/servicios/carreras.service';

@Component({
  selector: 'app-asignar-libro',
  templateUrl: './asignar-libro.component.html',
  styleUrls: ['./asignar-libro.component.scss']
})
export class AsignarLibroComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private notif: NotificationsService,
    private carrerasService: CarrerasService,
    public dialogRef: MatDialogRef<AsignarLibroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { idInscripcionCarrera: number, libro: number, folio: number },
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      idInscripcionCarrera: [this.data.idInscripcionCarrera],
      libro: [this.data.libro],
      folio: [this.data.folio],
    });
  }

  public cerrar() {
    this.dialogRef.close();
  }

  enviar() {
    this.showSpinner = true;
    const idInscripcionCarrera = this.formulario.value.idInscripcionCarrera;
    const libro = this.formulario.value.libro;
    const folio = this.formulario.value.folio;
    this.carrerasService.asignarLibroFolio(idInscripcionCarrera, libro, folio).subscribe(
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
    console.log(this.data);
    this.crearFormulario();
  }

}
