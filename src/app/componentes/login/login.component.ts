import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/servicios/login.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  reactiveForm: FormGroup;
  showSpinner = false;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private notificationsService: NotificationsService,
  ) { }

  onSubmit() {
    this.showSpinner = true;
    this.loginService.ini_sesion(this.reactiveForm.value.usuario, this.reactiveForm.value.clave).subscribe(
      (resp) => {
        console.log(resp);
        this.showSpinner = false;
        sessionStorage.setItem('token', resp.token);
        sessionStorage.setItem('rol', resp.rol);
        sessionStorage.setItem('usuario', resp.usuario);
        this.router.navigate(['/']);
        this.notificationsService.success('Sesión Iniciada');
      },
      (error) => {
        console.error(error);
        this.showSpinner = false;
        this.notificationsService.error(error.error.mensaje);
      }
    );
  }

  createForm() {
    this.reactiveForm = this.fb.group({
      usuario: ['', Validators.required],
      clave: ['', Validators.required]
    });
  }

  ngOnInit() {
    sessionStorage.removeItem('token');
    this.createForm();
  }

}
