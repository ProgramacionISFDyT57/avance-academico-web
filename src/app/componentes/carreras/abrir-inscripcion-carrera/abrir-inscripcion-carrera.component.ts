import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-abrir-inscripcion-carrera',
  templateUrl: './abrir-inscripcion-carrera.component.html',
  styleUrls: ['./abrir-inscripcion-carrera.component.scss']
})
export class AbrirInscripcionCarreraComponent implements OnInit {

  formulario: FormGroup;
  carrera: string;
  showSpinner = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notif: NotificationsService,
    private carreraService: CarrerasService,
  ) { }

  private crearFormulario() {
    const añoActual = new Date().getFullYear();
    this.formulario = this.fb.group({
      cohorte: [añoActual, [Validators.required, Validators.min(añoActual)]],
      fecha_inicio: [null, Validators.required],
      fecha_limite: [null, Validators.required]
    });
  }

  enviar() {
    this.showSpinner = true;
    const idCarrera = this.route.snapshot.params.id;
    const carrerasAbiertas = {
      cohorte: this.formulario.value.cohorte,
      id_carrera: idCarrera,
      fecha_inicio: this.formulario.value.fecha_inicio,
      fecha_limite: this.formulario.value.fecha_limite
    };

    this.carreraService.abrirInscripcionCarrera(carrerasAbiertas).subscribe(
      (resp) => {
        this.showSpinner = false;
        this.notif.success('Se abrió la inscripción a la carrera');
        this.router.navigate(['inscripcion/carrera']);
        console.log(resp);
      },
      (error) => {
        this.showSpinner = false;
        this.notif.error('Error al abrir la inscripción a la carrera');
        console.error(error);
      }
    );
  }

  ngOnInit() {
    const idCarrera = this.route.snapshot.params.id;
    this.crearFormulario();
    this.carreraService.traerCarrera(idCarrera).subscribe(
      (resp) => {
        this.carrera = resp.nombre;
        this.showSpinner = false;
      }
    );
  }

}
