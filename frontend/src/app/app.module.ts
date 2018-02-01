import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { HomeComponent } from './home/home.component';


import { routing } from './app.route';

import { MaterializeModule } from "angular2-materialize";
import { ContatoDetalheComponent } from './contato-detalhe/contato-detalhe.component';


@NgModule({
    declarations: [
        AppComponent,
        FormComponent,
        ListComponent,
        HomeComponent,
        ContatoDetalheComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        routing,
        MaterializeModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
