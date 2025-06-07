import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlusasPage } from './blusas.page';

describe('BlusasPage', () => {
  let component: BlusasPage;
  let fixture: ComponentFixture<BlusasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BlusasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
