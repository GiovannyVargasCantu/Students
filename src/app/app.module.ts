import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnosComponent } from './alumnos/alumnos.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutesModule } from './routes/routes.module';
import { TabsComponent } from './tabs/tabs.component';
import { AlumnoDetalleComponent } from './alumno-detalle/alumno-detalle.component';
import { HttpClientModule } from '@angular/common/http';
import { AlumnoRegistroComponent } from './alumno-registro/alumno-registro.component';

@NgModule({
  declarations: [
    AppComponent,
    AlumnosComponent,
    TabsComponent,
    AlumnoDetalleComponent,
    AlumnoRegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RoutesModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RoutesModule]
})
export class AppModule { }
