import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-planilla-profesores',
  templateUrl: './planilla-profesores.component.html',
  styleUrls: ['./planilla-profesores.component.scss']
})
export class PlanillaProfesoresComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = false;
  dias = [
    {
      id: 1,
      nombre: 'Lunes'
    },
    {
      id: 2,
      nombre: 'Martes'
    },
    {
      id: 3,
      nombre: 'Miercoles'
    },
    {
      id: 4,
      nombre: 'Jueves'
    },
    {
      id: 5,
      nombre: 'Viernes'
    },
    {
      id: 6,
      nombre: 'Sábado'
    },
    {
      id: 7,
      nombre: 'Todos'
    },
  ];
  dia: string;
  profesores;

  constructor(
    private usuariosService: UsuariosService,
    private notif: NotificationsService,
    private fb: FormBuilder,
  ) { }

  enviar() {
    this.showSpinner = true;
    const anio = this.formulario.value.anio;
    const dia = this.formulario.value.dia;
    this.usuariosService.listarProfesoresPorDia(anio, dia).subscribe(
      (resp) => {
        this.showSpinner = false;
        this.profesores = resp;
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
      dia: [null, Validators.required],
    });
  }

  public cambioDia(event) {
    this.dia = event.nombre;
  }

  public imprimir() {
    window.print();
  }

  ngOnInit() {
    this.crearFormulario();
  }

}
