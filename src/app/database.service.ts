import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor( private http: HttpClient) { }

  //GET
  
  getAlumnos(){
    return this.http.get('https://alumnos-32-1954779-default-rtdb.firebaseio.com/alumnos.json')
  }

  getAlumnoDetalle(id:number){
    return this.http.get('https://alumnos-32-1954779-default-rtdb.firebaseio.com/alumnos/'+id+'.json')
  }



  //POST
  agregarAlumno(id:number,nuevoAlumno: any){
    return this.http.put('https://alumnos-32-1954779-default-rtdb.firebaseio.com/alumnos/'+id+'.json',nuevoAlumno)
  }




  //UPDATE
  updateAlumno(id:number, nuevoCaption:any){
    return this.http.put('https://alumnos-32-1954779-default-rtdb.firebaseio.com/alumnos/'+id+'.json', nuevoCaption)
  }



  //DELETe
  deleteAlumno(id:number){
    return this.http.delete('https://alumnos-32-1954779-default-rtdb.firebaseio.com/alumnos/'+id+'.json')
  }



}
