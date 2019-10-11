import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-input-tel',
  templateUrl: './input-tel.component.html',
  styleUrls: ['./input-tel.component.css']
})
export class InputTelComponent implements OnInit {

  @Output() clickEnviar = new EventEmitter<boolean>(); 
  @Output() clickVoltar = new EventEmitter<boolean>(); 

  constructor(private cd: ChangeDetectorRef, private apiRestService: ApiRestService) { }

  ngOnInit() {
  }

  public telMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public tel: string;
  public tel_inv: boolean;
  public cadastrado: boolean;
  public houve_erro: boolean;
  public verificando: boolean;


  cleanAlerts() {
    this.tel_inv = false;  
  }

  envia() {
    let telNum = this.tel.replace(/[`\-()_.\{\}\[\] \\\/]/gi, '');
    let ddd = telNum.slice(0,2);
    
    if (telNum.length < 11 || telNum.length > 12 || +ddd < 10) {
      this.tel_inv = true;
      return;
    }
  
    this.cadastrado = false;
    this.houve_erro = false;

    this.apiRestService.telefone = telNum;
    this.clickEnviar.emit(true);  
  }

  voltar() {
    this.clickVoltar.emit(true);
    
  }

}
