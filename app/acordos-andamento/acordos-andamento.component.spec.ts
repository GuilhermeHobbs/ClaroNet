import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcordosAndamentoComponent } from './acordos-andamento.component';

describe('AcordosAndamentoComponent', () => {
  let component: AcordosAndamentoComponent;
  let fixture: ComponentFixture<AcordosAndamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcordosAndamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcordosAndamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
