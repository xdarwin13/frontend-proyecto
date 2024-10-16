import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAsistenciasComponent } from './eliminar-asistencias.component';

describe('EliminarAsistenciasComponent', () => {
  let component: EliminarAsistenciasComponent;
  let fixture: ComponentFixture<EliminarAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EliminarAsistenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
