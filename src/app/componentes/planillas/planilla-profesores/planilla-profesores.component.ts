import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NotificationsService } from 'angular2-notifications';
import { PlanillaProfesores, DetalleHorario } from 'src/app/modelos/planilla-profesores';

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
  profesores: PlanillaProfesores[];
  diasTexto = ['', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  diasTextoCompleto = ['', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

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
      (res) => {
        const detalle: DetalleHorario = {
          anio: null,
          modulos: null,
          carrera: null,
          dia: null,
          hora_inicio: null,
          materia: null,
        };
        const x: PlanillaProfesores = {
          id: null,
          apellido: null,
          nombre: null,
          dni: null,
          detalle: [detalle],
          email: null,
          nombre_completo: null
        };
        while (res.length % 36 !== 0) {
          res.push(x);
        }
        this.showSpinner = false;
        this.profesores = res;
        console.log(res);
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
