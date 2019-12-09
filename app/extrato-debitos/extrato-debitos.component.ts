import { Component, OnInit } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-extrato-debitos',
  templateUrl: './extrato-debitos.component.html',
  styleUrls: ['./extrato-debitos.component.css']
})
export class ExtratoDebitosComponent implements OnInit {

  constructor(public apiRestService: ApiRestService) { }

  public parcelas = [];
  public total: string;

  public parcelaHalfNum: number;
  public parcelaHalf = [];


  ngOnInit() {

    if (this.apiRestService.dividasTvVirtua.data.Dividas.Divida.length && this.apiRestService.opcoesPg[this.apiRestService.dividasTvVirtua.data.Dividas.Divida[0].CodigoTitulo]) {
      this.apiRestService.opcoesPg[this.apiRestService.dividasTvVirtua.data.Dividas.Divida[0].CodigoTitulo].subscribe ( par => {
        if (par.data.OpcoesPagamento.OpcaoPagamento.length) this.total = par.data.OpcoesPagamento.OpcaoPagamento[0].ValorOriginal;
        else this.total = par.data.OpcoesPagamento.OpcaoPagamento.ValorOriginal
      })
      this.parcelas = this.apiRestService.dividasTvVirtua.data.Dividas.Divida.filter(obj => {
        return obj.CodigoTitulo === this.apiRestService.codTitulo
      })
    }    

    else {
      console.log("dividasNetfone====");
      this.apiRestService.opcoesPg[this.apiRestService.dividasNetfone.data.Dividas.Divida[0].CodigoTitulo].subscribe ( par => {
        if (par.data.OpcoesPagamento.OpcaoPagamento.length) this.total = par.data.OpcoesPagamento.OpcaoPagamento[0].ValorOriginal;
        else this.total = par.data.OpcoesPagamento.OpcaoPagamento.ValorOriginal;
      })
      console.log("====this.apiRestService.dividasNetfone.data.Dividas.Divida");
      console.log(this.apiRestService.dividasNetfone.data.Dividas.Divida);
      this.parcelas = this.apiRestService.dividasNetfone.data.Dividas.Divida.filter(obj => {
        return obj.CodigoTitulo === this.apiRestService.codTitulo
      })
    }
  
    this.parcelaHalfNum = Math.ceil(this.parcelas[0].Parcelas.ParcelaDivida.length / 2);
    this.parcelaHalf.length = this.parcelaHalfNum;

    //this.parcelaHalf.splice(0, this.parcelaHalfNum);
  
  }

}
