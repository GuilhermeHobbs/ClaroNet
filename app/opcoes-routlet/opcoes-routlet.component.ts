import { Component, OnInit } from '@angular/core';
import { ApiRestService, Divida, Acordo } from '../api-rest.service';

@Component({
  selector: 'app-opcoes-routlet',
  templateUrl: './opcoes-routlet.component.html',
  styleUrls: ['./opcoes-routlet.component.css']
})
export class OpcoesRoutletComponent {

  constructor(public apiRestService: ApiRestService) { }

  public nome: string = this.apiRestService.getNome();
  showOpcoes: boolean = true;
  showNegocieOnline: boolean;
  showAssistenteVirtual: boolean;
  showRecebaNossaLigacao: boolean;
  showAcordosAndamento: boolean;
  cardBodyPagamento: boolean = true;
  fizPagamentoOk: boolean;

  logo_menor: boolean;


  negocieOnline() {
    this.showOpcoes = false;
    this.showNegocieOnline = true;
    this.logo_menor = true;
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
    this.apiRestService.fizPagamento().subscribe(res => {
      if (res) {
        this.cardBodyPagamento = false;
        this.fizPagamentoOk = true;
      }  
    });
  }

  acordosAndamento() {
    this.showOpcoes = false;
    this.showAcordosAndamento = true;
    this.logo_menor = true;
  }


  voltarMenu() {
      this.showOpcoes = true;
      this.showNegocieOnline = false;
      this.showAssistenteVirtual = false;
      this.showRecebaNossaLigacao = false;
      this.showAcordosAndamento = false;  
      this.logo_menor = false;
      this.apiRestService.linkTelaFim = false;
    }

  voltarInicio() {
    window.open ("/");
  }

  escolherData() {
    this.apiRestService.linkTelaFim = false;
    this.apiRestService.telaFinal = true;
    this.showNegocieOnline = false;
  }
}
