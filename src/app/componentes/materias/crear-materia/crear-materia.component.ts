import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MateriasService } from 'src/app/servicios/materias.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-materia',
  templateUrl: './crear-materia.component.html',
  styleUrls: ['./crear-materia.component.scss']
})
export class CrearMateriaComponent implements OnInit {

  formulario: FormGroup;
  tiposMaterias= [
    {
      id: 1,
      nombre: "Curricular"
    },
    {
      id: 2,
      nombre: "Práctica"
    },
    {
      id: 3,
      nombre: "Taller"
    },
    {
      id: 4,
      nombre: "Seminario"
    },
  ]
  materias=[]
  constructor(
    private fb: FormBuilder,
    private MateriasService: MateriasService,
    private route: ActivatedRoute
  ) { }


  private crearFormulario(){
    this.formulario= this.fb.group({
      nombre: ['', Validators.required],
      año: [1, [Validators.required, Validators.max(5), Validators.min(1)]],
      tipoMateria: [null, Validators.required],
      correlativas: [[]]
    })
  }

  ngOnInit() {
    this.crearFormulario();
  }
  enviar() {
    const id_carrera= this.route.snapshot.params["id"]
    const materia= {
      nombre: this.formulario.value.nombre,
      año: this.formulario.value.año,
      id_carrera: id_carrera,
      id_tipo: this.formulario.value.tipoMateria,
    }


    this.MateriasService.crearMateria(materia).subscribe(
      (resp) => {
        console.log(resp)
      },
      (error)=> {
        console.error(error)
      }
    )
  }

}

