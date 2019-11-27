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
    
    console.log("dividas=");
    console.log(this.apiRestService.dividas);
    if (this.apiRestService.dividas && this.apiRestService.dividas.data.Dividas) {
    this.apiRestService.getDividas();
    if (this.apiRestService.dividas.data.Dividas.Divida.length) {      
      this.dadosDivida = this.apiRestService.dividas.data.Dividas.Divida;
    }

    if (this.apiRestService.dividas.data.Dividas.Divida.CodigoDevedor) {
      this.dadosDivida.push(this.apiRestService.dividas.data.Dividas.Divida);
    }
    
  }
    console.log("apiRestService.dividasTvVirtua");
    console.log(this.apiRestService.dividasTvVirtua);
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
