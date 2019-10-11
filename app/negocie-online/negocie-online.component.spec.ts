import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NegocieOnlineComponent } from './negocie-online.component';

describe('NegocieOnlineComponent', () => {
  let component: NegocieOnlineComponent;
  let fixture: ComponentFixture<NegocieOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NegocieOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NegocieOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
