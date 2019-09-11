import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Usuario } from '../../modelos/usuario';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmationDialogService } from 'src/app/servicios/confirmation-dialog/confirmation-dialog.service';
import { NotificationsService } from 'angular2-notifications';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Usuario>;
  displayedColumns = ['apellido', 'nombre', 'dni', 'email', 'telefono', 'rol', 'acciones'];
  showSpinner = true;

  constructor(
    private usuariosService: UsuariosService,
    private confirmation: ConfirmationDialogService,
    private notif: NotificationsService,
    public dialog: MatDialog,
  ) { }

  public async listarUsuarios(cache = true) {
    try {
      this.showSpinner = true;
      const res = await this.usuariosService.traerUsuarios(cache);
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

  async eliminar(id: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea eliminar el usuario?');
    if (confirm) {
      this.showSpinner = true;
      this.usuariosService.eliminarUsuario(id).subscribe(
        (res) => {
          this.listarUsuarios();
          this.notif.success(res.mensaje);
          console.log(res);
        },
        (error) => {
          console.log(error);
          this.showSpinner = false;
          this.notif.error(error.error.mensaje);
        }
      );
    }
  }

  async deshabilitar(id: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea deshabilitar el usuario?');
    if (confirm) {
      this.showSpinner = true;
      this.usuariosService.deshabilitar(id).subscribe(
        (res) => {
          this.listarUsuarios();
          this.notif.success(res.mensaje);
          console.log(res);
        },
        (error) => {
          console.log(error);
          this.showSpinner = false;
          this.notif.error(error.error.mensaje);
        }
      );
    }
  }

  async habilitar(id: number) {
    const confirm = await this.confirmation.confirm('Confirme la acción', '¿Desea habilitar el usuario?');
    if (confirm) {
      this.showSpinner = true;
      this.usuariosService.deshabilitar(id).subscribe(
        (res) => {
          this.listarUsuarios();
          this.notif.success(res.mensaje);
          console.log(res);
        },
        (error) => {
          console.log(error);
          this.showSpinner = false;
          this.notif.error(error.error.mensaje);
        }
      );
    }
  }

  crearUsuario() {
    const config: MatDialogConfig = {
      width: '500px',
      maxWidth: '90%'
    };
    const modal = this.dialog.open(CrearUsuarioComponent, config);
    modal.beforeClosed().subscribe(
      (resp) => {
        if (resp) {
          this.listarUsuarios();
        }
      }
    );
  }

  ngOnInit() {
    this.listarUsuarios();
  }

}
