import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { DatabaseService } from '../database.service';
import {Router} from '@angular/router'
import { Alumno } from '../models/alumno';
@Component({
  selector: 'app-alumno-detalle',
  templateUrl: './alumno-detalle.component.html',
  styleUrls: ['./alumno-detalle.component.css']
})
export class AlumnoDetalleComponent implements OnInit {

  constructor(private ruta: ActivatedRoute,public actionSheetController: ActionSheetController, private http:HttpClient, private bd:DatabaseService, private router:Router) { }
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Alumnos',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        id: 'delete-button',  
        data: {
          type: 'delete'
        },
        handler: () => {
          console.log('Eliminar clicked');
          this.borrarAlumno(this.identificacion);
          this.router.navigate(['/inicio']);
          this.consultaDBAlumnos();
        }
      }, 
       {
        text: 'Editar',
        role: 'editing',
        icon: 'create',
        id: 'edit-button',  
        data: {
          type: 'edit'
        },
        handler: () => {
          console.log('Editar clicked');
          this.ToggleEditar();
        
        }
      }, 
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancelar clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
  borrarAlumno(id : number)  {
    this.bd.deleteAlumno(id).subscribe(res => {
      console.log(res);
      this.consultaDBAlumnos();
    })
  } 
  

 // matricula: string = this.ruta.snapshot.params['matricula'];

  ngOnInit(): void {
    //let index = this.id;
    //this.getAlumnoDetalle(this.matricula);
   /// this.getAlumnoDetalle(index).subscribe(res => {
     // this.alumnoDetalle =res;
    //})
    this.getAlumnoDetalle();
  }

  alumnoDetalle: Alumno = {
    matricula: "",
    apellido: "",
    nombre: ""
  };

  Matricula: string = this.ruta.snapshot.params['index']
  identificacion: number = 0;
  getAlumnoDetalle(){
    let hola: any = {};
    let x: number = 0;
    console.log("Matricula que busco: "+this.Matricula)
    this.bd.getAlumnos().subscribe( res => {
      let identificacion2: number = 0;
      [].forEach.call(res, (index) =>{
        
        if(index != null ){
          hola = Object.values(index);
          console.log(hola[1]+" es igual a "+this.Matricula)
         if(hola[1] === this.Matricula){
           let y: number = x 
           identificacion2 = y;
           console.log(identificacion2)
           this.identificacion = identificacion2
         }
        }
        console.log(x);
        x = x +1;
        
        console.log(identificacion2)
      })
    this.identificacion = identificacion2;
    console.log("Soy el id que buscaban:"+this.identificacion)
    this.bd.getAlumnoDetalle(this.identificacion).subscribe(res => {
      console.log(res);
      let alumno = Object.assign(res);
      this.alumnoDetalle = Object.assign(alumno);
      
      //this.alumnoNuevosDatos = this.alumnoDetalle;
    })
    })

    
  }
  alumnos: any = [
   
  ];
  consultaDBAlumnos(){
    //Hacer solicitud HTPP para obtener la lista de alumnos
    //return this.http.get('https://alumnos-32-1954779-default-rtdb.firebaseio.com/alumnos.json')
    this.bd.getAlumnos().subscribe(res => {
      let checar: any = [];
      [].forEach.call(res, (index) =>{
        
        if(index != null ){
          checar.push(index)
  
        }
        

       
      })

      this.alumnos = checar;

 
 
      //Necesita tener los alumnos cargados antes de poder filtrar hacia $alumnos
      // Inicializa la variable de busqueda de alumno para traer todos cuando carga el componente
    });
  }
  editando: boolean = false;

  ToggleEditar(){
    this.editando = !this.editando;

  }

  SavearAlumno(id: number, nuevoCaption: any){
    this.bd.updateAlumno(id, nuevoCaption).subscribe(res => {
      console.log("El alumno ha sido modificado");
      this.consultaDBAlumnos();
    })

    this.ToggleEditar();

  }
  }

  /* getAlumnoDetalle(matricula: string): any {

    for(let i = 0; i < this.alumnos.length; i++){ //Ciclo para buscar alumno por matricula
      if(this.alumnos[i].matricula == this.matricula) { //valida si la matricula coincide en ese alumno
        this.alumnoDetalle = this.alumnos[i]; // asignar alumno a alumno detlle
      }
    }

    return this.alumnoDetalle;
  } */

