import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantalonesPage } from './pantalones.page';

describe('PantalonesPage', () => {
  let component: PantalonesPage;
  let fixture: ComponentFixture<PantalonesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PantalonesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
