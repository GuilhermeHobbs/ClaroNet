import { Component, OnInit  } from '@angular/core';
import { ApiRestService, Boleto } from '../api-rest.service';
import { RouterModule, Router } from '@angular/router';


@Component({
  selector: 'app-acordos-andamento',
  templateUrl: './acordos-andamento.component.html',
  styleUrls: ['./acordos-andamento.component.css']
})
export class AcordosAndamentoComponent implements OnInit {

  public acordos = [ ];
  public loadingBoleto = [false];
  public erroBoleto: boolean;
  public sucessoEmail: boolean;
  public porEmail: boolean;
  public porSms: boolean;
  public accDividas = true;
  public boleto: Boleto;
  public numTitulo: string;
  public emailRes: string;
  public smsRes = '';
  
  constructor(public apiRestService: ApiRestService, private router: Router) {
   }

  ngOnInit() {
      
    if (this.apiRestService.acordos.length) {
      this.apiRestService.acordos.forEach (acc => {    
        this.acordos.push(acc);
      });
    }
    if (this.apiRestService.acordos.CodigoAcordo) {
      this.acordos.push(this.apiRestService.acordos);
    }  
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

  segunda_via(codAcordo: string, codCodigoAcordo: string, numeroTitulo: string, ind: number) {
    numeroTitulo = numeroTitulo.split('.')[0];
    this.loadingBoleto[ind] = true;
    console.log(codCodigoAcordo);
    this.apiRestService.getBoletoAcordo(codAcordo, codCodigoAcordo).subscribe (bol => {
       console.log(bol);
       this.loadingBoleto[ind] = false;

       if (bol.data.BoletoAcordo) {
          //window.open ("boleto?data=" + encodeURIComponent(bol.BoletoAcordo.DataVencimento) + "&linha=" + bol.BoletoAcordo.LinhaDigitavel + "&valor=" + bol.BoletoAcordo.Valor + "&cliente=" + this.apiRestService.getNome() + "&contrato=" + numeroTitulo);
          this.router.navigate(['/boleto'] , { queryParams: { data: bol.data.BoletoAcordo.DataVencimento, 
            linha: bol.data.BoletoAcordo.LinhaDigitavel, 
            valor: this.apiRestService.doisDigitosDecimais(bol.data.BoletoAcordo.Valor), 
            cliente: this.apiRestService.devedor.data.Devedores.Devedor[0].Nome, 
            contrato: numeroTitulo
          }}); 

        }
       else {
         this.erroBoleto = true;
       }
       
    });
  }

  voltarEmail() {
    this.porEmail = false;
    this.sucessoEmail = false;
    this.accDividas = true;
  }

  voltarSms() {
    this.porSms = false;
    this.accDividas = true;
  }

  enviarSms() {
    this.apiRestService.enviaSms( this.boleto.BoletoAcordo.LinhaDigitavel, this.boleto.BoletoAcordo.DataVencimento, this.apiRestService.doisDigitosDecimais(this.boleto.BoletoAcordo.Valor)).subscribe(res => {
      this.smsRes = JSON.parse(res).statusDescription;
      this.accDividas = true;
      this.porSms = false;
   });
  }

  pegarTelefone(ind: number, codAcordo: string, codTitulo: any) {
    let codigoParcelaAcordo: string;
    this.loadingBoleto[ind] = true;
    this.emailRes = '';
    this.smsRes = '';
    console.log("acoordo=");
    console.log(codTitulo);
    this.apiRestService.getDadosAcordo(codTitulo).subscribe (acc => { 
      console.log("acc=");
      console.log(acc);
      if (acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo.length) codigoParcelaAcordo = acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo[0].CodigoParcelaAcordo;
      else codigoParcelaAcordo = acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo.CodigoParcelaAcordo;
      this.apiRestService.getBoletoAcordo(codAcordo, codigoParcelaAcordo).subscribe (bol => { 
        this.loadingBoleto[ind] = false;
        this.accDividas = false;
        console.log("bol=");  
        console.log(bol);
               
       if (bol.data.BoletoAcordo) {
         this.porSms = true;
         this.boleto = bol.data; 
       } else this.erroBoleto = true;
              
    });
  });

  }

  pegarEmail(ind: number, codAcordo: string, codTitulo: any, numTitulo: string) {
    let codigoParcelaAcordo: string;
    this.smsRes = '';
    this.loadingBoleto[ind] = true;
    this.numTitulo = numTitulo;
    this.emailRes = '';
    console.log("acoordo=");
    console.log(codTitulo);
    this.apiRestService.getDadosAcordo(codTitulo).subscribe (acc => { 
      console.log("acc=");
      console.log(acc);
      if (acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo.length) codigoParcelaAcordo = acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo[0].CodigoParcelaAcordo;
      else codigoParcelaAcordo = acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo.CodigoParcelaAcordo;
      this.apiRestService.getBoletoAcordo(codAcordo, codigoParcelaAcordo).subscribe (bol => { 
        console.log("bol=");  
        console.log(bol);
               
       if (bol.data.BoletoAcordo) {
        this.loadingBoleto[ind] = false;
        this.accDividas = false;
        this.porEmail = true;
        this.boleto = bol.data; 
       } else this.erroBoleto = true;
              
    });
  });

  }

  enviarEmail () {
    this.apiRestService.enviaBoletoEmail(this.numTitulo, this.boleto.BoletoAcordo.Valor, this.boleto.BoletoAcordo.DataVencimento, this.boleto.BoletoAcordo.LinhaDigitavel, this.apiRestService.email).subscribe(res => {
      this.emailRes = res.message;
      this.accDividas = true;
      this.porEmail = false;
    });
 }

}
