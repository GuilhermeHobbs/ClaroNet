import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpfCnpjBoxComponent } from './cpf-cnpj-box.component';

describe('CpfCnpjBoxComponent', () => {
  let component: CpfCnpjBoxComponent;
  let fixture: ComponentFixture<CpfCnpjBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpfCnpjBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpfCnpjBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
