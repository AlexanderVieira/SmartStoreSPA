/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LojaCompraRealizadaComponent } from './loja-compra-realizada.component';

describe('LojaCompraRealizadaComponent', () => {
  let component: LojaCompraRealizadaComponent;
  let fixture: ComponentFixture<LojaCompraRealizadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LojaCompraRealizadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LojaCompraRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
