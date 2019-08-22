import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-crear-carrera',
  templateUrl: './crear-carrera.component.html',
  styleUrls: ['./crear-carrera.component.scss']
})
export class CrearCarreraComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private carreraService: CarrerasService,
    private notif: NotificationsService
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      duracion: [1, [Validators.required, Validators.max(5), Validators.min(1)]],
      materias: [1, [Validators.required, Validators.min(1)]],
    });
  }

  enviar() {
    this.showSpinner = true;
    this.carreraService.crearCarrera(this.formulario.value).subscribe(
      (resp) => {
        this.showSpinner = false;
        this.crearFormulario();
        this.notif.success(resp.mensaje);
        console.log(resp);
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
