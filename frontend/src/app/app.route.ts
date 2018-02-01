import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { ContatoDetalheComponent } from './contato-detalhe/contato-detalhe.component';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent},
    { path: 'form', component: FormComponent},
    { path: 'edit/:id', component: ContatoDetalheComponent},
    { path: 'list', component: ListComponent},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);