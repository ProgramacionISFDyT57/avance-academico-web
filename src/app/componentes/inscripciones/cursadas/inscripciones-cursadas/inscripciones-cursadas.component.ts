import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { MateriasService } from 'src/app/servicios/materias.service';
import { Cursada } from 'src/app/modelos/cursadas';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-inscripciones-cursadas',
  templateUrl: './inscripciones-cursadas.component.html',
  styleUrls: ['./inscripciones-cursadas.component.scss']
})
export class InscripcionesCursadasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Cursada>;
  displayedColumns = ['anio_cursada', 'carrera', 'materia', 'anio_materia',
    'fecha_inicio', 'fecha_limite', 'profesor', 'cant_inscriptos', 'acciones'];
  showSpinner = true;


  constructor(
    private materiasService: MateriasService,
    private notif: NotificationsService,
    private router: Router,
    private confirmation: ConfirmationDialogService,
  ) { }

  public ListarCursadas() {
    this.materiasService.listarCursadas().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  inscribirse(id) {
    alert('Por hacer');
  }

  async desinscribirse(idInscripcionCursada: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar su inscripción de la cursada?');
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

  public async eliminar(id: number) {
    const eliminar = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar la cursada?');
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

  ngOnInit() {
    this.ListarCursadas();
  }

}
