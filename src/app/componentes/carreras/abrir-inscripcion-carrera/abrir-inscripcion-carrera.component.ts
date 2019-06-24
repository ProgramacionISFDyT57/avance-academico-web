import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CarrerasService } from 'src/app/servicios/carreras.service';

@Component({
  selector: 'app-abrir-inscripcion-carrera',
  templateUrl: './abrir-inscripcion-carrera.component.html',
  styleUrls: ['./abrir-inscripcion-carrera.component.scss']
})
export class AbrirInscripcionCarreraComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private carreraService: CarrerasService,
  ) { }
  private crearFormulario(){
    this.formulario= this.fb.group({
      cohorte: [2015, [Validators.required, Validators.min(2015)]],
      fecha_inicio: [null, Validators.required],
      fecha_limite: [null, Validators.required]
    })
  }

  ngOnInit() {
    this.crearFormulario();
  }
  enviar() {
    const id_carrera= this.route.snapshot.params["id"];
    const carreras_abiertas= {
      cohorte: this.formulario.value.cohorte,
      id_carrera: id_carrera,
      fecha_inicio: this.formulario.value.fecha_inicio,
      fecha_limite: this.formulario.value.fecha_limite
    }


    this.carreraService.abrirInscripcionCarrera(carreras_abiertas).subscribe(
      (resp) => {
        console.log(resp)
      },
      (error)=> {
        console.error(error)
      }
    )
  }

}
