import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistenteVirtualComponent } from './assistente-virtual.component';

describe('AssistenteVirtualComponent', () => {
  let component: AssistenteVirtualComponent;
  let fixture: ComponentFixture<AssistenteVirtualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssistenteVirtualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssistenteVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
