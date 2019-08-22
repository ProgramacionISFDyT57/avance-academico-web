import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { InscriptosCarrera } from 'src/app/modelos/inscriptos-carrera';
import { ActivatedRoute } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-detalles-carrera',
  templateUrl: './detalles-carrera.component.html',
  styleUrls: ['./detalles-carrera.component.scss']
})
export class DetallesCarreraComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<InscriptosCarrera>;
  displayedColumns = ['alumno', 'dni', 'acciones'];
  showSpinner = true;
  carrera: string;
  cohorte: number;

  constructor(
    private route: ActivatedRoute,
    private carrerasService: CarrerasService,
    private notif: NotificationsService,
    public confirmation: ConfirmationDialogService
  ) { }

  listar_inscriptos() {
    const idCarreraAbierta = this.route.snapshot.params.id;
    this.carrerasService.listarInscriptosCarrera(idCarreraAbierta).subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(res);
        if (res.length) {
          this.carrera = res[0].carrera;
          this.cohorte = res[0].cohorte;
        }
        this.showSpinner = false;
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

  async eliminarInscripcion(idInscripcionCarrera: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar el alumno de la carrera?');
    if (confirm) {
      this.showSpinner = true;
      this.carrerasService.eliminarInscripcionCarrera(idInscripcionCarrera).subscribe(
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
