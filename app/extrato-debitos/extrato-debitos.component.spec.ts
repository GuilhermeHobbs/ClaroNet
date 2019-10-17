import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtratoDebitosComponent } from './extrato-debitos.component';

describe('ExtratoDebitosComponent', () => {
  let component: ExtratoDebitosComponent;
  let fixture: ComponentFixture<ExtratoDebitosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtratoDebitosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtratoDebitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
