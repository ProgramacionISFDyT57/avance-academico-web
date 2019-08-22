import { Component, OnInit, ViewChild } from '@angular/core';
import { CarrerasService } from 'src/app/servicios/carreras.service';
import { Carrera } from 'src/app/modelos/carrera';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-carreras',
  templateUrl: './carreras.component.html',
  styleUrls: ['./carreras.component.scss']
})
export class CarrerasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Carrera>;
  displayedColumns = ['nombre', 'duracion', 'cantidad_materias', 'acciones'];
  showSpinner = true;

  constructor(
    private carrerasService: CarrerasService,
    private notif: NotificationsService,
    private confirmation: ConfirmationDialogService
  ) { }

  public ListarCarreras() {
    this.carrerasService.traerCarreras().subscribe(
      (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.showSpinner = false;
        console.log(res);
      },
      (error) => {
        // this.showSpinner = false;
        this.notif.error(error.error.mensaje);
        console.log(error);
      });
  }

  public async eliminar(id: number) {
    const eliminar = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar la carrera?');
    // const eliminar = confirm('¿Desea eliminar la carrera?');
    if (eliminar) {
      this.showSpinner = true;
      this.carrerasService.eliminarCarrera(id).subscribe(
        (resp) => {
          this.ListarCarreras();
          this.notif.success(resp.mensaje);
          console.log(resp);
        },
        (error) => {
          this.showSpinner = false;
          this.notif.error(error.error.mensaje);
          console.log(error);
        });
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnInit() {
    this.ListarCarreras();
  }

}
