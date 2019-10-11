import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-receba-nossa-ligacao',
  templateUrl: './receba-nossa-ligacao.component.html',
  styleUrls: ['./receba-nossa-ligacao.component.css']
})
export class RecebaNossaLigacaoComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef, private apiRestService: ApiRestService) { }

  public verificando: boolean;

  ngOnInit() {
  }

  public telMask = ['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/];
  public tel: string;
  public tel_inv: boolean;
  public cadastrado: boolean;
  public houve_erro: boolean;

  cleanAlerts() {
    this.tel_inv = false;  
  }

  envia() {
    let telNum = this.tel.replace(/[`\-()_.\{\}\[\]\\\/]/gi, '');
    let ddd = telNum.slice(0,2);
    

    if (telNum.length < 11 || telNum.length > 12 || +ddd < 10) {
      this.tel_inv = true;
      return;
    }
  
    this.cadastrado = false;
    this.houve_erro = false;

    this.apiRestService.meLigue(telNum).subscribe(res => {
      if (res) this.cadastrado = true;
      else this.houve_erro = true;
    });  
  
  }

}
