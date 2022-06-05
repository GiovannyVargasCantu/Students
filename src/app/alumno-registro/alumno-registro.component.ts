import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-alumno-registro',
  templateUrl: './alumno-registro.component.html',
  styleUrls: ['./alumno-registro.component.css']
})
export class AlumnoRegistroComponent implements OnInit {

  constructor(private db:DatabaseService) { }

  ngOnInit(): void {
  }

  /*nombre: string="";
  apellido: string="";
  matricula: string="";*/

  nuevoAlumno = new FormGroup({
    matricula: new FormControl(''),
    nombre : new FormControl(''),
    apellido : new FormControl('')
    
  });
  idNuevo: number = 0;
  onSubmit(){
    let hola: any = {};
    let x: number = 0;
    this.db.getAlumnos().subscribe( res => {
      let identificacion2: number = 0;
      [].forEach.call(res, (index) =>{
        
        console.log(x);
        x = x +1;
        
        console.log(identificacion2)
      })
    identificacion2 = x;
    this.idNuevo = identificacion2;
    console.log("Soy el id que buscaban:"+this.idNuevo)
    this.db.agregarAlumno(this.idNuevo,this.nuevoAlumno.value).subscribe(res => {console.log(res)})
    })

   
    
    
  }

  }


