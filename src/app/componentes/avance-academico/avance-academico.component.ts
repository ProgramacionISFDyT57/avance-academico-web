import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HelperService } from 'src/app/servicios/helper.service';
import { AlumnosService } from 'src/app/servicios/alumno.service';
import { NotificationsService } from 'angular2-notifications';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Analitico } from 'src/app/modelos/analitico';

@Component({
  selector: 'app-avance-academico',
  templateUrl: './avance-academico.component.html',
  styleUrls: ['./avance-academico.component.scss']
})
export class AvanceAcademicoComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['anio', 'nombre_materia', 'cursada', 'final', 'tomo', 'folio'];
  showSpinner = true;
  alumno: string;
  carrera: string;
  cohorte: number;
  dni: string;
  domicilio: string;
  nacimiento: string;
  telefono: string;
  libro: string;
  folio: string;
  analiticos: Analitico[] = [];
  carreras: any[];
  indiceCarreraSeleccionada: number;
  promedio: number;
  porcentajeCarrera: number;

  constructor(
    public helper: HelperService,
    private alumnosService: AlumnosService,
    private notif: NotificationsService,
    private router: Router,
    private confirm: ConfirmationDialogService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  cargarDatos(indice: number) {
    this.estadisticas(this.analiticos[indice]);
    this.dataSource = new MatTableDataSource(this.analiticos[indice].materias);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.showSpinner = false;
    this.alumno = this.analiticos[indice].apellido + ', ' + this.analiticos[indice].nombre;
    this.carrera = this.analiticos[indice].carrera;
    this.cohorte = this.analiticos[indice].cohorte;
    this.dni = this.analiticos[indice].dni;
    this.domicilio = this.analiticos[indice].domicilio;
    this.nacimiento = this.analiticos[indice].fecha_nacimiento;
    this.telefono = this.analiticos[indice].telefono;
    this.libro = this.analiticos[indice].libro;
    this.folio = this.analiticos[indice].folio;
  }

  private estadisticas(analitico: Analitico) {
    const materiasTotales = analitico.materias.length;
    let materiasAprobadas = 0;
    let sumaNotas = 0;
    for (const materia of analitico.materias) {
      if (materia.final) {
        sumaNotas += materia.final;
        materiasAprobadas++;
      }
    }
    if (materiasAprobadas) {
      this.promedio = +(sumaNotas / materiasAprobadas).toFixed(2);
    }
    this.porcentajeCarrera = Math.trunc(materiasAprobadas * 100 / materiasTotales);
  }

  public avanceAcademico(id?: number) {
    this.alumnosService.avanceAcademico(id).subscribe(
      (res) => {
        console.log(res);
        this.analiticos = res;
        this.carreras = [];
        for (let i = 0; i < this.analiticos.length; i++) {
          this.carreras.push({
            indice: i,
            nombre: this.analiticos[i].carrera + ' (' + this.analiticos[i].cohorte + ')'
          });
        }
        this.indiceCarreraSeleccionada = 0;
        this.cargarDatos(this.indiceCarreraSeleccionada);
      },
      (error) => {
        this.showSpinner = false;
        this.notif.error(error.error.mensaje);
        console.log(error);
      });
  }

  public cambioCarrera(event) {
    this.cargarDatos(this.indiceCarreraSeleccionada);
  }

  ngOnInit() {
    const idAlumno = +this.route.snapshot.params.id;
    if (idAlumno) {
      this.avanceAcademico(idAlumno);
    } else {
      this.avanceAcademico();
    }
  }

}
