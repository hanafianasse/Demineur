/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CaseComponent } from './case.component';

describe('CaseComponent', () => {
  let component: CaseComponent;
  let fixture: ComponentFixture<CaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
