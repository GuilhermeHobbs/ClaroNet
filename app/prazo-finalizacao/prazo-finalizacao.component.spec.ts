import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrazoFinalizacaoComponent } from './prazo-finalizacao.component';

describe('PrazoFinalizacaoComponent', () => {
  let component: PrazoFinalizacaoComponent;
  let fixture: ComponentFixture<PrazoFinalizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrazoFinalizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrazoFinalizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
