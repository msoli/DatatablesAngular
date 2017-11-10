import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {DataTablesModule} from 'angular-datatables';
import {HttpModule} from '@angular/http';
import {AppRoutingModule} from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { AlmacenComponent } from './components/almacen/almacen.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlmacenComponent
  ],
  imports: [
    BrowserModule,
    DataTablesModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
