import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule }    from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';


import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale); 

import { CpfCnpjBoxComponent } from './cpf-cnpj-box/cpf-cnpj-box.component';
import { NegocieOnlineComponent } from './negocie-online/negocie-online.component';
import { OpcoesRoutletComponent } from './opcoes-routlet/opcoes-routlet.component';
import { AssistenteVirtualComponent } from './assistente-virtual/assistente-virtual.component';
import { RecebaNossaLigacaoComponent } from './receba-nossa-ligacao/receba-nossa-ligacao.component';
import { AcordosAndamentoComponent } from './acordos-andamento/acordos-andamento.component';
import { PrazoFinalizacaoComponent } from './prazo-finalizacao/prazo-finalizacao.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BoletoComponent } from './boleto/boleto.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InputTelComponent } from './input-tel/input-tel.component';
import { InputEmailComponent } from './input-email/input-email.component';

@NgModule({
  declarations: [
    AppComponent,
    CpfCnpjBoxComponent,
    NegocieOnlineComponent,
    OpcoesRoutletComponent,
    AssistenteVirtualComponent,
    RecebaNossaLigacaoComponent,
    AcordosAndamentoComponent,
    PrazoFinalizacaoComponent,
    BoletoComponent,
    InputTelComponent,
    InputEmailComponent        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TextMaskModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
