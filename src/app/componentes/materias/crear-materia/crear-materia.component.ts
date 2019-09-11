import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MateriasService } from 'src/app/servicios/materias.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Materia } from 'src/app/modelos/materia';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.scss']
})
export class CrearMateriaComponent implements OnInit {

  formulario: FormGroup;
  showSpinner = true;
  actualizar = false;
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
  materias: Materia[] = [];
  cargadoMaterias = true;
  materiasFiltradas: Materia[] = [];
  anios: number[] = [];
  @ViewChild('myNgForm') myNgForm: NgForm;
  @ViewChild('nombre') nombre: ElementRef;

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
      anio: [null, Validators.required],
      tipoMateria: [null, Validators.required],
      correlativas: [[]]
    });
  }

  private crearArregloAños(duracion: number) {
    for (let x = 1 ; x <= duracion ; x++) {
      this.anios.push(x);
    }
  }

  public cambioAnio() {
    const año = this.formulario.value.anio;
    this.materiasFiltradas = [];
    for (const materia of this.materias) {
      if (materia.anio < año) {
        this.materiasFiltradas.push(materia);
      }
    }
  }

  private cargar_materias_por_carrera(idCarrera: number) {
    this.materiasService.materias_por_carrera(idCarrera).subscribe(
      (res) => {
        console.log(res);
        this.materias = res;
        this.cargadoMaterias = false;
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
    this.dialogRef.close(this.actualizar);
  }

  enviar() {
    this.showSpinner = true;
    const materia: Materia = {
      nombre: this.formulario.value.nombre,
      anio: this.formulario.value.anio,
      id_carrera: this.idCarrera,
      id_tipo: this.formulario.value.tipoMateria,
      correlativas: this.formulario.value.correlativas
    };
    this.materiasService.crearMateria(materia).subscribe(
      (resp) => {
        console.log(resp);
        this.notif.success(resp.mensaje);
        this.myNgForm.resetForm();
        this.nombre.nativeElement.focus();
        this.showSpinner = false;
        this.actualizar = true;
      },
      (error) => {
        console.error(error);
        this.showSpinner = false;
        this.notif.error(error.error.mensaje);
      }
    );
  }

  ngOnInit() {
    this.idCarrera = this.data.idCarrera;
    this.carrera = this.data.carrera;
    this.duracion = this.data.duracion;
    this.crearArregloAños(this.duracion);
    this.cargar_materias_por_carrera(this.idCarrera);
    this.crearFormulario();
  }

}
