import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCurrencyModule } from 'ngx-currency';

import { EventoService } from './services/evento.service';
import { LoteService } from './services/lote.service';

import { AppRoutingModule } from './app-routing.module';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { AppComponent } from './app.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { NavComponent } from './shared/nav/nav.component';
import { PalestrantesComponent } from './components/palestrantes/palestrantes.component';
import { ContatosComponent } from './components/contatos/contatos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { EventosDetalheComponent } from './components/eventos/eventos-detalhe/eventos-detalhe.component';
import { EventosListaComponent } from './components/eventos/eventos-lista/eventos-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';

defineLocale('pt-br', ptBrLocale);
@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DateTimeFormatPipe,
    EventosComponent,
    PalestrantesComponent,
    ContatosComponent,
    DashboardComponent,
    PerfilComponent,
    TituloComponent,
    EventosDetalheComponent,
    EventosListaComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,

   ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule,
    NgxCurrencyModule,
  ],
  providers: [
    EventoService,
    LoteService], // Inge????o mais comum
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
