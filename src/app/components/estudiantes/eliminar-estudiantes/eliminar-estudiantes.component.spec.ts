import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarEstudiantesComponent } from './eliminar-estudiantes.component';

describe('EliminarEstudiantesComponent', () => {
  let component: EliminarEstudiantesComponent;
  let fixture: ComponentFixture<EliminarEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarEstudiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
