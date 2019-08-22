import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriasService } from 'src/app/servicios/materias.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.scss']
})
export class CrearMateriaComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = true;
  idCarrera: number;
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
    private notif: NotificationsService,
    private materiasService: MateriasService,
    public dialogRef: MatDialogRef<CrearMateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
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
        this.showSpinner = false;
      },
      (error) => {
        this.notif.error(error.error.mensaje);
        console.error(error);
        this.showSpinner = false;
      }
    );
  }

  public cerrar() {
    this.dialogRef.close();
  }

  enviar() {
    const materia = {
      nombre: this.formulario.value.nombre,
      año: this.formulario.value.anio,
      id_carrera: this.idCarrera,
      id_tipo: this.formulario.value.tipoMateria,
      correlativas: this.formulario.value.correlativas
    };
    this.materiasService.crearMateria(materia).subscribe(
      (resp) => {
        console.log(resp);
        this.notif.success(resp.mensaje);
        this.dialogRef.close(true);
      },
      (error) => {
        console.error(error);
        this.notif.error(error.error.mensaje);
      }
    );
  }

  ngOnInit() {
    this.idCarrera = this.data.idCarrera;
    this.carrera = this.data.carrera;
    this.duracion = this.data.duracion;
    this.cargar_materias_por_carrera(this.idCarrera);
    this.crearFormulario();
  }

}
