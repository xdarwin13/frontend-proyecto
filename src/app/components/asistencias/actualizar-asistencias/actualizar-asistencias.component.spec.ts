import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarAsistenciasComponent } from './actualizar-asistencias.component';

describe('ActualizarAsistenciasComponent', () => {
  let component: ActualizarAsistenciasComponent;
  let fixture: ComponentFixture<ActualizarAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActualizarAsistenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualizarAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
