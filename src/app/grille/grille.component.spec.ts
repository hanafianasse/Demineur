/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GrilleComponent } from './grille.component';

describe('GrilleComponent', () => {
  let component: GrilleComponent;
  let fixture: ComponentFixture<GrilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
