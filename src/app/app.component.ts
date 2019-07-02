import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  notif_options = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  }

  constructor(private router: Router) {}

  public mostrar_barra() {
    if (this.router.url === '/login') {
      return false;
    } else {
      return true;
    }
  }

  public salir() {
    this.router.navigate(['/login']);
  }
}
