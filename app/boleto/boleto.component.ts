import { Component, TemplateRef, ViewChild, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';
import bwipjs from 'bwip-angular2';


@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.css']
})
  export class BoletoComponent implements OnInit {

    @ViewChild('template', {static: false}) templateRef: TemplateRef<any>;
    
  modalRef: BsModalRef;

  public linha: string;
  public data: string;
  public valor: string;
  public cliente: string;
  public contrato: string;

  constructor(private modalService: BsModalService, route: ActivatedRoute) {
    
    this.linha = route.snapshot.queryParams.linha;
    this.valor = route.snapshot.queryParams.valor;
    this.data = decodeURIComponent(route.snapshot.queryParams.data);
    this.cliente = route.snapshot.queryParams.cliente;
    this.contrato = route.snapshot.queryParams.contrato;

  }
  
//this.linha.split(' ').join(''),
  public newDate = new Date();
  public hoje = (this.newDate.toLocaleString().indexOf(',') > -1)? this.newDate.toLocaleString().slice(0, 10) : this.newDate.toLocaleString().split(' ')[0];

  ngOnInit() { 
    
    bwipjs('barcodeCanvas', {
      bcid: 'interleaved2of5',        // Barcode type
      text: this.linha.split(' ').join(''),   	  // Text to encode
      scale: 2,               // 3x scaling factor
      height: 10,             // Bar height, in millimeters
      width: 6,
      includetext: true,      // Show human-readable text
      textxalign: 'center',   // Always good to set this
    }, (err, cvs) => {
      if (err) {
       // document.getElementById('err').innerText = 'Error occured. See browser log for more information';
        console.log(err);
      } else {
      }
    });
  }

  ngAfterViewInit() {
    const initialState = {
      writerProfileActive: true,
      smallInfoActive: false
      };
    this.modalRef = this.modalService.show(this.templateRef, {initialState, class: 'modal-lg'});
  }
  
}
