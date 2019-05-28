import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  clave: string = "";

  constructor(
    private loginService: LoginService,
    // login service es el nombre de la variable,  pero LoginService es la clase,
    private router:Router
  ) { }
  public login() {
    this.loginService.ini_sesion(this.email, this.clave).subscribe(
      (res) => {
        console.log(res);
        sessionStorage.setItem('token', res.datos);
        this.router.navigate(['/']);
      },
      (error) => {
        alert('datos invalidos')
        console.log(error);

      })
  }
  ngOnInit() {
    sessionStorage.removeItem('token');
  }

}
