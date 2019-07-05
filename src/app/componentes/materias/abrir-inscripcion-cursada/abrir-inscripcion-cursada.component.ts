import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MateriasService } from 'src/app/servicios/materias.service'
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
  selector: 'app-abrir-inscripcion-cursada',
  templateUrl: './abrir-inscripcion-cursada.component.html',
  styleUrls: ['./abrir-inscripcion-cursada.component.scss']
})
export class AbrirInscripcionCursadaComponent implements OnInit {
  formulario: FormGroup;
  profesores=[]
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private MateriasService: MateriasService,
    private UsuariosService: UsuariosService,
  ) { }

  private crearFormulario(){
    this.formulario= this.fb.group({
      año: [2019, [Validators.required, Validators.min(2019)]],
      fecha_inicio: [null, Validators.required],
      fecha_limite: [null, Validators.required],
      id_profesor: [null, Validators.required],
    })
  }

  ngOnInit() {
    this.crearFormulario();
    this.UsuariosService.traerProfesores().subscribe(
      (res)=>{
        console.log(res);
        this.profesores = res;
      }
    )
  }
  enviar() {
    const id_materia= this.route.snapshot.params["id"];
    const cursadas_abiertas= {
      id_profesor: this.formulario.value.id_profesor,
      año: this.formulario.value.año,
      id_materia: id_materia,
      fecha_inicio: this.formulario.value.fecha_inicio,
      fecha_limite: this.formulario.value.fecha_limite,
    }
    this.MateriasService.abrirInscripcionCursada(cursadas_abiertas).subscribe(
      (resp) => {
        console.log(resp)
      },
      (error)=> {
        console.error(error)
      }
    )
  }
}

