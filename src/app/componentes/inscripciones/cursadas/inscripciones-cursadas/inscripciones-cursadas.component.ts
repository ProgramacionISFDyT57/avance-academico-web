import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { MateriasService } from 'src/app/servicios/materias.service';
import { Cursada } from 'src/app/modelos/cursadas';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { RealizarInscripcionCursadaComponent } from '../realizar-inscripcion-cursada/realizar-inscripcion-cursada.component';
import { HelperService } from 'src/app/servicios/helper.service';
import { InscribirAlumnoCursadaComponent } from '../inscribir-alumno-cursada/inscribir-alumno-cursada.component';
import { Carrera } from 'src/app/modelos/carrera';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { EditarCursadaComponent } from '../editar-cursada/editar-cursada.component';

@Component({
  selector: 'app-inscripciones-cursadas',
  templateUrl: './inscripciones-cursadas.component.html',
  styleUrls: ['./inscripciones-cursadas.component.scss']
})
export class InscripcionesCursadasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Cursada>;
  rol;
  displayedColumns;
  cursadas: Cursada[];
  filtro;
  carreras: Carrera[] = [];
  carreraSeleccionada = 'Todas las carreras';
  showSpinner = true;
  anio = new Date().getFullYear();
  dias = ['', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
  // dias = ['', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

  constructor(
    public helper: HelperService,
    private materiasService: MateriasService,
    private carrerasService: CarrerasService,
    private notif: NotificationsService,
    private router: Router,
    private confirm: ConfirmationDialogService,
    public dialog: MatDialog,
  ) { }

  private async listarCarreras() {
    try {
      const res = await this.carrerasService.traerCarreras();
      this.carreras = JSON.parse(JSON.stringify(res));
      const todas: Carrera = {
        nombre: 'Todas las carreras',
        nombre_corto: '',
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
        this.displayedColumns = ['anio_cursada', 'carrera', 'materia', 'anio_materia',
          'fecha_inicio', 'fecha_limite', 'profesor', 'horarios', 'inscripcion', 'acciones'];
      } else {
        this.displayedColumns = ['anio_cursada', 'carrera', 'materia', 'anio_materia',
          'fecha_inicio', 'fecha_limite', 'profesor', 'horarios', 'cant_inscriptos', 'acciones'];
      }
      this.dataSource = new MatTableDataSource(this.cursadas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    } else {
      const materias = [];
      if (this.rol === 'alumno') {
        this.displayedColumns = ['anio_cursada', 'carrera', 'materia', 'anio_materia',
          'fecha_inicio', 'fecha_limite', 'profesor', 'horarios', 'inscripcion', 'acciones'];
      } else {
        this.displayedColumns = ['anio_cursada', 'materia', 'anio_materia',
          'fecha_inicio', 'fecha_limite', 'profesor', 'horarios', 'cant_inscriptos', 'acciones'];
      }
      for (const materia of this.cursadas) {
        if (materia.carrera === event.nombre) {
          materias.push(materia);
        }
      }
      this.dataSource = new MatTableDataSource(materias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  public ListarCursadas() {
    this.showSpinner = true;
    this.materiasService.listarCursadas(this.anio).subscribe(
      (res) => {
        this.cursadas = res;
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.filtroCarrera({ nombre: this.carreraSeleccionada });
        this.showSpinner = false;
        console.log(res);
      },
      (error) => {
        this.showSpinner = false;
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

  inscribirse(idCursada: number, materia: string) {
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
      data: {
        idCursada,
        materia
      }
    };
    const modal = this.dialog.open(RealizarInscripcionCursadaComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.ListarCursadas();
        }
      }
    );
  }

  inscribirAlumno(idCursada: number, materia: string, idCarrera: number) {
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
      data: {
        idCursada,
        materia,
        idCarrera
      }
    };
    const modal = this.dialog.open(InscribirAlumnoCursadaComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.ListarCursadas();
        }
      }
    );
  }

  async desinscribirse(idInscripcionCursada: number) {
    const confirm = await this.confirm.confirm('Confirme la acción', '¿Desea eliminar su inscripción de la cursada?');
    if (confirm) {
      this.showSpinner = true;
      this.materiasService.eliminarInscripcionCursada(idInscripcionCursada).subscribe(
        (res) => {
          this.ListarCursadas();
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
    this.router.navigateByUrl('inscripcion/cursadas/' + id);
  }

  editar(cursada: Cursada) {
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
      data: cursada
    };
    const modal = this.dialog.open(EditarCursadaComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.ListarCursadas();
        }
      }
    );
  }

  public async eliminar(id: number) {
    const eliminar = await this.confirm.confirm('Confirme la acción', '¿Desea eliminar la cursada?');
    if (eliminar) {
      this.showSpinner = true;
      this.materiasService.eliminarCursada(id).subscribe(
        (res) => {
          this.ListarCursadas();
          console.log(res);
        },
        (error) => {
          this.showSpinner = false;
          this.notif.error(error.error.mensaje);
          console.error(error);
        });
    }
  }

  inscriptosCursada(idCursada: number) {
    this.router.navigateByUrl('planilla_inscriptos_cursada/' + idCursada);
  }

  planillaAsistencia(idCursada: number) {
    this.router.navigateByUrl('planilla_asistencia/' + idCursada);
  }

  ngOnInit() {
    this.rol = this.helper.rolActual();
    this.listarCarreras();
    this.ListarCursadas();
  }

}
