import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ApiRestService, Boleto, Acordo } from '../api-rest.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-prazo-finalizacao',
  templateUrl: './prazo-finalizacao.component.html',
  styleUrls: ['./prazo-finalizacao.component.css']
})
export class PrazoFinalizacaoComponent implements OnInit {

  minDate: Date;
  maxDate: Date;
 
  public dataPagamento: string;
  public escolhaData = true;
  public fim: boolean;
  public sucesso: boolean;
  public erro: boolean;
  public loader: boolean;
  public loadingBoleto: boolean;
  public erroBoleto: boolean;
  public codAcordo: string;
  public boleto: Boleto;
  public porSms: boolean;
  public porEmail: boolean;
  public smsRes = '';
  public emailRes = '';

  constructor(private localeService: BsLocaleService, public apiRestService: ApiRestService, private router: Router) {
    this.localeService.use('pt-br');
    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 8);

   }

  ngOnInit() {  }

  enviarEmail() {
    this.apiRestService.enviaBoletoEmail(this.apiRestService.devedor.data.Devedores.Devedor[0].Contrato, this.boleto.data.BoletoAcordo.Valor, this.boleto.data.BoletoAcordo.DataVencimento, this.boleto.data.BoletoAcordo.LinhaDigitavel, this.apiRestService.email).subscribe(res => {
      this.emailRes = res.message;
      this.porEmail = false;
      this.sucesso = true;
    });    
  }

  voltarEmail() {
    this.porEmail = false;
    this.sucesso = true;
  }

  voltarSms() {    
    this.porSms = false;
    this.sucesso = true;
    this.smsRes = '';
  }

  showFinalizacao() {
   if (this.dataPagamento) { 
    this.fim = true;
    this.escolhaData = false;
   } 
  }

  mudarData() {
    this.fim = false;
    this.escolhaData = true;
  }  

  voltar() {
    //this.clickVoltar.emit(true);
  }

  voltar_data() {
    //this.clickVoltarAVista.emit(true);
  }

  valorAVista() {
    if (this.apiRestService.parcelas.aVista) return this.apiRestService.doisDigitosDecimais (this.apiRestService.parcelas.aVista);
  }

  primeiraParcelado() {
    if (this.apiRestService.parcelas.primeira) return this.apiRestService.doisDigitosDecimais (this.apiRestService.parcelas.primeira);
    else return this.apiRestService.doisDigitosDecimais (this.apiRestService.parcelas.aVista);
  }

  vezesParcelado() {
    if (this.apiRestService.parcelas.vezes) return this.apiRestService.parcelas.vezes;
    else return 0;
  }

  outrasParcelado() {
    if (this.apiRestService.parcelas.outrasParcelas) return this.apiRestService.doisDigitosDecimais (this.apiRestService.parcelas.outrasParcelas);
  }

  abrirBoleto() {
    let codigoParcelaAcordo: string;

    if (!this.boleto) {
    this.loader = true;
    this.apiRestService.getDadosAcordo(this.apiRestService.codTitulo).subscribe (acc => {
      console.log("acc=");
      console.log(acc);
      if (acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo.length) codigoParcelaAcordo = acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo[0].CodigoParcelaAcordo;
      else codigoParcelaAcordo = acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo.CodigoParcelaAcordo;

      this.apiRestService.getBoletoAcordo(this.codAcordo, codigoParcelaAcordo).subscribe ((bol: Boleto) => {
       console.log(bol);
       this.loader = false;

       if (bol.data) {
         this.boleto = bol; 
        //window.open ("/boleto?data=" + bol.BoletoAcordo.DataVencimento + "&linha=" + bol.BoletoAcordo.LinhaDigitavel + "&valor=" + bol.BoletoAcordo.Valor, "_self");
        this.router.navigate(['/boleto'] , { queryParams: { data: bol.data.BoletoAcordo.DataVencimento, linha: bol.data.BoletoAcordo.LinhaDigitavel, valor: this.apiRestService.doisDigitosDecimais (bol.data.BoletoAcordo.Valor), cliente: this.apiRestService.devedor.data.Devedores.Devedor[0].Nome, contrato: this.apiRestService.devedor.data.Devedores.Devedor[0].Contrato}});
      }
       else {
         this.erroBoleto = true;
       }       
    });
  });
  }

  else {
    this.router.navigate(['/boleto'], { queryParams: { data: this.boleto.data.BoletoAcordo.DataVencimento, linha: this.boleto.data.BoletoAcordo.LinhaDigitavel, valor: this.apiRestService.doisDigitosDecimais (this.boleto.data.BoletoAcordo.Valor), cliente: this.apiRestService.devedor.data.Devedores.Devedor[0].Nome, contrato: this.apiRestService.devedor.data.Devedores.Devedor[0].Contrato}});
  }
}
  
  gravaAcordo () {
    this.loader = true;
    this.erro = false;
    this.fim = false;
      if (this.apiRestService.parcelas.aVista) {
        console.log(this.dataPagamento.toLocaleString().slice(0,10));
        
        this.apiRestService.gravaAcordo(this.apiRestService.codTitulo, this.apiRestService.cpfCnpj, this.apiRestService.devedor.data.Devedores.Devedor[0].CodigoDevedor, '1', this.dataPagamento.toLocaleString().slice(0,10), this.apiRestService.parcelas.aVista).subscribe(res => {
          console.log(res);  
          this.loader = false;
          if (res.data.Codigo === '12') {
            this.fim = false;
            this.sucesso = true;
            this.codAcordo = res.data.CodigoAcordo;
            this.apiRestService.telaFinal = true;
           }
           else {
             this.erro = true;
             this.fim = true;
           }

        });
      }
      else if (this.apiRestService.parcelas.primeira) {
        this.apiRestService.gravaAcordo(this.apiRestService.codTitulo, this.apiRestService.cpfCnpj, this.apiRestService.devedor.data.Devedores.Devedor[0].CodigoDevedor, this.apiRestService.plano, this.dataPagamento.toLocaleString().slice(0,10), this.apiRestService.parcelas.primeira).subscribe(res => {
          console.log(res);
          this.loader = false; 
          if (res.data.Codigo === '12') {
            this.fim = false;
            this.sucesso = true;
            this.codAcordo = res.data.CodigoAcordo;
            this.apiRestService.telaFinal = true;
           }
           else {
             this.erro = true;
             this.fim = true;
           }

       });
      }
  }

  enviarSms() {
    this.apiRestService.enviaSms( this.boleto.data.BoletoAcordo.LinhaDigitavel, this.boleto.data.BoletoAcordo.DataVencimento, this.apiRestService.doisDigitosDecimais (this.boleto.data.BoletoAcordo.Valor)).subscribe(res => {
      console.log("JSON=");
      console.log(res);
      this.smsRes = res.message;
      this.porSms = false;
      this.sucesso = true;

      console.log("RES SMS="); 
      console.log(res);
   });
  }

  pegarTelefone() {
    this.sucesso = false;
    let codigoParcelaAcordo: string;

    if (!this.boleto) {
    this.loader = true;
    this.apiRestService.getDadosAcordo(this.apiRestService.codTitulo).subscribe (acc => {  
      console.log("acc=");
      console.log(acc);
      if (acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo.length) codigoParcelaAcordo = acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo[0].CodigoParcelaAcordo;
      else codigoParcelaAcordo = acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo.CodigoParcelaAcordo;
      this.apiRestService.getBoletoAcordo(this.codAcordo, codigoParcelaAcordo).subscribe ((bol: Boleto) => { 
        this.loader = false;
        console.log("bol=");  
        console.log(bol);
               
       if (bol.data) {
          this.porSms = true;
          this.boleto = bol; 
       } else { 
         this.erroBoleto = true;
         this.sucesso = true;      
       }       
    });
  });
  }
  else {
    this.porSms = true;
  }

  }

  pegarEmail() {
    let codigoParcelaAcordo: string;    
    this.smsRes = '';
    this.sucesso = false; 
    if (!this.boleto) {
    this.loader = true;
    this.emailRes = '';
    this.apiRestService.getDadosAcordo(this.apiRestService.codTitulo).subscribe (acc => { 
      console.log("acc=");
      console.log(acc);
      if (acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo.length) codigoParcelaAcordo = acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo[0].CodigoParcelaAcordo;
      else codigoParcelaAcordo = acc.data.Acordos.DadosAcordo.ParcelasAcordo.ParcelaAcordo.CodigoParcelaAcordo;
      this.apiRestService.getBoletoAcordo(this.codAcordo, codigoParcelaAcordo).subscribe ((bol: Boleto) => { 
        this.loader = false;
        console.log("bol=");  
        console.log(bol);
               
       if (bol.data) {
        this.porEmail = true;
        this.boleto = bol; 
       } else { 
        this.erroBoleto = true;
        this.sucesso = true;      
      }       
    });
  });

  }
  else {
    this.porEmail = true;
  }
  
  }  
}