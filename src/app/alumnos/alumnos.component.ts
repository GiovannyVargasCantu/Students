import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { DatabaseService } from '../database.service';
import { ActivatedRoute } from '@angular/router';
import { Alumno } from '../models/alumno';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent implements OnInit {

  
  constructor(public actionSheetController: ActionSheetController, private http:HttpClient,private db:DatabaseService, private ruta:ActivatedRoute) {}

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
  ngOnInit(): void {
  
 
    this.consultaDBAlumnos();
 
   
  }

hola: string = "hola mundo"


  /*alumnos: any = [
   
  ];*/

  consultaDBAlumnos(){
    this.db.getAlumnos().subscribe(res => {
      let checar: any = [];
      [].forEach.call(res, (index) =>{
        
        if(index != null ){
          checar.push(index)
  
        }
        

       
      })

      this.alumnos = checar;

 
 
      //Necesita tener los alumnos cargados antes de poder filtrar hacia $alumnos
      this.buscarAlumno = ""; // Inicializa la variable de busqueda de alumno para traer todos cuando carga el componente
    });
  }

  buscar($event:Event){
    console.log(this.buscarAlumno,"evento")
   // let nombreAlumno:any;
    
    //this.$alumnos = this.alumnos.filter(nombreAlumno => nombreAlumno.includes(this.hola))

   //console.log(this.$alumnos)

  }


  identificacion: number = 0;
  borrarAlumno(matricula: string)  {
    let hola: any = {};
    let x: number = 0;
    console.log("Matricula que busco: "+ matricula)
    this.db.getAlumnos().subscribe( res => {
      let identificacion2: number = 0;
      [].forEach.call(res, (index) =>{
        
        if(index != null ){
          hola = Object.values(index);
          console.log(hola[1]+" es igual a "+ matricula)
         if(hola[1] === matricula){
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
    this.db.deleteAlumno(this.identificacion).subscribe(res => {
      console.log(res);
      this.consultaDBAlumnos();  
    })
    })
    
    

  } 
  id: number = this.ruta.snapshot.params['index']
 

  agregarAlumno(): void {
    var nuevoAlumno: Alumno = {
      "nombre": this.nombreAlumno, 
      "apellido": this.apellidoAlumno, 
      "matricula": this.matriculaAlumno
    }

    //this.alumnos.push(nuevoAlumno)
  }  
  editando: boolean = false;

  ToggleEditar(){
    this.editando = !this.editando;

  }

  SavearAlumno(matricula: string,nuevoCaption: any){
    let hola: any = {};
    let x: number = 0;
    console.log("Matricula que busco: "+ matricula)
    this.db.getAlumnos().subscribe( res => {
      let identificacion2: number = 0;
      [].forEach.call(res, (index) =>{
        
        if(index != null ){
          hola = Object.values(index);
          console.log(hola[1]+" es igual a "+ matricula)
         if(hola[1] === matricula){
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
    this.db.updateAlumno(this.identificacion, nuevoCaption).subscribe(res => {
      console.log("El alumno ha sido modificado");
      this.consultaDBAlumnos();

    })
    })
    this.ToggleEditar();
  }

 // buscarAlumno: string = "";
 alumnos: Alumno[] = []; //Arreglo de objetos del tipo Alumno
 $alumnos: Alumno[] = []; //Nuevo arreglo con los alumnos filtrados (por Nombre)

 //buscarAlumno: string = "";
 private _buscarAlumno: string = "";

 get buscarAlumno(): string { //String de busqueda para el filtrado en alumnos
   return this._buscarAlumno;
 }

 set buscarAlumno(nombre: string) {
   this._buscarAlumno = nombre;

   this.$alumnos = this.buscaAlumno(nombre);

   console.log(this.$alumnos);
 }

 buscaAlumno(filtrarPorNombre: string): Alumno[] {
   filtrarPorNombre = filtrarPorNombre.toLocaleLowerCase();
   return this.alumnos.filter((alumno: Alumno) => alumno.nombre.toLocaleLowerCase().includes(filtrarPorNombre));
 }
 



 @Input() nombreAlumno: string = "";
 @Input() apellidoAlumno: string = "";
 @Input() matriculaAlumno: string = "";
}
