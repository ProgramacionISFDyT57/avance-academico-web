import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { TiposMateria } from 'src/app/modelos/tipos-materia';
import { MateriasService } from 'src/app/servicios/materias.service';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-tipos-materias',
  templateUrl: './tipos-materias.component.html',
  styleUrls: ['./tipos-materias.component.scss']
})
export class TiposMateriasComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<TiposMateria>;
  displayedColumns = ['nombre', 'libre', 'asistencia', 'acciones'];
  showSpinner = true;


  constructor(
    private materiasService: MateriasService,
    public dialog: MatDialog,
    private confirmation: ConfirmationDialogService,
    private notif: NotificationsService,
    // private router: Router
  ) { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public async listar(cache = true) {
    try {
      this.showSpinner = true;
      const res = await this.materiasService.listarTiposMaterias(cache);
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

  crear() {
    const config: MatDialogConfig = {
      width: '700px',
      maxWidth: '90%'
    };
    // const modal = this.dialog.open(CrearAlumnoComponent, config);
    // modal.beforeClosed().subscribe(
    //   (resp) => {
    //     if (resp) {
    //       this.showSpinner = true;
    //       this.listar();
    //     }
    //   }
    // );
  }

  editar(tipoMateria: TiposMateria) {
    const config: MatDialogConfig = {
      width: '700px',
      maxWidth: '90%',
      data: tipoMateria
    };
    // const modal = this.dialog.open(EditarAlumnoComponent, config);
    // modal.beforeClosed().subscribe(
    //   (resp) => {
    //     if (resp) {
    //       this.showSpinner = true;
    //       this.listar();
    //     }
    //   }
    // );
  }

  async eliminar(id: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar el tipo de materia?');
    if (confirm) {
      this.showSpinner = true;
      this.materiasService.eliminarTipoMateria(id).subscribe(
        (resp) => {
          this.listar();
          this.notif.success(resp.mensaje);
          console.log(resp);
        },
        (error) => {
          this.showSpinner = false;
          console.log(error);
          this.notif.error(error.error.mensaje);
        }
      );
    }
  }

  ngOnInit() {
    this.listar();
  }

}
