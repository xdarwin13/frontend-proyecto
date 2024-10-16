import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarAsistenciasComponent } from './mostrar-asistencias.component';

describe('MostrarAsistenciasComponent', () => {
  let component: MostrarAsistenciasComponent;
  let fixture: ComponentFixture<MostrarAsistenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MostrarAsistenciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarAsistenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
