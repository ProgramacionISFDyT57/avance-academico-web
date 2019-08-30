import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './servicios/helper.service';
import { MatDialog } from '@angular/material';
import { CambioClaveComponent } from './componentes/usuarios/cambio-clave/cambio-clave.component';
import { ConfirmationDialogService } from './servicios/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  notifOptions = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };

  rol: string;

  constructor(
    private router: Router,
    public helper: HelperService,
    public dialog: MatDialog,
    public confirm: ConfirmationDialogService
  ) {}

  public rutaActualInscripcion() {
    if (this.router.url.includes('inscripcion')) {
      return true;
    }
    return false;
  }

  public mostrar_barra() {
    if (this.router.url === '/login') {
      this.rol = undefined;
      return false;
    } else {
      this.rol = sessionStorage.getItem('rol');
      return true;
    }
  }

  public cambiarClave() {
    this.dialog.open(CambioClaveComponent);
  }

  public async salir() {
    const confirm = await this.confirm.confirm('Confirme la acción', '¿Cerrar la sesión?');
    if (confirm) {
      this.router.navigate(['/login']);
    }
  }
}
