import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CpfCnpjBoxComponent } from './cpf-cnpj-box/cpf-cnpj-box.component'
import { OpcoesRoutletComponent } from './opcoes-routlet/opcoes-routlet.component';
import { NegocieOnlineComponent } from './negocie-online/negocie-online.component';
import { BoletoComponent } from './boleto/boleto.component';


const routes: Routes = [
  { path: '', component: CpfCnpjBoxComponent, pathMatch: 'full' }, 
  { path: 'negocie-online', component: NegocieOnlineComponent },
  { path: 'opcoes-routlet', component: OpcoesRoutletComponent },
  { path: 'boleto', component: BoletoComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

 }
