import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizPagamentoComponent } from './fiz-pagamento.component';

describe('FizPagamentoComponent', () => {
  let component: FizPagamentoComponent;
  let fixture: ComponentFixture<FizPagamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizPagamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
