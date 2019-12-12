import { Component, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import { ApiRestService, Acordo, Boleto } from '../api-rest.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-cpf-cnpj-box',
  templateUrl: './cpf-cnpj-box.component.html',
  styleUrls: ['./cpf-cnpj-box.component.css']
})
export class CpfCnpjBoxComponent {

  constructor(private http: HttpClient, private router: Router, private cd: ChangeDetectorRef, private apiRestService: ApiRestService) {    
  }
 
  
  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];
  public cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/ ,/\d/, /\d/ ,/\d/, '-', /\d/, /\d/];

  public cpf_cnpj: string;
  public cpf_inv = false;
  public cnpj_inv = false;
  public cpf_sem_debitos = false;
  public cnpj_sem_debitos = false;
  public input_inv = false;
  public verificando = false;
  public disclaimer = true;
  public erro: boolean;

  clearAlerts() {
    this.cpf_inv = false; 
    this.cnpj_inv = false; 
    this.cpf_sem_debitos = false;
    this.cnpj_sem_debitos = false;
    this.input_inv = false;
    this.erro = false;

  }


  backspacePress(event: any) {
  
    if (event.target.value.substr(event.target.value.length - 1) == '.' ||
        event.target.value.substr(event.target.value.length - 1) == '/' ||
        event.target.value.substr(event.target.value.length - 1) == '-') {

      this.cd.detectChanges();     
      event.preventDefault();
      this.cpf_cnpj = this.cpf_cnpj.slice(0, -1);
      
    }      
        
  }
 

  mask(): any {    
    return {
      mask: (value) => {
        if (value.length <= 14) 
          return this.cpfMask;
        else
          return this.cnpjMask;
      },
      guide: false
    };      
  }

  valida() {
    
    const cpfCnpj = this.cpf_cnpj.replace(/[`\-.\{\}\[\]\\\/]/gi, '');
    this.clearAlerts(); 
    
    if (cpfCnpj === '11111111111') {
      this.erro = true;
      return;
    }

    switch (cpfCnpj.length) {
     case 11: {
      if (this.testaCPF(cpfCnpj)) {
        this.verificando = true;
        this.apiRestService.temDividasouAcordo(cpfCnpj).subscribe(res => {
          this.verificando = false;
          switch (res) {
            case 1: {
              this.router.navigateByUrl('/opcoes-routlet');
              break;
            }
            case 0: {  
              this.cpf_sem_debitos = true;
              break;
            }
            case 2: {
              this.erro = true;
              break;
            }  
          }
        }); 
      }
      else this.cpf_inv = true; 
      break;
    }  

    case 14: {
    if (this.testaCNPJ(cpfCnpj)) {
             
        this.verificando = true; 
     this.apiRestService.temDividasouAcordo(cpfCnpj).subscribe(res => {
        this.verificando = false;
        if (res) this.router.navigateByUrl('/opcoes-routlet');
        else this.cnpj_sem_debitos = true;
      });
    }  
    else this.cnpj_inv = true; 
    break;
  }  
  
  default: {
    this.input_inv = true;
  }

  }

  }  

  testaCPF(strCPF: string): boolean {
    let Soma, Resto, i;
    Soma = 0;
    if (strCPF == "00000000000") return false;
      
    for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;
    
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
    
    Soma = 0;
      for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
      Resto = (Soma * 10) % 11;
    
      if ((Resto == 10) || (Resto == 11))  Resto = 0;
      if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
      return true;
  }
  
  testaCNPJ(cnpj: string): boolean {
  
    // Valida a quantidade de caracteres
    if (cnpj.length !== 14) return false
  
    // Elimina inválidos com todos os caracteres iguais
    if (/^(\d)\1+$/.test(cnpj)) return false
  
    // Cáculo de validação
    let t = cnpj.length - 2,
      d = cnpj.substring(t),
      d1 = parseInt(d.charAt(0)),
      d2 = parseInt(d.charAt(1)),
      calc = x => {
        let n = cnpj.substring(0, x),
          y = x - 7,
          s = 0,
          r = 0
  
          for (let i = x; i >= 1; i--) {
            s += +n.charAt(x - i) * y--;
            if (y < 2)
              y = 9
          }
  
          r = 11 - s % 11
          return r > 9 ? 0 : r
      }
  
    return calc(t) === d1 && calc(t + 1) === d2
  }
  

}
