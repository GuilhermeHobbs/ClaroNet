import { Component, OnInit, ChangeDetectorRef, HostListener, OnDestroy } from '@angular/core';
import { ApiRestService, Divida, OpcoesPagamento } from '../api-rest.service';


@Component({
  selector: 'app-negocie-online',
  templateUrl: './negocie-online.component.html',
  styleUrls: ['./negocie-online.component.css']
})
export class NegocieOnlineComponent implements OnInit, OnDestroy {

  constructor(public apiRestService: ApiRestService, private cd: ChangeDetectorRef) { 
   }

   ngOnDestroy() {
     this.cd.detach();
   }
 
  public prazoFinalizacao: boolean; 
  public loadingParcelados: boolean;
  public loader: boolean;
  public OutraCobradora: boolean;
  public linkTelaFim: boolean; 

  public showHeader: boolean = true;
  public opcoesParcelamento: boolean;
  public movelLabel: boolean;
  public opcoesParcelamentoLabel: boolean;
  public mostrarExtrato: boolean;
 
  public parcelado = { };
  public ind_parcelado: number; 

  public dadosDivida = [];
  public opcoesPg = { };      

  ngOnInit() {

    this.apiRestService.getDividas();
    if (this.apiRestService.dividas.data.Dividas.Divida.length) {      
      this.dadosDivida = this.apiRestService.dividas.data.Dividas.Divida;
    }

    if (this.apiRestService.dividas.data.Dividas.Divida.CodigoDevedor) {
      this.dadosDivida.push(this.apiRestService.dividas.data.Dividas.Divida);
    }
 }

 botaoNaoClicavel() {
   return this.apiRestService.mostrarAbas.every(Boolean);
 }

  pagarAVista(codTitulo: string, valor: string, plano: string) {
    
    this.apiRestService.parcelas = {
      aVista: valor
  };
  this.apiRestService.codTitulo = codTitulo;
  this.apiRestService.plano = plano;
}

  pagarParceladoTvVirtua(ind: number, codTitulo: string, plano: string) {
    
    this.apiRestService.parcelas = {
      primeira: this.opcoesPg[this.apiRestService.dividasTvVirtua.data.Dividas.Divida[this.ind_parcelado].CodigoTitulo].OpcaoPagamento[ind].ValorPrimeira,
      vezes: ind,
      outrasParcelas: this.opcoesPg[this.apiRestService.dividasTvVirtua.data.Dividas.Divida[this.ind_parcelado].CodigoTitulo].OpcaoPagamento[ind].ValorDemaisParcelas 
    };
    this.apiRestService.codTitulo = codTitulo;
    this.apiRestService.plano = plano; 
  }

  pagarParceladoNetfone(ind: number, codTitulo: string, plano: string) {
    
    this.apiRestService.parcelas = {
      primeira: this.opcoesPg[this.apiRestService.dividasNetfone.data.Dividas.Divida[this.ind_parcelado].CodigoTitulo].OpcaoPagamento[ind].ValorPrimeira,
      vezes: ind,
      outrasParcelas: this.opcoesPg[this.apiRestService.dividasNetfone.data.Dividas.Divida[this.ind_parcelado].CodigoTitulo].OpcaoPagamento[ind].ValorDemaisParcelas 
    };
    this.apiRestService.codTitulo = codTitulo;
    this.apiRestService.plano = plano; 
  }


  getAllOpcoesTvVirtua() { 
    
    this.apiRestService.mostrarAbas = [true, false];

    this.apiRestService.getAllOpcoesTvVirtua();  
    this.loader = true;
    this.showHeader = false;
    this.movelLabel = true;
      
    if (this.apiRestService.dividasTvVirtua.data.Dividas.Divida.length) {
      //if (this.apiRestService.dividasTvVirtua.data.Dividas.Divida.length > 2) this.apiRestService.showDisclaimer = false;
      this.apiRestService.dividasTvVirtua.data.Dividas.Divida.forEach( (dados) => this.setOpcoes(dados.CodigoTitulo));
    } 
  }

  getAllOpcoesNetfone() {
    this.apiRestService.mostrarAbas = [false, true];

    this.apiRestService.getAllOpcoesNetfone();
    this.loader = true;  
    this.showHeader = false;
    this.movelLabel = true;
    
    if (this.apiRestService.dividasNetfone.data.Dividas.Divida.length) {
      //if (this.apiRestService.dividasNetfone.data.Dividas.Divida.length > 2) this.apiRestService.showDisclaimer = false;
      this.apiRestService.dividasNetfone.data.Dividas.Divida.forEach( (dados) => this.setOpcoes(dados.CodigoTitulo));
    } 
  }


  setOpcoes (cod: string) {
    let dadosDividaCod = this.dadosDivida.filter((dados) => dados.CodigoTitulo === cod);
    
    this.apiRestService.opcoesPg[dadosDividaCod[0].CodigoTitulo].subscribe(res => {
      if (res.OutraCobradora) {
        this.OutraCobradora = true;
        return;
      }
      this.opcoesPg[dadosDividaCod[0].CodigoTitulo] = res.data.OpcoesPagamento;
        console.log("RES.OPCOESPAGAMENTO=");
        console.log(res.data.OpcoesPagamento);
      if (!this.loadingParcelados && !res.Carregando) { this.loadingParcelados = true; setTimeout(() => { 
        this.loader = false; 
      }, 2000); }

      this.cd.detectChanges();     
      event.preventDefault();
    });
  }

  getValorTotal (cod: string) {
    if (this.opcoesPg[cod] && !this.opcoesPg[cod].Carregando) {
      if (this.opcoesPg[cod].OpcaoPagamento.ValorOriginal) {
     //   if (+this.opcoesPg[cod].OpcaoPagamento.ValorOriginal.replace(',','.') < 45.00) this.parcelado[cod] = 1;        
        return this.apiRestService.doisDigitosDecimais(this.opcoesPg[cod].OpcaoPagamento.ValorOriginal);
      } else if (this.opcoesPg[cod].OpcaoPagamento.length) {
        this.parcelado[cod] = 2;
        return this.apiRestService.doisDigitosDecimais(this.opcoesPg[cod].OpcaoPagamento[0].ValorOriginal);
      }  
    }
    else return "";      
  }

  

  getValorNegociar (cod: string) {
    if (this.opcoesPg[cod]) {
      if (this.opcoesPg[cod].OpcaoPagamento.ValorNegociar) {
        this.parcelado[cod] = 1;
        return this.apiRestService.doisDigitosDecimais (this.opcoesPg[cod].OpcaoPagamento.ValorNegociar);      
      } else if (this.opcoesPg[cod].OpcaoPagamento[0].ValorNegociar) {
        this.parcelado[cod] = 2;
        return this.apiRestService.doisDigitosDecimais (this.opcoesPg[cod].OpcaoPagamento[0].ValorNegociar); 
      }  
    }
    else return "";      
  }

  getOpcaoNetfone (ind: number) {
    return this.apiRestService.doisDigitosDecimais (this.opcoesPg[this.apiRestService.dividasNetfone.data.Dividas.Divida[this.ind_parcelado].CodigoTitulo].OpcaoPagamento[ind].ValorPrimeira) + " + " + ind + " X R$ " + this.apiRestService.doisDigitosDecimais (this.opcoesPg[this.apiRestService.dividasNetfone.data.Dividas.Divida[this.ind_parcelado].CodigoTitulo].OpcaoPagamento[ind].ValorDemaisParcelas);
  } 

  getOpcaoTvVirtua (ind: number) {
 
    return this.apiRestService.doisDigitosDecimais (this.opcoesPg[this.apiRestService.dividasTvVirtua.data.Dividas.Divida[this.ind_parcelado].CodigoTitulo].OpcaoPagamento[ind].ValorPrimeira) + " + " + ind + " X R$ " + this.apiRestService.doisDigitosDecimais (this.opcoesPg[this.apiRestService.dividasTvVirtua.data.Dividas.Divida[this.ind_parcelado].CodigoTitulo].OpcaoPagamento[ind].ValorDemaisParcelas);
  }

  showExtrato() {
    
    this.mostrarExtrato = true;
    this.opcoesParcelamento = false;
    this.linkTelaFim = true;
  }

  escolherData() {
    this.mostrarExtrato = false;
    this.prazoFinalizacao = true;
    this.linkTelaFim = false;
  }


  showOpcoesParcelamento(ind) {

    this.opcoesParcelamento = true;
    this.movelLabel = false;
    this.opcoesParcelamentoLabel = true;

    this.ind_parcelado = ind;
  
    }

  hideOpcoesParcelamento() {

    this.opcoesParcelamento = false;
  }  

}
