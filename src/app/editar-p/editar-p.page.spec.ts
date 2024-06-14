import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPPage } from './editar-p.page';

describe('EditarPPage', () => {
  let component: EditarPPage;
  let fixture: ComponentFixture<EditarPPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
