import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarrerasService } from 'src/app/servicios/carreras.service';

@Component({
  selector: 'app-crear-carrera',
  templateUrl: './crear-carrera.component.html',
  styleUrls: ['./crear-carrera.component.scss']
})
export class CrearCarreraComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private carreraService: CarrerasService,
  ) { }


  private crearFormulario(){
    this.formulario= this.fb.group({
      nombre: ['', Validators.required],
      duracion: [1, [Validators.required, Validators.max(5), Validators.min(1)]],
      materias: [1, [Validators.required, Validators.min(1)]],
    })
  }

  ngOnInit() {
    this.crearFormulario();
  }
  enviar() {
    this.carreraService.crearCarrera(this.formulario.value).subscribe(
      (resp) => {
        console.log(resp)
      },
      (error)=> {
        console.error(error)
      }
    )
  }

}
