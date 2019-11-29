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

    console.log("this.apiRestService.dividasTvVirtua=");
    console.log(this.apiRestService.dividasTvVirtua);

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
      this.apiRestService.opcoesPg[this.apiRestService.dividasNetfone.data.Dividas.Divida[0].CodigoTitulo].subscribe ( par => {
        console.log("=====NETFONE");
        console.log(par.data);
        if (par.data.OpcoesPagamento.OpcaoPagamento.length) this.total = par.data.OpcoesPagamento.OpcaoPagamento[0].ValorOriginal;
        else this.total = par.data.OpcoesPagamento.OpcaoPagamento.ValorOriginal;
      })
      this.parcelas = this.apiRestService.dividasNetfone.data.Dividas.Divida.filter(obj => {
        return obj.CodigoTitulo === this.apiRestService.codTitulo
      })
    }
    console.log("PARCELAS=");
    console.log(this.parcelas[0].Parcelas.ParcelaDivida);
  
    this.parcelaHalfNum = Math.ceil(this.parcelas[0].Parcelas.ParcelaDivida.length / 2);
    this.parcelaHalf.length = this.parcelaHalfNum;

    //this.parcelaHalf.splice(0, this.parcelaHalfNum);
  
  }

}
