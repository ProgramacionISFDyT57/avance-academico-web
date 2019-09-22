import { Component, OnInit } from '@angular/core';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Carrera } from 'src/app/modelos/carrera';
import { NotificationsService } from 'angular2-notifications';
import { HorarioCarrera } from 'src/app/modelos/horario-carrera';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;
  carreras: Carrera[];
  horarios: HorarioCarrera[];
  carrera: string;
  materiasLunes = [];
  mostrarSabado = false;

  constructor(
    private carrerasService: CarrerasService,
    private notif: NotificationsService,
    private fb: FormBuilder,
  ) { }

  enviar() {
    this.showSpinner = true;
    const anio = this.formulario.value.anio;
    const id_carrera = this.formulario.value.id_carrera;
    const curso = this.formulario.value.curso;
    this.carrerasService.horarios(anio, id_carrera, curso).subscribe(
      (resp) => {
        this.showSpinner = false;
        this.horarios = resp;
        for (const horario of resp) {
          if (horario.dia === 6 ) {
            this.mostrarSabado = true;
          }
        }
        console.log(resp);
      },
      (error) => {
        this.showSpinner = false;
        this.notif.error(error.error.mensaje);
        console.error(error);
      }
    );
  }

  private crearFormulario() {
    const añoActual = new Date().getFullYear();
    this.formulario = this.fb.group({
      anio: [añoActual, Validators.required],
      id_carrera: [null, Validators.required],
      curso: [null, Validators.required],
    });
  }

  public cambioCarrera(event) {
    this.carrera = event.nombre;
  }

  private async listarCarreras() {
    try {
      const res = await this.carrerasService.traerCarreras();
      this.carreras = res;
      this.showSpinner = false;
      console.log(res);
    } catch (error) {
      console.error(error);
      this.notif.error(error.error.mensaje);
      this.showSpinner = false;
    }
  }

  public imprimir() {
    window.print();
  }

  ngOnInit() {
    this.listarCarreras();
    this.crearFormulario();
  }

}
