import { NgModule } from '@angular/core';
import { AlumnoDetalleComponent } from '../alumno-detalle/alumno-detalle.component';
import { RouterModule, Routes } from '@angular/router';
import { AlumnosComponent } from '../alumnos/alumnos.component';
import { AlumnoRegistroComponent } from '../alumno-registro/alumno-registro.component';

const rutas: Routes = [
  { path: 'alumno-detalle/:index', component: AlumnoDetalleComponent },
  { path: 'inicio', component: AlumnosComponent},
  { path: 'tab2', component: AlumnosComponent},
  { path: 'tab3', component: AlumnoRegistroComponent}
]
@NgModule({
  imports: [RouterModule.forRoot(rutas)],
  exports: [RouterModule]
})
export class RoutesModule { }
