import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriasService } from 'src/app/servicios/materias.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.scss']
})
export class CrearMateriaComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = true;
  carrera: string;
  duracion: number;
  tiposMaterias = [
    {
      id: 1,
      nombre: 'Curricular'
    },
    {
      id: 2,
      nombre: 'Práctica'
    },
    {
      id: 3,
      nombre: 'Taller'
    },
    {
      id: 4,
      nombre: 'Seminario'
    },
  ];
  materias = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private notif: NotificationsService,
    private materiasService: MateriasService,
    private carrerasService: CarrerasService,
  ) { }


  private crearFormulario() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      anio: [1, [Validators.required, Validators.max(this.duracion || 5), Validators.min(1)]],
      tipoMateria: [null, Validators.required],
      correlativas: [[]]
    });
  }

  private cargar_materias_por_carrera(idCarrera: number) {
    this.materiasService.materias_por_carrera(idCarrera).subscribe(
      (res) => {
        console.log(res);
        this.materias = res;
      },
      (error) => {
        this.notif.error(error.error.mensaje);
        console.error(error);
      }
    );
  }

  private cargar_carrera(id): Promise<void> {
    return new Promise( (resolve, reject) => {
      this.carrerasService.traerCarrera(id).subscribe(
        (resp) => {
          console.log(resp);
          this.carrera = resp.nombre;
          this.duracion = resp.duracion;
          resolve();
        },
        (error) => {
          reject();
          console.error(error);
          this.notif.error(error.error.mensaje);
        }
      );
    });
  }

  enviar() {
    const idCarrera = this.route.snapshot.params.id;
    const materia = {
      nombre: this.formulario.value.nombre,
      año: this.formulario.value.anio,
      id_carrera: idCarrera,
      id_tipo: this.formulario.value.tipoMateria,
      correlativas: this.formulario.value.correlativas
    };
    this.materiasService.crearMateria(materia).subscribe(
      (resp) => {
        console.log(resp);
        this.notif.success(resp.mensaje);
        this.router.navigate(['/carreras']);
      },
      (error) => {
        console.error(error);
        this.notif.error(error.error.mensaje);
      }
    );
  }

  ngOnInit() {
    const idCarrera = this.route.snapshot.params.id;
    this.crearFormulario();
    this.cargar_materias_por_carrera(idCarrera);
    this.cargar_carrera(idCarrera).then(
      () => {
        this.showSpinner = false;
        this.crearFormulario();
      }
    );
  }

}
