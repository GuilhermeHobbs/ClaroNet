import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import bwipjs from 'bwip-angular2';


@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.css']
})
  export class BoletoComponent implements OnInit {

    @ViewChild('template', {static: false}) templateRef: TemplateRef<any>;
    
  public linha: string;
  public data: string;
  public valor: string;
  public cliente: string;
  public contrato: string;
  public codigo: string;

  constructor(route: ActivatedRoute) {
    
    this.linha = route.snapshot.queryParams.linha;
    this.valor = route.snapshot.queryParams.valor;
    this.data = decodeURIComponent(route.snapshot.queryParams.data);
    this.cliente = route.snapshot.queryParams.cliente;
    this.contrato = route.snapshot.queryParams.contrato;
    this.codigo = route.snapshot.queryParams.codigo;

  }
  
  public newDate = new Date();
  // Necessario para funcionar no Edge:
  public hoje = (this.newDate.toLocaleString().indexOf(',') > -1)? this.newDate.toLocaleString().slice(0, 10) : this.newDate.toLocaleString().split(' ')[0];

  ngOnInit() { 
    setTimeout(this.mostrarBoleto, 1000, this.codigo); // necessario carregar o codigo de barras depois do resto da pagina 
  }
  
  mostrarBoleto(linha: string) {

    bwipjs('barcodeCanvas', {
      bcid: 'interleaved2of5',        // Barcode type
      text: linha,   	  // Text to encode
      scale: 2,               // 3x scaling factor
      height: 10,             // Bar height, in millimeters
      width: 6,
      includetext: true,      // Show human-readable text
      textxalign: 'center',   // Always good to set this
    }, (err, cvs) => {
      if (err) {
        console.log(err);
      } else {
      }
    });
  }

    
}
