import { Component, OnInit, ViewChild } from '@angular/core';
import { MateriasService } from 'src/app/servicios/materias.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { Carrera } from 'src/app/modelos/carrera';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/servicios/helper.service';
import { FinalAbierto } from 'src/app/modelos/final-abierto';
import { InscribirAlumnoFinalComponent } from '../inscribir-alumno-final/inscribir-alumno-final.component';
import { CarrerasService } from 'src/app/servicios/carreras.service';

@Component({
  selector: 'app-inscripciones-finales',
  templateUrl: './inscripciones-finales.component.html',
  styleUrls: ['./inscripciones-finales.component.scss']
})

export class InscripcionesFinalesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<FinalAbierto>;
  rol;
  displayedColumns;
  showSpinner = true;
  mesas: FinalAbierto[];
  filtro;
  carreras: Carrera[] = [];
  carreraSeleccionada = 'Todas las carreras';

  constructor(
    public helper: HelperService,
    private materiasService: MateriasService,
    private carrerasService: CarrerasService,
    private notif: NotificationsService,
    private router: Router,
    private confirmation: ConfirmationDialogService,
    public dialog: MatDialog,
  ) { }

  private async listarCarreras() {
    try {
      const res = await this.carrerasService.traerCarreras();
      this.carreras = JSON.parse(JSON.stringify(res));
      const todas: Carrera = {
        nombre: 'Todas las carreras',
        cantidad_materias: 0,
        duracion: 0,
        id: 0,
        materias_cargadas: '0',
      };
      this.carreras.unshift(todas);
      this.showSpinner = false;
      console.log(res);
    } catch (error) {
      console.error(error);
      this.notif.error(error.error.mensaje);
      this.showSpinner = false;
    }
  }

  public filtroCarrera(event) {
    this.filtro = '';
    if (event.nombre === 'Todas las carreras') {
      if (this.rol === 'alumno') {
        this.displayedColumns = ['fecha_examen', 'carrera', 'materia', 'anio_materia', 'profesor',
          'fecha_inicio', 'fecha_limite', 'acciones'];
      } else {
        this.displayedColumns = ['fecha_examen', 'carrera', 'materia', 'anio_materia', 'profesor',
          'fecha_inicio', 'fecha_limite', 'cant_inscriptos', 'acciones'];
      }
      this.dataSource = new MatTableDataSource(this.mesas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      const materias = [];
      if (this.rol === 'alumno') {
        this.displayedColumns = ['fecha_examen', 'carrera', 'materia', 'anio_materia', 'profesor',
          'fecha_inicio', 'fecha_limite', 'acciones'];
      } else {
        this.displayedColumns = ['fecha_examen', 'materia', 'anio_materia', 'profesor',
          'fecha_inicio', 'fecha_limite', 'cant_inscriptos', 'acciones'];
      }
      for (const materia of this.mesas) {
        if (materia.carrera === event.nombre) {
          materias.push(materia);
        }
      }
      this.dataSource = new MatTableDataSource(materias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  public ListarFinales() {
    this.showSpinner = true;
    this.materiasService.listarFinales().subscribe(
      (res) => {
        this.mesas = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
        this.filtroCarrera({ nombre: this.carreraSeleccionada });
        console.log(res);
      },
      (error) => {
        // this.showSpinner = false;
        this.notif.error(error.error.mensaje);
        console.log(error);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async inscribirse(materia: string, fecha: string, id: number) {
    const confirm = await this.confirmation.confirm('Confirme su inscripción a la mesa de final',
      'Inscripción a ' + materia + ' // Fecha de examen ' + new Date(fecha).toLocaleDateString());
    if (confirm) {
      this.showSpinner = true;
      this.materiasService.inscripcionFinal(id).subscribe(
        (resp) => {
          console.log(resp);
          this.notif.success(resp.mensaje);
          this.ListarFinales();
        },
        (error) => {
          this.showSpinner = false;
          console.error(error);
          this.notif.error(error.error.mensaje);
        }
      );
    }
  }

  inscribirAlumnoFinal(materia: string, fechaExamen: string, idMesa: number, idCarrera: number) {
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
      data: {
        materia,
        fechaExamen,
        idMesa,
        idCarrera
      }
    };
    const modal = this.dialog.open(InscribirAlumnoFinalComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.ListarFinales();
        }
      }
    );
  }

  async desinscribirse(idInscripcionCursada: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar su inscripción de la mesa de final?');
    if (confirm) {
      this.showSpinner = true;
      this.materiasService.eliminarInscripcionFinal(idInscripcionCursada).subscribe(
        (res) => {
          this.ListarFinales();
          console.log(res);
        },
        (error) => {
          this.showSpinner = false;
          this.notif.error(error.error.mensaje);
          console.log(error);
        });
    }
  }

  detalles(id) {
    this.router.navigateByUrl('inscripcion/mesas/' + id);
  }

  public async eliminar(id: number) {
    const eliminar = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar la mesa de final?');
    if (eliminar) {
      this.showSpinner = true;
      this.materiasService.eliminarMesaFinal(id).subscribe(
        (res) => {
          this.ListarFinales();
          console.log(res);
        },
        (error) => {
          this.showSpinner = false;
          this.notif.error(error.error.mensaje);
          console.error(error);
        });
    }
  }

  public async actaVolante(idMesa: number) {
    this.router.navigateByUrl('acta_volante/' + idMesa);
  }

  ngOnInit() {
    this.rol = this.helper.rolActual();
    this.listarCarreras();
    this.ListarFinales();
  }


}
