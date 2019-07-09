import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MateriasService } from 'src/app/servicios/materias.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-abrir-inscripcion-cursada',
  templateUrl: './abrir-inscripcion-cursada.component.html',
  styleUrls: ['./abrir-inscripcion-cursada.component.scss']
})
export class AbrirInscripcionCursadaComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = true;
  materia: string;
  profesores = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notif: NotificationsService,
    private materiasService: MateriasService,
    private usuariosService: UsuariosService,
  ) { }

  private crearFormulario() {
    this.formulario = this.fb.group({
      año: [2019, [Validators.required, Validators.min(2019)]],
      fecha_inicio: [null, Validators.required],
      fecha_limite: [null, Validators.required],
      id_profesor: [null],
    });
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
        this.notif.error('Error al cargar los profesores');
        console.error(error);
      }
    );
  }

  private cargarMateria(id: number) {
    this.materiasService.traerMateria(id).subscribe(
      (res) => {
        console.log(res);
        this.materia = res.nombre;
      },
      (error) => {
        this.notif.error('Error al cargar la materia');
        console.error(error);
      }
    );
  }

  enviar() {
    this.showSpinner = true;
    const idMateria = this.route.snapshot.params.id;
    const cursada = {
      id_profesor: this.formulario.value.id_profesor,
      año: this.formulario.value.año,
      id_materia: idMateria,
      fecha_inicio: this.formulario.value.fecha_inicio,
      fecha_limite: this.formulario.value.fecha_limite,
    };
    this.materiasService.abrirInscripcionCursada(cursada).subscribe(
      (resp) => {
        this.showSpinner = false;
        this.notif.success('Se abrió la inscripción a la cursada');
        console.log(resp);
        this.router.navigate(['materias']);
      },
      (error) => {
        this.showSpinner = false;
        this.notif.error('Ocurrió un error al abrir la inscripción a la cursada');
        console.error(error);
      }
    );
  }

  ngOnInit() {
    const idMateria = this.route.snapshot.params.id;
    this.crearFormulario();
    this.cargarProfesores();
    this.cargarMateria(idMateria);
  }
}

