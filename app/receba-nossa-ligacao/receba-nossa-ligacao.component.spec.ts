import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecebaNossaLigacaoComponent } from './receba-nossa-ligacao.component';

describe('RecebaNossaLigacaoComponent', () => {
  let component: RecebaNossaLigacaoComponent;
  let fixture: ComponentFixture<RecebaNossaLigacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecebaNossaLigacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecebaNossaLigacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
