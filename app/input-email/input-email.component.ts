import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiRestService } from '../api-rest.service';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.css']
})
export class InputEmailComponent implements OnInit {

  @Output() clickEnviar = new EventEmitter<boolean>(); 
  @Output() clickVoltar = new EventEmitter<boolean>(); 

   public email: string; 
   public email_inv: boolean;
   public verificando: boolean;
   public cadastrado: boolean;
   public houve_erro: boolean;

  constructor(private apiRestService: ApiRestService) { }

  ngOnInit() {
  }

  cleanAlerts() {
    this.email_inv = false;  
  }

  validaEmail(email: string) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

  envia() { 
    if (!this.validaEmail(this.email)) this.email_inv = true; 
    else {
      this.apiRestService.email = this.email;
      this.clickEnviar.emit(true); 
    }
  }
 
  voltar() {
    this.clickVoltar.emit(true);
  }


}
