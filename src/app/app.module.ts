import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TazasComponent } from './tazas/tazas.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TazaService } from './tazas/taza.service';
import { FormComponent } from './tazas/form.component';

const routes: Routes = [
  {path: '', redirectTo: '/tazas', pathMatch: 'full'},
  {path: 'tazas', component: TazasComponent},
  {path: 'tazas/form', component: FormComponent},
  {path: 'tazas/form/:id', component: FormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TazasComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TazaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
