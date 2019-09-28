import { Component, OnInit, ViewChild } from '@angular/core';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { CarreraAbierta } from 'src/app/modelos/carreraabierta';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { HelperService } from 'src/app/servicios/helper.service';
import { InscribirAlumnoComponent } from '../inscribir-alumno/inscribir-alumno.component';


@Component({
  selector: 'app-inscripciones-carreras',
  templateUrl: './inscripciones-carreras.component.html',
  styleUrls: ['./inscripciones-carreras.component.scss']
})
export class InscripcionesCarrerasComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<CarreraAbierta>;
  displayedColumns = ['cohorte', 'nombre', 'resolucion', 'duracion', 'fecha_inicio', 'fecha_limite', 'cant_inscriptos', 'acciones'];

  showSpinner = true;

  constructor(
    private carrerasService: CarrerasService,
    private notif: NotificationsService,
    private router: Router,
    private confirmation: ConfirmationDialogService,
    public helper: HelperService,
    public dialog: MatDialog,
  ) { }

  public async listarCateriasAbiertas(cache = true) {
    try {
      this.showSpinner = true;
      const res = await this.carrerasService.listarCarrerasAbiertas(cache);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.showSpinner = false;
      console.log(res);
    } catch (error) {
      console.error(error);
      this.notif.error(error.error.mensaje);
      this.showSpinner = false;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detalles(id) {
    this.router.navigateByUrl('inscripcion/carreras/' + id);
  }

  public inscribirAlumno(idCarreraAbierta: number, carrera: string) {
    const modal = this.dialog.open(InscribirAlumnoComponent, {
      width: '500px',
      maxWidth: '90%',
      data: {
        idCarreraAbierta,
        carrera,
      }
    });
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.listarCateriasAbiertas();
        }
      }
    );
  }

  public async eliminar(id: number) {
    const eliminar = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar la carrera para la cohorte?');
    if (eliminar) {
      this.showSpinner = true;
      this.carrerasService.eliminarCarreraAbierta(id).subscribe(
        (res) => {
          this.listarCateriasAbiertas();
          console.log(res);
        },
        (error) => {
          this.showSpinner = false;
          this.notif.error(error.error.mensaje);
          console.error(error);
        });
    }
  }

  ngOnInit() {
    this.listarCateriasAbiertas();
  }

}
