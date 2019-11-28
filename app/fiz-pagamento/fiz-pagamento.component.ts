import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiRestService } from '../api-rest.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-fiz-pagamento',
  templateUrl: './fiz-pagamento.component.html',
  styleUrls: ['./fiz-pagamento.component.css']
})
export class FizPagamentoComponent implements OnInit {

  public acordos = [ ];
  public dadosDivida = [];
  public maxDate = new Date();
  public loader: boolean;
  public movelLabel: boolean;
  public acordosTvVirtua: any;
  public acordosNetfone: any;
  
  constructor(public apiRestService: ApiRestService, private localeService: BsLocaleService, private cd: ChangeDetectorRef) { 
    this.localeService.use('pt-br');    
  }

  ngOnInit() {
  
    if (this.apiRestService.acordos) {
      if (this.apiRestService.acordos.length) {
        this.apiRestService.acordos.forEach (acc => {    
          this.acordos.push(acc);
        });
      }
      if (this.apiRestService.acordos.CodigoAcordo) {
        this.acordos.push(this.apiRestService.acordos);
      }
    }
    
    
    console.log("acordos=");
    console.log(this.acordos);
    if (this.apiRestService.dividas && this.apiRestService.dividas.data.Dividas) {
    this.apiRestService.getDividas();
    if (this.apiRestService.dividas.data.Dividas.Divida.length) {      
      this.dadosDivida = this.apiRestService.dividas.data.Dividas.Divida;
    }

    if (this.apiRestService.dividas.data.Dividas.Divida.CodigoDevedor) {
      this.dadosDivida.push(this.apiRestService.dividas.data.Dividas.Divida);
    }
    
  }
    this.acordosTvVirtua = this.acordos.filter(aco => aco.Produto === "TV/VIRTUA");
    this.acordosNetfone = this.acordos.filter(aco => aco.Produto === "NETFONE");

    console.log("this.acordosTvVirtua");
    console.log(this.acordosTvVirtua)

  }

  mostraAbaTvVirtua() {
    return (this.apiRestService.dividasTvVirtua || this.acordosTvVirtua ) && this.apiRestService.mostrarAbas[0];
  }

  mostraAbaNetfone() {
    return (this.apiRestService.dividasNetfone || this.acordosNetfone ) && this.apiRestService.mostrarAbas[1];
  }

  getIcon(acordo) {
    switch (acordo.Produto) {
      case "TV/VIRTUA": {
        return "assets/icons/tv.jpg";
      }
      case "NETFONE": {
        return "assets/icons/phone.jpg";
      }
      
   }
  }

  getAllOpcoesTvVirtua() { 
    
    this.apiRestService.mostrarAbas = [true, false];
    this.movelLabel = true;   
  }

  getAllOpcoesNetfone() {

    this.apiRestService.mostrarAbas = [false, true];
    this.movelLabel = true;     
  }


}
