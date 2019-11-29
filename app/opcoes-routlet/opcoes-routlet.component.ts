import { Component, OnInit } from '@angular/core';
import { ApiRestService, Divida, Acordo } from '../api-rest.service';

@Component({
  selector: 'app-opcoes-routlet',
  templateUrl: './opcoes-routlet.component.html',
  styleUrls: ['./opcoes-routlet.component.css']
})
export class OpcoesRoutletComponent {

  public voltarNegociarOnline: boolean;
  
  constructor(public apiRestService: ApiRestService) { }

  public showDisclaimer = true;  
  public nome: string = this.apiRestService.getNome();
  
  showOpcoes: boolean = true;
  showNegocieOnline: boolean;
  showAssistenteVirtual: boolean;
  showRecebaNossaLigacao: boolean;
  showAcordosAndamento: boolean;
  cardBodyPagamento: boolean = true;
  fizPagamentoOk: boolean;
  showFizPagamento: boolean;

  logo_menor: boolean;


  negocieOnline() {
    this.showOpcoes = false;
    this.showNegocieOnline = true;
    this.logo_menor = true;
    this.showDisclaimer = false;
  } 

  assistenteVirtual() {
    this.showOpcoes = false;
    this.showAssistenteVirtual = true;
  } 

  recebaNossaLigacao() {
    this.showOpcoes = false;
    this.showRecebaNossaLigacao = true;
  } 

  fizPagamento() {    
    this.showOpcoes = false;
    this.showFizPagamento = true;
    this.logo_menor = true;
    //this.apiRestService.showDisclaimer = false;
  }

  acordosAndamento() {
    this.showOpcoes = false;
    this.showAcordosAndamento = true;
    this.logo_menor = true;
    this.showDisclaimer = false;
  }


  voltarMenu() {
      this.showOpcoes = true;
      this.showNegocieOnline = false;
      this.showAssistenteVirtual = false;
      this.showRecebaNossaLigacao = false;
      this.showAcordosAndamento = false;  
      this.logo_menor = false;
      this.showFizPagamento = false;
    }

  voltarInicio() {
    window.open ("/");
  }

  voltarNegociar() {
   // this.apiRestService.linkTelaFim = false;
  }
}
