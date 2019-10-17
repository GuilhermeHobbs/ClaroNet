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

  ngOnInit() {

    if (this.apiRestService.opcoesPg[this.apiRestService.dividasTvVirtua.data.Dividas.Divida[0].CodigoTitulo]) {
      this.apiRestService.opcoesPg[this.apiRestService.dividasTvVirtua.data.Dividas.Divida[0].CodigoTitulo].subscribe ( par => {
        this.total = par.data.OpcoesPagamento.OpcaoPagamento[0].ValorOriginal;
      })
      this.parcelas = this.apiRestService.dividasTvVirtua.data.Dividas.Divida.filter(obj => {
        return obj.CodigoTitulo === this.apiRestService.codTitulo
      })
    }    

    else {
      this.apiRestService.opcoesPg[this.apiRestService.dividasNetfone.data.Dividas.Divida[0].CodigoTitulo].subscribe ( par => {
        this.total = par.data.OpcoesPagamento.OpcaoPagamento[0].ValorOriginal;
      })
      this.parcelas = this.apiRestService.dividasNetfone.data.Dividas.Divida.filter(obj => {
        return obj.CodigoTitulo === this.apiRestService.codTitulo
      })
    }
    console.log("PARCELAS=");
    console.log(this.parcelas[0].Parcelas.ParcelaDivida);
  }

}
