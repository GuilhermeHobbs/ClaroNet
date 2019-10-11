import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcoesRoutletComponent } from './opcoes-routlet.component';

describe('OpcoesRoutletComponent', () => {
  let component: OpcoesRoutletComponent;
  let fixture: ComponentFixture<OpcoesRoutletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcoesRoutletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcoesRoutletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
