import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from './servicios/helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  notifOptions = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };

  rol: string;

  constructor(
    private router: Router,
    public helper: HelperService
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

  public salir() {
    this.router.navigate(['/login']);
  }
}
