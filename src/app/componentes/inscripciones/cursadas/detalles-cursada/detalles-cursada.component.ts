import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MateriasService } from 'src/app/servicios/materias.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { InscriptosCursada, InscriptoCursada } from 'src/app/modelos/inscriptos-cursada';
import { NotificationsService } from 'angular2-notifications';
import { CargarNotasCursadaComponent } from '../cargar-notas-cursada/cargar-notas-cursada.component';
import { AvanceAcademico } from 'src/app/modelos/avance-academico';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { InscribirAlumnoCursadaComponent } from '../inscribir-alumno-cursada/inscribir-alumno-cursada.component';

@Component({
  selector: 'app-detalles-cursada',
  templateUrl: './detalles-cursada.component.html',
  styleUrls: ['./detalles-cursada.component.scss']
})
export class DetallesCursadaComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<InscriptoCursada>;
  displayedColumns = ['alumno', 'dni', 'nota_cuat_1', 'nota_cuat_2',
    'nota_recuperatorio', 'asistencia', 'cursa', 'equivalencia', 'acciones'];
  showSpinner = false;
  materia: string;
  anioCursada: number;
  idCursada: number;
  carrera: string;
  idCarrera: number;

  constructor(
    private route: ActivatedRoute,
    private materiasService: MateriasService,
    private notif: NotificationsService,
    public dialog: MatDialog,
    public confirmation: ConfirmationDialogService
  ) { }

  listar_inscriptos() {
    this.idCursada = this.route.snapshot.params.id;
    this.materiasService.listarInscriptosCursada(this.idCursada).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res.inscriptos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
        this.materia = res.materia;
        this.carrera = res.carrera;
        this.idCarrera = res.id_carrera;
        this.anioCursada = res.anio_cursada;
        console.log(res);
      },
      (error) => {
        this.showSpinner = false;
        console.error(error);
        this.notif.error(error.error.mensaje);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarNotas(alumno: InscriptoCursada) {
    const avance: AvanceAcademico = {
      asistencia: alumno.asistencia,
      id_inscripcion_cursada: alumno.id_inscripcion_cursada,
      nota_cuat_1: alumno.nota_cuat_1,
      nota_cuat_2: alumno.nota_cuat_2,
      nota_recuperatorio: alumno.nota_recuperatorio
    };
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
      data: avance
    };
    const modal = this.dialog.open(CargarNotasCursadaComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.showSpinner = true;
          this.listar_inscriptos();
        }
      }
    );
  }

  inscribirAlumno() {
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%',
      data: {
        idCursada: this.idCursada,
        materia: this.materia,
        idCarrera: this.idCarrera
      }
    };
    const modal = this.dialog.open(InscribirAlumnoCursadaComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.listar_inscriptos();
        }
      }
    );
  }

  async eliminarNotas(idInscripcionCursada: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar las notas cargadas?');
    if (confirm) {
      this.showSpinner = true;
      this.materiasService.eliminarNotasCursada(idInscripcionCursada).subscribe(
        (res) => {
          this.notif.success(res.mensaje);
          this.listar_inscriptos();
          console.log(res);
        },
        (error) => {
          this.showSpinner = false;
          console.error(error);
          this.notif.error(error.error.mensaje);
        }
      );
    }
  }

  ngOnInit() {
    this.showSpinner = true;
    this.listar_inscriptos();
  }

}
